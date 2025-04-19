"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Select, Upload, Button, message } from "antd";
import Cookies from "js-cookie";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { jwtDecode } from "jwt-decode";

const { Option } = Select;

const mockModels = [
  { id: 1, name: "R15", brand_id: 1 },
  { id: 2, name: "CBR500R", brand_id: 2 },
  { id: 3, name: "Ninja 400", brand_id: 3 },
];

const mockTypes = [
  { id: 1, name: "Sport" },
  { id: 2, name: "Cruiser" },
  { id: 3, name: "Touring" },
];

const BikeReviewForm = () => {
  const [brandOptions, setBrandOptions] = useState<any[]>([]);
  const [modelOptions, setModelOptions] = useState<any[]>([]);
  const [typeOptions, setTypeOptions] = useState<any[]>([]);

  const [brand_id, setbrand_id] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [engineCapacity, setEngineCapacity] = useState("");
  const [torque, setTorque] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [weight, setWeight] = useState("");
  const [review, setReview] = useState("");

  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  const [isAddingModel, setIsAddingModel] = useState(false);
  const [newModelName, setNewModelName] = useState("");

  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const [customToast, setCustomToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [showToastAnimation, setShowToastAnimation] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setCustomToast({ message, type });

    // Wait for next render before triggering animation
    setTimeout(() => {
      setShowToastAnimation(true);
    }, 10); // tiny delay to ensure transition works

    setTimeout(() => {
      setShowToastAnimation(false); // Start hide animation
      setTimeout(() => {
        setCustomToast(null); // Remove toast from DOM after animation
      }, 500);
    }, 3000);
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

    const token = Cookies.get("token"); // Retrieve the token from cookies
    if (!token) {
      showToast("You must be logged in to add a brand.", "error");
      return;
    }

    // Decode the token to extract user_id
    const decodedToken: any = jwtDecode(token);

    const userId = decodedToken?.id;

    if (!userId) {
      showToast("User ID is missing in token.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in Authorization header
        },
        body: JSON.stringify({
          brandName: trimmedName,
          user_id: userId, // Send the user_id in the request body
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add brand");
      }

      const newBrand = await response.json();
      setBrandOptions([...brandOptions, newBrand]);
      setbrand_id(newBrand.id);
      setNewBrandName("");
      setIsAddingBrand(false);
      showToast("Brand added successfully!", "success");
    } catch (error) {
      console.error("Error adding brand:", error);
      showToast("Error adding brand", "error");
    }
  };
  const handleAddModel = () => {
    const trimmedName = newModelName.trim();
    if (trimmedName === "" || !brand_id) return;

    const isDuplicate = modelOptions.some(
      (model) =>
        model.name.toLowerCase() === trimmedName.toLowerCase() &&
        model.brand_id === brand_id
    );

    if (isDuplicate) {
      showToast(`"${trimmedName}" already exists for this brand.`, "error");
      return;
    }

    const newId = modelOptions.length + 1;
    const newModel = { id: newId, name: trimmedName, brand_id };
    setModelOptions([...modelOptions, newModel]);
    setModelId(newId);
    setNewModelName("");
    setIsAddingModel(false);
    showToast("Model added successfully!", "success");
  };

  const handleAddType = () => {
    const trimmedName = newTypeName.trim();
    if (trimmedName === "") return;

    const isDuplicate = typeOptions.some(
      (type) => type.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      showToast(`"${trimmedName}" already exists in the list.`, "error");
      return;
    }

    const newId = typeOptions.length + 1;
    const newType = { id: newId, name: trimmedName };
    setTypeOptions([...typeOptions, newType]);
    setTypeId(newId);
    setNewTypeName("");
    setIsAddingType(false);
    showToast("Type added successfully!", "success");
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      const file = info.file.originFileObj;
      if (file) {
        setImage(file);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      brand_id,
      modelId,
      typeId,
      engineCapacity,
      torque,
      horsePower,
      weight,
      review,
      image,
    };

    console.log("Submitted Data:", formData);
    message.success("Review submitted (see console for now)");
  };

  const filteredModels = modelOptions.filter((m) => m.brand_id === brand_id);

  // Fetch brands from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, modelsRes, typeRes] = await Promise.all([
          fetch("http://localhost:4000/brands"),
          fetch("http://localhost:4000/models"),
          fetch("http://localhost:4000/bikeTypes"),
        ]);

        if (!brandsRes.ok || !modelsRes.ok || !typeRes.ok) {
          throw new Error("One or more requests failed");
        }

        const brandsData = await brandsRes.json();
        const modelsData = await modelsRes.json();
        const typesData = await typeRes.json();

        console.log(brandsData, "data from brand");
        console.log(modelsData?.result, "model data");
        console.log(typesData?.result, "typesData data");

        setBrandOptions(brandsData);
        setModelOptions(modelsData?.result);
        setTypeOptions(typesData?.result);
      } catch (error) {
        console.error("Error fetching brands or models:", error);
        showToast("Failed to load brand and model data", "error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 dark:text-white relative">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 bg-white dark:bg-black shadow-xl rounded-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add a Bike Review
        </h2>

        <div className="grid grid-cols-2 gap-5 mb-5 border-b-[2px] border-gray-300 pb-5">
          {/* Brand */}
          <div>
            <label className="block mb-1 text-sm font-medium">Brand</label>
            <Select
              placeholder="Select Brand"
              className="w-full   rounded-md"
              value={brand_id ?? undefined}
              onChange={(value) => {
                setbrand_id(value);
                setModelId(null);
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
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-300 transition-all"
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
              placeholder="Select Model"
              className="w-full   rounded-md"
              value={modelId ?? undefined}
              onChange={(value) => setModelId(value)}
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
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-300 transition-all"
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
              placeholder="Select Type"
              className="w-full  rounded-md"
              value={typeId ?? undefined}
              onChange={(value) => setTypeId(value)}
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
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-green-300 transition-all"
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

          {/* Cover Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Cover Image
            </label>
            <Upload
              beforeUpload={() => false}
              onChange={handleUploadChange}
              maxCount={1}
              showUploadList={{ showPreviewIcon: false }}
            >
              <Button icon={<FaCloudUploadAlt />}>Click to Upload</Button>
            </Upload>
            {image && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {image.name}
              </p>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Engine Capacity (cc)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
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
              type="text"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
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
              type="text"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
              value={horsePower}
              onChange={(e) => setHorsePower(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Weight (kg)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Review */}
        <div>
          <label className="block mb-1 text-sm font-medium">Review</label>
          <textarea
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button className="btn-primary">Submit Review</button>
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
    </div>
  );
};

export default BikeReviewForm;
