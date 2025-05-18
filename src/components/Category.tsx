import React, { useState } from "react";
import Table from "./ui/Table";
import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import {
  AddCategoryPost,
  DeleteCategoryPost,
  GetCategory,
  UpdateCategoryPost,
} from "../services/services.category";
import { toast } from "react-toastify";

export interface CategoryProps {
  id?: string;
  name: string;
  description: string;
}

const Category = () => {
  const { mutate } = AddCategoryPost();
  const { mutate: editCategory } = UpdateCategoryPost();
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: deleteCategory } = DeleteCategoryPost();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CategoryProps>();
  const columns: { header: string; accessor: keyof CategoryProps }[] = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
  ];

  const { data: category } = GetCategory();
  const onSubmit = (data: CategoryProps) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Category added successfully", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        },
        onError: (error) => {
          toast.error("Failed to add Category", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
          console.error("Error adding blog:", error);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteCategory(
      { id },
      {
        onSuccess: () => {
          reset();
          toast.success("Category deleted successfully", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        },
        onError: (error) => {
          toast.error("Failed to delete Category", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
          console.error("Error adding blog:", error);
        },
      }
    );
  };

  const handleEdit = () => {
    const data = getValues();
    editCategory(
      {
        ...data,
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Category updated successfully", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        },
        onError: (error) => {
          toast.error("Failed to update Category", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
          console.error("Error adding blog:", error);
        },
      }
    );
  };
  return (
    <>
      <form
        className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            type="text"
            {...register("name", { required: "Title is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
        {isEdit ? (
          <div>
            <button
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                handleEdit();
              }}>
              Edit Category
            </button>
            <button
              onClick={() => {
                reset();
                setIsEdit(false);
              }}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
      <Table
        columns={columns}
        data={category ?? []}
        keyField="id"
        actionColumn={(row) => (
          <div className="space-x-2 space-y-2">
            <button
              onClick={() => {
                setValue("id", row.id ?? "");
                setValue("name", row.name);
                setValue("description", row.description);
                setIsEdit(true);
              }}>
              Edit
            </button>
            <Button onClick={() => row.id && handleDelete(row.id)}>
              Delete
            </Button>
          </div>
        )}
      />
    </>
  );
};

export default Category;
