"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";
import { toast } from "react-toastify";

const EditProductModal = ({ isOpen, onClose, product }) => {
  const { mutate, isPending } = useUpdateProduct();

  const [images, setImages] = useState([null, null, null, null]);
  const [previewImages, setPreviewImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories] = useState(["Men", "Women", "Kids"]);
  const [category, setCategory] = useState("Men");
  const [subCategories] = useState(["Topwear", "Bottomwear", "Winterwear"]);
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [latestArrival, setLatestArrival] = useState(false);

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-175 max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Product</h2>

          <button
            onClick={onClose}
            className="text-red-500 cursor-pointer"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-gray-700"
        >
          <div>
            <p className="mb-2 font-medium">Upload Image</p>

            <div className="flex gap-3">
              {[1, 2, 3, 4].map((item, index) => (
                <label
                  key={item}
                  htmlFor={`edit-image-${item}`}
                  className="w-20 h-20 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer rounded-md overflow-hidden"
                >
                  {previewImages[index] ? (
                    <img
                      src={previewImages[index]}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <RiUploadCloudFill className="text-xl text-gray-400" />

                      <span className="text-gray-400 text-xs">Upload</span>
                    </>
                  )}

                  <input
                    id={`edit-image-${item}`}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Product Name</p>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Type here"
              type="text"
            />
          </div>

          <div>
            <p className="mb-2 font-medium">Product Description</p>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
              placeholder="Write content here"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="mb-2 font-medium">Category</p>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 font-medium">Subcategory</p>

              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                {subCategories.map((sub) => (
                  <option
                    key={sub}
                    value={sub}
                  >
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 font-medium">Actual Price</p>

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Price"
                type="number"
              />
            </div>

            <div>
              <p className="mb-2 font-medium">Discount %</p>

              <input
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Discount %"
                type="number"
              />

              <p className="text-xs text-red-500 mt-1">
                Final: ₹{finalPrice || 0}
              </p>
            </div>

            <div>
              <p className="mb-2 font-medium">Stock</p>

              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Stock"
                type="number"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Product Sizes</p>

            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded ${
                    sizes.includes(size) ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestseller(!bestseller)}
              />
              Bestseller
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={latestArrival}
                onChange={() => setLatestArrival(!latestArrival)}
              />
              Latest Arrival
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-40 py-3 bg-black text-white mt-4 disabled:opacity-50 mx-auto rounded"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
