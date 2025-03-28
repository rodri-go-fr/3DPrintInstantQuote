import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FileUploader } from "@/components/file-uploader"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Professional 3D Printing Quotes in Seconds
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Upload your 3D model, customize materials and colors, and get an instant quote for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link href="/upload">
                      Start Your Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <Link href="/catalog">Browse Catalog</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-8">
                <div className="mx-auto max-w-sm space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold">Get Started</h2>
                    <p className="text-muted-foreground">Upload your 3D model to begin</p>
                  </div>
                  <FileUploader />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Professional 3D solutions tailored to your specific needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M17 17H8a5 5 0 0 1 0-10H9"></path>
                    <path d="M13 7h4a5 5 0 0 1 0 10h-1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">3D Printing Service</h3>
                <p className="text-muted-foreground">
                  High-quality 3D printing with a variety of materials and finishes. Perfect for prototypes, custom
                  parts, and small production runs.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/3d-printing">Learn More</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Print on Demand</h3>
                <p className="text-muted-foreground">
                  Scalable production services for businesses. We handle inventory, printing, and fulfillment so you can
                  focus on design and sales.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/print-on-demand">Learn More</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    <path d="M20 20 7.5 7.5"></path>
                    <path d="M12 3v4"></path>
                    <path d="M8 7h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">3D Modeling & Design</h3>
                <p className="text-muted-foreground">
                  Professional 3D modeling services to bring your ideas to life. From concept to printable file, our
                  designers create exactly what you need.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/3d-modeling">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

