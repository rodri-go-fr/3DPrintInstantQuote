"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

interface ServiceContactFormProps {
  service?: string
}

export function ServiceContactForm({ service }: ServiceContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState(service ? `${service} Inquiry` : "General Inquiry")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log({
      name,
      email,
      phone,
      subject,
      message,
    })

    // Show success message
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-muted/50 rounded-lg p-6 text-center">
        <div className="rounded-full bg-primary/10 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
          <Send className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="mb-4">Thank you for contacting us. We'll get back to you shortly.</p>
        <p className="text-sm text-muted-foreground">We typically respond within 1-2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
              <SelectItem value={`${service || "General"} Inquiry`}>{service || "General"} Inquiry</SelectItem>
              <SelectItem value="Custom Project">Custom Project</SelectItem>
              <SelectItem value="Quote Request">Quote Request</SelectItem>
              <SelectItem value="Technical Question">Technical Question</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Please describe your project or question in detail"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  )
}

