"use client";

import { Card, Button, Spin, Empty } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const { Meta } = Card;

interface Review {
  id: number;
  bike_id: number;
  user_id: number;
  like_count: number;
  review: string;
  slug: string;
  coverPhoto: string;
  createdAt: string;
  updatedAt: string;
}

interface Bookmark {
  id: number;
  review_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  review: Review;
}

const BookmarkReviews = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch("http://localhost:4000/bookmark", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await response.json();
      setBookmarks(data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="No Bookmarked Reviews Yet" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {bookmarks.map((bookmark) => (
        <Card
          key={bookmark.id}
          hoverable
          cover={
            <img
              alt="cover"
              src={bookmark.review.coverPhoto}
              className="h-60 object-cover"
            />
          }
          className="rounded-2xl shadow-md"
        >
          <Meta
            // title={bookmark.review.slug.replace(/-/g, " ").slice(0, 60)}
            description={bookmark.review.review.slice(0, 100) + "..."}
          />
          <div className="flex justify-between items-center mt-4">
            <Link href={`/${bookmark.review.slug}`}>
              <button className="btn btn-secondary">View</button>
            </Link>
            {/* Optional: Add a "Remove Bookmark" button here */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookmarkReviews;
