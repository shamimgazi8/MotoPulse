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
  profile_url: string;
}

export interface Comment {
  content: string;
  User: User;
}

interface CommentSectionProps {
  initialComments?: Comment[];
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
    comment: Comment[];
  };
  onCommentSubmit?: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  initialComments = [],
  data,
  reviewId,
  onCommentSubmit,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [failedCommentIndex, setFailedCommentIndex] = useState<number | null>(
    null
  );
  const [comments, setComments] = useState<Comment[]>(data?.comment || []);
  const [visibleCount, setVisibleCount] = useState<number>(3); // Number of comments to show
  const avatarFallback =
    data?.profilePicture || "https://www.w3schools.com/howto/img_avatar.png";
  const token = Cookies.get("token");

  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    const userId = getUserIdFromToken();
    if (!userId) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
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

      const newComment: Comment = {
        content: commentText.trim(),
        User: {
          firstname: data?.name || "Anonymous",
          lastname: "",
          profile_url: data?.avatar || avatarFallback,
        },
      };

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      onCommentSubmit?.(newComment);

      if (!response.ok) {
        setFailedCommentIndex(comments.length);
        throw new Error("Failed to post comment");
      }

      setFailedCommentIndex(null);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleComments = comments.slice(0, visibleCount);
  const hasMoreComments = comments.length > visibleCount;

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
      {visibleComments.length > 0 && (
        <div className="mt-4">
          <ul>
            {visibleComments.map((comment, index) => (
              <li
                key={index}
                className="flex items-start mb-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={comment.User.profile_url}
                    alt={`${comment.User.firstname}'s Avatar`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col bg-[#252525] py-2 px-4 rounded-2xl font-normal">
                  <span className="font-semibold">
                    {comment.User.firstname} {comment.User.lastname}
                  </span>
                  <span className="flex gap-3">
                    {comment.content}
                    {failedCommentIndex === index && (
                      <div className="text-red-400 flex gap-[2px] items-center">
                        <CiCircleAlert />
                        Something went wrong
                      </div>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* See More Toggle */}
          {hasMoreComments && (
            <div
              className="text-blue-500 cursor-pointer text-sm mt-2 ml-11"
              onClick={handleSeeMore}
            >
              See more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
