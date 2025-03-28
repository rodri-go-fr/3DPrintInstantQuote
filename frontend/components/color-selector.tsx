"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface ColorOption {
  id: string
  name: string
  hex: string
  priceModifier: number
}

interface SpecialFilamentOption {
  id: string
  name: string
  description: string
  preview: string
  priceModifier: number
}

interface ColorSelectorProps {
  onSelect: (color: string, isSpecial?: boolean, specialId?: string) => void
  selectedColor: string | null
  selectedSpecialFilament: string | null
  onMultiColorChange?: (isMultiColor: boolean, details?: string) => void
}

// In a real app, this would come from your backend API
const MOCK_COLORS: ColorOption[] = [
  { id: "white", name: "White", hex: "#ffffff", priceModifier: 0 },
  { id: "black", name: "Black", hex: "#000000", priceModifier: 0 },
  { id: "red", name: "Red", hex: "#ff0000", priceModifier: 5 },
  { id: "blue", name: "Blue", hex: "#0000ff", priceModifier: 5 },
  { id: "green", name: "Green", hex: "#00ff00", priceModifier: 5 },
  { id: "yellow", name: "Yellow", hex: "#ffff00", priceModifier: 5 },
  { id: "orange", name: "Orange", hex: "#ff9900", priceModifier: 8 },
  { id: "purple", name: "Purple", hex: "#800080", priceModifier: 8 },
  { id: "pink", name: "Pink", hex: "#ff69b4", priceModifier: 8 },
  { id: "teal", name: "Teal", hex: "#008080", priceModifier: 10 },
  { id: "gold", name: "Gold", hex: "#ffd700", priceModifier: 15 },
  { id: "silver", name: "Silver", hex: "#c0c0c0", priceModifier: 15 },
]

// Special filaments like tri-color
const SPECIAL_FILAMENTS: SpecialFilamentOption[] = [
  {
    id: "rainbow",
    name: "Rainbow PLA",
    description: "Multi-color filament that transitions through the rainbow spectrum",
    preview: "/placeholder.svg?height=100&width=100",
    priceModifier: 12,
  },
  {
    id: "galaxy",
    name: "Galaxy PLA",
    description: "Black base with blue, purple, and white speckles for a cosmic effect",
    preview: "/placeholder.svg?height=100&width=100",
    priceModifier: 15,
  },
  {
    id: "marble",
    name: "Marble PLA",
    description: "White base with black veins for a marble stone appearance",
    preview: "/placeholder.svg?height=100&width=100",
    priceModifier: 12,
  },
  {
    id: "glow",
    name: "Glow-in-Dark",
    description: "Phosphorescent material that glows in the dark after light exposure",
    preview: "/placeholder.svg?height=100&width=100",
    priceModifier: 18,
  },
  {
    id: "silk",
    name: "Silk Metallic",
    description: "Shiny metallic finish with a silky smooth appearance",
    preview: "/placeholder.svg?height=100&width=100",
    priceModifier: 14,
  },
  {
    id: "wood",
    name: "Wood Composite",
    description: "PLA mixed with wood particles for a natural wood-like finish",
    preview: "/placeholder.svg?height=100&width=100",
    priceModifier: 16,
  },
]

