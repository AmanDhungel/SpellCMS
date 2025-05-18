import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Keys } from "../lib/keys";
import type { CategoryProps } from "../components/Category";

export const GetCategory = (categoryId?: number) => {
  return useQuery<
    CategoryProps[],
    AxiosError<{ message: string; error: Record<string, unknown> }>
  >({
    queryKey: [Keys.CATEGORY, categoryId],
    queryFn: () =>
      axios
        .get<CategoryProps[]>(
          `http://localhost:3000/category${
            categoryId ? `?id=${categoryId}` : ""
          }`
        )
        .then((response) => {
          return response.data;
        }),
  });
};

export const AddCategoryPost = () => {
  return useMutation<
    CategoryProps,
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    CategoryProps
  >({
    mutationFn: (data: CategoryProps) =>
      axios
        .post<CategoryProps>(`http://localhost:3000/category`, data)
        .then((response) => {
          return response.data;
        }),
  });
};
export const UpdateCategoryPost = () => {
  return useMutation<
    CategoryProps,
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    CategoryProps
  >({
    mutationFn: (data: CategoryProps) =>
      axios
        .patch(`http://localhost:3000/category/${data.id}`, data)
        .then((response) => {
          return response.data;
        }),
  });
};
export const DeleteCategoryPost = () => {
  return useMutation<
    { id: number | string },
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    { id: number | string }
  >({
    mutationFn: ({ id }: { id: number | string }) =>
      axios.delete(`http://localhost:3000/category/${id}`).then((response) => {
        return response.data;
      }),
  });
};
