"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { FileIcon, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // バイト単位
  acceptedFileTypes?: string[]
  className?: string
}

export function FileDropZone({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // デフォルト10MB
  acceptedFileTypes = ["application/pdf"],
  className,
}: FileDropZoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map((file) => {
          const error = file.errors[0]
          if (error.code === "file-too-large") {
            return `${file.file.name}のサイズが大きすぎます (最大${maxSize / 1024 / 1024}MB)`
          }
          if (error.code === "file-invalid-type") {
            return `${file.file.name}は対応していないファイル形式です`
          }
          return `${file.file.name}: ${error.message}`
        })

        toast({
          variant: "destructive",
          title: "ファイルエラー",
          description: errors.join(", "),
        })
        return
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        toast({
          variant: "destructive",
          title: "ファイル数制限",
          description: `アップロードできるファイルは最大${maxFiles}個までです`,
        })
        return
      }

      const newFiles = [...files, ...acceptedFiles]
      setFiles(newFiles)
      onFilesSelected(newFiles)
    },
    [files, maxFiles, maxSize, onFilesSelected, toast],
  )

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
  })

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-primary/5",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-sm font-medium">ファイルをドラッグ＆ドロップするか、クリックして選択してください</p>
          <p className="text-xs text-gray-500">
            {acceptedFileTypes.includes("application/pdf") ? "PDF" : ""}
            ファイル（最大{maxSize / 1024 / 1024}MB）
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">アップロードファイル</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center">
                  <FileIcon className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{(file.size / 1024).toFixed(0)}KB</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
