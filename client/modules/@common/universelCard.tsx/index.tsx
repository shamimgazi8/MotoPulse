import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { excerpt, formatDate, getUserIdFromToken } from "@/utils/utils";
import Cookies from "js-cookie";
import CommentSection from "../comments/CommentSection";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import CustomMessage from "../message/CustomMessage";

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

interface LikedReview {
  id: number;
}

const BlogCard = ({ data, link, classes }: BlogCardProps) => {
  const [messageInfo, setMessageInfo] = useState<{
    type: "success" | "error" | "warning";
    text: string;
  } | null>(null);

  const showMessage = (type: "success" | "error" | "warning", text: string) => {
    setMessageInfo({ type, text });
  };

  const [likedPost, setLikedPost] = useState<LikedReview[]>([]);
  const [likes, setLikes] = useState<number>(data?.likes || 0);
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmark, setbookmark] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(data?.reviews || 0);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const token = Cookies.get("token");
      if (!token) return;
      try {
        const userId = getUserIdFromToken();

        const response = await fetch(`http://localhost:4000/like/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setLikedPost(result?.reviews || []);
        setLikes(data?.like);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [data?.id]);

  useEffect(() => {
    setLikes(data?.like);
    if (Array.isArray(likedPost)) {
      const isLiked = likedPost.some((likeObj) => likeObj.id === data?.id);
      setLiked(isLiked);
    }
  }, [likedPost, data]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("Please login first to like this post.");
        return;
      }

      const method = liked ? "DELETE" : "POST";
      const response = await fetch(`http://localhost:4000/like/${data?.id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ like: !liked }),
      });

      if (response.status === 401) {
        alert("Please login first to like this post.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update like");
      }

      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Something went wrong while liking the post.");
    }
  };
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const token = Cookies.get("token");
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:4000/bookmark/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (Array.isArray(result?.bookmarks)) {
          const isBookmarked = result.bookmarks.some(
            (bookmarkObj: any) => bookmarkObj.review_id === data?.id
          );
          setbookmark(isBookmarked);
        }
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    fetchBookmarkStatus();
  }, [data?.id]);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("Please login first to bookmark this post.");
        return;
      }

      const method = bookmark ? "DELETE" : "POST";
      const url = bookmark
        ? `http://localhost:4000/bookmark/${data?.id}` // DELETE needs id in URL
        : `http://localhost:4000/bookmark/`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:
          method === "POST" ? JSON.stringify({ review_id: data?.id }) : null,
      });

      if (response.status === 401) {
        alert("Please login first to bookmark this post.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update bookmark");
      }

      setbookmark(!bookmark);

      if (method === "POST") {
        showMessage("success", "Bookmark added successfully!");
      } else {
        showMessage("success", "Bookmark removed successfully!");
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
      showMessage("error", "Failed to update bookmark. Please try again.");
    }
  };

  return (
    <div className={`group relative ${classes?.root || ""}`}>
      {/* User Info */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <Image
            src={
              data?.profilePicture
                ? data?.profilePicture
                : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            }
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
          <span className={`text-xs text-black ${classes?.date || ""}`}>
            {formatDate(data?.publishedAt)}
          </span>
        </div>
      </div>

      {/* Blog Content */}
      <Link href={link || "#"} passHref>
        <div className="cursor-pointer">
          <div
            className={`relative overflow-hidden ${classes?.imageWrapper || ""}`}
          >
            <img
              src={
                data?.coverPhoto
                  ? data?.coverPhoto
                  : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
              }
              alt="Cover Image"
              height={300}
              width={300}
              className={`object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 ${classes?.imageStyle || ""}`}
            />
          </div>
          <div className={classes?.body || ""}>
            {/* Highlight + Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {data?.highlight && (
                <span
                  className={`inline-flex items-center gap-1 pr-1 ${classes?.highlight || ""}`}
                >
                  <span className="text-primary font-medium leading-[25px]">
                    {excerpt(data?.highlight, 12)}
                  </span>
                  <GoDotFill className="text-primary text-sm" />
                </span>
              )}

              {data?.bikeDetails?.brand?.brandName && (
                <span className="inline-block px-3 py-1 text-xs font-medium text-black bg-white rounded-full shadow-sm hover:bg-blue-700 transition">
                  Brand : {data.bikeDetails.brand.brandName}
                </span>
              )}
              {data?.bikeDetails?.model?.modelName && (
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-teal-500 rounded-full shadow-sm hover:bg-blue-700 transition">
                  Model : {data.bikeDetails.model.modelName}
                </span>
              )}
            </div>

            {data?.excerpt && (
              <p
                className={`line-clamp-4 text-base text-gray-700 dark:text-gray-300 ${classes?.desc || ""}`}
              >
                {data.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Like and Comment Buttons */}
      <div className=" flex justify-between">
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center hover:text-primary text-xl transition-all ${liked ? "text-blue-500" : ""}`}
          >
            {liked ? <FcLike /> : <FcLikePlaceholder />}
            <span className="ml-2 text-sm">{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="ml-4 hover:text-primary"
          >
            Comment {data?.comment?.length}
          </button>
        </div>
        <button
          onClick={handleBookmark}
          className={`flex items-center hover:text-primary text-xl transition-all ${bookmark ? "text-blue-500" : ""}`}
        >
          {bookmark ? <IoBookmark /> : <IoBookmarkOutline />}
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <CommentSection
          data={data}
          reviewId={data?.id}
          onCommentSubmit={() => setCommentCount((prev) => prev + 1)}
        />
      )}
      {messageInfo && (
        <CustomMessage
          type={messageInfo.type}
          text={messageInfo.text}
          onClose={() => setMessageInfo(null)}
        />
      )}
    </div>
  );
};

export default BlogCard;
