import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceContactForm } from "@/components/service-contact-form"
import Link from "next/link"

export default function ThreeDModelingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">3D Modeling & Design Services</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional 3D modeling services to bring your ideas to life. From concept to printable file, our
                designers create exactly what you need.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Expert 3D Modeling Services</h2>
                <p className="mb-4">
                  Our team of experienced 3D designers can transform your ideas, sketches, or concepts into
                  high-quality, printable 3D models ready for production.
                </p>
                <p className="mb-6">
                  Whether you need a simple prototype, a complex mechanical part, or a detailed artistic model, we have
                  the expertise to deliver exceptional results.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p>Custom 3D modeling for any application</p>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p>Optimization for 3D printing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p>Revisions until you're completely satisfied</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=400&width=600" alt="3D Modeling Service" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Our 3D Modeling Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Consultation</h3>
                  <p className="text-muted-foreground">
                    We discuss your needs, requirements, and specifications to understand your vision.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Design & Modeling</h3>
                  <p className="text-muted-foreground">
                    Our designers create your 3D model with attention to detail and functionality.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Refinement & Delivery</h3>
                  <p className="text-muted-foreground">
                    We refine the model based on your feedback and deliver the final files ready for printing.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="3D Model Example 1"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">Custom Game Piece</h3>
                  <p className="text-sm text-muted-foreground">Detailed character model for tabletop gaming</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="3D Model Example 2"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">Mechanical Part</h3>
                  <p className="text-sm text-muted-foreground">Precision-engineered replacement component</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="3D Model Example 3"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">Architectural Model</h3>
                  <p className="text-sm text-muted-foreground">Detailed scale model of building concept</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="3D Model Example 4"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">Product Prototype</h3>
                  <p className="text-sm text-muted-foreground">Consumer product design for manufacturing</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="3D Model Example 5"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">Custom Jewelry</h3>
                  <p className="text-sm text-muted-foreground">Intricate design for lost wax casting</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="3D Model Example 6"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">Character Figurine</h3>
                  <p className="text-sm text-muted-foreground">Custom collectible based on client artwork</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Let's Bring Your Ideas to Life</h2>
                <p className="mb-6">
                  Contact us to discuss your 3D modeling project. We'll provide a free consultation and quote based on
                  your specific requirements.
                </p>
                <ServiceContactForm service="3D Modeling" />
              </div>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="3D Modeling Process"
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Our 3D Modeling Expertise</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>Character and figurine design</p>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>Mechanical and functional parts</p>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>Architectural and product visualization</p>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>Jewelry and artistic designs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

