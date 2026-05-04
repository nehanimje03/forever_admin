"use client";
import React, { useState } from "react";

const AddCategoryModal = ({ isOpen, onClose, onAdd, categories }) => {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    const trimmed = value.trim();

    if (!trimmed) return;

    if (categories.includes(trimmed)) {
      alert("Category already exists");
      return;
    }

    onAdd(trimmed);
    setValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Category</h2>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter category"
          className="w-full px-3 py-2 border rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setValue("");
              onClose();
            }}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
