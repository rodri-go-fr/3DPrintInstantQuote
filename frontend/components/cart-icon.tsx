"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function CartIcon() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedCart = sessionStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }

    // Listen for cart updates
    const handleStorageChange = () => {
      const updatedCart = sessionStorage.getItem("cart")
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart))
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for cart updates within the same window
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative button-hover-effect">
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">{cartItems.length}</Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <div className="p-4">
          <h3 className="font-medium mb-2">Your Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 bg-muted rounded flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{item.modelName || item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × ${((item.price || 0) / (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <div className="font-medium">${(item.price || 0).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-medium">${cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}</span>
              </div>
            </>
          )}
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              View Cart
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
