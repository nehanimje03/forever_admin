"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

const AddSubCategoryModal = ({ isOpen, onClose, onAdd, subCategories }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();

    if (!trimmed) return;

    if (subCategories.includes(trimmed)) {
      alert("Subcategory already exists");
      return;
    }

    onAdd(trimmed);

    setValue("");

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter subcategory"
            className="h-11"
          />
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setValue("");
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubCategoryModal;
