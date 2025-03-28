"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileUploader } from "@/components/file-uploader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any previous model data when visiting the upload page
    sessionStorage.removeItem("uploadedModel")
    sessionStorage.removeItem("selectedColor")
    sessionStorage.removeItem("selectedMaterial")
  }, [])

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Your 3D Model</h1>
          <p className="text-muted-foreground">Upload your 3D model file to get started with your custom quote</p>
        </div>

        <FileUploader />

        <div className="mt-8 text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">Supported File Formats:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>.STL - Standard Tessellation Language (most common 3D printing format)</li>
            <li>.OBJ - Wavefront Object File (includes texture coordinates)</li>
            <li>.3MF - 3D Manufacturing Format (newer format with additional metadata)</li>
            <li>.STEP - Standard for Exchange of Product Data (CAD format)</li>
          </ul>
          <div className="mt-4 text-center">
            <p className="mb-2">Having trouble uploading your model?</p>
            <Link href="/contact" className="text-primary hover:underline">
              Contact us for assistance instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

