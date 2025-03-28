"use client"

import { useState, useEffect } from "react"
import { getMaterials, updateMaterials } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash, Edit, Save, X, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MaterialItem {
  id: string
  name: string
  description: string
  priceModifier: number
  availableColors: string[] // hex codes
}

interface ColorItem {
  id: string
  name: string
  hex: string
}

// In a real app, this would come from your backend API
const INITIAL_MATERIALS: MaterialItem[] = [
  {
    id: "PLA",
    name: "PLA (Decorative)",
    description: "Standard material for decorative prints. Good detail, limited durability.",
    priceModifier: 0,
    availableColors: ["#ffffff", "#000000", "#ff0000", "#0000ff", "#00ff00", "#ffff00", "#ff9900", "#800080"],
  },
  {
    id: "PETG",
    name: "PETG (Outdoor Use)",
    description: "Weather-resistant material for outdoor applications. Good strength and UV resistance.",
    priceModifier: 15,
    availableColors: ["#ffffff", "#000000", "#ff0000", "#0000ff", "#00ff00", "#ffff00"],
  },
  {
    id: "ABS",
    name: "ABS (Commercial Grade)",
    description: "Durable, impact-resistant material for structural components and commercial applications.",
    priceModifier: 25,
    availableColors: ["#ffffff", "#000000", "#ff0000", "#0000ff"],
  },
]

// In a real app, this would come from your backend API
const AVAILABLE_COLORS: ColorItem[] = [
  { id: "white", name: "White", hex: "#ffffff" },
  { id: "black", name: "Black", hex: "#000000" },
  { id: "red", name: "Red", hex: "#ff0000" },
  { id: "blue", name: "Blue", hex: "#0000ff" },
  { id: "green", name: "Green", hex: "#00ff00" },
  { id: "yellow", name: "Yellow", hex: "#ffff00" },
  { id: "orange", name: "Orange", hex: "#ff9900" },
  { id: "purple", name: "Purple", hex: "#800080" },
]

