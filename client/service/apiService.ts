// services/apiService.ts

export const apiService = {
  async fetchBrands() {
    const response = await fetch("http://localhost:4000/brands");
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  },

  async fetchModels() {
    const response = await fetch("http://localhost:4000/models");
    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }
    return response.json();
  },

  async fetchTypes() {
    const response = await fetch("http://localhost:4000/bikeTypes");
    if (!response.ok) {
      throw new Error("Failed to fetch bike types");
    }
    return response.json();
  },

  async addBrand(brandName: string, userId: string, token: string) {
    const response = await fetch("http://localhost:4000/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        brandName,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add brand");
    }

    return response.json();
  },

  async addModel(modelName: string, brandId: number, token: string) {
    const response = await fetch("http://localhost:4000/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        modelName,
        brand_id: brandId,
        manufacturer: "bd", // Static value, adjust as needed
        year: 11, // Static value, adjust as needed
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add model");
    }

    return response.json();
  },

  async addType(typeName: string, token: string) {
    const response = await fetch("http://localhost:4000/bikeTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: typeName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add bike type");
    }

    return response.json();
  },

  async addBike(newBike: any, token: string) {
    const response = await fetch("http://localhost:4000/bikeLists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBike),
    });

    if (!response.ok) {
      throw new Error("Failed to add bike");
    }

    return response.json();
  },

  async submitReview(formData: any, token: string) {
    const response = await fetch("http://localhost:4000/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    return response.json();
  },

  async fetchAllBikes(brandId: number, modelId: number, typeId: number) {
    const response = await fetch(
      `http://localhost:4000/bikeLists?brandId=${brandId}&modelId=${modelId ?? 0}&typeId=${typeId ?? 0}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch all bikes");
    }

    return response.json();
  },
};
