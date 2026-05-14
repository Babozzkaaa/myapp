import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

import {
  ok,
  fail,
} from "@/lib/api-response";

export async function GET() {
  try {
    const headersList =
      await headers();

    const authorization =
      headersList.get(
        "authorization",
      );

    if (!authorization) {
      return fail(
        "Unauthorized",
        401,
      );
    }

    const token = authorization.replace(
      "Bearer ",
      "",
    );

    const payload =
      await verifyToken(token);

    const user =
      await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

    if (!user) {
      return fail(
        "Unauthorized",
        401,
      );
    }

    return ok({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch {
    return fail(
      "Unauthorized",
      401,
    );
  }
}