import Image from "next/image";
import { IoSend } from "react-icons/io5";
import React, { useState } from "react";

import { getUserIdFromToken } from "@/utils/utils";
import Cookies from "js-cookie";
export interface Comment {
  name: string;
  avatar: string;
  content: string;
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
  onCommentSubmit?: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  initialComments = [],
  user,
  reviewId,
  onCommentSubmit,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const avatarFallback =
    user?.profilePicture || "https://www.w3schools.com/howto/img_avatar.png";
  const token = Cookies.get("token");
  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    console.log(user);
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("You must be logged in to comment.");
      return;
    }
    console.log(userId, "user id");

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

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment: Comment = {
        name: user?.name || "Anonymous",
        avatar: user?.avatar || avatarFallback,
        content: commentText.trim(),
      };

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      onCommentSubmit?.(newComment);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="mt-4 relative">
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
                    src={comment.avatar}
                    alt={`${comment.name}'s Avatar`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <span className="font-semibold">{comment.name}</span>:{" "}
                  {comment.content}
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
