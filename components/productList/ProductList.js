"use client";

import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import EditProductModal from "./EditProductModel";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModel";

const ProductList = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProduct({
    page_number: 1,
    page_size: 10,
  });

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="w-full px-4">
      <p className="mb-4 text-lg font-medium text-gray-700">
        All Products List
      </p>

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_1fr_100px_100px] items-center py-3 px-3 border bg-gray-100 text-sm border-gray-200 rounded-md">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Discount %</b>
          <b>Bestseller</b>
          <b>Latest</b>
          <b>Stock</b>
          <b className="text-center">Action</b>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_1fr_100px_100px] items-center gap-2 py-3 px-3 border text-sm border-gray-200 rounded-md"
            >
              <img
                src={item.product_image || "https://via.placeholder.com/50"}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />

              <p>{item.name}</p>
              <p>{item.category || "N/A"}</p>
              <p>₹{item.actual_price}</p>
              <p>{item.discount_percentage || 0}%</p>
              <p>{item.is_bestseller ? "Yes" : "No"}</p>
              <p>{item.is_latest_arrival ? "Yes" : "No"}</p>
              <p>{item.stock || "—"}</p>

              <div className="flex gap-4 justify-center">
                <Pencil
                  size={16}
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleEditClick(item)}
                />

                <Trash2
                  size={16}
                  className={`cursor-pointer text-red-500 ${
                    isDeleting ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => openDeleteModal(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditProductModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        product={selectedProduct}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ProductList;
