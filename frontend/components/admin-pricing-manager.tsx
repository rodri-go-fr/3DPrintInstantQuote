"use client"

import { useState, useEffect } from "react"
import { getMaterials, updateMaterials } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save, Plus, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PricingSettings {
  basePrice: number
  volumeMultiplier: number
  markupPercentage: number
  rushOrderFee: number
}

interface QualityLevel {
  id: string
  name: string
  layerHeight: string
  description: string
  priceModifier: number
}

export function AdminPricingManager() {
  const [settings, setSettings] = useState<PricingSettings>({
    basePrice: 25,
    volumeMultiplier: 0.15,
    markupPercentage: 30,
    rushOrderFee: 15,
  })

  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([
    {
      id: "draft",
      name: "Draft",
      layerHeight: "0.3mm",
      description: "Faster printing with visible layer lines. Good for prototypes and non-visible parts.",
      priceModifier: -5,
    },
    {
      id: "standard",
      name: "Standard",
      layerHeight: "0.2mm",
      description: "Balanced quality and print time. Suitable for most applications.",
      priceModifier: 0,
    },
    {
      id: "high",
      name: "High Quality",
      layerHeight: "0.12mm",
      description: "Finer details with less visible layer lines. Recommended for display pieces.",
      priceModifier: 10,
    },
    {
      id: "ultra",
      name: "Ultra Fine",
      layerHeight: "0.08mm",
      description: "Maximum detail resolution with minimal layer lines. Best for intricate models.",
      priceModifier: 15,
    },
  ])

  const [newQualityLevel, setNewQualityLevel] = useState<QualityLevel>({
    id: "",
    name: "",
    layerHeight: "",
    description: "",
    priceModifier: 0,
  })

  const handleChange = (field: keyof PricingSettings, value: number) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleQualityChange = (index: number, field: keyof QualityLevel, value: string | number) => {
    const updatedLevels = [...qualityLevels]
    updatedLevels[index] = { ...updatedLevels[index], [field]: value }
    setQualityLevels(updatedLevels)
  }

  const handleNewQualityChange = (field: keyof QualityLevel, value: string | number) => {
    setNewQualityLevel({ ...newQualityLevel, [field]: value })
  }

  const handleAddQualityLevel = () => {
    if (!newQualityLevel.name || !newQualityLevel.id) return

    setQualityLevels([...qualityLevels, newQualityLevel])
    setNewQualityLevel({
      id: "",
      name: "",
      layerHeight: "",
      description: "",
      priceModifier: 0,
    })
  }

  const handleDeleteQualityLevel = (index: number) => {
    const updatedLevels = [...qualityLevels]
    updatedLevels.splice(index, 1)
    setQualityLevels(updatedLevels)
  }

  // Load existing settings from the backend
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const materialsData = await getMaterials();
        
        // Update quality levels if available
        if (materialsData.global_settings) {
          // You might need to map the backend data to your local state format
          // This is a simplified example
          setSettings({
            basePrice: materialsData.global_settings.minimum_price || 25,
            volumeMultiplier: 0.15, // Adjust based on your backend data structure
            markupPercentage: 30, // Adjust based on your backend data structure
            rushOrderFee: 15, // Adjust based on your backend data structure
          });
        }
      } catch (error) {
        console.error("Error loading pricing settings:", error);
        alert("Failed to load pricing settings from the backend.");
      }
    };
    
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      // First, get the current materials data to preserve existing materials
      const currentData = await getMaterials();
      
      // Prepare the data in the format expected by the backend
      const materialsData = {
        materials: currentData.materials || [], // Preserve existing materials
        global_settings: {
          // Preserve any existing settings not managed by this component
          ...currentData.global_settings,
          // Update the settings managed by this component
          minimum_price: settings.basePrice,
          support_material_multiplier: currentData.global_settings?.support_material_multiplier || 1.5,
          default_fill_density: currentData.global_settings?.default_fill_density || 20,
          volume_multiplier: settings.volumeMultiplier,
          markup_percentage: settings.markupPercentage,
          rush_order_fee: settings.rushOrderFee,
          quality_levels: qualityLevels.map(level => ({
            id: level.id,
            name: level.name,
            layer_height: level.layerHeight,
            description: level.description,
            price_modifier: level.priceModifier
          }))
        }
      };
      
      // Send the data to the backend
      const result = await updateMaterials(materialsData);
      
      if (result.success) {
        alert("Pricing settings saved successfully!");
      } else {
        alert(`Failed to save pricing settings: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving pricing settings:", error);
      alert("Failed to save pricing settings to the backend.");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base Pricing</CardTitle>
          <CardDescription>Configure the base pricing parameters for all 3D prints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base-price">Base Price ($)</Label>
              <Input
                id="base-price"
                type="number"
                min="0"
                step="0.01"
                value={settings.basePrice}
                onChange={(e) => handleChange("basePrice", Number.parseFloat(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                The starting price for any 3D print, regardless of size or complexity
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume-multiplier">Volume Multiplier ($ per cm³)</Label>
              <Input
                id="volume-multiplier"
                type="number"
                min="0"
                step="0.01"
                value={settings.volumeMultiplier}
                onChange={(e) => handleChange("volumeMultiplier", Number.parseFloat(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">The price per cubic centimeter of material used</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="markup-percentage">Markup Percentage (%)</Label>
              <Input
                id="markup-percentage"
                type="number"
                min="0"
                max="100"
                step="1"
                value={settings.markupPercentage}
                onChange={(e) => handleChange("markupPercentage", Number.parseFloat(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">The percentage markup applied to the total cost</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rush-order-fee">Rush Order Fee ($)</Label>
              <Input
                id="rush-order-fee"
                type="number"
                min="0"
                step="0.01"
                value={settings.rushOrderFee}
                onChange={(e) => handleChange("rushOrderFee", Number.parseFloat(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Additional fee for expedited orders</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quality Settings</CardTitle>
          <CardDescription>Configure print quality levels and their price modifiers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Layer Height</TableHead>
                  <TableHead>Price Modifier</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualityLevels.map((level, index) => (
                  <TableRow key={level.id}>
                    <TableCell>
                      <Input
                        value={level.id}
                        onChange={(e) => handleQualityChange(index, "id", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={level.name}
                        onChange={(e) => handleQualityChange(index, "name", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={level.layerHeight}
                        onChange={(e) => handleQualityChange(index, "layerHeight", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={level.priceModifier}
                        onChange={(e) => handleQualityChange(index, "priceModifier", Number(e.target.value))}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQualityLevel(index)}
                        disabled={qualityLevels.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="space-y-4 border rounded-md p-4">
              <h3 className="text-sm font-medium">Add New Quality Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-quality-id">ID</Label>
                  <Input
                    id="new-quality-id"
                    value={newQualityLevel.id}
                    onChange={(e) => handleNewQualityChange("id", e.target.value)}
                    placeholder="e.g. super-fine"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-quality-name">Name</Label>
                  <Input
                    id="new-quality-name"
                    value={newQualityLevel.name}
                    onChange={(e) => handleNewQualityChange("name", e.target.value)}
                    placeholder="e.g. Super Fine"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-quality-layer">Layer Height</Label>
                  <Input
                    id="new-quality-layer"
                    value={newQualityLevel.layerHeight}
                    onChange={(e) => handleNewQualityChange("layerHeight", e.target.value)}
                    placeholder="e.g. 0.05mm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-quality-price">Price Modifier ($)</Label>
                  <Input
                    id="new-quality-price"
                    type="number"
                    value={newQualityLevel.priceModifier}
                    onChange={(e) => handleNewQualityChange("priceModifier", Number(e.target.value))}
                    placeholder="e.g. 20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-quality-desc">Description</Label>
                <Input
                  id="new-quality-desc"
                  value={newQualityLevel.description}
                  onChange={(e) => handleNewQualityChange("description", e.target.value)}
                  placeholder="Describe this quality level"
                />
              </div>
              <Button onClick={handleAddQualityLevel}>
                <Plus className="h-4 w-4 mr-2" />
                Add Quality Level
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Formula Preview</CardTitle>
          <CardDescription>See how your pricing settings affect the final quote</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md font-mono text-sm">
            <p>Base Price = max($${settings.basePrice.toFixed(2)}, Prusa Cost)</p>
            <p>× (1 + {settings.markupPercentage}% Markup)</p>
            <p>+ Material Price Modifier</p>
            <p>+ Color Price Modifier</p>
            <p>+ Quality Price Modifier</p>
            <p>= Unit Price</p>
          </div>

          <div className="p-4 bg-muted/50 rounded-md">
            <h4 className="font-medium mb-2">Example Calculation:</h4>
            <p className="text-sm">
              For a model with Prusa cost of $8.00, standard PLA (no modifier), red color (+$5), and high quality (+$10):
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p>Base Price = max($${settings.basePrice.toFixed(2)}, $8.00) = $8.00</p>
              <p>× ${(1 + settings.markupPercentage / 100).toFixed(2)} (markup) = $${(8 * (1 + settings.markupPercentage / 100)).toFixed(2)}</p>
              <p>+ $0.00 (standard PLA)</p>
              <p>+ $5.00 (red color)</p>
              <p>+ $10.00 (high quality)</p>
              <p className="font-medium">
                = $${(8 * (1 + settings.markupPercentage / 100) + 5 + 10).toFixed(2)} (unit price)
              </p>
            </div>
          </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Pricing Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
