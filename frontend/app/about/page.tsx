import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About 3D PrintQuote</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're passionate about bringing your ideas to life through high-quality 3D printing and design services.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="mb-4">
                  Founded in 2018, 3D PrintQuote began with a simple mission: to make professional 3D printing
                  accessible to everyone. What started as a small workshop with a single printer has grown into a
                  full-service 3D printing and design studio.
                </p>
                <p className="mb-4">
                  Our team of designers, engineers, and printing specialists work together to deliver exceptional
                  quality and service. We believe that 3D printing is revolutionizing how products are designed,
                  prototyped, and manufactured, and we're excited to be part of this transformation.
                </p>
                <p>
                  Today, we serve clients ranging from individual creators to large businesses, helping them bring their
                  ideas to life with precision and care.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=400&width=600" alt="Our Workshop" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every print is inspected to ensure it meets our high standards before
                  it reaches you.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We stay at the forefront of 3D printing technology, constantly exploring new materials, techniques,
                  and applications.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We work closely with you to understand your needs and exceed your
                  expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Alex Johnson</h3>
                <p className="text-sm text-muted-foreground">Founder & Lead Designer</p>
              </div>
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground">3D Printing Specialist</p>
              </div>
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Michael Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Materials Engineer</p>
              </div>
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Emily Taylor</h3>
                <p className="text-sm text-muted-foreground">Customer Success Manager</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
              Whether you need a single prototype or a full production run, we're here to help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/upload">Start a Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

