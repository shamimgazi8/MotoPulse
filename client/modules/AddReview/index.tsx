"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaCloudUploadAlt } from "react-icons/fa";

const { Option } = Select;

const mockBrands = [
  { id: 1, name: "Yamaha" },
  { id: 2, name: "Honda" },
  { id: 3, name: "Kawasaki" },
];

const mockModels = [
  { id: 1, name: "R15", brandId: 1 },
  { id: 2, name: "CBR500R", brandId: 2 },
  { id: 3, name: "Ninja 400", brandId: 3 },
];

const mockTypes = [
  { id: 1, name: "Sport" },
  { id: 2, name: "Cruiser" },
  { id: 3, name: "Touring" },
];

const BikeReviewForm = () => {
  const [brandId, setBrandId] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [engineCapacity, setEngineCapacity] = useState("");
  const [torque, setTorque] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [weight, setWeight] = useState("");
  const [review, setReview] = useState("");

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
      brandId,
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

  const filteredModels = mockModels.filter((m) => m.brandId === brandId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 bg-white dark:bg-black shadow-xl rounded-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add a Bike Review
        </h2>

        <div className=" grid grid-cols-2 gap-5 mb-5 border-b-[2px] border-gray-300 pb-5">
          {/* Brand */}
          <div>
            <label className="block mb-1 text-sm font-medium ">Brand</label>
            <Select
              placeholder="Select Brand"
              className="w-full border border-gray-300 rounded-md"
              value={brandId ?? undefined}
              onChange={(value) => {
                setBrandId(value);
                setModelId(null); // reset model when brand changes
              }}
            >
              {mockBrands.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Model */}
          <div>
            <label className="block mb-1 text-sm font-medium ">Model</label>
            <Select
              placeholder="Select Model"
              className="w-full border border-gray-300 rounded-md"
              value={modelId ?? undefined}
              onChange={(value) => setModelId(value)}
              disabled={!brandId}
            >
              {filteredModels.map((model) => (
                <Option key={model.id} value={model.id}>
                  {model.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 text-sm font-medium ">Type</label>
            <Select
              placeholder="Select Type"
              className="w-full border border-gray-300 rounded-md"
              value={typeId ?? undefined}
              onChange={(value) => setTypeId(value)}
            >
              {mockTypes.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-1 text-sm font-medium ">
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
          <button className=" btn-primary">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default BikeReviewForm;
