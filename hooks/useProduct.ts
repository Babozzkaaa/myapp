"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  fetchJson,
} from "@/lib/fetcher";

import type {
  Product,
} from "@/types/product";

interface ProductResponse {
  data: Product;
}

export function useProductList() {
  return useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const response =
        await fetchJson<{
          data: Product[];
        }>("/api/products");

      return response.data;
    },
  });
}

export function useProductDetail(
  id: string | null,
) {
  return useQuery({
    queryKey: [
      "products",
      id,
    ],

    enabled: !!id,

    queryFn: async () => {
      const response =
        await fetchJson<ProductResponse>(
          `/api/products/${id}`,
        );

      return response.data;
    },
  });
}