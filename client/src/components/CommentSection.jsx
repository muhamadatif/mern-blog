import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;

    try {
      setCommentError(null);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (!res.ok) setCommentError(data.message);
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (commentError) {
      setCommentError(commentError.message);
    }
  };
  return (
    <div className="mx-auto w-full max-w-2xl p-3">
      {currentUser ? (
        <div className="my-5 flex items-center gap-1 text-sm text-gray-500">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            className="h-5 w-5 rounded-full object-cover"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="my-5 flex gap-3 text-sm text-teal-900">
          You must be signed in to comment.
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="rounded-md border border-teal-500 p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {200 - comment.length} characters ramaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string, // Adjust the type based on actual data type
};

export default CommentSection;
