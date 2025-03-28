"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminColorManager } from "@/components/admin-color-manager"
import { AdminMaterialManager } from "@/components/admin-material-manager"
import { AdminPricingManager } from "@/components/admin-pricing-manager"
import { AdminCatalogManager } from "@/components/admin-catalog-manager"
import { AdminLogin } from "@/components/admin-login"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8 max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Please login to access the admin dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminLogin onLogin={handleLogin} />
              </CardContent>
            </Card>
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>

          <Tabs defaultValue="colors">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="catalog">Catalog</TabsTrigger>
            </TabsList>

            <TabsContent value="colors">
              <Card>
                <CardHeader>
                  <CardTitle>Color Management</CardTitle>
                  <CardDescription>Add, edit, or remove colors available for 3D printing</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminColorManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Material Management</CardTitle>
                  <CardDescription>Manage available materials and their compatible colors</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminMaterialManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Management</CardTitle>
                  <CardDescription>Configure base pricing and modifiers for materials and colors</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminPricingManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="catalog">
              <AdminCatalogManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

