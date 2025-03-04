import { Link } from "react-router-dom";

/*eslint-disable */
const PostCard = ({ post }) => {
  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-lg border border-teal-500 sm:w-[350px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="hover: z-20 h-[260px] w-full object-cover transition-all duration-300 group-hover:h-[200px]"
        />
        <div className="flex-col gap-2 p-3">
          <p className="line-clamp-2 text-lg font-semibold">{post.title}</p>
          <span className="italice text-sm">{post.category}</span>
          <Link
            className="transition-300 absolute bottom-[-200px] left-0 right-0 z-10 m-2 rounded-md !rounded-tl-none border border-teal-500 py-2 text-center text-teal-500 transition-all hover:border-2 hover:bg-teal-500 hover:text-white group-hover:bottom-0"
            to={`/post/${post.slug}`}
          >
            Reacd article
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
