"use client";

import React from "react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Confirm Logout
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-black text-black 
            hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800
            transition-all duration-300 ease-in-out 
            active:scale-95 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white border border-black 
            hover:bg-gray-800 hover:shadow-md hover:scale-[1.02]
            transition-all duration-300 ease-in-out 
            active:scale-95 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
