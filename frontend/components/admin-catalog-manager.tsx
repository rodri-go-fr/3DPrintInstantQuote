"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, Edit, Save, X, Upload, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for categories
const INITIAL_CATEGORIES = [
  {
    id: "event-planning",
    name: "Event Planning",
    description: "Custom 3D printed items for weddings, parties, and corporate events",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "home-decor",
    name: "Home Decor",
    description: "Decorative items to enhance your living space",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "tools-accessories",
    name: "Tools & Accessories",
    description: "Practical tools and accessories for everyday use",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "novelty-items",
    name: "Novelty Items",
    description: "Fun and unique 3D printed creations",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "office-addons",
    name: "Office Add-ons",
    description: "Enhance your workspace with custom 3D printed items",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "tcg-accessories",
    name: "TCG Accessories",
    description: "Custom accessories for trading card games",
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Mock data for products
const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Custom Card Holder",
    category: "tcg-accessories",
    price: 24.99,
    description: "A customizable card holder perfect for trading card games.",
    modelPath: "/assets/3d/duck.glb",
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    colors: ["White", "Black", "Red", "Blue"],
    materials: ["PLA", "PETG"],
    features: [
      "Holds up to 60 sleeved cards",
      "Customizable design",
      "Durable construction",
      "Available in multiple colors",
    ],
    reviews: [
      {
        id: "r1",
        name: "John D.",
        rating: 5,
        date: "2023-10-15",
        comment: "Perfect fit for my cards. The quality is excellent and it looks great on my shelf.",
      },
      {
        id: "r2",
        name: "Sarah M.",
        rating: 4,
        date: "2023-09-22",
        comment: "Good quality and design. Would be perfect if it had a locking mechanism.",
      },
    ],
    relatedProducts: ["2", "3"],
  },
  {
    id: "2",
    name: "Desk Organizer",
    category: "office-addons",
    price: 29.99,
    description: "Keep your desk tidy with this customizable organizer.",
    modelPath: "/assets/3d/duck.glb",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    colors: ["White", "Black", "Blue", "Red"],
    materials: ["PLA", "PETG"],
    features: ["Multiple compartments", "Customizable layout", "Space-saving design", "Durable construction"],
    reviews: [
      {
        id: "r1",
        name: "Emily R.",
        rating: 4,
        date: "2023-10-28",
        comment: "Perfect for organizing my small office supplies. Sturdy and well-designed.",
      },
    ],
    relatedProducts: ["1", "3"],
  },
  {
    id: "3",
    name: "Decorative Vase",
    category: "home-decor",
    price: 39.99,
    description: "A beautiful decorative vase for your home.",
    modelPath: "/assets/3d/duck.glb",
    images: ["/placeholder.svg?height=300&width=300"],
    colors: ["White", "Black", "Gold", "Silver"],
    materials: ["PLA", "PETG"],
    features: ["Unique geometric design", "Watertight construction", "Elegant finish", "Multiple size options"],
    reviews: [],
    relatedProducts: ["2", "1"],
  },
]

