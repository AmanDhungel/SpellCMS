import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import { AddBlogPost } from "../services/services.blog";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

interface BlogFormData {
  title: string;
  content: string;
  author: string;
  status: string;
  body: string;
  tags: string;
  imageUrl: string;
  category: string;
  publishedDate?: string;
}

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      publishedDate: new Date().toLocaleDateString(),
      status: "draft",
    },
  });

  const { mutate, isPending } = AddBlogPost();

  const onSubmit = (data: BlogFormData) => {
    mutate(
      {
        ...data,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        publishedDate: data.publishedDate || new Date().toLocaleDateString(),
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Blog added successfully", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        },
        onError: (error) => {
          toast.error("Failed to add blog", {
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
    <form
      className="space-y-6 p-6 bg-white rounded shadow-md w-full max-w-lg mx-auto mt-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700">
          Title*
        </label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700">
          Content*
        </label>
        <textarea
          id="content"
          {...register("content", { required: "Content is required" })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          rows={5}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700">
          Author*
        </label>
        <input
          id="author"
          {...register("author", { required: "Author is required" })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700">
          Body (Summary)
        </label>
        <textarea
          id="body"
          {...register("body")}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          rows={3}
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          {...register("tags")}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="technology, programming, react"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          {...register("category")}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700">
          Featured Image URL
        </label>
        <input
          id="imageUrl"
          {...register("imageUrl")}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <Button
        type="submit"
        className="w-full flex justify-center"
        disabled={isPending}>
        {isPending ? (
          <>
            <FiLoader className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          "Publish Blog Post"
        )}
      </Button>
    </form>
  );
};

export default AddBlog;
