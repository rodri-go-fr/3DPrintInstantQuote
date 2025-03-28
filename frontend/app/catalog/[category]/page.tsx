"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for categories
const categories = {
  "event-planning": {
    name: "Event Planning",
    description: "Custom 3D printed items for weddings, parties, and corporate events",
  },
  "home-decor": {
    name: "Home Decor",
    description: "Decorative items to enhance your living space",
  },
  "tools-accessories": {
    name: "Tools & Accessories",
    description: "Practical tools and accessories for everyday use",
  },
  "novelty-items": {
    name: "Novelty Items",
    description: "Fun and unique 3D printed creations",
  },
  "office-addons": {
    name: "Office Add-ons",
    description: "Enhance your workspace with custom 3D printed items",
  },
  "tcg-accessories": {
    name: "TCG Accessories",
    description: "Custom accessories for trading card games",
  },
}

// Mock data for products
const allProducts = [
  {
    id: "1",
    name: "Custom Card Holder",
    category: "tcg-accessories",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Red", "Blue"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "2",
    name: "Dice Tower",
    category: "tcg-accessories",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Green", "Purple"],
    materials: ["PLA", "PETG", "ABS"],
  },
  {
    id: "3",
    name: "Desk Organizer",
    category: "office-addons",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Blue", "Red"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "4",
    name: "Phone Stand",
    category: "office-addons",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Red", "Blue", "Green"],
    materials: ["PLA", "PETG", "ABS"],
  },
  {
    id: "5",
    name: "Decorative Vase",
    category: "home-decor",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Gold", "Silver"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "6",
    name: "Wall Planter",
    category: "home-decor",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Green", "Blue"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "7",
    name: "Custom Cake Topper",
    category: "event-planning",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Gold", "Silver", "Pink"],
    materials: ["PLA"],
  },
  {
    id: "8",
    name: "Place Card Holders",
    category: "event-planning",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Gold", "Silver", "Black"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "9",
    name: "Bottle Opener",
    category: "tools-accessories",
    price: 9.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Red", "Blue"],
    materials: ["PLA", "PETG", "ABS"],
  },
  {
    id: "10",
    name: "Cable Organizer",
    category: "tools-accessories",
    price: 7.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Clear"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "11",
    name: "Miniature Figurine",
    category: "novelty-items",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Red", "Blue", "Green", "Yellow"],
    materials: ["PLA", "PETG"],
  },
  {
    id: "12",
    name: "Desk Toy",
    category: "novelty-items",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["White", "Black", "Red", "Blue"],
    materials: ["PLA"],
  },
]

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.category as string
  const category = categories[categoryId as keyof typeof categories]

  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const [products, setProducts] = useState([])

  useEffect(() => {
    // Filter products by category
    let filtered = allProducts.filter((product) => product.category === categoryId)

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMaterials.some((material) => product.materials.includes(material)),
      )
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => selectedColors.some((color) => product.colors.includes(color)))
    }

    // Apply price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply sorting
    if (sortOption === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setProducts(filtered)
  }, [categoryId, searchQuery, sortOption, priceRange, selectedMaterials, selectedColors])

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="mb-6">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/catalog">Back to Catalog</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <Link href="/catalog" className="text-primary hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Materials</h3>
                <div className="space-y-2">
                  {["PLA", "PETG", "ABS"].map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={() => toggleMaterial(material)}
                      />
                      <Label htmlFor={`material-${material}`}>{material}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Colors</h3>
                <div className="space-y-2">
                  {["White", "Black", "Red", "Blue", "Green", "Gold", "Silver"].map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <Label htmlFor={`color-${color}`}>{color}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>

                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filters - Mobile */}
              {showFilters && (
                <div className="lg:hidden mb-6 p-4 border rounded-md space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Materials</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["PLA", "PETG", "ABS"].map((material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-material-${material}`}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() => toggleMaterial(material)}
                          />
                          <Label htmlFor={`mobile-material-${material}`}>{material}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Colors</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["White", "Black", "Red", "Blue", "Green", "Gold", "Silver"].map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => toggleColor(color)}
                          />
                          <Label htmlFor={`mobile-color-${color}`}>{color}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedMaterials([])
                      setSelectedColors([])
                      setPriceRange([0, 100])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} href={`/catalog/product/${product.id}`}>
                      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                        <div className="h-48 w-full overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{product.name}</h3>
                          <p className="text-primary font-bold mb-2">${product.price.toFixed(2)}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.colors.slice(0, 3).map((color) => (
                              <span key={color} className="text-xs bg-muted px-2 py-1 rounded">
                                {color}
                              </span>
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-xs bg-muted px-2 py-1 rounded">
                                +{product.colors.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Available in: {product.materials.join(", ")}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

