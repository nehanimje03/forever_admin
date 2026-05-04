"use client";
import React, { useState } from "react";
import { useAddProduct } from "../../hooks/useAddProduct";
import { RiUploadCloudFill } from "react-icons/ri";
import AddCategoryModal from "./AddCategoryModel";
import AddSubCategoryModal from "./AdddSubCategoryModel";

const AddProduct = () => {
  const { mutate, isPending } = useAddProduct();

  const [images, setImages] = useState([null, null, null, null]);
  const [previewImages, setPreviewImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState(["Men", "Women", "Kids"]);
  const [category, setCategory] = useState("Men");
  const [showModal, setShowModal] = useState(false);

  const [subCategories, setSubCategories] = useState([
    "Topwear",
    "Bottomwear",
    "Winterwear",
  ]);
  const [subCategory, setSubCategory] = useState("Topwear");
  const [showSubModal, setShowSubModal] = useState(false);
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [latestArrival, setLatestArrival] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    const newPreviews = [...previewImages];

    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const handleAddCategory = (newCat) => {
    setCategories((prev) => [...prev, newCat]);
    setCategory(newCat);
  };

  const handleAddSubCategory = (newSub) => {
    setSubCategories((prev) => [...prev, newSub]);
    setSubCategory(newSub);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Enter product name");
      return;
    }

    const numericPrice = Number(price);
    const numericCompare = Number(comparePrice);
    const numericStock = Number(stock);

    if (!numericPrice || numericPrice <= 0) {
      alert("Enter valid price");
      return;
    }

    if (numericCompare && numericCompare <= numericPrice) {
      alert("Original price must be greater than discount price");
      return;
    }

    if (numericStock < 0) {
      alert("Stock cannot be negative");
      return;
    }

    if (!images.some((img) => img !== null)) {
      alert("Upload at least one image");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("sub_category", subCategory);
    formData.append("price", numericPrice);
    formData.append("compare_price", numericCompare || numericPrice);
    formData.append("stock", numericStock);
    formData.append("is_bestseller", bestseller ? "True" : "False");
    formData.append("is_latest_arrival", latestArrival ? "True" : "False");

    images.forEach((img) => {
      if (img) {
        formData.append("product_image", img);
      }
    });

    mutate(formData, {
      onSuccess: () => {
        setName("");
        setDescription("");
        setPrice("");
        setComparePrice("");
        setStock("");
        setImages([null, null, null, null]);
        setPreviewImages([null, null, null, null]);
        setSizes([]);
        setBestseller(false);
        setLatestArrival(false);
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex flex-col gap-5 text-gray-700"
      >
        <div>
          <p className="mb-2 font-medium">Upload Image</p>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item, index) => (
              <label
                key={item}
                htmlFor={`image${item}`}
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
                  id={`image${item}`}
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
          <p className="mb-2 font-medium">Product name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Type here"
            type="text"
            required
          />
        </div>

        <div>
          <p className="mb-2 font-medium">Product description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => {
              if (e.target.value === "ADD_NEW") {
                setShowModal(true);
              } else {
                setCategory(e.target.value);
              }
            }}
            className="px-3 py-2 w-40 border border-gray-300 rounded"
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
            <option value="ADD_NEW">➕ Add New Category</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => {
              if (e.target.value === "ADD_NEW") {
                setShowSubModal(true);
              } else {
                setSubCategory(e.target.value);
              }
            }}
            className="px-3 py-2 w-40 border border-gray-300 rounded"
          >
            {subCategories.map((sub) => (
              <option
                key={sub}
                value={sub}
              >
                {sub}
              </option>
            ))}
            <option value="ADD_NEW">➕ Add Subcategory</option>
          </select>

          <input
            value={comparePrice}
            onChange={(e) => setComparePrice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-33"
            placeholder="Original Price"
            type="number"
            min="0"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-33"
            placeholder="Discount Price"
            type="number"
            min="0"
            step="0.01"
            required
          />

          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-33"
            placeholder="Stock"
            type="number"
            min="0"
            required
          />
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
          className="w-32 py-3 bg-black text-white mt-4 disabled:opacity-50"
        >
          {isPending ? "Adding..." : "ADD"}
        </button>
      </form>

      <AddCategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddCategory}
        categories={categories}
      />

      <AddSubCategoryModal
        isOpen={showSubModal}
        onClose={() => setShowSubModal(false)}
        onAdd={handleAddSubCategory}
        subCategories={subCategories}
      />
    </>
  );
};

export default AddProduct;
