"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingBag, Mail } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className="hover:bg-accent/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-accent/10 border-r border-accent/20">
              <div className="mt-8 flex flex-col gap-4">
                <Link 
                  href="/" 
                  className="text-lg font-medium hover:text-accent-foreground transition-colors" 
                  onClick={closeSheet}
                >
                  Home
                </Link>
                <Link 
                  href="/order" 
                  className="text-lg font-medium hover:text-accent-foreground transition-colors" 
                  onClick={closeSheet}
                >
                  Place Order
                </Link>
                <Link 
                  href="/inquiry" 
                  className="text-lg font-medium hover:text-accent-foreground transition-colors" 
                  onClick={closeSheet}
                >
                  Send Inquiry
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvBzn_TrFJyFS7PM-4lUIMrj7iHqg7mLMg&s"
              alt="The Uncommon Room"
              className="h-8"
            />
            <span className="hidden sm:inline-block text-lg font-semibold text-primary">
              The Uncommon Room
            </span>
          </Link>
        </div>

        {/* <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link 
            href="/order" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Place Order
          </Link>
          <Link 
            href="/inquiry" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Send Inquiry
          </Link>
        </nav> */}

        <div className="flex items-center gap-2">
          {/* <Link href="/order">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Order"
              className="hover:bg-accent/20 hover:text-accent-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </Link> */}
          <Link href="/inquiry">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Inquiry"
              className="hover:bg-accent/20 hover:text-accent-foreground"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/order">
            <Button 
              variant="default" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground ml-2 hidden sm:inline-flex"
            >
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}