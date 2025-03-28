"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ModelViewer } from "@/components/model-viewer"
import { ArrowLeft, Download, ShoppingCart, Share2, Plus, Minus, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"

interface QuoteDetails {
  basePrice: number
  colorModifier: number
  materialModifier: number
  multiColorModifier: number
  qualityModifier: number
  total: number
  totalWithQuantity: number
}

interface CartItem {
  modelName: string
  selectedColor: string
  selectedSpecialFilament: string
  selectedMaterial: string
  selectedQuality: string
  isMultiColor: boolean
  multiColorDetails: string
  quantity: number
  isMultiPart: boolean
  price: number
}

// Quality options for reference
const QUALITY_OPTIONS = {
  draft: { name: "Draft", priceModifier: -5 },
  standard: { name: "Standard", priceModifier: 0 },
  high: { name: "High Quality", priceModifier: 10 },
  ultra: { name: "Ultra Fine", priceModifier: 15 },
}

export default function QuotePage() {
  const router = useRouter()
  const [modelName, setModelName] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSpecialFilament, setSelectedSpecialFilament] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string>("standard")
  const [isMultiColor, setIsMultiColor] = useState(false)
  const [multiColorDetails, setMultiColorDetails] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isMultiPart, setIsMultiPart] = useState(false)
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails>({
    basePrice: 0,
    colorModifier: 0,
    materialModifier: 0,
    multiColorModifier: 0,
    qualityModifier: 0,
    total: 0,
    totalWithQuantity: 0,
  })
  const [addedToCart, setAddedToCart] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if we have all the required data in session storage
    const storedModel = sessionStorage.getItem("uploadedModel")
    const storedColor = sessionStorage.getItem("selectedColor")
    const storedSpecialFilament = sessionStorage.getItem("selectedSpecialFilament")
    const storedMaterial = sessionStorage.getItem("selectedMaterial")
    const storedQuality = sessionStorage.getItem("selectedQuality")
    const storedIsMultiColor = sessionStorage.getItem("isMultiColor")
    const storedMultiColorDetails = sessionStorage.getItem("multiColorDetails")

    if (!storedModel || (!storedColor && !storedSpecialFilament && !storedIsMultiColor) || !storedMaterial) {
      router.push("/upload")
      return
    }

    setModelName(storedModel)
    setSelectedColor(storedColor)
    setSelectedSpecialFilament(storedSpecialFilament)
    setSelectedMaterial(storedMaterial)
    setSelectedQuality(storedQuality || "standard")
    setIsMultiColor(storedIsMultiColor === "true")
    setMultiColorDetails(storedMultiColorDetails || "")

    // In a real app, you would fetch the quote from your backend API
    // For demo purposes, we'll calculate a mock quote
    calculateMockQuote(
      storedColor || "#cccccc",
      storedSpecialFilament || "",
      storedMaterial,
      storedQuality || "standard",
      storedIsMultiColor === "true",
      1,
      false,
    )
  }, [router])

  const calculateMockQuote = (
    color: string,
    specialFilament: string,
    material: string,
    quality: string,
    multiColor: boolean,
    qty: number,
    multiPart: boolean,
  ) => {
    // Mock calculation - in a real app, this would come from your backend
    const basePrice = 25.0 // Base price for the model

    // Color price modifiers
    let colorModifier = 0
    const premiumColors = ["#ff9900", "#800080", "#ff69b4", "#008080"]
    const luxuryColors = ["#ffd700", "#c0c0c0"]

    if (!multiColor && !specialFilament) {
      if (luxuryColors.includes(color)) {
        colorModifier = 15
      } else if (premiumColors.includes(color)) {
        colorModifier = 8
      } else if (color !== "#ffffff" && color !== "#000000") {
        colorModifier = 5
      }
    }

    // Special filament modifier
    if (specialFilament) {
      // These would come from your backend in a real app
      const specialFilamentPrices = {
        rainbow: 12,
        galaxy: 15,
        marble: 12,
        glow: 18,
        silk: 14,
        wood: 16,
      }
      colorModifier = specialFilamentPrices[specialFilament as keyof typeof specialFilamentPrices] || 10
    }

    // Multi-color modifier
    const multiColorModifier = multiColor ? 15 : 0

    // Material price modifiers
    let materialModifier = 0
    if (material === "PETG") {
      materialModifier = 15
    } else if (material === "ABS") {
      materialModifier = 25
    }

    // Quality price modifier
    const qualityModifier = QUALITY_OPTIONS[quality as keyof typeof QUALITY_OPTIONS]?.priceModifier || 0

    const total = basePrice + colorModifier + materialModifier + multiColorModifier + qualityModifier

    // Apply quantity discount if applicable
    let totalWithQuantity = total * qty

    // Apply multi-part discount if applicable
    if (multiPart && qty > 1) {
      // 10% discount for multi-part prints
      totalWithQuantity = totalWithQuantity * 0.9
    }

    setQuoteDetails({
      basePrice,
      colorModifier,
      materialModifier,
      multiColorModifier,
      qualityModifier,
      total,
      totalWithQuantity,
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    calculateMockQuote(
      selectedColor || "#cccccc",
      selectedSpecialFilament || "",
      selectedMaterial || "PLA",
      selectedQuality,
      isMultiColor,
      newQuantity,
      isMultiPart,
    )
  }

  const handleMultiPartChange = (checked: boolean) => {
    setIsMultiPart(checked)
    calculateMockQuote(
      selectedColor || "#cccccc",
      selectedSpecialFilament || "",
      selectedMaterial || "PLA",
      selectedQuality,
      isMultiColor,
      quantity,
      checked,
    )
  }

  const addToCart = () => {
    // In a real app, you would add this to a cart in your backend or local storage
    const cartItem: CartItem = {
      modelName: modelName || "Unknown Model",
      selectedColor: selectedColor || "#cccccc",
      selectedSpecialFilament: selectedSpecialFilament || "",
      selectedMaterial: selectedMaterial || "PLA",
      selectedQuality: selectedQuality,
      isMultiColor,
      multiColorDetails,
      quantity,
      isMultiPart,
      price: quoteDetails.totalWithQuantity,
    }

    // For demo purposes, we'll store in session storage
    const existingCart = sessionStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []
    cart.push(cartItem)
    sessionStorage.setItem("cart", JSON.stringify(cart))

    setAddedToCart(true)

    // Dispatch event to update cart icon
    window.dispatchEvent(new Event("cartUpdated"))
  }

  if (!isClient) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  if (!modelName || !selectedMaterial) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <Link href="/customize" className="text-primary hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customization
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <div>
              <Card className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted/50">
                  <CardTitle>Your 3D Print</CardTitle>
                  <CardDescription>
                    {modelName} - Preview of your customized model
                    {isMultiColor && " (Preview shows base color only)"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="aspect-square p-0">
                  <ModelViewer
                    modelPath="/assets/3d/duck.glb"
                    color={selectedColor || "#cccccc"}
                    material={selectedMaterial}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted/50">
                  <CardTitle>Your Quote</CardTitle>
                  <CardDescription>Pricing breakdown for your customized 3D print</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm">Model:</div>
                      <div className="text-sm font-medium">{modelName}</div>

                      <div className="text-sm">Material:</div>
                      <div className="text-sm font-medium">{selectedMaterial}</div>

                      <div className="text-sm">Color:</div>
                      <div className="flex items-center">
                        {isMultiColor ? (
                          <span className="text-sm font-medium">Multi-Color</span>
                        ) : selectedSpecialFilament ? (
                          <span className="text-sm font-medium">
                            Special:{" "}
                            {selectedSpecialFilament === "rainbow"
                              ? "Rainbow PLA"
                              : selectedSpecialFilament === "galaxy"
                                ? "Galaxy PLA"
                                : selectedSpecialFilament === "marble"
                                  ? "Marble PLA"
                                  : selectedSpecialFilament === "glow"
                                    ? "Glow-in-Dark"
                                    : selectedSpecialFilament === "silk"
                                      ? "Silk Metallic"
                                      : selectedSpecialFilament === "wood"
                                        ? "Wood Composite"
                                        : selectedSpecialFilament}
                          </span>
                        ) : (
                          <>
                            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: selectedColor }} />
                            <span className="text-sm font-medium">
                              {selectedColor === "#ffffff"
                                ? "White"
                                : selectedColor === "#000000"
                                  ? "Black"
                                  : selectedColor === "#ff0000"
                                    ? "Red"
                                    : selectedColor === "#0000ff"
                                      ? "Blue"
                                      : selectedColor === "#00ff00"
                                        ? "Green"
                                        : selectedColor === "#ffff00"
                                          ? "Yellow"
                                          : selectedColor === "#ff9900"
                                            ? "Orange"
                                            : selectedColor === "#800080"
                                              ? "Purple"
                                              : selectedColor === "#ff69b4"
                                                ? "Pink"
                                                : selectedColor === "#008080"
                                                  ? "Teal"
                                                  : selectedColor === "#ffd700"
                                                    ? "Gold"
                                                    : selectedColor === "#c0c0c0"
                                                      ? "Silver"
                                                      : selectedColor}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="text-sm">Quality:</div>
                      <div className="text-sm font-medium">
                        {selectedQuality === "draft"
                          ? "Draft"
                          : selectedQuality === "standard"
                            ? "Standard"
                            : selectedQuality === "high"
                              ? "High Quality"
                              : selectedQuality === "ultra"
                                ? "Ultra Fine"
                                : "Standard"}
                      </div>

                      {isMultiColor && multiColorDetails && (
                        <>
                          <div className="text-sm">Multi-Color Details:</div>
                          <div className="text-sm font-medium">{multiColorDetails}</div>
                        </>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Base Price:</span>
                        <span className="text-sm font-medium">${quoteDetails.basePrice.toFixed(2)}</span>
                      </div>

                      {quoteDetails.colorModifier > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">
                            {selectedSpecialFilament ? "Special Filament:" : "Color Premium:"}
                          </span>
                          <span className="text-sm font-medium">+${quoteDetails.colorModifier.toFixed(2)}</span>
                        </div>
                      )}

                      {quoteDetails.materialModifier > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">Material Premium:</span>
                          <span className="text-sm font-medium">+${quoteDetails.materialModifier.toFixed(2)}</span>
                        </div>
                      )}

                      {quoteDetails.multiColorModifier > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">Multi-Color Premium:</span>
                          <span className="text-sm font-medium">+${quoteDetails.multiColorModifier.toFixed(2)}</span>
                        </div>
                      )}

                      {quoteDetails.qualityModifier !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">Quality Setting:</span>
                          <span className="text-sm font-medium">
                            {quoteDetails.qualityModifier > 0
                              ? `+$${quoteDetails.qualityModifier.toFixed(2)}`
                              : `-$${Math.abs(quoteDetails.qualityModifier).toFixed(2)}`}
                          </span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between">
                        <span className="text-base font-medium">Unit Price:</span>
                        <span className="text-base font-medium">${quoteDetails.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <Label htmlFor="quantity">Quantity:</Label>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="multi-part"
                          checked={isMultiPart}
                          onCheckedChange={(checked) => handleMultiPartChange(checked as boolean)}
                          disabled={quantity <= 1}
                        />
                        <Label htmlFor="multi-part" className={`${quantity <= 1 ? "text-muted-foreground" : ""}`}>
                          These are multiple parts of the same item (10% discount)
                        </Label>
                      </div>

                      {isMultiPart && quantity > 1 && (
                        <div className="text-xs text-muted-foreground">
                          Multi-part discount applied: -${(quoteDetails.total * quantity * 0.1).toFixed(2)}
                        </div>
                      )}

                      {isMultiColor && (
                        <Alert className="mt-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            For multi-color prints, our team will contact you to confirm final pricing after reviewing
                            your requirements.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex justify-between pt-2">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-lg font-bold">${quoteDetails.totalWithQuantity.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    onClick={addToCart}
                    disabled={addedToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {addedToCart ? "Added to Cart" : "Add to Cart"}
                  </Button>

                  {addedToCart && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm text-muted-foreground"
                    >
                      Item added to cart.{" "}
                      <Link href="/cart" className="text-primary hover:underline">
                        View Cart
                      </Link>
                    </motion.div>
                  )}

                  <div className="flex gap-4 w-full">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Save Quote
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Quote
                    </Button>
                  </div>
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

