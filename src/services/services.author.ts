import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Keys } from "../lib/keys";

interface AuthorProps {
  id?: string;
  name: string;
  bio: string;
  avatar: string;
}
export const GetAuthors = (authorId?: number) => {
  return useQuery<
    AuthorProps[],
    AxiosError<{ message: string; error: Record<string, unknown> }>
  >({
    queryKey: [Keys.BLOG, authorId],
    queryFn: () =>
      axios
        .get<AuthorProps[]>(
          `http://localhost:3000/author${authorId ? `?id=${authorId}` : ""}`
        )
        .then((response) => {
          return response.data;
        }),
  });
};

export const AddAuthorPost = () => {
  return useMutation<
    AuthorProps,
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    AuthorProps
  >({
    mutationFn: (data: AuthorProps) =>
      axios
        .post<AuthorProps>(`http://localhost:3000/author`, data)
        .then((response) => {
          return response.data;
        }),
  });
};
export const UpdateAuthorPost = () => {
  return useMutation<
    AuthorProps,
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    AuthorProps
  >({
    mutationFn: (data: AuthorProps) =>
      axios
        .patch(`http://localhost:3000/author/${data.id}`, data)
        .then((response) => {
          return response.data;
        }),
  });
};
export const DeleteAuthorPost = () => {
  return useMutation<
    { id: number | string },
    AxiosError<{ message: string; error: Record<string, unknown> }>,
    { id: number | string }
  >({
    mutationFn: ({ id }: { id: number | string }) =>
      axios.delete(`http://localhost:3000/author/${id}`).then((response) => {
        return response.data;
      }),
  });
};
