"use client";

import React from "react";
import { Trash2 } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Body */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-black" />
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-800">
                Are you sure?
              </h3>

              <p className="text-sm text-gray-500 mt-1 leading-6">
                You are about to permanently delete this product from your
                store.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-600 transition disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
