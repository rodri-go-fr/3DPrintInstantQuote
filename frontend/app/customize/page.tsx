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
import { ArrowLeft, ArrowRight, Palette, Layers, Settings, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"
import { getJobStatus } from "@/services/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function CustomizePage() {
  const router = useRouter()
  const [modelName, setModelName] = useState<string | null>(null)
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSpecialFilament, setSelectedSpecialFilament] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string>("standard")
  const [activeTab, setActiveTab] = useState("color")
  const [isMultiColor, setIsMultiColor] = useState(false)
  const [multiColorDetails, setMultiColorDetails] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)

    const storedModel = sessionStorage.getItem("uploadedModel")
    const storedJobId = sessionStorage.getItem("uploadedModelJobId")

    if (!storedModel || !storedJobId) {
      router.push("/upload")
      return
    }

    setModelName(storedModel)
    setJobId(storedJobId)

    const fetchJobStatus = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const jobStatus = await getJobStatus(storedJobId)
        console.log("Job status:", jobStatus)

        if (jobStatus.status === 'pending' || jobStatus.status === 'processing') {
          const pollingInterval = setInterval(async () => {
            try {
              const updatedJobStatus = await getJobStatus(storedJobId)
              console.log("Updated job status:", updatedJobStatus)

              if (updatedJobStatus.status === 'completed') {
                clearInterval(pollingInterval)
                setModelUrl(`${API_BASE_URL}/api/file/${updatedJobStatus.filename}`)
                setIsLoading(false)
              } else if (updatedJobStatus.status === 'failed') {
                clearInterval(pollingInterval)
                setError(updatedJobStatus.error || 'Failed to process model')
                setIsLoading(false)
              }
            } catch (err) {
              console.error("Error updating job status:", err)
            }
          }, 3000)

          return () => clearInterval(pollingInterval)
        } else if (jobStatus.status === 'failed') {
          setError(jobStatus.error || 'Failed to process model')
        } else {
          if (jobStatus.material_id) {
            setSelectedMaterial(jobStatus.material_id)
          }

          if (jobStatus.color_id) {
            setSelectedColor(`#${jobStatus.color_id}`)
          }

          if (jobStatus.filename) {
            setModelUrl(`${API_BASE_URL}/api/file/${jobStatus.filename}`)
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to get job status')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobStatus()
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

    if (isMulti && !selectedColor) {
      setSelectedColor("#cccccc")
    }
  }

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material)
  }

  const handleQualitySelect = (quality: string) => {
    setSelectedQuality(quality)
  }

  const handleNext = async () => {
    if (activeTab === "color" && (selectedColor || selectedSpecialFilament || isMultiColor)) {
      setActiveTab("material")
    } else if (activeTab === "material" && selectedMaterial) {
      try {
        if (jobId) {
          const jobStatus = await getJobStatus(jobId)
          if (jobStatus.status === 'completed') {
            console.log(`Updating job ${jobId} with quality: ${selectedQuality}`)
          }
        }

        sessionStorage.setItem("selectedColor", selectedColor || "")
        sessionStorage.setItem("selectedSpecialFilament", selectedSpecialFilament || "")
        sessionStorage.setItem("selectedMaterial", selectedMaterial)
        sessionStorage.setItem("selectedQuality", selectedQuality)
        sessionStorage.setItem("isMultiColor", isMultiColor.toString())
        sessionStorage.setItem("multiColorDetails", multiColorDetails)
        sessionStorage.setItem("jobId", jobId || "")
        router.push("/quote")
      } catch (err) {
        console.error("Error updating job:", err)
        router.push("/quote")
      }
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

  if (isLoading) {
    return (
        <div className="container py-12 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
          <h2 className="text-xl font-medium mb-2">Processing Your Model</h2>
          <p className="text-muted-foreground text-center max-w-md">
            We're preparing your 3D model for customization. This may take a few moments depending on the complexity of your model.
          </p>
        </div>
    )
  }

  if (error) {
    return (
        <div className="container py-12">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="flex justify-center">
            <Button onClick={() => router.push("/upload")} variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
          </div>
        </div>
    )
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
                        modelPath={modelUrl || "fallback"}
                        color={selectedColor || "#cccccc"}
                        material={selectedMaterial || "PLA"}
                        jobId={jobId || undefined}
                        isLoading={isLoading}
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