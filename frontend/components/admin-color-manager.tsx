"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash, Edit, Save, X } from "lucide-react"

interface ColorItem {
  id: string
  name: string
  hex: string
  priceModifier: number
}

// In a real app, this would come from your backend API
const INITIAL_COLORS: ColorItem[] = [
  { id: "white", name: "White", hex: "#ffffff", priceModifier: 0 },
  { id: "black", name: "Black", hex: "#000000", priceModifier: 0 },
  { id: "red", name: "Red", hex: "#ff0000", priceModifier: 5 },
  { id: "blue", name: "Blue", hex: "#0000ff", priceModifier: 5 },
  { id: "green", name: "Green", hex: "#00ff00", priceModifier: 5 },
  { id: "yellow", name: "Yellow", hex: "#ffff00", priceModifier: 5 },
  { id: "orange", name: "Orange", hex: "#ff9900", priceModifier: 8 },
  { id: "purple", name: "Purple", hex: "#800080", priceModifier: 8 },
]

export function AdminColorManager() {
  const [colors, setColors] = useState<ColorItem[]>(INITIAL_COLORS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newColor, setNewColor] = useState<Partial<ColorItem>>({
    name: "",
    hex: "#000000",
    priceModifier: 0,
  })

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    setEditingId(null)
    // In a real app, you would save to your backend here
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setColors(colors.filter((color) => color.id !== id))
    // In a real app, you would delete from your backend here
  }

  const handleChange = (id: string, field: keyof ColorItem, value: string | number) => {
    setColors(
      colors.map((color) => {
        if (color.id === id) {
          return { ...color, [field]: value }
        }
        return color
      }),
    )
  }

  const handleNewColorChange = (field: keyof ColorItem, value: string | number) => {
    setNewColor({ ...newColor, [field]: value })
  }

  const handleAddColor = () => {
    if (!newColor.name || !newColor.hex) return

    const id = newColor.name.toLowerCase().replace(/\s+/g, "-")
    const newColorItem: ColorItem = {
      id,
      name: newColor.name,
      hex: newColor.hex,
      priceModifier: newColor.priceModifier || 0,
    }

    setColors([...colors, newColorItem])
    setNewColor({ name: "", hex: "#000000", priceModifier: 0 })

    // In a real app, you would save to your backend here
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New Color</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="new-color-name">Color Name</Label>
            <Input
              id="new-color-name"
              value={newColor.name}
              onChange={(e) => handleNewColorChange("name", e.target.value)}
              placeholder="e.g. Crimson Red"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-color-hex">Color Hex</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="new-color-hex"
                type="color"
                value={newColor.hex}
                onChange={(e) => handleNewColorChange("hex", e.target.value)}
                className="w-12 h-9 p-1"
              />
              <Input
                value={newColor.hex}
                onChange={(e) => handleNewColorChange("hex", e.target.value)}
                placeholder="#RRGGBB"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-color-price">Price Modifier ($)</Label>
            <Input
              id="new-color-price"
              type="number"
              min="0"
              step="0.01"
              value={newColor.priceModifier}
              onChange={(e) => handleNewColorChange("priceModifier", Number.parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <Button onClick={handleAddColor} className="flex gap-2 items-center">
            <Plus className="h-4 w-4" />
            Add Color
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Manage Colors</h3>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Color</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Hex Code</TableHead>
                <TableHead>Price Modifier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colors.map((color) => (
                <TableRow key={color.id}>
                  <TableCell>
                    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color.hex }} />
                  </TableCell>
                  <TableCell>
                    {editingId === color.id ? (
                      <Input value={color.name} onChange={(e) => handleChange(color.id, "name", e.target.value)} />
                    ) : (
                      color.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === color.id ? (
                      <div className="flex gap-2 items-center">
                        <Input
                          type="color"
                          value={color.hex}
                          onChange={(e) => handleChange(color.id, "hex", e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input value={color.hex} onChange={(e) => handleChange(color.id, "hex", e.target.value)} />
                      </div>
                    ) : (
                      color.hex
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === color.id ? (
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={color.priceModifier}
                        onChange={(e) => handleChange(color.id, "priceModifier", Number.parseFloat(e.target.value))}
                      />
                    ) : (
                      `$${color.priceModifier.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === color.id ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleSave(color.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(color.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(color.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

