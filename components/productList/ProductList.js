"use client";

import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Package2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EditProductModal from "./EditProductModel";
import DeleteModel from "./DeleteModel";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { toast } from "react-toastify";

const ProductList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useGetProduct({
    page_number: page,
    page_size: 5,
  });

  const products = Array.isArray(data?.data?.results) ? data.data.results : [];

  const totalPages = data?.data?.total_pages || 1;
  const currentPage = data?.data?.current_page || 1;
  const totalItems = data?.data?.total_items || 0;

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteProduct();

  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const handleEditClick = (item) => {
    setSelectedProduct(item);
    setShowEdit(true);
  };

  const openDeleteModal = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    deleteMutate(deleteProductId, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        setShowDeleteModal(false);
        setDeleteProductId(null);
      },

      onError: (error) => {
        toast.error(error?.message || "Failed to delete product");
      },
    });
  };

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <>
      <Card className="rounded-3xl border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
              <Package2 className="h-5 w-5 text-black" />
            </div>

            <div>
              <CardTitle className="text-2xl font-semibold">Products</CardTitle>

              <p className="text-sm text-muted-foreground">
                Total Products: {totalItems}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-4 pl-6">Product</TableHead>

                  <TableHead>Category</TableHead>
                  <TableHead>MRP</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sizes</TableHead>
                  <TableHead>Status</TableHead>

                  <TableHead className="pr-6 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-100"
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>

                          <p className="text-sm font-medium text-gray-500">
                            Loading products...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : products.length > 0 ? (
                  products.map((item) => {
                    let parsedSizes = [];

                    try {
                      parsedSizes =
                        typeof item?.sizes === "string"
                          ? JSON.parse(item.sizes)
                          : item?.sizes || [];
                    } catch {
                      parsedSizes =
                        typeof item?.sizes === "string"
                          ? item.sizes.split(",")
                          : [];
                    }

                    if (!Array.isArray(parsedSizes)) {
                      parsedSizes = [];
                    }

                    const mrp = Number(item?.price || 0);

                    const discount = Number(
                      String(item?.discount_percentage || 0).replace("%", ""),
                    );

                    const finalPrice = mrp - (mrp * discount) / 100;

                    return (
                      <TableRow
                        key={item?.id}
                        className="border-b last:border-0"
                      >
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-14 overflow-hidden rounded border border-gray-200 bg-gray-100 shadow-sm">
                              <img
                                src={
                                  item?.product_images?.[0]
                                    ? item.product_images[0]
                                    : "/placeholder.png"
                                }
                                alt={item?.name || "product"}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="flex flex-col">
                              <span className="font-medium text-[15px]">
                                {item?.name || "Unnamed Product"}
                              </span>

                              <p className="max-w-35 truncate text-xs text-muted-foreground">
                                {item?.description ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="rounded-full px-3 py-2 text-xs"
                          >
                            {item?.category || "N/A"}
                          </Badge>
                        </TableCell>

                        <TableCell className="font-medium">
                          ₹{mrp.toFixed(2)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className="rounded-full"
                          >
                            {discount}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-green-600">
                            ₹{finalPrice.toFixed(2)}
                          </span>
                        </TableCell>

                        <TableCell>{item?.stock || "—"}</TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {parsedSizes.length > 0 ? (
                              parsedSizes.map((size, index) => (
                                <span
                                  key={index}
                                  className="rounded-md bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-700"
                                >
                                  {String(size).trim()}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">
                                No Sizes available
                              </span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {item?.is_bestseller && (
                              <Badge className="rounded-full px-3 py-1">
                                Bestseller
                              </Badge>
                            )}

                            {item?.is_latest_arrival && (
                              <Badge className="rounded-full px-3 py-1">
                                Latest
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="pr-6 text-right">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-10 w-10 rounded-xl"
                              onClick={() => handleEditClick(item)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-10 w-10 rounded-xl"
                              disabled={isDeleting}
                              onClick={() => openDeleteModal(item?.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-10 text-center text-gray-500"
                    >
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between border-t px-6 py-4">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <EditProductModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        product={selectedProduct}
      />

      <DeleteModel
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ProductList;
