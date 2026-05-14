"use client";

import {
  useState,
} from "react";

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
  LoginPayload,
} from "@/types";

interface LoginPageProps {
  onLogin: (
    payload: LoginPayload,
  ) => void;

  onRegisterClick: () => void;
}

export default function LoginPage({
  onLogin,
  onRegisterClick,
}: LoginPageProps) {
  const [form, setForm] = useState({
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
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  email:
                    event.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  password:
                    event.target.value,
                }))
              }
            />
          </div>

          <Button
            onClick={() =>
              onLogin(form)
            }
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </Button>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?
            {" "}

            <button
              onClick={onRegisterClick}
              className="font-medium text-indigo-600 hover:underline"
            >
              Register
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}