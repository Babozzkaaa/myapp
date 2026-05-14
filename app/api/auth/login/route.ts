import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { verifyPassword } from "@/lib/password";
import {
  ok,
  fail,
} from "@/lib/api-response";

import {
  loginSchema,
} from "@/validation/auth.schema";

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    const validated =
      loginSchema.parse(body);

    const user =
      await prisma.user.findUnique({
        where: {
          email: validated.email,
        },
      });

    if (!user) {
      return fail(
        "Email atau password salah",
        401,
      );
    }

    const validPassword =
      await verifyPassword(
        validated.password,
        user.password,
      );

    if (!validPassword) {
      return fail(
        "Email atau password salah",
        401,
      );
    }

    const token =
      await signToken({
        userId: user.id,
      });

    return ok({
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    return fail(
      "Internal server error",
      500,
    );
  }
}