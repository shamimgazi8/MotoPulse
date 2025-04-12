import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import { excerpt } from "@/utils/utils";
import { IoSend } from "react-icons/io5";

interface BlogCardProps {
  data?: any;
  link?: string;
  classes?: {
    root?: string;
    imageWrapper?: string;
    imageStyle?: string;
    name?: string;
    date?: string;
    highlight?: string;
    desc?: string;
    body?: string;
  };
}

const BlogCard = ({ data, link, classes }: BlogCardProps) => {
  const [likes, setLikes] = useState<number>(data?.likes || 0);
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<number>(data?.comments || 0);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [submittedComments, setSubmittedComments] = useState<
    { name: string; avatar: string; comment: string }[]
  >([]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCommenting(true);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    const newComment = {
      name: data?.name || "Anonymous",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      comment: commentText.trim(),
    };

    // Log comment and post info
    console.log("Comment submitted:", {
      comment: newComment,
      post: {
        title: data?.name,
        user: data?.name,
        postId: data?.id,
      },
    });

    setSubmittedComments((prev) => [...prev, newComment]);
    setCommentText("");
    setComments((prev) => prev + 1);
    setIsCommenting(false);
  };

  return (
    <div className={`group relative ${classes?.root || ""}`}>
      {/* User Info */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${classes?.name || ""}`}>
            {data?.name}
          </h3>
          <span className={`text-xs text-gray-400 ${classes?.date || ""}`}>
            {data?.publishedAt}
          </span>
        </div>
      </div>

      {/* Blog Content */}
      <Link href={link || "#"} passHref>
        <div className="cursor-pointer">
          <div
            className={`relative overflow-hidden ${classes?.imageWrapper || ""}`}
          >
            <Image
              src={data?.imageUrl}
              alt="Post Image"
              height={300}
              width={300}
              className={`object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 ${classes?.imageStyle || ""}`}
            />
          </div>
          <div className={classes?.body || ""}>
            {data?.highlight && (
              <span
                className={`inline-flex items-center gap-1 pr-1 ${classes?.highlight || ""}`}
              >
                <span className="mb-0 text-primary font-medium leading-[25px]">
                  {excerpt(data?.highlight, 12)}
                </span>
                <GoDotFill className="text-primary text-sm" />
              </span>
            )}
            <h3
              className={`group-hover:text-primary transition-all mb-[10px] ${classes?.name || ""}`}
            >
              {data?.name}
            </h3>
            {data?.excerpt && (
              <p className={`line-clamp-4 ${classes?.desc || ""}`}>
                {data?.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Like & Comment Buttons */}
      <div className="flex items-center mt-3 text-sm text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center hover:text-primary ${liked ? "text-blue-500" : ""}`}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25l-8.623-4.837a5.35 5.35 0 0 1-3.205-4.794v-6.89a5.35 5.35 0 0 1 3.205-4.794L12 3.75l8.623 4.837a5.35 5.35 0 0 1 3.205 4.794v6.89a5.35 5.35 0 0 1-3.205 4.794L12 20.25z"
            />
          </svg>
          Like {likes}
        </button>
        <button
          onClick={handleCommentClick}
          className="ml-4 hover:text-primary"
        >
          Comment {comments}
        </button>
      </div>

      {isCommenting && (
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
              onClick={handleCommentSubmit}
              className="absolute top-[34%] right-3 text-blue-600 hover:text-blue-800 transition-all"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Display Comments */}
      {submittedComments.length > 0 && (
        <div className="mt-4">
          <ul>
            {submittedComments.map((comment, index) => (
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
                  {comment.comment}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
