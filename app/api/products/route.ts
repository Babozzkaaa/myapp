import {
  NextRequest,
} from "next/server";

import { prisma } from "@/lib/prisma";

import {
  ok,
  fail,
} from "@/lib/api-response";

import {
  productSchema,
} from "@/validation/product.schema";

export async function GET() {
  try {
    const products =
      await prisma.product.findMany();

    return ok(products);
  } catch {
    return fail(
      "Failed load products",
      500,
    );
  }
}

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    const validated =
      productSchema.parse(body);

    const product =
      await prisma.product.create({
        data: validated,
      });

    return ok(product, 201);
  } catch {
    return fail(
      "Failed create product",
      500,
    );
  }
}