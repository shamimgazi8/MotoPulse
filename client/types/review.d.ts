// types/review.d.ts
export interface Brand {
  id: number;
  brandName: string;
}

export interface Model {
  id: number;
  modelName: string;
}

export interface BikeType {
  id: number;
  name: string;
}

export interface Bike {
  id: number;
  imgUrl: string;
  engineCC: number;
  horsePower: number;
  torque: number;
  weight: number;
  brand: Brand;
  model: Model;
  type: BikeType;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profile_url: string;
}

export interface Review {
  id: number;
  like_count: number;
  review: string;
  slug: string;
  coverPhoto: string;
  createdAt: string;
  updatedAt: string;
  User: User;
  bike: Bike;
}

export interface ReviewApiResponse {
  count: number;
  currentPage: number;
  totalPages: number;
  result: Review[];
}