export function AdminMaterialManager() {
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newMaterial, setNewMaterial] = useState<Partial<MaterialItem>>({
    name: "",
    description: "",
    priceModifier: 0,
    availableColors: [],
  })

  const handleEdit = (id: string) => {
    setEditingId(id)
    setExpandedId(id)
  }

  const handleSave = async (id: string) => {
    try {
      // Get current materials data
      const currentData = await getMaterials();
      
      // Find the material to update
      const updatedMaterials = currentData.materials.map((material: any) => {
        if (material.id === id) {
          // Find the material in our local state
          const updatedMaterial = materials.find(m => m.id === id);
          if (!updatedMaterial) return material;
          
          // Update the material properties
          return {
            ...material,
            name: updatedMaterial.name,
            description: updatedMaterial.description,
            priceModifier: updatedMaterial.priceModifier,
            // Keep other properties that might exist in the backend
            base_cost_per_gram: material.base_cost_per_gram,
            hourly_rate: material.hourly_rate,
            properties: material.properties,
            colors: material.colors,
            // Update available colors based on our local state
            availableColors: updatedMaterial.availableColors
          };
        }
        return material;
      });
      
      // Update the materials in the backend
      const result = await updateMaterials({
        ...currentData,
        materials: updatedMaterials
      });
      
      if (result.success) {
        alert("Material updated successfully!");
        setEditingId(null);
      } else {
        alert(`Failed to update material: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating material:", error);
      alert("Failed to update material. Please try again.");
    }
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleDelete = async (id: string) => {
    try {
      // Get current materials data
      const currentData = await getMaterials();
      
      // Filter out the material to delete
      const updatedMaterials = currentData.materials.filter((material: any) => material.id !== id);
      
      // Update the materials in the backend
      const result = await updateMaterials({
        ...currentData,
        materials: updatedMaterials
      });
      
      if (result.success) {
        // Update local state
        setMaterials(materials.filter((material) => material.id !== id));
        alert("Material deleted successfully!");
      } else {
        alert(`Failed to delete material: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      alert("Failed to delete material. Please try again.");
    }
  }

  const handleChange = (id: string, field: keyof MaterialItem, value: string | number | string[]) => {
    setMaterials(
      materials.map((material) => {
        if (material.id === id) {
          return { ...material, [field]: value }
        }
        return material
      }),
    )
  }

  const handleNewMaterialChange = (field: keyof MaterialItem, value: string | number | string[]) => {
    setNewMaterial({ ...newMaterial, [field]: value })
  }

  const handleAddMaterial = async () => {
    if (!newMaterial.name) return

    try {
      // Generate ID from name
      const id = newMaterial.name.split("(")[0].trim().toUpperCase();
      
      // Create new material item
      const newMaterialItem: MaterialItem = {
        id,
        name: newMaterial.name,
        description: newMaterial.description || "",
        priceModifier: newMaterial.priceModifier || 0,
        availableColors: newMaterial.availableColors || [],
      };
      
      // Get current materials data
      const currentData = await getMaterials();
      
      // Add the new material
      const updatedMaterials = [
        ...currentData.materials,
        {
          id,
          name: newMaterial.name,
          description: newMaterial.description || "",
          base_cost_per_gram: 0.05, // Default value
          hourly_rate: 2.0, // Default value
          properties: ["New material"],
          colors: AVAILABLE_COLORS.filter(color => 
            (newMaterial.availableColors || []).includes(color.hex)
          ).map(color => ({
            id: color.id,
            name: color.name,
            hex: color.hex,
            addon_price: 0.0 // Default value
          }))
        }
      ];
      
      // Update the materials in the backend
      const result = await updateMaterials({
        ...currentData,
        materials: updatedMaterials
      });
      
      if (result.success) {
        // Update local state
        setMaterials([...materials, newMaterialItem]);
        setNewMaterial({ name: "", description: "", priceModifier: 0, availableColors: [] });
        alert("Material added successfully!");
      } else {
        alert(`Failed to add material: ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding material:", error);
      alert("Failed to add material. Please try again.");
    }
  }

  const toggleColorForMaterial = (materialId: string, colorHex: string) => {
    setMaterials(
      materials.map((material) => {
        if (material.id === materialId) {
          const availableColors = [...material.availableColors]
          if (availableColors.includes(colorHex)) {
            return {
              ...material,
              availableColors: availableColors.filter((c) => c !== colorHex),
            }
          } else {
            return {
              ...material,
              availableColors: [...availableColors, colorHex],
            }
          }
        }
        return material
      }),
    )
  }

  const toggleColorForNewMaterial = (colorHex: string) => {
    const availableColors = newMaterial.availableColors || []
    if (availableColors.includes(colorHex)) {
      handleNewMaterialChange(
        "availableColors",
        availableColors.filter((c) => c !== colorHex),
      )
    } else {
      handleNewMaterialChange("availableColors", [...availableColors, colorHex])
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }
  
  // Load materials from the backend
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await getMaterials();
        
        if (data && data.materials) {
          // Map backend materials to our component's format
          const mappedMaterials = data.materials.map((material: any) => ({
            id: material.id,
            name: material.name,
            description: material.description || "",
            priceModifier: material.priceModifier || 0,
            availableColors: material.colors ? material.colors.map((color: any) => color.hex) : []
          }));
          
          setMaterials(mappedMaterials);
        }
      } catch (error) {
        console.error("Error loading materials:", error);
        alert("Failed to load materials from the backend.");
      }
    };
    
    loadMaterials();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New Material</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-material-name">Material Name</Label>
              <Input
                id="new-material-name"
                value={newMaterial.name}
                onChange={(e) => handleNewMaterialChange("name", e.target.value)}
                placeholder="e.g. TPU (Flexible)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-material-price">Price Modifier ($)</Label>
              <Input
                id="new-material-price"
                type="number"
                min="0"
                step="0.01"
                value={newMaterial.priceModifier}
                onChange={(e) => handleNewMaterialChange("priceModifier", Number.parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-material-desc">Description</Label>
            <Textarea
              id="new-material-desc"
              value={newMaterial.description}
              onChange={(e) => handleNewMaterialChange("description", e.target.value)}
              placeholder="Describe the material properties and use cases"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Available Colors</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {AVAILABLE_COLORS.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`new-color-${color.id}`}
                    checked={(newMaterial.availableColors || []).includes(color.hex)}
                    onCheckedChange={() => toggleColorForNewMaterial(color.hex)}
                  />
                  <Label htmlFor={`new-color-${color.id}`} className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.hex }} />
                    <span>{color.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleAddMaterial} className="flex gap-2 items-center w-full md:w-auto">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Manage Materials</h3>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Price Modifier</TableHead>
                <TableHead>Available Colors</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <Collapsible
                  key={material.id}
                  open={expandedId === material.id}
                  onOpenChange={() => toggleExpand(material.id)}
                >
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">{material.name}</div>
                    </TableCell>
                    <TableCell>${material.priceModifier.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {material.availableColors.slice(0, 5).map((colorHex) => (
                          <div
                            key={colorHex}
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: colorHex }}
                          />
                        ))}
                        {material.availableColors.length > 5 && (
                          <div className="text-xs text-muted-foreground">
                            +{material.availableColors.length - 5} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <CollapsibleTrigger asChild>
                          <Button size="sm" variant="ghost">
                            {expandedId === material.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(material.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(material.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent>
                    <TableRow>
                      <TableCell colSpan={4} className="p-0">
                        <div className="p-4 bg-muted/50">
                          {editingId === material.id ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-name-${material.id}`}>Material Name</Label>
                                  <Input
                                    id={`edit-name-${material.id}`}
                                    value={material.name}
                                    onChange={(e) => handleChange(material.id, "name", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-price-${material.id}`}>Price Modifier ($)</Label>
                                  <Input
                                    id={`edit-price-${material.id}`}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={material.priceModifier}
                                    onChange={(e) =>
                                      handleChange(material.id, "priceModifier", Number.parseFloat(e.target.value))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edit-desc-${material.id}`}>Description</Label>
                                <Textarea
                                  id={`edit-desc-${material.id}`}
                                  value={material.description}
                                  onChange={(e) => handleChange(material.id, "description", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Available Colors</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                  {AVAILABLE_COLORS.map((color) => (
                                    <div key={color.id} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-color-${material.id}-${color.id}`}
                                        checked={material.availableColors.includes(color.hex)}
                                        onCheckedChange={() => toggleColorForMaterial(material.id, color.hex)}
                                      />
                                      <Label
                                        htmlFor={`edit-color-${material.id}-${color.id}`}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <div
                                          className="w-4 h-4 rounded-full border"
                                          style={{ backgroundColor: color.hex }}
                                        />
                                        <span>{color.name}</span>
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button size="sm" onClick={() => handleSave(material.id)}>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancel}>
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-sm">{material.description}</p>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Available Colors:</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {material.availableColors.map((colorHex) => {
                                    const colorInfo = AVAILABLE_COLORS.find((c) => c.hex === colorHex)
                                    return (
                                      <div key={colorHex} className="flex items-center gap-2">
                                        <div
                                          className="w-4 h-4 rounded-full border"
                                          style={{ backgroundColor: colorHex }}
                                        />
                                        <span className="text-sm">{colorInfo?.name || colorHex}</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
