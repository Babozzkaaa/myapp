"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import type {
  RegisterPayload,
} from "@/types";

interface RegisterPageProps {
  onRegister: (
    payload: RegisterPayload,
  ) => void;

  onLoginClick: () => void;
}

export default function RegisterPage({
  onRegister,
  onLoginClick,
}: RegisterPageProps) {
  const [form, setForm] =
    useState<RegisterPayload>({
      name: "",
      email: "",
      password: "",
    });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            ProductHub
          </CardTitle>

          <CardDescription>
            Create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  name:
                    event.target.value,
                }))
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  email:
                    event.target.value,
                }))
              }
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  password:
                    event.target.value,
                }))
              }
              placeholder="Enter your password"
            />
          </div>

          <Button
            onClick={() =>
              onRegister(form)
            }
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Register
          </Button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?
            {" "}

            <button
              onClick={
                onLoginClick
              }
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}