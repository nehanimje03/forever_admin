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

  const safePrice = isNaN(Number(price)) ? 0 : Number(price);
  const safeDiscount = isNaN(Number(discountPercentage))
    ? 0
    : Number(discountPercentage);

  const finalPrice =
    safeDiscount > 0
      ? (safePrice - (safePrice * safeDiscount) / 100).toFixed(2)
      : safePrice.toFixed(2);

  useEffect(() => {
    if (product) {
      setName(product?.name || "");
      setDescription(product?.description || "");
      setCategory(product?.category || "Men");
      setSubCategory(product?.subcategory || "Topwear");
      setPrice(product?.price || "");
      setDiscountPercentage(
        product?.discount_percentage
          ? product.discount_percentage.replace("%", "")
          : "",
      );
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
      if (image) formData.append("product_image", image);
    });

    mutate(
      { productId: product.id, formData },
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
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="md:w-[50vw] md:max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl">
        {/* HEADER (fixed) */}
        <DialogHeader className="border-b px-8 py-5 shrink-0">
          <DialogTitle className="text-3xl font-bold">Edit Product</DialogTitle>
        </DialogHeader>

        {/* SCROLL AREA */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-8 p-8"
        >
          {/* IMAGES */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Upload Images</Label>

            <div className="grid grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((item, index) => (
                <label
                  key={item}
                  htmlFor={`edit-image-${item}`}
                  className="h-25 w-18 sm:h-36 sm:w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed bg-muted flex items-center justify-center"
                >
                  {previewImages[index] ? (
                    <img
                      src={previewImages[index]}
                      alt="preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
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

          {/* NAME */}
          <div className="space-y-3">
            <Label>Product Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* PRICE */}
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Label>Discount %</Label>
              <Input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </div>

            <div>
              <Label>Final Price</Label>
              <p className="mt-2 font-bold">₹{finalPrice}</p>
            </div>
          </div>

          {/* SIZE */}
          <div>
            <Label>Sizes</Label>
            <div className="flex gap-3 mt-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={sizes.includes(size) ? "default" : "outline"}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
