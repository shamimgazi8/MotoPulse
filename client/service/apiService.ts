// Base URL for your backend API (adjust based on your environment)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiService {
  private static async request(
    endpoint: string,
    method: string = "GET",
    body?: any
  ) {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const res = await fetch(`${API_URL}${endpoint}`, options);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || res.statusText);
      }

      return res.json();
    } catch (error) {
      console.error(`Error in request ${method} ${endpoint}:`, error);
      throw error;
    }
  }

  static getBrands() {
    return this.request("/brands");
  }

  static createBrand(newBrand: string) {
    return this.request("/brands", "POST", { brandName: newBrand });
  }

  static getModelsByBrand() {
    return this.request(`/models`);
  }

  static createModel(brandId: number, newModel: string) {
    return this.request(`/brands/${brandId}/models`, "POST", {
      modelName: newModel,
    });
  }

  static getBikeTypes() {
    return this.request("/bikeTypes");
  }

  static createBikeType(newType: string) {
    return this.request("/bikeTypes", "POST", { name: newType });
  }

  static createReview(reviewData: {
    bikeId: number;
    userId: number;
    review: string;
    weight: number;
    engineCapacity: number;
    torque: number;
    horsePower: number;
    coverPhoto?: string;
  }) {
    return this.request("/reviews", "POST", reviewData);
  }

  static GetReviewFromSearch(searchQuery: string) {
    console.log(searchQuery, "this is api search");
    return this.request(`/reviews?search=${searchQuery}`);
  }
  static getReviewsByBike(bikeId: number) {
    return this.request(`/bikes/${bikeId}/reviews`);
  }

  static likeReview(reviewId: number, userId: number) {
    return this.request(`/reviews/${reviewId}/like`, "POST", { userId });
  }
  static getReviewByBikeId(bikeId: number) {
    return this.request(`/reviews/bike/${bikeId}`);
  }
  static getReviewBybyBrand(brandName: string) {
    return this.request(`/reviews?brandName=${brandName}`);
  }
  static getReviewBybyType(Type: string) {
    return this.request(`/reviews?type=${Type}`);
  }
  static async unlikeReview(reviewId: number, userId: number) {
    try {
      const res = await fetch(`${API_URL}/reviews/${reviewId}/like`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || res.statusText);
      }

      return res.json();
    } catch (error) {
      console.error("Error unliking review:", error);
      throw error;
    }
  }

  static makeRequest(method: string, endpoint: string, data: any = {}) {
    return this.request(endpoint, method, data);
  }
}

export default ApiService;
