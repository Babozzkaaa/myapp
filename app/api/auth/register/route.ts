import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";

import {
  ok,
  fail,
} from "@/lib/api-response";

import {
  registerSchema,
} from "@/validation/auth.schema";

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    const validated =
      registerSchema.parse(body);

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: validated.email,
        },
      });

    if (existingUser) {
      return fail(
        "Email sudah digunakan",
        400,
      );
    }

    const hashedPassword =
      await hashPassword(
        validated.password,
      );

    const user =
      await prisma.user.create({
        data: {
          name: validated.name,
          email: validated.email,
          password: hashedPassword,
        },
      });

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