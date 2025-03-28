"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface QualityOption {
  id: string
  name: string
  description: string
  layerHeight: string
  priceModifier: number
}

interface QualitySelectorProps {
  onSelect: (quality: string) => void
  selectedQuality: string
}

// In a real app, this would come from your backend API
const QUALITY_OPTIONS: QualityOption[] = [
  {
    id: "draft",
    name: "Draft",
    description: "Faster printing with visible layer lines. Good for prototypes and non-visible parts.",
    layerHeight: "0.3mm",
    priceModifier: -5,
  },
  {
    id: "standard",
    name: "Standard",
    description: "Balanced quality and print time. Suitable for most applications.",
    layerHeight: "0.2mm",
    priceModifier: 0,
  },
  {
    id: "high",
    name: "High Quality",
    description: "Finer details with less visible layer lines. Recommended for display pieces.",
    layerHeight: "0.12mm",
    priceModifier: 10,
  },
  {
    id: "ultra",
    name: "Ultra Fine",
    description: "Maximum detail resolution with minimal layer lines. Best for intricate models.",
    layerHeight: "0.08mm",
    priceModifier: 15,
  },
]

export function QualitySelector({ onSelect, selectedQuality }: QualitySelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedQuality} onValueChange={onSelect} className="space-y-3">
        {QUALITY_OPTIONS.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem value={option.id} id={`quality-${option.id}`} className="peer sr-only" />
            <Label
              htmlFor={`quality-${option.id}`}
              className="flex items-start justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{option.name}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Layer Height: {option.layerHeight}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </div>
              <div className="text-sm font-medium ml-4">
                {option.priceModifier === 0 ? (
                  "No additional cost"
                ) : option.priceModifier > 0 ? (
                  <span className="text-primary">+${option.priceModifier.toFixed(2)}</span>
                ) : (
                  <span className="text-green-600 dark:text-green-400">
                    -${Math.abs(option.priceModifier).toFixed(2)}
                  </span>
                )}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

