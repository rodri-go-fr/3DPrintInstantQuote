"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("3D Printing Quote")
  const [message, setMessage] = useState("")
  const [modelName, setModelName] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [modelError, setModelError] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if we're coming from a model error
    const error = sessionStorage.getItem("modelError")
    const storedModel = sessionStorage.getItem("uploadedModel")
    const storedColor = sessionStorage.getItem("selectedColor")
    const storedMaterial = sessionStorage.getItem("selectedMaterial")

    if (error === "true") {
      setModelError(true)
      setSubject("3D Model Upload Issue")
      let autoMessage = "I'm having trouble uploading my 3D model."

      if (storedModel) {
        setModelName(storedModel)
        autoMessage += `\nModel name: ${storedModel}`
      }

      if (storedColor) {
        setSelectedColor(storedColor)
        autoMessage += `\nPreferred color: ${
          storedColor === "#ffffff" ? "White" : storedColor === "#000000" ? "Black" : storedColor
        }`
      }

      if (storedMaterial) {
        setSelectedMaterial(storedMaterial)
        autoMessage += `\nPreferred material: ${storedMaterial}`
      }

      setMessage(autoMessage)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log({
      name,
      email,
      phone,
      subject,
      message,
      modelName,
      selectedColor,
      selectedMaterial,
    })

    // Show success message
    setSubmitted(true)

    // Clear session storage
    sessionStorage.removeItem("modelError")
  }

  if (submitted) {
    return (
      <div className="container py-12 max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Message Sent!</CardTitle>
            <CardDescription>Thank you for contacting us. We'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <p className="text-center mb-6">We've received your message and will respond within 1-2 business days.</p>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{modelError ? "3D Model Issue" : "Contact Us"}</CardTitle>
            <CardDescription>
              {modelError
                ? "We'll help you with your 3D model upload issue"
                : "Fill out the form below and we'll get back to you as soon as possible"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3D Printing Quote">3D Printing Quote</SelectItem>
                      <SelectItem value="3D Model Upload Issue">3D Model Upload Issue</SelectItem>
                      <SelectItem value="3D Modeling Service">3D Modeling Service</SelectItem>
                      <SelectItem value="Print on Demand">Print on Demand</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {modelError && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preferred Material (if applicable)</Label>
                    <RadioGroup value={selectedMaterial || undefined} onValueChange={setSelectedMaterial}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PLA" id="material-pla" />
                          <Label htmlFor="material-pla">PLA (Decorative)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PETG" id="material-petg" />
                          <Label htmlFor="material-petg">PETG (Outdoor Use)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ABS" id="material-abs" />
                          <Label htmlFor="material-abs">ABS (Commercial Grade)</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Color (if applicable)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="color-white"
                          checked={selectedColor === "#ffffff"}
                          onCheckedChange={() => setSelectedColor("#ffffff")}
                        />
                        <Label htmlFor="color-white" className="flex items-center">
                          <div className="w-4 h-4 rounded-full border mr-2" style={{ backgroundColor: "#ffffff" }} />
                          White
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="color-black"
                          checked={selectedColor === "#000000"}
                          onCheckedChange={() => setSelectedColor("#000000")}
                        />
                        <Label htmlFor="color-black" className="flex items-center">
                          <div className="w-4 h-4 rounded-full border mr-2" style={{ backgroundColor: "#000000" }} />
                          Black
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="color-red"
                          checked={selectedColor === "#ff0000"}
                          onCheckedChange={() => setSelectedColor("#ff0000")}
                        />
                        <Label htmlFor="color-red" className="flex items-center">
                          <div className="w-4 h-4 rounded-full border mr-2" style={{ backgroundColor: "#ff0000" }} />
                          Red
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="color-blue"
                          checked={selectedColor === "#0000ff"}
                          onCheckedChange={() => setSelectedColor("#0000ff")}
                        />
                        <Label htmlFor="color-blue" className="flex items-center">
                          <div className="w-4 h-4 rounded-full border mr-2" style={{ backgroundColor: "#0000ff" }} />
                          Blue
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-link">3D Model Link (optional)</Label>
                    <Input id="model-link" placeholder="Link to your 3D model (Dropbox, Google Drive, etc.)" />
                    <p className="text-xs text-muted-foreground">
                      If your model is too large to upload, you can provide a link to download it.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

