"use client";

import {
  useEffect,
  useState,
} from "react";

import LoginPage from "@/components/pages/LoginPage";
import RegisterPage from "@/components/pages/RegisterPage";
import DashboardPage from "@/components/pages/DashboardPage";
import ProductsPage from "@/components/pages/ProductsPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import CategoriesPage from "@/components/pages/CategoriesPage";

import ProtectedLayout from "@/components/layout/ProtectedLayout";

import { Spinner } from "@/components/ui/spinner";

import {
  AuthProvider,
  useAuth,
} from "@/contexts/useContext";

import type {
  LoginPayload,
  RegisterPayload,
} from "@/types";

type PageType =
  | "login"
  | "register"
  | "dashboard"
  | "products"
  | "product-detail"
  | "categories";

function HomeContent() {
  const {
    user,
    loading,
    login,
    signup,
    logout,
  } = useAuth();

  const [currentPage, setCurrentPage] =
    useState<PageType>("login");

  const [
    selectedProductId,
    setSelectedProductId,
  ] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (user) {
      setCurrentPage(
        "dashboard",
      );
    } else {
      setCurrentPage("login");
    }
  }, [user]);

  async function handleLogin(
    payload: LoginPayload,
  ) {
    await login(payload);

    setCurrentPage(
      "dashboard",
    );
  }

  async function handleRegister(
    payload: RegisterPayload,
  ) {
    await signup(payload);

    setCurrentPage(
      "dashboard",
    );
  }

  async function handleLogout() {
    await logout();

    setCurrentPage("login");
  }

  function handleNavigate(
    page: PageType,
  ) {
    setCurrentPage(page);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Spinner className="size-8" />
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (
      currentPage ===
      "register"
    ) {
      return (
        <RegisterPage
          onRegister={
            handleRegister
          }
          onLoginClick={() =>
            setCurrentPage(
              "login",
            )
          }
        />
      );
    }

    return (
      <LoginPage
        onLogin={
          handleLogin
        }
        onRegisterClick={() =>
          setCurrentPage(
            "register",
          )
        }
      />
    );
  }

  return (
    <ProtectedLayout
      currentPage={
        currentPage
      }
      onNavigate={
        handleNavigate
      }
      onLogout={
        handleLogout
      }
    >
      {currentPage ===
        "dashboard" && (
        <DashboardPage />
      )}

      {currentPage ===
        "products" && (
        <ProductsPage
          onProductClick={(
            productId,
          ) => {
            setSelectedProductId(
              productId,
            );

            setCurrentPage(
              "product-detail",
            );
          }}
        />
      )}

      {currentPage ===
        "product-detail" && (
        <ProductDetailPage
          productId={
            selectedProductId
          }
          onBackClick={() =>
            setCurrentPage(
              "products",
            )
          }
        />
      )}

      {currentPage ===
        "categories" && (
        <CategoriesPage />
      )}
    </ProtectedLayout>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}