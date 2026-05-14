import { prisma } from "@/lib/prisma";

import { ok, fail } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return fail("Product not found", 404);
    }

    return ok(product);
  } catch {
    return fail("Failed load product", 500);
  }
}
