"use client";

import { useGetBookmarksQuery } from "@/service/bookmarkApi";
import { Card, Spin, Empty } from "antd";
import Link from "next/link";

const { Meta } = Card;

const BookmarkReviews = () => {
  const { data: bookmarks, isLoading, isError } = useGetBookmarksQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !bookmarks || bookmarks.length === 0) {
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
          <Meta description={bookmark.review.review.slice(0, 100) + "..."} />
          <div className="flex justify-between items-center mt-4">
            <Link href={`/${bookmark.review.slug}`}>
              <button className="btn btn-secondary">View</button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookmarkReviews;
