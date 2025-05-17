import { Link } from "react-router-dom";
import BlogCard from "../components/ui/BlogCard";
import Button from "../components/ui/Button";
import { GetBlog } from "../services/services.blog";
import { BiLoaderAlt } from "react-icons/bi";

const BlogPage = () => {
  const { data, isLoading } = GetBlog();
  return (
    <>
      <div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg px-4 py-2 m-4">
          <Link to={"/add-blog"}> Add Blog</Link>
        </Button>
      </div>
      {isLoading ? (
        <span className="flex justify-center items-center h-screen">
          <BiLoaderAlt className="animate-spin transition-all transition-300 text-2xl m-auto items-center h-screen " />
        </span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data && data?.length > 0 ? (
            data.map((item) => <BlogCard key={item.id} {...item} />)
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
