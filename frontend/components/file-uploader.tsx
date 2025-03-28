"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileUp, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function FileUploader() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const allowedFileTypes = [".stl", ".3mf", ".step", ".obj"]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const validateFile = (file: File) => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!allowedFileTypes.includes(extension)) {
      setError(`Invalid file type. Please upload ${allowedFileTypes.join(", ")} files.`)
      return false
    }

    // 50MB max file size
    if (file.size > 50 * 1024 * 1024) {
      setError("File is too large. Maximum size is 50MB.")
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    // In a real app, you would upload the file to your backend
    // For now, we'll just simulate this by storing the file in session storage
    sessionStorage.setItem("uploadedModel", file.name)

    // Redirect to the customization page
    router.push("/customize")
  }

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center space-y-2 px-2 py-8 text-xs">
          <div className="rounded-full bg-primary/10 p-2">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="text-sm font-medium">{file ? file.name : "Drag & drop your 3D model here"}</div>
            <div className="text-xs text-muted-foreground">
              {file
                ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                : `Supported formats: ${allowedFileTypes.join(", ")}`}
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            accept={allowedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <Button className="w-full" size="lg" disabled={!file} onClick={handleSubmit}>
        <FileUp className="mr-2 h-4 w-4" />
        {file ? "Continue to Customization" : "Upload a File"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <Link href="/contact" className="text-primary hover:underline">
          Having trouble? Contact us for assistance
        </Link>
      </div>
    </div>
  )
}

