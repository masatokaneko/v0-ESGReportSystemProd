"use client"

import { useState, useEffect } from "react"
import { EntityType } from "@prisma/client"
import { useRouter } from "next/navigation"

interface Entity {
  id: string
  name: string
  type: EntityType
  parentId: string | null
}

interface EntityFormData {
  name: string
  type: EntityType
  parentId: string | null
}

export default function EntitiesPage() {
  const router = useRouter()
  const [entities, setEntities] = useState<Entity[]>([])
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<EntityFormData>({
    name: "",
    type: "COMPANY",
    parentId: null,
  })
  const [isCreating, setIsCreating] = useState(false)

  // エンティティ一覧の取得
  useEffect(() => {
    fetchEntities()
  }, [])

  const fetchEntities = async () => {
    try {
      const response = await fetch("/api/entities")
      if (!response.ok) throw new Error("エンティティの取得に失敗しました")
      const data = await response.json()
      setEntities(data)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
      setIsLoading(false)
    }
  }

  // 新規エンティティの作成
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("エンティティの作成に失敗しました")
      await fetchEntities()
      setIsCreating(false)
      setFormData({ name: "", type: "COMPANY", parentId: null })
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
    }
  }

  // エンティティの更新
  const handleUpdate = async () => {
    if (!selectedEntity) return
    try {
      const response = await fetch(`/api/entities/${selectedEntity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("エンティティの更新に失敗しました")
      await fetchEntities()
      setIsEditing(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
    }
  }

  // エンティティの削除
  const handleDelete = async () => {
    if (!selectedEntity || !confirm("このエンティティを削除してもよろしいですか？")) return
    try {
      const response = await fetch(`/api/entities/${selectedEntity.id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("エンティティの削除に失敗しました")
      await fetchEntities()
      setSelectedEntity(null)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
    }
  }

  if (isLoading) return <div className="p-8">読み込み中...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">エンティティ管理</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsCreating(true)}
        >
          新規エンティティ追加
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 bg-white rounded-lg shadow border p-4">
          <h2 className="font-bold mb-4">新規エンティティ作成</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">名前</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">タイプ</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as EntityType })}
              >
                <option value="COMPANY">会社</option>
                <option value="SITE">サイト</option>
                <option value="PLANT">プラント</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">親エンティティ</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.parentId || ""}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null })}
              >
                <option value="">なし</option>
                {entities.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setIsCreating(false)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleCreate}
              >
                作成
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* エンティティ一覧 */}
        <div className="md:col-span-1 bg-white rounded-lg shadow border p-4">
          <h2 className="font-bold mb-4">エンティティ一覧</h2>
          <div className="space-y-2">
            {entities.map((entity) => (
              <div
                key={entity.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedEntity?.id === entity.id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedEntity(entity)
                  setFormData({
                    name: entity.name,
                    type: entity.type,
                    parentId: entity.parentId,
                  })
                }}
              >
                <div className="font-medium">{entity.name}</div>
                <div className="text-sm text-gray-500">
                  {entity.type === "COMPANY"
                    ? "会社"
                    : entity.type === "SITE"
                    ? "サイト"
                    : "プラント"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* エンティティ詳細 */}
        <div className="md:col-span-2 bg-white rounded-lg shadow border p-4">
          {selectedEntity ? (
            <div>
              <h2 className="font-bold mb-4">エンティティ詳細</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">名前</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={isEditing ? formData.name : selectedEntity.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">タイプ</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={isEditing ? formData.type : selectedEntity.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as EntityType })
                    }
                    disabled={!isEditing}
                  >
                    <option value="COMPANY">会社</option>
                    <option value="SITE">サイト</option>
                    <option value="PLANT">プラント</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">親エンティティ</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={isEditing ? formData.parentId || "" : selectedEntity.parentId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, parentId: e.target.value || null })
                    }
                    disabled={!isEditing}
                  >
                    <option value="">なし</option>
                    {entities
                      .filter((e) => e.id !== selectedEntity.id)
                      .map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            name: selectedEntity.name,
                            type: selectedEntity.type,
                            parentId: selectedEntity.parentId,
                          })
                        }}
                      >
                        キャンセル
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={handleUpdate}
                      >
                        保存
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        onClick={() => setIsEditing(true)}
                      >
                        編集
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={handleDelete}
                      >
                        削除
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              エンティティを選択してください
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
