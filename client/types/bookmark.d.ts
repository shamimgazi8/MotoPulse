// types.ts
export interface Review {
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

export interface Bookmark {
  id: number;
  review_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  review: Review;
}
