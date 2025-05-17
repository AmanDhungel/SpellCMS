import React from "react";
import Button from "./ui/Button";

const AddAuthor = () => {
  const [form, setForm] = React.useState({
    name: "",
    avatar: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission logic here
    console.log(form);
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
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
      <Button type="submit">Add Author</Button>
    </form>
  );
};

export default AddAuthor;
