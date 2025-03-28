"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelViewer } from "@/components/model-viewer"
import { ColorSelector } from "@/components/color-selector"
import { MaterialSelector } from "@/components/material-selector"
import { QualitySelector } from "@/components/quality-selector"
import { ArrowLeft, ArrowRight, Palette, Layers, Settings } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"

export default function CustomizePage() {
  const router = useRouter()
  const [modelName, setModelName] = useState<string | null>(null)
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSpecialFilament, setSelectedSpecialFilament] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string>("standard")
  const [activeTab, setActiveTab] = useState("color")
  const [isMultiColor, setIsMultiColor] = useState(false)
  const [multiColorDetails, setMultiColorDetails] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if we have a model in session storage
    const storedModel = sessionStorage.getItem("uploadedModel")
    const storedModelUrl = sessionStorage.getItem("uploadedModelUrl")

    if (!storedModel) {
      router.push("/upload")
      return
    }

    setModelName(storedModel)
    if (storedModelUrl) {
      setModelUrl(storedModelUrl)
    }
  }, [router])

  const handleColorSelect = (color: string, isSpecial?: boolean, specialId?: string) => {
    if (isSpecial) {
      setSelectedSpecialFilament(specialId || null)
      setSelectedColor(null)
    } else {
      setSelectedColor(color)
      setSelectedSpecialFilament(null)
    }
  }

  const handleMultiColorChange = (isMulti: boolean, details?: string) => {
    setIsMultiColor(isMulti)
    if (details) {
      setMultiColorDetails(details)
    }

    // If multi-color is selected, we'll use a default color for preview
    if (isMulti && !selectedColor) {
      setSelectedColor("#cccccc") // Default gray for multi-color preview
    }
  }

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material)
  }

  const handleQualitySelect = (quality: string) => {
    setSelectedQuality(quality)
  }

  const handleNext = () => {
    if (activeTab === "color" && (selectedColor || selectedSpecialFilament || isMultiColor)) {
      setActiveTab("material")
    } else if (activeTab === "material" && selectedMaterial) {
      // Store selections in session storage for the quote page
      sessionStorage.setItem("selectedColor", selectedColor || "")
      sessionStorage.setItem("selectedSpecialFilament", selectedSpecialFilament || "")
      sessionStorage.setItem("selectedMaterial", selectedMaterial)
      sessionStorage.setItem("selectedQuality", selectedQuality)
      sessionStorage.setItem("isMultiColor", isMultiColor.toString())
      sessionStorage.setItem("multiColorDetails", multiColorDetails)
      router.push("/quote")
    }
  }

  const handleBack = () => {
    if (activeTab === "material") {
      setActiveTab("color")
    } else {
      router.push("/upload")
    }
  }

  if (!isClient || !modelName) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <Link href="/upload" className="text-primary hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <div>
              <Card className="mb-6 overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted/50">
                  <CardTitle>{modelName}</CardTitle>
                  <CardDescription>
                    Preview of your customized model
                    {isMultiColor && " (Preview shows base color only)"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="aspect-square p-0">
                  <ModelViewer
                    modelPath={modelUrl || "/assets/3d/duck.glb"}
                    color={selectedColor || "#cccccc"}
                    material={selectedMaterial || "PLA"}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted/50">
                  <CardTitle>Customize Your Print</CardTitle>
                  <CardDescription>Select options for your 3D print</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="color" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span>Color</span>
                      </TabsTrigger>
                      <TabsTrigger value="material" className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        <span>Material & Quality</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="color" className="pt-4">
                      <div className="selection-container">
                        <h3 className="selection-title flex items-center gap-2">
                          <Palette className="h-5 w-5 text-primary" />
                          Color Selection
                        </h3>
                        <ColorSelector
                          onSelect={handleColorSelect}
                          selectedColor={selectedColor}
                          selectedSpecialFilament={selectedSpecialFilament}
                          onMultiColorChange={handleMultiColorChange}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="material" className="pt-4">
                      <div className="selection-container">
                        <h3 className="selection-title flex items-center gap-2">
                          <Layers className="h-5 w-5 text-primary" />
                          Material Selection
                        </h3>
                        <MaterialSelector
                          onSelect={handleMaterialSelect}
                          selectedMaterial={selectedMaterial}
                          selectedColor={selectedColor}
                          isMultiColor={isMultiColor}
                        />
                      </div>

                      <div className="selection-container">
                        <h3 className="selection-title flex items-center gap-2">
                          <Settings className="h-5 w-5 text-primary" />
                          Print Quality
                        </h3>
                        <QualitySelector onSelect={handleQualitySelect} selectedQuality={selectedQuality} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="button-hover-effect">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      (activeTab === "color" && !selectedColor && !selectedSpecialFilament && !isMultiColor) ||
                      (activeTab === "material" && !selectedMaterial)
                    }
                    className="bg-primary hover:bg-primary/90 button-hover-effect"
                  >
                    {activeTab === "color" ? "Next" : "Get Quote"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

