import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { BlogCardProps } from "../components/ui/BlogCard";
import { Keys } from "../lib/keys";

export const GetBlog = (blogId?: string) => {
  return useQuery<
    BlogCardProps[],
    AxiosError<{ message: string; error: Record<string, unknown> }>
  >({
    queryKey: [Keys.BLOG, blogId],
    queryFn: () =>
      axios
        .get<BlogCardProps[]>(
          `http://localhost:3000/posts${blogId ? `?id=${blogId}` : ""}`
        )
        .then((response) => {
          return response.data;
        }),
  });
};

export const AddBlogPost = () => {
  return useMutation<
    BlogCardProps,
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    BlogCardProps
  >({
    mutationFn: (data: BlogCardProps) =>
      axios
        .post<BlogCardProps>(`http://localhost:3000/posts`, data)
        .then((response) => {
          return response.data;
        }),
  });
};

export const UpdateBlogPost = () => {
  return useMutation<
    BlogCardProps,
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    BlogCardProps
  >({
    mutationFn: (data: BlogCardProps) =>
      axios
        .patch(`http://localhost:3000/posts/${data.id}`, data)
        .then((response) => {
          return response.data;
        }),
  });
};

export const DeleteBlogPost = () => {
  return useMutation<
    { id: number | string },
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    { id: number | string }
  >({
    mutationFn: ({ id }: { id: number | string }) =>
      axios.delete(`http://localhost:3000/posts/${id}`).then((response) => {
        return response.data;
      }),
  });
};
