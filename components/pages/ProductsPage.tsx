"use client";

import {
  Card,
  CardContent,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import {
  useProductList,
} from "@/hooks/useProduct";

interface ProductsPageProps {
  onProductClick: (
    productId: string,
  ) => void;
}

export default function ProductsPage({
  onProductClick,
}: ProductsPageProps) {
  const {
    data: products,
    isLoading,
    isError,
  } = useProductList();

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>
            Filters
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Input placeholder="Search product name..." />
            </div>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All
                </SelectItem>

                <SelectItem value="grocery">
                  Grocery
                </SelectItem>

                <SelectItem value="beverage">
                  Beverage
                </SelectItem>

                <SelectItem value="snack">
                  Snack
                </SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="name">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="name">
                  Name
                </SelectItem>

                <SelectItem value="price">
                  Price
                </SelectItem>

                <SelectItem value="category">
                  Category
                </SelectItem>
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              defaultValue="asc"
            >
              <ToggleGroupItem value="asc">
                Asc
              </ToggleGroupItem>

              <ToggleGroupItem value="desc">
                Desc
              </ToggleGroupItem>
            </ToggleGroup>

            <Input placeholder="Min (Rp)" />

            <Input placeholder="Max (Rp)" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>
            Products
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  #
                </TableHead>

                <TableHead>
                  Product Name
                </TableHead>

                <TableHead>
                  Category
                </TableHead>

                <TableHead>
                  Sub Category
                </TableHead>

                <TableHead>
                  Price
                </TableHead>

                <TableHead>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-red-500"
                  >
                    Failed to load
                    products
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                !isError &&
                products?.map(
                  (
                    product,
                    index,
                  ) => (
                    <TableRow
                      key={
                        product.id
                      }
                    >
                      <TableCell>
                        {index + 1}
                      </TableCell>

                      <TableCell>
                        {
                          product.productName
                        }
                      </TableCell>

                      <TableCell>
                        {
                          product.category
                        }
                      </TableCell>

                      <TableCell>
                        {
                          product.subCategory
                        }
                      </TableCell>

                      <TableCell>
                        Rp{" "}
                        {product.price.toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() =>
                            onProductClick(
                              String(
                                product.id,
                              ),
                            )
                          }
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ),
                )}

              {!isLoading &&
                !isError &&
                products?.length ===
                  0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-slate-500"
                    >
                      No products
                      loaded
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing{" "}
          {products?.length ?? 0}{" "}
          products
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled
          >
            1
          </Button>

          <Button
            variant="outline"
            disabled
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}