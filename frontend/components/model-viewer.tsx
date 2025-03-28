"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei"
import { Suspense } from "react"
import { Color } from "three"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

interface ModelViewerProps {
  modelPath: string
  color: string
  material: string
}

function Model({ modelPath, color }: { modelPath: string; color: string; onError?: () => void }) {
  const [error, setError] = useState<boolean>(false)
  const modelRef = useRef<THREE.Group>(null)

  // Initialize loadedModel with a default value
  const {
    scene: loadedScene,
    nodes,
    materials,
  } = useGLTF(modelPath) || { scene: null, nodes: undefined, materials: undefined }
  const scene = loadedScene ? loadedScene.clone() : null

  useEffect(() => {
    if (nodes === undefined || materials === undefined) {
      setError(true)
    }
  }, [nodes, materials])

  useEffect(() => {
    if (modelRef.current && !error && scene) {
      // Apply the selected color to all materials in the model
      const clonedScene = modelRef.current

      clonedScene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          // Create a new material to avoid modifying the shared materials
          if (Array.isArray(child.material)) {
            child.material = child.material.map((mat: any) => {
              const newMat = mat.clone()
              newMat.color = new Color(color)
              return newMat
            })
          } else {
            child.material = child.material.clone()
            child.material.color = new Color(color)
          }
        }
      })
    }
  }, [color, modelRef, error, scene])

  if (error || !scene) {
    return null // Return null to let the parent component handle the error
  }

  return <primitive ref={modelRef} object={scene} scale={2} />
}

export function ModelViewer({ modelPath, color, material }: ModelViewerProps) {
  const router = useRouter()
  const [loadError, setLoadError] = useState<boolean>(false)
  const { theme } = useTheme()

  // Handle model loading errors
  const handleModelError = () => {
    setLoadError(true)
  }

  // Redirect to contact form for incompatible models
  const handleContactRedirect = () => {
    // Store information about the failed model in session storage
    sessionStorage.setItem("modelError", "true")
    sessionStorage.setItem("selectedColor", color || "")
    sessionStorage.setItem("selectedMaterial", material || "")

    router.push("/contact")
  }

  if (loadError) {
    return (
      <div className="w-full h-full rounded-md overflow-hidden border bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium mb-2">Unable to Preview Model</h3>
        <p className="text-muted-foreground mb-4">
          We couldn't load your 3D model for preview. This could be due to file format incompatibility or file
          corruption.
        </p>
        <Button onClick={handleContactRedirect}>Contact Support</Button>
      </div>
    )
  }

  return (
    <div className="w-full h-full rounded-md overflow-hidden border bg-muted/20 relative model-viewer-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={[theme === "dark" ? "#1a1a1a" : "#f5f5f5"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Center>
            <Model modelPath={modelPath} color={color} onError={handleModelError} />
          </Center>
          <Environment preset="studio" />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={true} autoRotateSpeed={1} />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded">
        {material} • {color === "#ffffff" ? "White" : color === "#000000" ? "Black" : color}
      </div>
    </div>
  )
}

