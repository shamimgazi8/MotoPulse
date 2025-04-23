import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { excerpt, formatDate, getUserIdFromToken } from "@/utils/utils";
import Cookies from "js-cookie";
import CommentSection from "../comments/CommentSection";

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
  const [likedPost, setLikedPost] = useState<LikedReview[]>([]);
  const [likes, setLikes] = useState<number>(data?.likes || 0);
  const [liked, setLiked] = useState<boolean>(false);
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
            <Image
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
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-teal-500 rounded-full shadow-sm hover:bg-blue-700 transition">
                  Brand : {data.bikeDetails.brand.brandName}
                </span>
              )}
              {data?.bikeDetails?.model?.modelName && (
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow-sm hover:bg-blue-700 transition">
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
          Comment {commentCount}
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <CommentSection
          user={{
            name: data?.name || "Anonymous",
            avatar: data?.profilePicture,
          }}
          onCommentSubmit={() => setCommentCount((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default BlogCard;
