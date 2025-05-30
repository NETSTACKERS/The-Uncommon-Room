import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <span className="font-bold text-[#FF6B6B] bg-[#FFE66D]/20 px-2 py-1 rounded">R{product.price}</span>
        </div>
        <p className="text-muted-foreground mt-2 capitalize">{product.category}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/order?product=R{product.id}`} className="w-full">
          <Button className="w-full bg-[#4ECDC4] hover:bg-[#3dbeb5]">Order Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
