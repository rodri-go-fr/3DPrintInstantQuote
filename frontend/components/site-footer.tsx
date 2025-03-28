import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-8 bg-background">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <span className="text-primary">3D</span>
            <span>PrintQuote</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link
            href="/services/3d-printing"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            3D Printing
          </Link>
          <Link
            href="/services/print-on-demand"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Print on Demand
          </Link>
          <Link
            href="/services/3d-modeling"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            3D Modeling
          </Link>
          <Link href="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Catalog
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} 3D PrintQuote. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

