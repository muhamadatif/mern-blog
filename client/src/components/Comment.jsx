// import PropTypes from "prop-types";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaThumbsUp } from "react-icons/fa";
/*eslint-disable*/
const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex border-b p-4 text-sm dark:border-gray-600">
      <div className="mr-3 flex-shrink-0">
        <img
          src={user.profilePicture}
          className="h-10 w-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center">
          <span className="mr-1 truncate text-xs font-bold">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="pb-2 text-gray-500">{comment.content}</p>
        <div className="flex max-w-fit items-center gap-2 border-t pt-2 text-xs dark:border-gray-700">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"}`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
