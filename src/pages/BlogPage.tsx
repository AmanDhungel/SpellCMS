import { Link } from "react-router-dom";
import BlogCard from "../components/ui/BlogCard";
import Button from "../components/ui/Button";
import { GetBlog } from "../services/services.blog";
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const { data, isLoading } = GetBlog();
  const [blogData, setBlogData] = useState(data);

  useEffect(() => {
    setBlogData(data);
  }, [data, isLoading]);

  return (
    <>
      <div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg px-4 py-2 m-4">
          <Link to={"/add-blog"}> Add Blog</Link>
        </Button>
      </div>
      <div className="flex items-center mb-4 px-4">
        <input
          type="text"
          placeholder="Search blogs by title and tags"
          className="border border-gray-300 rounded-lg px-3 py-2 mr-2 w-full max-w-xs"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            if (!value) {
              setBlogData(data);
              return;
            }
            setBlogData(
              data?.filter(
                (item) =>
                  item.title?.toLowerCase().includes(value) ||
                  item.tags?.join(", ").toLowerCase().includes(value)
              )
            );
          }}
        />
      </div>
      <div className="flex items-center mb-4 px-4 w-1/6">
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 mr-2"
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setBlogData(data);
              return;
            }
            setBlogData(
              data?.filter(
                (item) => item.category === value || item.status === value
              )
            );
          }}
          defaultValue="">
          <option value="">Filter by Category or Status</option>
          {[
            ...new Set([
              ...(data?.map((b) => b.category) || []),
              ...(data?.map((b) => b.status) || []),
            ]),
          ]
            .filter(Boolean)
            .map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
      {isLoading ? (
        <span className="flex justify-center items-center h-screen">
          <BiLoaderAlt className="animate-spin transition-all transition-300 text-2xl m-auto items-center h-screen " />
        </span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {blogData && blogData?.length > 0 ? (
            blogData.map((item) => <BlogCard key={item.id} {...item} />)
          ) : (
            <div className="flex justify-center items-center ">
              <h1 className="text-2xl">No Data Found</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogPage;
