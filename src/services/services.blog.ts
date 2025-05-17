import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { BlogCardProps } from "../components/ui/BlogCard";
import { Keys } from "../lib/keys";

export const GetBlog = (blogId?: number) => {
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
          console.log("data from api", response.data);
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
          console.log("data from api", response.data);
          return response.data;
        }),
  });
};
