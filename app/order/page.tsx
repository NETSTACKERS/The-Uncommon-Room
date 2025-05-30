"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { mockProducts } from "@/data/products"
import { useOrderStore } from "@/store/order-store"

export default function OrderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const addOrder = useOrderStore((state) => state.addOrder)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProduct = mockProducts.find((p) => p.id.toString() === productId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !productId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create order object
      const order = {
        id: Date.now().toString(),
        name,
        email,
        productId: Number.parseInt(productId),
        productName: selectedProduct?.name || "",
        quantity,
        price: selectedProduct?.price || 0,
        total: (selectedProduct?.price || 0) * quantity,
        date: new Date().toISOString(),
      }

      // Save to Zustand store (which saves to localStorage)
      addOrder(order)

      toast({
        title: "Order Saved!",
        description: "We'll contact you soon about your order.",
      })

      // Reset form
      setName("")
      setEmail("")
      setProductId("")
      setQuantity(1)

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Place an Order</CardTitle>
          <CardDescription>Fill out the form below to place your order</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select value={productId} onValueChange={setProductId}>
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} - R{product.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                required
              />
            </div>

            {selectedProduct && (
              <div className="py-4 border-t border-b">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>R{selectedProduct.price}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total:</span>
                  <span className="text-[#FF6B6B]">R{selectedProduct.price * quantity}</span>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-[#FF6B6B] hover:bg-[#ff5252]" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
