"use client";

import { ChevronLeft } from "lucide-react";

import { useProductDetail } from "@/hooks/useProduct";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductDetailPageProps {
  productId: string | null;
  onBackClick: () => void;
}

export default function ProductDetailPage({
  productId,
  onBackClick,
}: ProductDetailPageProps) {
  const {
    data: product,
    isLoading,
    isError,
  } = useProductDetail(productId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackClick}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-xl font-semibold">
          Product Detail
        </h1>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>
            {isLoading
              ? "Loading..."
              : product?.productName ?? "Product"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <p className="text-slate-500">Loading product...</p>
          )}

          {isError && (
            <p className="text-red-500">Failed to load product.</p>
          )}

          {!isLoading && !isError && !product && (
            <p className="text-slate-500">Product not found.</p>
          )}

          {!isLoading && !isError && product && (
            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm text-slate-500">ID</dt>
                <dd className="font-medium">{product.id}</dd>
              </div>

              <div>
                <dt className="text-sm text-slate-500">Name</dt>
                <dd className="font-medium">{product.productName}</dd>
              </div>

              <div>
                <dt className="text-sm text-slate-500">Category</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>

              <div>
                <dt className="text-sm text-slate-500">Sub Category</dt>
                <dd className="font-medium">{product.subCategory}</dd>
              </div>

              <div>
                <dt className="text-sm text-slate-500">Price</dt>
                <dd className="font-medium">
                  Rp {product.price.toLocaleString()}
                </dd>
              </div>

            </dl>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
