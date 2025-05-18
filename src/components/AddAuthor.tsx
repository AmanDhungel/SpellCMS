import React, { useState } from "react";
import Button from "./ui/Button";
import {
  AddAuthorPost,
  DeleteAuthorPost,
  GetAuthors,
  UpdateAuthorPost,
} from "../services/services.author";
import Table from "./ui/Table";
import { toast } from "react-toastify";

type AuthorProps = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
};

const columns: { header: string; accessor: keyof AuthorProps }[] = [
  { header: "Name", accessor: "name" },
  { header: "Bio", accessor: "bio" },
  { header: "Avatar", accessor: "avatar" },
];

const AddAuthor = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    avatar: "",
    bio: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate } = AddAuthorPost();
  const { data: authors } = GetAuthors();
  const { mutate: deleteAuthor } = DeleteAuthorPost();
  const { mutate: updateAuthor } = UpdateAuthorPost();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        setForm({
          id: "",
          name: "",
          avatar: "",
          bio: "",
        });
      },
      onError: (error) => {
        console.error("Error adding author:", error);
      },
    });
  };

  const handleEdit = () => {
    updateAuthor(form, {
      onSuccess: () => {
        setForm({
          id: "",
          name: "",
          avatar: "",
          bio: "",
        });
        setIsEdit(false);
      },
      onError: (error) => {
        console.error("Error updating author:", error);
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteAuthor(
      { id },
      {
        onSuccess: () => {
          toast.success("Author deleted successfully");
        },
        onError: () => {
          toast.error("Error while deleting author");
        },
      }
    );
  };

  return (
    <>
      <form
        className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4 mt-4"
        onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            type="text"
            id="avatar"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
          />
        </div>
        {isEdit ? (
          <div className="flex space-x-2">
            <Button onClick={() => handleEdit()}>Update Author</Button>
            <Button
              onClick={() => {
                setForm({ id: "", name: "", avatar: "", bio: "" });
                setIsEdit(false);
              }}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit">Add Author</Button>
        )}
      </form>
      <Table
        columns={columns}
        data={authors ?? []}
        keyField="id"
        actionColumn={(row) => (
          <div className="space-x-2 space-y-2">
            <Button
              onClick={() => {
                setForm({
                  id: row.id ?? "",
                  name: row.name,
                  avatar: row.avatar,
                  bio: row.bio,
                });
                setIsEdit(true);
              }}>
              Edit
            </Button>
            <Button onClick={() => row.id && handleDelete(row.id)}>
              Delete
            </Button>
          </div>
        )}
      />
    </>
  );
};

export default AddAuthor;
