"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  fetchJson,
} from "@/lib/fetcher";

import {
  clearToken,
  getToken,
  setToken,
} from "@/lib/storage";

import type {
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types";

interface AuthContextType {
  user: User | null;

  loading: boolean;

  login: (
    payload: LoginPayload,
  ) => Promise<void>;

  signup: (
    payload: RegisterPayload,
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    fetchMe();
  }, []);

  async function fetchMe() {
    try {
      const response =
        await fetchJson<{
          data: User;
        }>("/api/auth/me");

      setUser(response.data);
    } catch {
      clearToken();

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    payload: LoginPayload,
  ) {
    const response =
      await fetchJson<{
        data: {
          token: string;
          user: User;
        };
      }>("/api/auth/login", {
        method: "POST",

        body: JSON.stringify(
          payload,
        ),
      });

    setToken(
      response.data.token,
    );

    setUser(
      response.data.user,
    );
  }

  async function signup(
    payload: RegisterPayload,
  ) {
    const response =
      await fetchJson<{
        data: {
          token: string;
          user: User;
        };
      }>(
        "/api/auth/register",
        {
          method: "POST",

          body: JSON.stringify(
            payload,
          ),
        },
      );

    setToken(
      response.data.token,
    );

    setUser(
      response.data.user,
    );
  }

  async function logout() {
    clearToken();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider",
    );
  }

  return context;
}