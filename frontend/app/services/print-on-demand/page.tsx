import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceContactForm } from "@/components/service-contact-form"
import Link from "next/link"

export default function PrintOnDemandPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Print on Demand Service</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Scalable production services for businesses. We handle inventory, printing, and fulfillment so you can
                focus on design and sales.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Streamline Your Production Process</h2>
                <p className="mb-4">
                  Our Print on Demand service is designed for businesses and creators who need reliable, scalable
                  production without the hassle of managing inventory or equipment.
                </p>
                <p className="mb-6">
                  We handle everything from printing to packaging and shipping, allowing you to focus on design,
                  marketing, and growing your business.
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
                    <p>No minimum order quantities</p>
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
                    <p>Consistent quality and fast turnaround</p>
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
                    <p>White-label packaging and branding options</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Print on Demand Service"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">How Our Print on Demand Service Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Upload Your Designs</h3>
                  <p className="text-muted-foreground">
                    Provide your 3D model files and specifications for your products.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Set Up Your Store</h3>
                  <p className="text-muted-foreground">
                    Connect your e-commerce platform or use our API for seamless integration.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Sell Your Products</h3>
                  <p className="text-muted-foreground">Focus on marketing and sales while we handle production.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">We Fulfill Orders</h3>
                  <p className="text-muted-foreground">We print, package, and ship directly to your customers.</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Perfect For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                    <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                    <line x1="12" y1="22" x2="12" y2="13"></line>
                    <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">E-commerce Businesses</h3>
                <p className="text-muted-foreground">
                  Expand your product line without inventory risk or upfront investment.
                </p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 21a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9z"></path>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Artists & Designers</h3>
                <p className="text-muted-foreground">
                  Turn your designs into physical products without managing production.
                </p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Small Businesses</h3>
                <p className="text-muted-foreground">
                  Scale your production capacity without investing in equipment or staff.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Ready to Scale Your Business?</h2>
                <p className="mb-6">
                  Contact us to discuss your print on demand needs. We'll create a custom solution that fits your
                  business model and helps you grow.
                </p>
                <ServiceContactForm service="Print on Demand" />
              </div>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Print on Demand Example"
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Our Print on Demand Advantages</h3>
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
                      <p>No inventory costs or risks</p>
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
                      <p>Seamless integration with major e-commerce platforms</p>
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
                      <p>Automated order processing and fulfillment</p>
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
                      <p>Volume discounts for growing businesses</p>
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

