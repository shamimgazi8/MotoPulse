import Image from "next/image";
import { IoSend } from "react-icons/io5";
import React, { useState } from "react";
import { getUserIdFromToken } from "@/utils/utils";
import Cookies from "js-cookie";
import { CiCircleAlert } from "react-icons/ci";
// Interfaces
export interface User {
  firstname: string;
  lastname: string;
  profile_url: string; // Or use `avatar` depending on your backend structure
}

export interface Comment {
  content: string;
  User: User; // Reference to the user object
}

interface CommentSectionProps {
  initialComments?: Comment[]; // Optionally provide initial comments
  user?: {
    name: string;
    avatar?: string;
    id?: number;
    profilePicture: string;
  };
  reviewId: number;
  data: {
    name: string;
    avatar?: string;
    profilePicture?: string;
    comment: Comment[]; // List of comments related to the review
  };
  onCommentSubmit?: (comment: Comment) => void; // Callback to handle new comment submission
}

const CommentSection: React.FC<CommentSectionProps> = ({
  initialComments = [],
  data,
  reviewId,
  onCommentSubmit,
}) => {
  // State
  const [commentText, setCommentText] = useState<string>("");
  const [failedCommentIndex, setFailedCommentIndex] = useState<number | null>(
    null
  ); // Track failed comment index
  const [comments, setComments] = useState<Comment[]>(data?.comment || []);
  const avatarFallback =
    data?.profilePicture || "https://www.w3schools.com/howto/img_avatar.png";
  const token = Cookies.get("token"); // Getting the token for authorization

  const handleSubmit = async () => {
    if (!commentText.trim()) return; // Don't submit if comment is empty

    const userId = getUserIdFromToken(); // Get user ID from the token
    if (!userId) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      // Sending the new comment to the backend
      const response = await fetch("http://localhost:4000/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentText.trim(),
          review_id: reviewId,
        }),
      });

      // Constructing a new comment to be added to the UI
      const newComment: Comment = {
        content: commentText.trim(),
        User: {
          firstname: data?.name || "Anonymous",
          lastname: "", // Add this if you have a last name field
          profile_url: data?.avatar || avatarFallback, // Default avatar if not available
        },
      };

      // Update the comments state
      setComments((prev) => [...prev, newComment]);
      setCommentText(""); // Clear the input field
      onCommentSubmit?.(newComment); // Call the callback if provided

      // Check if the response is successful
      if (!response.ok) {
        setFailedCommentIndex(comments.length); // Set the failed comment index
        throw new Error("Failed to post comment");
      }

      // Reset failed comment index on success
      setFailedCommentIndex(null);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="mt-4 relative">
      {/* Comment Textarea and Submit Button */}
      <div className="relative">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 pr-12 border border-gray-300 rounded-md dark:border-white/30 dark:bg-neutral-800 text-sm text-gray-700 dark:text-gray-200 resize-none outline-none"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          className="absolute top-[34%] right-3 text-blue-600 hover:text-blue-800 transition-all"
        >
          <IoSend className="w-5 h-5" />
        </button>
      </div>

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="mt-4">
          <ul>
            {comments.map((comment, index) => (
              <li
                key={index}
                className="flex items-start mb-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={comment.User.profile_url} // Display the user's avatar
                    alt={`${comment.User.firstname}'s Avatar`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col bg-gray-700 py-2 px-4 rounded-2xl font-normal">
                  <span className="font-semibold">
                    {comment.User.firstname} {comment.User.lastname}
                  </span>
                  <span className=" flex gap-3">
                    {comment.content}{" "}
                    {failedCommentIndex === index && ( // Only show the error message for the failed comment
                      <div className=" text-red-400 flex gap-[2px] justify-center items-center">
                        {" "}
                        <CiCircleAlert />
                        Something went wrong
                      </div>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
