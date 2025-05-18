import { useForm } from "react-hook-form";
import {
  AddBlogPost,
  GetBlog,
  UpdateBlogPost,
} from "../services/services.blog";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface BlogFormData {
  id?: string;
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      publishedDate: new Date().toLocaleDateString(),
      status: "draft",
    },
  });
  const [searchParams] = useSearchParams();
  const { mutate, isPending } = AddBlogPost();
  const { data } = GetBlog(searchParams.get("id") ?? undefined);
  const { mutate: updateBlog } = UpdateBlogPost();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("id")) {
      reset();
    } else {
      setValue("id", searchParams.get("id") ?? "");
      setValue("title", data?.[0]?.title ?? "");
      setValue("author", data?.[0]?.author ?? "");
      setValue("status", data?.[0]?.status ?? "");
      setValue("body", data?.[0]?.body ?? "");
      setValue(
        "tags",
        typeof data?.[0]?.tags === "object" && data?.[0]?.tags.length > 1
          ? data?.[0]?.tags.join(",")
          : ""
      );
      setValue("category", data?.[0]?.category ?? "");
      setValue("imageUrl", data?.[0]?.imageUrl ?? "");
    }
  }, [data, reset, searchParams, setValue]);
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

  const handleEditBlog = (data: BlogFormData) => {
    if (!data) {
      toast.error("No blog data available to update.", {
        autoClose: 2000,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    updateBlog(
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
          toast.success("Blog updated successfully", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
          navigate("/blog");
        },
        onError: (error) => {
          toast.error("Failed to update blog", {
            autoClose: 2000,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
          console.error("Error updating blog:", error);
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
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="author">Author*</label>
        <input
          id="author"
          {...register("author", { required: "Author is required" })}
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="body">Body (Summary)</label>
        <textarea id="body" {...register("body")} rows={3} />
      </div>

      <div>
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          id="tags"
          {...register("tags")}
          placeholder="technology, programming, react"
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" {...register("category")} />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register("status")}>
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
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {searchParams.get("id") ? (
        <div className="space-y-4">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleEditBlog(getValues());
            }}
            className="w-full flex justify-center"
            disabled={isPending}>
            {isPending ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Edit Blog Post"
            )}
          </button>

          <button
            onClick={() => {
              reset();
              navigate("/blog");
            }}
            className="w-full flex justify-center">
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
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
          </button>
          <button
            onClick={() => {
              reset();
              navigate("/blog");
            }}
            className="w-full flex justify-center">
            Back
          </button>
        </div>
      )}
    </form>
  );
};

export default AddBlog;
