import { cn } from "@/lib/utils"
import { CheckIcon, XIcon } from "lucide-react"

type Step = {
  id: string
  label: string
  description?: string
}

type StepIndicatorProps = {
  steps: Step[]
  currentStep: number
  status?: "draft" | "pending" | "approved" | "rejected"
}

export function StepIndicator({ steps, currentStep, status }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          const isRejected = status === "rejected" && index === currentStep - 1

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isActive && "border-primary bg-primary text-white",
                  isCompleted && !isRejected && "border-status-approved bg-status-approved text-white",
                  isRejected && "border-status-rejected bg-status-rejected text-white",
                  !isActive && !isCompleted && "border-gray-300 bg-white text-gray-500",
                )}
              >
                {isCompleted && !isRejected ? (
                  <CheckIcon className="h-5 w-5" />
                ) : isRejected ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={cn(
                    "text-sm font-medium",
                    isActive && "text-primary",
                    isCompleted && !isRejected && "text-status-approved",
                    isRejected && "text-status-rejected",
                    !isActive && !isCompleted && "text-gray-500",
                  )}
                >
                  {step.label}
                </div>
                {step.description && <div className="text-xs text-gray-500">{step.description}</div>}
              </div>

              {/* 接続線 */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-10 h-0.5 w-full",
                    currentStep > index && !isRejected && "bg-status-approved",
                    isRejected && index === currentStep - 1 && "bg-status-rejected",
                    !(currentStep > index) && "bg-gray-300",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
