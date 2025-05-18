import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogCard, { type BlogCardProps } from "../components/ui/BlogCard";

const dummyPosts: BlogCardProps[] = [
  {
    id: "1",
    title: "Next.js Guide",
    body: "Next.js is a popular React framework.",
    category: "Next.js",
    tags: ["Next.js", "React", "JavaScript"],
    status: "published",
    imageUrl: "",
    publishedDate: new Date().toISOString(),
    author: "Aman Dhungel",
  },
  {
    id: "2",
    title: "Angular Deep Dive",
    body: "Angular is a popular JavaScript framework.",
    category: "Angular",
    tags: ["Angular", "JavaScript"],
    status: "published",
    imageUrl: "",
    publishedDate: new Date().toISOString(),
    author: "Aman Dhungel",
  },
];

describe("BlogList Filter", () => {
  it("filters blogs by keyword", () => {
    dummyPosts.forEach((post) => {
      render(<BlogCard {...post} />);
    });

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "React" },
    });

    expect(screen.getByText("React Testing")).toBeInTheDocument();
    expect(screen.queryByText("Vue Basics")).not.toBeInTheDocument();
  });
});