export function AdminCatalogManager() {
  const [activeTab, setActiveTab] = useState("categories")
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [activeProductTab, setActiveProductTab] = useState<string | null>(null)

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "/placeholder.svg?height=300&width=500",
  })

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    modelPath: "/assets/3d/duck.glb",
    images: ["/placeholder.svg?height=300&width=300"],
    colors: ["White", "Black"],
    materials: ["PLA"],
    features: [""],
    reviews: [],
    relatedProducts: [],
  })

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  })

  // Category Management
  const handleCategoryChange = (field: string, value: string) => {
    setNewCategory({ ...newCategory, [field]: value })
  }

  const handleEditCategory = (id: string) => {
    setEditingCategoryId(id)
  }

  const handleSaveCategory = (id: string) => {
    setEditingCategoryId(null)
    // In a real app, you would save to your backend here
  }

  const handleCancelEditCategory = () => {
    setEditingCategoryId(null)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
    // In a real app, you would delete from your backend here
  }

  const handleAddCategory = () => {
    if (!newCategory.name) return

    const id = newCategory.name.toLowerCase().replace(/\s+/g, "-")
    const newCategoryItem = {
      id,
      name: newCategory.name,
      description: newCategory.description,
      image: newCategory.image,
    }

    setCategories([...categories, newCategoryItem])
    setNewCategory({
      name: "",
      description: "",
      image: "/placeholder.svg?height=300&width=500",
    })

    // In a real app, you would save to your backend here
  }

  const handleUpdateCategory = (id: string, field: string, value: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === id) {
          return { ...category, [field]: value }
        }
        return category
      }),
    )
  }

  // Product Management
  const handleProductChange = (field: string, value: any) => {
    setNewProduct({ ...newProduct, [field]: value })
  }

  const handleEditProduct = (id: string) => {
    setEditingProductId(id)
    setActiveProductTab(id)
  }

  const handleSaveProduct = (id: string) => {
    setEditingProductId(null)
    // In a real app, you would save to your backend here
  }

  const handleCancelEditProduct = () => {
    setEditingProductId(null)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
    // In a real app, you would delete from your backend here
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) return

    const id = Date.now().toString()
    const newProductItem = {
      id,
      ...newProduct,
    }

    setProducts([...products, newProductItem])
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      description: "",
      modelPath: "/assets/3d/duck.glb",
      images: ["/placeholder.svg?height=300&width=300"],
      colors: ["White", "Black"],
      materials: ["PLA"],
      features: [""],
      reviews: [],
      relatedProducts: [],
    })

    // In a real app, you would save to your backend here
  }

  const handleUpdateProduct = (id: string, field: string, value: any) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, [field]: value }
        }
        return product
      }),
    )
  }

  const handleUpdateProductArray = (id: string, field: string, value: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const currentArray = product[field] || []
          const valueArray = value.split(",").map((item) => item.trim())
          return { ...product, [field]: valueArray }
        }
        return product
      }),
    )
  }

  // Handle product images
  const handleAddProductImage = (id: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            images: [...product.images, "/placeholder.svg?height=300&width=300"],
          }
        }
        return product
      }),
    )
  }

  const handleUpdateProductImage = (productId: string, index: number, value: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const updatedImages = [...product.images]
          updatedImages[index] = value
          return { ...product, images: updatedImages }
        }
        return product
      }),
    )
  }

  const handleDeleteProductImage = (productId: string, index: number) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const updatedImages = [...product.images]
          updatedImages.splice(index, 1)
          return { ...product, images: updatedImages }
        }
        return product
      }),
    )
  }

  // Handle product features
  const handleAddProductFeature = (id: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            features: [...product.features, ""],
          }
        }
        return product
      }),
    )
  }

  const handleUpdateProductFeature = (productId: string, index: number, value: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const updatedFeatures = [...product.features]
          updatedFeatures[index] = value
          return { ...product, features: updatedFeatures }
        }
        return product
      }),
    )
  }

  const handleDeleteProductFeature = (productId: string, index: number) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const updatedFeatures = [...product.features]
          updatedFeatures.splice(index, 1)
          return { ...product, features: updatedFeatures }
        }
        return product
      }),
    )
  }

  // Handle product reviews
  const handleAddReview = (productId: string) => {
    if (!newReview.name || !newReview.comment) return

    const review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview.comment,
    }

    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            reviews: [...product.reviews, review],
          }
        }
        return product
      }),
    )

    setNewReview({
      name: "",
      rating: 5,
      comment: "",
    })
  }

  const handleDeleteReview = (productId: string, reviewId: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            reviews: product.reviews.filter((review) => review.id !== reviewId),
          }
        }
        return product
      }),
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>Create a new product category for your catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input
                      id="category-name"
                      value={newCategory.name}
                      onChange={(e) => handleCategoryChange("name", e.target.value)}
                      placeholder="e.g. Home Decor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-image">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="category-image"
                        value={newCategory.image}
                        onChange={(e) => handleCategoryChange("image", e.target.value)}
                        placeholder="URL to category image"
                      />
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-description">Description</Label>
                  <Textarea
                    id="category-description"
                    value={newCategory.description}
                    onChange={(e) => handleCategoryChange("description", e.target.value)}
                    placeholder="Describe this category"
                    rows={2}
                  />
                </div>
                <Button onClick={handleAddCategory} className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Categories</CardTitle>
              <CardDescription>Edit or remove existing product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="h-10 w-16 rounded overflow-hidden bg-muted">
                          <img
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingCategoryId === category.id ? (
                          <Input
                            value={category.name}
                            onChange={(e) => handleUpdateCategory(category.id, "name", e.target.value)}
                          />
                        ) : (
                          category.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editingCategoryId === category.id ? (
                          <Textarea
                            value={category.description}
                            onChange={(e) => handleUpdateCategory(category.id, "description", e.target.value)}
                            rows={2}
                          />
                        ) : (
                          <div className="max-w-md truncate">{category.description}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingCategoryId === category.id ? (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleSaveCategory(category.id)}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancelEditCategory}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEditCategory(category.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Create a new product for your catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) => handleProductChange("name", e.target.value)}
                      placeholder="e.g. Custom Card Holder"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => handleProductChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price ($)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => handleProductChange("price", Number.parseFloat(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-model">3D Model Path</Label>
                    <div className="flex gap-2">
                      <Input
                        id="product-model"
                        value={newProduct.modelPath}
                        onChange={(e) => handleProductChange("modelPath", e.target.value)}
                        placeholder="Path to 3D model file"
                      />
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    value={newProduct.description}
                    onChange={(e) => handleProductChange("description", e.target.value)}
                    placeholder="Describe this product"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-colors">Available Colors (comma separated)</Label>
                    <Input
                      id="product-colors"
                      value={newProduct.colors.join(", ")}
                      onChange={(e) =>
                        handleProductChange(
                          "colors",
                          e.target.value.split(",").map((c) => c.trim()),
                        )
                      }
                      placeholder="White, Black, Red, Blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-materials">Available Materials (comma separated)</Label>
                    <Input
                      id="product-materials"
                      value={newProduct.materials.join(", ")}
                      onChange={(e) =>
                        handleProductChange(
                          "materials",
                          e.target.value.split(",").map((m) => m.trim()),
                        )
                      }
                      placeholder="PLA, PETG, ABS"
                    />
                  </div>
                </div>

                <Button onClick={handleAddProduct} className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>Edit or remove existing products</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible value={activeProductTab} onValueChange={setActiveProductTab}>
                {products.map((product) => (
                  <AccordionItem key={product.id} value={product.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4 text-left">
                        <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ${product.price.toFixed(2)} •{" "}
                            {categories.find((c) => c.id === product.category)?.name || product.category}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 pb-2">
                        <Tabs defaultValue="details">
                          <TabsList className="mb-4">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="images">Images</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                          </TabsList>

                          <TabsContent value="details" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`edit-name-${product.id}`}>Product Name</Label>
                                <Input
                                  id={`edit-name-${product.id}`}
                                  value={product.name}
                                  onChange={(e) => handleUpdateProduct(product.id, "name", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edit-category-${product.id}`}>Category</Label>
                                <Select
                                  value={product.category}
                                  onValueChange={(value) => handleUpdateProduct(product.id, "category", value)}
                                >
                                  <SelectTrigger id={`edit-category-${product.id}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`edit-price-${product.id}`}>Price ($)</Label>
                                <Input
                                  id={`edit-price-${product.id}`}
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={product.price}
                                  onChange={(e) =>
                                    handleUpdateProduct(product.id, "price", Number.parseFloat(e.target.value))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edit-model-${product.id}`}>3D Model Path</Label>
                                <Input
                                  id={`edit-model-${product.id}`}
                                  value={product.modelPath}
                                  onChange={(e) => handleUpdateProduct(product.id, "modelPath", e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`edit-desc-${product.id}`}>Description</Label>
                              <Textarea
                                id={`edit-desc-${product.id}`}
                                value={product.description}
                                onChange={(e) => handleUpdateProduct(product.id, "description", e.target.value)}
                                rows={2}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`edit-colors-${product.id}`}>Available Colors</Label>
                                <Input
                                  id={`edit-colors-${product.id}`}
                                  value={product.colors.join(", ")}
                                  onChange={(e) => handleUpdateProductArray(product.id, "colors", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edit-materials-${product.id}`}>Available Materials</Label>
                                <Input
                                  id={`edit-materials-${product.id}`}
                                  value={product.materials.join(", ")}
                                  onChange={(e) => handleUpdateProductArray(product.id, "materials", e.target.value)}
                                />
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="images" className="space-y-4">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium">Product Images</h3>
                                <Button size="sm" variant="outline" onClick={() => handleAddProductImage(product.id)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Image
                                </Button>
                              </div>

                              {product.images.map((image, index) => (
                                <div key={index} className="flex items-center gap-4">
                                  <div className="h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                                    <img
                                      src={image || "/placeholder.svg"}
                                      alt={`${product.name} - Image ${index + 1}`}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <Input
                                    value={image}
                                    onChange={(e) => handleUpdateProductImage(product.id, index, e.target.value)}
                                    placeholder="Image URL"
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteProductImage(product.id, index)}
                                    disabled={product.images.length <= 1}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="features" className="space-y-4">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium">Product Features</h3>
                                <Button size="sm" variant="outline" onClick={() => handleAddProductFeature(product.id)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Feature
                                </Button>
                              </div>

                              {product.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4">
                                  <Input
                                    value={feature}
                                    onChange={(e) => handleUpdateProductFeature(product.id, index, e.target.value)}
                                    placeholder="Feature description"
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteProductFeature(product.id, index)}
                                    disabled={product.features.length <= 1}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="reviews" className="space-y-4">
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium">Product Reviews</h3>

                              <div className="space-y-4 border rounded-md p-4">
                                <h4 className="text-sm font-medium">Add New Review</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`review-name-${product.id}`}>Reviewer Name</Label>
                                    <Input
                                      id={`review-name-${product.id}`}
                                      value={newReview.name}
                                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                      placeholder="e.g. John D."
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`review-rating-${product.id}`}>Rating (1-5)</Label>
                                    <Select
                                      value={newReview.rating.toString()}
                                      onValueChange={(value) =>
                                        setNewReview({ ...newReview, rating: Number.parseInt(value) })
                                      }
                                    >
                                      <SelectTrigger id={`review-rating-${product.id}`}>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">1 Star</SelectItem>
                                        <SelectItem value="2">2 Stars</SelectItem>
                                        <SelectItem value="3">3 Stars</SelectItem>
                                        <SelectItem value="4">4 Stars</SelectItem>
                                        <SelectItem value="5">5 Stars</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`review-comment-${product.id}`}>Review Comment</Label>
                                  <Textarea
                                    id={`review-comment-${product.id}`}
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    placeholder="Write the review comment here"
                                    rows={3}
                                  />
                                </div>
                                <Button onClick={() => handleAddReview(product.id)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Review
                                </Button>
                              </div>

                              {product.reviews.length === 0 ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                  No reviews yet for this product.
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {product.reviews.map((review) => (
                                    <div key={review.id} className="border rounded-md p-4">
                                      <div className="flex justify-between mb-2">
                                        <div className="font-medium">{review.name}</div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleDeleteReview(product.id, review.id)}
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                          {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                              key={i}
                                              className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                            />
                                          ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(review.date).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-sm">{review.comment}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 pb-4">
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Product
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

