"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"

// Mock data for categories
const categories = [
  {
    id: "event-planning",
    name: "Event Planning",
    description: "Custom 3D printed items for weddings, parties, and corporate events",
    image: "/placeholder.svg?height=300&width=500",
    count: 12,
  },
  {
    id: "home-decor",
    name: "Home Decor",
    description: "Decorative items to enhance your living space",
    image: "/placeholder.svg?height=300&width=500",
    count: 24,
  },
  {
    id: "tools-accessories",
    name: "Tools & Accessories",
    description: "Practical tools and accessories for everyday use",
    image: "/placeholder.svg?height=300&width=500",
    count: 18,
  },
  {
    id: "novelty-items",
    name: "Novelty Items",
    description: "Fun and unique 3D printed creations",
    image: "/placeholder.svg?height=300&width=500",
    count: 15,
  },
  {
    id: "office-addons",
    name: "Office Add-ons",
    description: "Enhance your workspace with custom 3D printed items",
    image: "/placeholder.svg?height=300&width=500",
    count: 9,
  },
  {
    id: "tcg-accessories",
    name: "TCG Accessories",
    description: "Custom accessories for trading card games",
    image: "/placeholder.svg?height=300&width=500",
    count: 21,
  },
]

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Catalog</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our collection of 3D printed products or upload your own design for a custom quote.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8 md:mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Link key={category.id} href={`/catalog/${category.id}`}>
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${category.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{category.count} items</span>
                        <Button variant="outline" size="sm">
                          Browse
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="mb-4 text-muted-foreground">Don't see what you're looking for?</p>
              <Button asChild>
                <Link href="/upload">Upload Your Own Design</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

