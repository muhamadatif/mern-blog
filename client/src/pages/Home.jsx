import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-28 px-3">
        <h1 className="lg:6xl text-3xl font-bold">Welcome to my Blog</h1>
        <p className="text-cs text-gray-500 sm:text-sm">
          Here you will find a variety of articles and tutorials in topics such
          as web development, software engineering, and programmind languages.
        </p>
        <Link
          to="search"
          className="text-tael-500 text-xs font-bold hover:underline sm:text-sm"
        >
          View all posts
        </Link>
      </div>
      <div className="bg-amber-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 p-3 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-center text-2xl font-semibold">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="hover:underlinr text-center text-lg text-teal-500"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
