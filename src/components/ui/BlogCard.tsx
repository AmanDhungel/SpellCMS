export interface BlogCardProps {
  id?: number;
  title: string;
  body: string;
  category: string;
  tags: string[];
  status: string;
  imageUrl: string;
  publishedDate: string;
  author: string;
}

const BlogCard = (data: BlogCardProps) => {
  return (
    <div className="flex flex-col p-4 bg-white shadow-md rounded-lg sm:max-w-[20rem] md:max-w-[30rem] lg:max-w-[40rem] max-w-[100%]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold m-auto capitalize line-clamp-1">
            {data.title && data.title}
          </h2>
          <p className="text-gray-600 m-auto">
            {data.author ? data.author : "Author Name"}
          </p>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <img
            src={
              data.imageUrl
                ? data.imageUrl
                : "https://images.pexels.com/photos/31449901/pexels-photo-31449901.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            }
            alt={data.title}
            className="w-32 h-32 object-cover rounded-lg"
          />

          <div className="flex flex-col space-y-1">
            <span className="text-sm bg-amber-200 w-fit p-1 px-4 rounded-md  font-semibold">
              {data.category ? data.category : "Category Name"}
            </span>
            <span className="text-sm text-gray-500">
              Published on:{" "}
              {data.publishedDate
                ? data.publishedDate
                : new Date().toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-500">
              Author: {data.author ? data.author : "John Doe"}
            </span>
            <span className="text-sm text-gray-500">
              tags:{" "}
              {data.tags && typeof data.tags === "object"
                ? data.tags.join(", ")
                : data.tags}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
