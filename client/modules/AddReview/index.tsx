"use client";
import { useState, useEffect, FormEvent, useRef } from "react";
import { Select, Button, Spin } from "antd";
import Cookies from "js-cookie";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { getUserIdFromToken } from "@/utils/utils";
import CoverImageUpload, {
  CoverImageUploadRef,
} from "./components/UploadCover";

import DoneCheckmark from "../@common/DoneCheck";
import ScrollToTopButton from "../home/@components/ScrollTopTobutton";
import FullPagePopup from "../@common/fullpagePopUp/FullPagePopup";
import {
  useAddBikeMutation,
  useAddBrandMutation,
  useAddModelMutation,
  useAddTypeMutation,
  useGetAllBikesQuery,
  useGetModelsQuery,
} from "@/service/bikeApi";
import {
  useGetBikeTypesQuery,
  useGetBrandsQuery,
} from "@/service/brand_model_typeApi";
import { useAddReviewMutation } from "@/service/reviewsApi";

const { Option } = Select;

const BikeReviewForm = () => {
  const [getAllbike, setAllBike] = useState<any[]>([]);
  const [brandOptions, setBrandOptions] = useState<any[]>([]);
  const [modelOptions, setModelOptions] = useState<any[]>([]);
  const [typeOptions, setTypeOptions] = useState<any[]>([]);

  const [brand_id, setbrand_id] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [engineCapacity, setEngineCapacity] = useState("");
  const [torque, setTorque] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [weight, setWeight] = useState("");
  const [review, setReview] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const uploadRef = useRef<CoverImageUploadRef>(null);

  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [restForm, setFormrest] = useState(false);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [bike_id, setBike_id] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [addBrand, { isLoading, isError, error }] = useAddBrandMutation();
  const [addModel] = useAddModelMutation();
  const [addType] = useAddTypeMutation();
  const {
    data: brandsData,
    error: brandsError,
    isLoading: isBrandsLoading,
  } = useGetBrandsQuery();
  const {
    data: modelsData,
    error: modelsError,
    isLoading: isModelsLoading,
  } = useGetModelsQuery();
  const {
    data: typesData,
    error: typesError,
    isLoading: isTypesLoading,
  } = useGetBikeTypesQuery();
  const [customToast, setCustomToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [showToastAnimation, setShowToastAnimation] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Add token state

  // Fetch token in useEffect to ensure it's only done on the client-side
  useEffect(() => {
    const storedToken = Cookies.get("token");
    setToken(storedToken || ""); // Set token from cookies after the initial render
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setCustomToast({ message, type });

    // Wait for next render before triggering animation
    setTimeout(() => {
      setShowToastAnimation(true);
    }, 20); // tiny delay to ensure transition works

    setTimeout(() => {
      setShowToastAnimation(false); // Start hide animation
      setTimeout(() => {
        setCustomToast(null); // Remove toast from DOM after animation
      }, 1000);
    }, 6000);
  };

  const handleAddBrand = async () => {
    const trimmedName = newBrandName.trim();
    if (trimmedName === "") return;

    const isDuplicate = brandOptions.some(
      (brand) => brand.brandName?.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      showToast(`"${trimmedName}" already exists in the list.`, "error");
      return;
    }

    const userId = getUserIdFromToken();

    if (!userId) {
      showToast("User ID is missing in token.", "error");
      return;
    }

    try {
      // Call the mutation with data
      const response = await addBrand({
        brandName: trimmedName,
        user_id: userId,
      }).unwrap();

      setBrandOptions([...brandOptions, response]);
      setbrand_id(response?.id);
      setNewBrandName(""); // Reset input field
      showToast("Brand added successfully!", "success");
    } catch (err) {
      console.error("Error adding brand:", error);
      showToast("Error adding brand", "error");
    }
  };
  const handleAddModel = async () => {
    const trimmedName = newModelName.trim();

    if (trimmedName === "" || !brand_id) return;

    const isDuplicate = modelOptions.some(
      (model) =>
        model?.name?.toLowerCase?.() === trimmedName.toLowerCase() &&
        model.brand_id === brand_id
    );

    if (isDuplicate) {
      showToast(`"${trimmedName}" already exists for this brand.`, "error");
      return;
    }
    const userId = getUserIdFromToken();
    if (!userId) {
      showToast("User ID is missing in token.", "error");
      return;
    }

    try {
      const response = await addModel({
        modelName: trimmedName,
        brand_id,
        manufacturer: "bd",
        year: 11,
      }).unwrap();

      setModelOptions([...modelOptions, response]);
      setModelId(response?.id);
      setNewModelName("");
      showToast("Model added successfully!", "success");
      setIsAddingModel(false);
    } catch (error) {
      console.error("Error adding Model:", error);
      showToast("Error adding Model", "error");
    }
  };

  const handleAddType = async () => {
    const trimmedName = newTypeName.trim();
    if (trimmedName === "") return;

    const isDuplicate = typeOptions.some(
      (type) => type.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      showToast(`"${trimmedName}" already exists in the list.`, "error");
      return;
    }

    // try {
    //   const response = await fetch("http://localhost:4000/bikeTypes", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`, // Send the token in Authorization header
    //     },
    //     body: JSON.stringify({
    //       name: trimmedName,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to add bikeTypes");
    //   }
    //   const newId = typeOptions.length + 1;
    //   const newType = { id: newId, name: trimmedName };
    //   setTypeOptions([...typeOptions, newType]);
    //   setTypeId(newId);
    //   setNewTypeName("");
    //   setIsAddingType(false);
    //   showToast("Type added successfully!", "success");
    // } catch (error) {
    //   console.error("Error adding brand:", error);
    //   showToast("Error adding brand", "error");
    // }
    try {
      const response = await addType({
        name: trimmedName,
      }).unwrap();

      setTypeOptions([...typeOptions, response]);
      setTypeId(response?.id);
      setNewTypeName("");
      showToast("Bike Type added successfully!", "success");
      setIsAddingType(false);
    } catch (error) {
      console.error("Error adding Bike Type:", error);
      showToast("Error adding Bike Type", "error");
    }
  };

  const [addBike, { isLoading: isAddingBike }] = useAddBikeMutation();
  const handelAddNewBike = async () => {
    if (!brand_id || !modelId || !typeId) {
      showToast("Please fill all fields to add a bike", "error");
      return;
    }

    const userId = getUserIdFromToken();
    if (!userId) {
      showToast("User authentication failed!", "error");
      return;
    }

    const newBike = {
      brand_id: brand_id,
      model_id: modelId,
      bike_type_id: typeId,
      imgUrl: "null",
      engineCC: engineCapacity,
      horsePower: horsePower,
      torque: torque,
      weight: weight,
    };

    try {
      setIsPosting(true);
      const responseData = await addBike(newBike).unwrap();

      setPostSuccess(true);
      setBike_id(responseData?.bike?.id);
      showToast("Bike added successfully!", "success");
    } catch (error: any) {
      console.error("Error adding bike:", error);
      showToast(error?.data?.message || "Failed to add bike", "error");
    } finally {
      setIsPosting(false);
    }
  };

  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (!userId)
      return showToast("You must be logged in to submit a review", "error");

    const formData = {
      bike_id,
      user_id: userId,
      review,
      coverPhoto,
      like_count: 0,
    };

    try {
      await addReview(formData).unwrap();

      // Reset form fields
      setFormrest(true);
      setbrand_id(null);
      setModelId(null);
      setTypeId(null);
      setEngineCapacity("");
      setTorque("");
      setHorsePower("");
      setWeight("");
      setReview("");
      setCoverPhoto(null);
      uploadRef.current?.reset();

      setIsPopupOpen(true);
    } catch (error: any) {
      console.error("Error submitting review:", error.message);
      showToast("Error submitting review", "error");
    }
  };
  const filteredModels = modelOptions.filter((m) => m.brand_id === brand_id);

  // Fetch brands from API on mount

  useEffect(() => {
    if (brandsError || modelsError || typesError) {
      showToast("Failed to load brand and model data", "error");
      console.error(
        "Error fetching data:",
        brandsError || modelsError || typesError
      );
    }

    if (!isBrandsLoading && brandsData) {
      setBrandOptions(brandsData);
    }
    if (!isModelsLoading && modelsData) {
      setModelOptions(modelsData);
    }
    if (!isTypesLoading && typesData) {
      setTypeOptions(typesData);
    }
  }, [
    brandsData,
    modelsData,
    typesData,
    brandsError,
    modelsError,
    typesError,
    isBrandsLoading,
    isModelsLoading,
    isTypesLoading,
  ]);

  // RTK Query hook for fetching bike lists
  const {
    data: allBikeList,
    error: bikesError,
    isLoading: bikesLoading,
  } = useGetAllBikesQuery(
    {
      brandId: brand_id ?? 0,
      modelId: modelId ?? 0,
      typeId: typeId ?? 0,
    },
    {
      skip: !brand_id || !modelId || !typeId, // Prevent API call if any of these are missing
    }
  );

  // Effect to update form fields based on the fetched bike data
  useEffect(() => {
    if (allBikeList && allBikeList.result && allBikeList.result.length > 0) {
      setEngineCapacity(allBikeList.result[0].engineCC || "");
      setWeight(allBikeList.result[0].weight || "");
      setTorque(allBikeList.result[0].torque || "");
      setHorsePower(allBikeList.result[0].horsePower || "");

      setBike_id(allBikeList.result[0]?.id);
    } else {
      setEngineCapacity("");
      setWeight("");
      setTorque("");
      setHorsePower("");
    }
  }, [allBikeList]);

  // Handle errors when fetching bike list
  useEffect(() => {
    if (bikesError) {
      showToast("Failed to load all bikes", "error");
      console.error("Error fetching all bikes:", bikesError);
    }
  }, [bikesError]);

  return (
    <div className="dark:bg-[url('/misc/bg1.jpg')] bg-cover bg-center bg-no-repeat min-h-screen bg-gray-100 dark:text-white relative">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 bg-white/30 dark:bg-black/10 backdrop-blur-lg rounded-xl space-y-6 [&_label]:mb-3"
      >
        <div className=" flex justify-center items-center">
          <h2 className="text-[30px] font-bold text-gray-800 dark:text-white gradient-text text-center leading-10 tracking-widest w-[60%] ">
            Add a Bike Review
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5 ">
          {/* Brand */}
          <div>
            <label className="block mb-1 text-sm font-medium">Brand</label>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select Brand"
              className="w-full   rounded-md"
              value={brand_id ?? undefined}
              onChange={(value) => {
                setbrand_id(value);
                setModelId(null);
                setTypeId(null);
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div className="p-2 border-t border-gray-200">
                    {isAddingBrand ? (
                      <div className="flex items-center gap-2">
                        <input
                          placeholder="New brand name"
                          value={newBrandName}
                          onChange={(e) => setNewBrandName(e.target.value)}
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-300 transition-all text-black"
                        />
                        <button onClick={handleAddBrand}>
                          <IoMdAdd className=" text-green-500 h-6 w-6 hover:scale-125 transition-all" />
                        </button>
                        <button
                          className=""
                          onClick={() => {
                            setIsAddingBrand(false);
                            setNewBrandName("");
                          }}
                        >
                          <MdCancel className=" text-red-500  h-6 w-6 hover:scale-125 transition-all" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => setIsAddingBrand(true)}
                      >
                        + Add new brand
                      </Button>
                    )}
                  </div>
                </>
              )}
            >
              {brandOptions.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </div>

          {/* Model */}
          <div>
            <label className="block mb-1 text-sm font-medium">Model</label>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select Model"
              className="w-full   rounded-md"
              value={modelId ?? undefined}
              onChange={(value) => {
                setModelId(value);
              }}
              disabled={!brand_id}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div className="p-2 border-t border-gray-200">
                    {isAddingModel ? (
                      <div className="flex items-center gap-2">
                        <input
                          placeholder="New model name"
                          value={newModelName}
                          onChange={(e) => setNewModelName(e.target.value)}
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-300 transition-all text-black"
                        />
                        <button onClick={handleAddModel}>
                          <IoMdAdd className=" text-green-500 h-6 w-6 hover:scale-125 transition-all" />
                        </button>
                        <button
                          className=""
                          onClick={() => {
                            setIsAddingModel(false);
                            setNewModelName("");
                          }}
                        >
                          <MdCancel className=" text-red-500  h-6 w-6 hover:scale-125 transition-all" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => setIsAddingModel(true)}
                      >
                        + Add new model
                      </Button>
                    )}
                  </div>
                </>
              )}
            >
              {filteredModels.map((model) => (
                <Option key={model.id} value={model.id}>
                  {model?.modelName}
                </Option>
              ))}
            </Select>
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 text-sm font-medium">Type</label>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select Type"
              className="w-full  rounded-md"
              value={typeId ?? undefined}
              onChange={(value) => {
                setTypeId(value);
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div className="p-2 border-t border-gray-200">
                    {isAddingType ? (
                      <div className="flex items-center gap-2">
                        <input
                          placeholder="New type name"
                          value={newTypeName}
                          onChange={(e) => setNewTypeName(e.target.value)}
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-300 transition-all text-black"
                        />
                        <button onClick={handleAddType}>
                          <IoMdAdd className=" text-green-500 h-6 w-6 hover:scale-125 transition-all" />
                        </button>
                        <button
                          className=""
                          onClick={() => {
                            setIsAddingType(false);
                            setNewTypeName("");
                          }}
                        >
                          <MdCancel className=" text-red-500  h-6 w-6 hover:scale-125 transition-all" />
                        </button>
                      </div>
                    ) : (
                      <Button type="link" onClick={() => setIsAddingType(true)}>
                        + Add new type
                      </Button>
                    )}
                  </div>
                </>
              )}
            >
              {typeOptions.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Weight (kg)
            </label>
            <input
              placeholder="Input Wight"
              type="number"
              className="w-full h-[32px] p-2 border rounded border-gray-300 dark:bg-[#141414] dark:border-[#141414] focus:outline-none focus:ring-1 focus:ring-green-500/50 dark:focus:ring-gray-500/50 focus:border-green-500/50 transition-all appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] placeholder:text-[12px] placeholder:text-[#4F4F4F]"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Engine Capacity (cc)
            </label>
            <input
              placeholder="Input CC"
              type="number"
              className="w-full h-[32px] p-2 border rounded border-gray-300 dark:bg-[#141414] dark:border-[#141414] focus:outline-none focus:ring-1 focus:ring-green-500/50 dark:focus:ring-gray-500/50 focus:border-green-500/50 transition-all appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] placeholder:text-[12px] placeholder:text-[#4F4F4F]"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Torque (Nm)
            </label>
            <input
              placeholder="Input Torque"
              type="number"
              className="w-full h-[32px] p-2 border rounded border-gray-300 dark:bg-[#141414] dark:border-[#141414] focus:outline-none focus:ring-1 focus:ring-green-500/50 dark:focus:ring-gray-500/50 focus:border-green-500/50 transition-all appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] placeholder:text-[12px] placeholder:text-[#4F4F4F]"
              value={torque}
              onChange={(e) => setTorque(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Horse Power (HP)
            </label>
            <input
              placeholder="Input HP"
              type="number"
              className="w-full h-[32px] p-2 border rounded border-gray-300 dark:bg-[#141414] dark:border-[#141414] focus:outline-none focus:ring-1 focus:ring-green-500/50 dark:focus:ring-gray-500/50 focus:border-green-500/50 transition-all appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] placeholder:text-[12px] placeholder:text-[#4F4F4F]"
              value={horsePower}
              onChange={(e) => setHorsePower(e.target.value)}
              required
            />
          </div>

          {getAllbike?.length == 0 && brand_id && modelId && typeId && (
            <button
              type="button"
              onClick={handelAddNewBike}
              className={`px-2 py-1 border-[2px] rounded focus:outline-none flex justify-center items-center gap-2 transition-all h-[40px] mt-6
                ${
                  postSuccess
                    ? "bg-white text-black border-black hover:bg-black hover:text-white"
                    : "bg-black text-white border-black hover:bg-white hover:text-black"
                }
              `}
            >
              {isPosting ? (
                <Spin />
              ) : postSuccess ? (
                <DoneCheckmark size={25} />
              ) : (
                "ADD BIKE"
              )}
            </button>
          )}
        </div>
        {/* Cover Image */}
        <div className=" w-full flex justify-center items-center  border-b-[2px] border-gray-300 dark:border-gray-700 pb-5">
          <CoverImageUpload
            onUploadSuccess={(url) => {
              setCoverPhoto(url);

              // save it in form state or send with form submission
            }}
          />
        </div>

        {/* Review */}
        <div>
          <label className="block mb-1 text-sm font-medium">Review</label>
          <textarea
            className="w-full  p-2 border rounded border-gray-300 dark:bg-[#141414] dark:border-[#141414] focus:outline-none focus:ring-1 focus:ring-green-500/50 dark:focus:ring-gray-500/50 focus:border-green-500/50 transition-all"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-right flex justify-end items-end">
          <button className="mt-4 btn-secondary rounded">Submit Review</button>
        </div>
      </form>
      {/* Custom Toast */}
      {customToast && (
        <div
          className={`fixed top-[100px] right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 transition-all duration-500 ease-in-out transform
    ${customToast.type === "error" ? "bg-red-500 border-red-600 " : "bg-green-500 border-green-600"}
    ${showToastAnimation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
    border-b-[6px] `}
        >
          {customToast.message}
        </div>
      )}
      <ScrollToTopButton />
      <FullPagePopup isOpen={isPopupOpen} />;
    </div>
  );
};

export default BikeReviewForm;