export function ColorSelector({
  onSelect,
  selectedColor,
  selectedSpecialFilament,
  onMultiColorChange = () => {},
}: ColorSelectorProps) {
  const [colors, setColors] = useState<ColorOption[]>(MOCK_COLORS)
  const [specialFilaments, setSpecialFilaments] = useState<SpecialFilamentOption[]>(SPECIAL_FILAMENTS)
  const [isMultiColor, setIsMultiColor] = useState(false)
  const [multiColorDetails, setMultiColorDetails] = useState("")
  const [activeTab, setActiveTab] = useState("standard")

  // In a real app, you would fetch colors from your API
  useEffect(() => {
    // Example API call:
    // const fetchColors = async () => {
    //   const response = await fetch('/api/colors')
    //   const data = await response.json()
    //   setColors(data)
    // }
    // fetchColors()
  }, [])

  // Handle multi-color checkbox change
  const handleMultiColorChange = (checked: boolean) => {
    setIsMultiColor(checked)
    onMultiColorChange(checked, multiColorDetails)

    // If turning on multi-color, deselect any selected color
    if (checked && selectedColor) {
      onSelect("", false, "")
    }
  }

  // Handle multi-color details change
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMultiColorDetails(e.target.value)
    onMultiColorChange(isMultiColor, e.target.value)
  }

  // Handle standard color selection
  const handleColorSelect = (color: string) => {
    if (activeTab === "standard") {
      onSelect(color, false, "")
    }
  }

  // Handle special filament selection
  const handleSpecialFilamentSelect = (id: string) => {
    if (activeTab === "special") {
      const filament = specialFilaments.find((f) => f.id === id)
      if (filament) {
        onSelect(filament.name, true, id)
      }
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Clear selection when changing tabs
    if (value === "standard" && selectedSpecialFilament) {
      onSelect("", false, "")
    } else if (value === "special" && selectedColor) {
      onSelect("", false, "")
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        Select a color or special filament for your 3D print. Premium options have additional costs.
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="standard" disabled={isMultiColor}>
            Standard Colors
          </TabsTrigger>
          <TabsTrigger value="special" disabled={isMultiColor}>
            Special Filaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-4">
          <RadioGroup
            value={selectedColor || undefined}
            onValueChange={handleColorSelect}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            disabled={isMultiColor}
          >
            {colors.map((color) => (
              <div key={color.id} className="relative">
                <RadioGroupItem
                  value={color.hex}
                  id={`color-${color.id}`}
                  className="peer sr-only"
                  disabled={isMultiColor}
                />
                <Label
                  htmlFor={`color-${color.id}`}
                  className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${isMultiColor ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 rounded-full mb-2 border flex items-center justify-center"
                    style={{
                      backgroundColor: color.hex,
                      borderColor: color.hex === "#ffffff" ? "#e2e8f0" : color.hex,
                    }}
                  >
                    {selectedColor === color.hex && !isMultiColor && (
                      <Check className={`h-6 w-6 ${color.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                    )}
                  </motion.div>
                  <div className="text-center">
                    <div className="font-medium">{color.name}</div>
                    {color.priceModifier > 0 && (
                      <div className="text-xs text-muted-foreground">+${color.priceModifier.toFixed(2)}</div>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialFilaments.map((filament) => (
              <div key={filament.id} className="relative">
                <input
                  type="radio"
                  id={`filament-${filament.id}`}
                  name="special-filament"
                  className="peer sr-only"
                  checked={selectedSpecialFilament === filament.id}
                  onChange={() => handleSpecialFilamentSelect(filament.id)}
                  disabled={isMultiColor}
                />
                <label
                  htmlFor={`filament-${filament.id}`}
                  className={`flex items-start gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer ${isMultiColor ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={filament.preview || "/placeholder.svg"}
                      alt={filament.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{filament.name}</div>
                      <div className="text-sm font-medium text-primary">+${filament.priceModifier.toFixed(2)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{filament.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="multi-color"
            checked={isMultiColor}
            onCheckedChange={(checked) => handleMultiColorChange(checked as boolean)}
          />
          <Label htmlFor="multi-color" className="font-medium cursor-pointer">
            Multi-Color Print (Custom Quote)
          </Label>
        </div>

        {isMultiColor && (
          <motion.div
            className="space-y-2 pl-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Label htmlFor="multi-color-details">Please describe your multi-color requirements:</Label>
            <Input
              id="multi-color-details"
              placeholder="E.g., Red base with white text on the front"
              value={multiColorDetails}
              onChange={handleDetailsChange}
            />
            <p className="text-xs text-muted-foreground">
              Multi-color prints require special handling and will be quoted individually. Our team will contact you
              with pricing after reviewing your requirements.
            </p>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-medium">Multi-color pricing starts at +$15.00</p>
              <p className="text-xs text-muted-foreground mt-1">
                Final price depends on complexity and number of colors
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

