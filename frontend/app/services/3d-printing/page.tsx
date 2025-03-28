import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceContactForm } from "@/components/service-contact-form"
import Link from "next/link"

export default function ThreeDPrintingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">3D Printing Service</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                High-quality 3D printing with a variety of materials and finishes. Perfect for prototypes, custom parts,
                and small production runs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Professional 3D Printing Solutions</h2>
                <p className="mb-4">
                  Our 3D printing service offers high-quality prints using the latest technology and premium materials.
                  Whether you need a prototype, custom part, or small production run, we can help bring your ideas to
                  life.
                </p>
                <p className="mb-6">
                  We offer a wide range of materials including PLA, PETG, ABS, and specialty filaments, with multiple
                  color options to suit your specific needs.
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
                    <p>High-quality prints with precise details</p>
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
                    <p>Multiple material options for different applications</p>
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
                    <p>Fast turnaround times and competitive pricing</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=400&width=600" alt="3D Printing Service" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Our 3D Printing Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Upload Your Model</h3>
                  <p className="text-muted-foreground">
                    Upload your 3D model file in STL, OBJ, 3MF, or STEP format. We'll check it for printability.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Choose Materials & Options</h3>
                  <p className="text-muted-foreground">
                    Select your preferred material, color, and print settings. Get an instant quote for your project.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Receive Your Print</h3>
                  <p className="text-muted-foreground">
                    We'll print your model with precision and care, then ship it directly to your door.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/upload">Start Your 3D Print</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Materials We Offer</h2>
            <Tabs defaultValue="pla">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="pla">PLA</TabsTrigger>
                <TabsTrigger value="petg">PETG</TabsTrigger>
                <TabsTrigger value="abs">ABS</TabsTrigger>
              </TabsList>
              <TabsContent value="pla">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-3">PLA (Polylactic Acid)</h3>
                    <p className="mb-4">
                      PLA is our most popular material for decorative prints. It's biodegradable, easy to print with,
                      and comes in the widest range of colors.
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="font-medium">Best for:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Decorative items</li>
                        <li>Low-stress applications</li>
                        <li>Detailed models</li>
                        <li>Indoor use</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available in 12+ colors including White, Black, Red, Blue, Green, Yellow, Orange, Purple, Pink,
                      Teal, Gold, and Silver.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=500"
                      alt="PLA 3D Printing Material"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="petg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-3">PETG (Polyethylene Terephthalate Glycol)</h3>
                    <p className="mb-4">
                      PETG offers excellent durability and weather resistance, making it perfect for outdoor
                      applications and functional parts.
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="font-medium">Best for:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Outdoor use</li>
                        <li>Water-resistant applications</li>
                        <li>Functional parts</li>
                        <li>UV-resistant items</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available in 7 colors including White, Black, Red, Blue, Green, Yellow, and Orange.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=500"
                      alt="PETG 3D Printing Material"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="abs">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-3">ABS (Acrylonitrile Butadiene Styrene)</h3>
                    <p className="mb-4">
                      ABS is our most durable material, ideal for commercial and industrial applications that require
                      strength and heat resistance.
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="font-medium">Best for:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Structural components</li>
                        <li>High-stress applications</li>
                        <li>Heat-resistant parts</li>
                        <li>Commercial/industrial use</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available in 4 colors including White, Black, Red, and Blue.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=500"
                      alt="ABS 3D Printing Material"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Us About Your Project</h2>
                <p className="mb-6">
                  Have questions about our 3D printing service or need help with a specific project? Fill out the form
                  and we'll get back to you as soon as possible.
                </p>
                <ServiceContactForm service="3D Printing" />
              </div>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="3D Printing Example"
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Why Choose Our 3D Printing Service?</h3>
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
                      <p>Professional-grade equipment for consistent quality</p>
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
                      <p>Expert technicians who review every model before printing</p>
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
                      <p>Competitive pricing with volume discounts available</p>
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
                      <p>Fast turnaround times with rush options available</p>
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

