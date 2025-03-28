"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

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
  const [isOpen, setIsOpen] = useState(false)
  
  // Find the currently selected quality option
  const selectedOption = QUALITY_OPTIONS.find(option => option.id === selectedQuality) || QUALITY_OPTIONS[1];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{selectedOption.name}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Layer Height: {selectedOption.layerHeight}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm text-muted-foreground">
            {selectedOption.priceModifier === 0 ? (
              ""
            ) : selectedOption.priceModifier > 0 ? (
              <span className="text-primary">+${selectedOption.priceModifier.toFixed(2)}</span>
            ) : (
              <span className="text-green-600 dark:text-green-400">
                -${Math.abs(selectedOption.priceModifier).toFixed(2)}
              </span>
            )}
          </span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="mt-2">
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
      </CollapsibleContent>
    </Collapsible>
  )
}
