"use client";

import React, { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditProductModal = ({ isOpen, onClose, product }) => {
  const { mutate, isPending } = useUpdateProduct();
  const [images, setImages] = useState([null, null, null, null]);
  const [previewImages, setPreviewImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [latestArrival, setLatestArrival] = useState(false);
  const categories = ["Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

  const finalPrice =
    price && discountPercentage
      ? (
          Number(price) -
          (Number(price) * Number(discountPercentage)) / 100
        ).toFixed(2)
      : price;

  useEffect(() => {
    if (product) {
      setName(product?.name || "");
      setDescription(product?.description || "");
      setCategory(product?.category || "Men");
      setSubCategory(product?.subcategory || "Topwear");
      setPrice(product?.price || "");
      setDiscountPercentage(product?.discount_percentage || "");
      setStock(product?.stock || "");
      setSizes(product?.sizes || []);
      setBestseller(product?.is_bestseller || false);
      setLatestArrival(product?.is_latest_arrival || false);
      setPreviewImages([
        product?.product_image || product?.image || null,
        null,
        null,
        null,
      ]);
    }
  }, [product]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];
    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("price", price);
    formData.append("discount_percentage", discountPercentage || 0);
    formData.append("discount_price", finalPrice || price);
    formData.append("stock", stock);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("is_bestseller", bestseller ? "True" : "False");
    formData.append("is_latest_arrival", latestArrival ? "True" : "False");

    images.forEach((image) => {
      if (image) {
        formData.append("product_image", image);
      }
    });

    mutate(
      {
        productId: product.id,
        formData,
      },
      {
        onSuccess: () => {
          toast.success("Product updated successfully");

          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-[50vw]! max-w-5xl! max-h-[90vh] overflow-y-auto rounded-2xl p-0">
        {" "}
        <DialogHeader className="border-b px-8 py-5">
          <DialogTitle className="text-3xl font-bold">Edit Product</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-8"
        >
          <div className="space-y-4">
            <Label className="text-base font-semibold">Upload Images</Label>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
              {[1, 2, 3, 4].map((item, index) => (
                <label
                  key={item}
                  htmlFor={`edit-image-${item}`}
                  className="h-36 w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed bg-muted transition hover:bg-muted/80"
                >
                  {previewImages[index] ? (
                    <img
                      src={previewImages[index]}
                      alt="preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                      <UploadCloud className="h-6 w-6" />

                      <span className="text-sm">Upload</span>
                    </div>
                  )}

                  <input
                    hidden
                    id={`edit-image-${item}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Product Name</Label>

            <Input
              className="h-11"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Description</Label>

            <Textarea
              className="min-h-30"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write product description"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Category</Label>

              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Subcategory</Label>

              <Select
                value={subCategory}
                onValueChange={setSubCategory}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>

                <SelectContent>
                  {subCategories.map((sub) => (
                    <SelectItem
                      key={sub}
                      value={sub}
                    >
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Price</Label>

              <Input
                className="h-11"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Discount %</Label>

              <Input
                className="h-11"
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="Discount"
              />

              <p className="text-sm text-muted-foreground">
                Final Price:{" "}
                <span className="font-semibold text-black">
                  ₹{finalPrice || 0}
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Stock</Label>

              <Input
                className="h-11"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Available Sizes</Label>

            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <Button
                  type="button"
                  key={size}
                  variant={sizes.includes(size) ? "default" : "outline"}
                  className="rounded-xl px-5"
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestseller(!bestseller)}
                className="h-4 w-4"
              />
              Bestseller
            </label>

            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={latestArrival}
                onChange={() => setLatestArrival(!latestArrival)}
                className="h-4 w-4"
              />
              Latest Arrival
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 px-6"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="h-11 px-6"
            >
              {isPending ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
