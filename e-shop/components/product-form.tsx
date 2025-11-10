"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Loader2 } from "lucide-react"

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock must be non-negative"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: Partial<ProductFormData> & { id?: number }
  isLoading?: boolean
  onSubmit: (data: ProductFormData, id?: number) => Promise<void>
  submitButtonLabel?: string
}

export function ProductForm({
  initialData,
  isLoading = false,
  onSubmit,
  submitButtonLabel = "Create Product",
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  })

  const onFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data, initialData?.id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{submitButtonLabel}</CardTitle>
        <CardDescription>Fill in the product details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title *</label>
            <Input
              placeholder="Product title"
              {...register("title")}
              disabled={isLoading}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea
              placeholder="Product description"
              {...register("description")}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? "border-red-500" : "border-input"
              }`}
              rows={4}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price *</label>
              <Input
                type="number"
                placeholder="0.00"
                step="0.01"
                {...register("price")}
                disabled={isLoading}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm font-medium">Stock *</label>
              <Input
                type="number"
                placeholder="0"
                {...register("stock")}
                disabled={isLoading}
                className={errors.stock ? "border-red-500" : ""}
              />
              {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Brand *</label>
              <Input
                placeholder="Brand name"
                {...register("brand")}
                disabled={isLoading}
                className={errors.brand ? "border-red-500" : ""}
              />
              {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Category *</label>
              <Input
                placeholder="Category"
                {...register("category")}
                disabled={isLoading}
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full gap-2  bg-green-600 text-white font-semibold hover:bg-gray-200 transition">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitButtonLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
