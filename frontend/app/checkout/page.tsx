"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Truck, Home, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [shippingCost, setShippingCost] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    notes: "",
  })

  useEffect(() => {
    setIsClient(true)
    // Get cart items from session storage
    const storedCart = sessionStorage.getItem("cart")
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCartItems(parsedCart)

      // Calculate totals
      const calculatedSubtotal = parsedCart.reduce((sum: number, item: any) => sum + item.price, 0)
      setSubtotal(calculatedSubtotal)
      setTotal(calculatedSubtotal)
    } else {
      // Redirect to cart if empty
      router.push("/cart")
    }
  }, [router])

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value)

    // Update shipping cost based on delivery method
    if (value === "shipping") {
      setShippingCost(15) // Example shipping cost
      setTotal(subtotal + 15)
    } else {
      setShippingCost(0)
      setTotal(subtotal)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    // For demo purposes, we'll simulate sending an email

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear cart after successful order
      sessionStorage.removeItem("cart")

      // Show success message
      setOrderPlaced(true)

      // In a real app, you would redirect to a success page
      // router.push("/order-confirmation")
    } catch (error) {
      console.error("Error placing order:", error)
    }
  }

  if (!isClient) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Order Placed!</CardTitle>
                  <CardDescription>Thank you for your order</CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <p className="mb-4">
                    We've received your order and will be in touch shortly via email at{" "}
                    <strong>{formData.email}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {deliveryMethod === "pickup"
                      ? "We'll contact you when your order is ready for pickup in Ottawa."
                      : "We'll send you tracking information once your order ships."}
                  </p>
                  <Button onClick={() => router.push("/")} className="w-full">
                    Return to Home
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <Link href="/cart" className="text-primary hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmitOrder}>
                <Card className="mb-6 shadow-md">
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>We'll use this information to contact you about your order</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 shadow-md">
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Delivery Method</CardTitle>
                    <CardDescription>Choose how you'd like to receive your order</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <RadioGroup value={deliveryMethod} onValueChange={handleDeliveryMethodChange} className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="pickup" className="flex items-center gap-2 text-base font-medium">
                            <Home className="h-4 w-4 text-muted-foreground" />
                            Local Pickup (Ottawa)
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Pick up your order at our Ottawa location. We'll contact you when it's ready.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="shipping" id="shipping" className="mt-1" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="shipping" className="flex items-center gap-2 text-base font-medium">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            Standard Shipping
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Delivery in 5-7 business days. Shipping cost: $15.00
                          </p>
                        </div>
                      </div>
                    </RadioGroup>

                    {deliveryMethod === "shipping" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required={deliveryMethod === "shipping"}
                              autoComplete="street-address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required={deliveryMethod === "shipping"}
                              autoComplete="address-level2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required={deliveryMethod === "shipping"}
                              autoComplete="postal-code"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="province">Province</Label>
                            <Input
                              id="province"
                              name="province"
                              value={formData.province}
                              onChange={handleInputChange}
                              required={deliveryMethod === "shipping"}
                              autoComplete="address-level1"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mb-6 shadow-md">
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Any special instructions or notes for your order</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requirements or instructions for your order"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 button-hover-effect">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Place Order
                </Button>
              </form>
            </div>

            <div>
              <Card className="shadow-md sticky top-20">
                <CardHeader className="bg-muted/50">
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="max-h-80 overflow-y-auto pr-2">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 mb-4">
                          <div className="h-12 w-12 bg-muted rounded-md flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.modelName}</p>
                            <div className="text-xs text-muted-foreground">
                              <p>Material: {item.selectedMaterial}</p>
                              <p>
                                {item.isMultiColor
                                  ? "Multi-Color"
                                  : item.selectedSpecialFilament
                                    ? `Special: ${item.selectedSpecialFilament}`
                                    : `Color: ${item.selectedColor}`}
                              </p>
                              <p>Quality: {item.selectedQuality}</p>
                              <p>Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      {deliveryMethod === "shipping" && (
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>${shippingCost.toFixed(2)}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

