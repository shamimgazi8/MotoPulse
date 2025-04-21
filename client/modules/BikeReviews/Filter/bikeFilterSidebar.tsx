"use client";

import React, { useEffect, useState } from "react";
import { Slider, Select, Checkbox, InputNumber, Collapse } from "antd";
import ApiService from "@/service/apiService";

const { Option } = Select;

const BikeFilterSidebar = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState<any>({
    brand: undefined,
    bikeType: undefined,
    ccRange: [100, 160],
    priceRange: [50000, 2000000],
    abs: undefined,
  });

  const [bikeTypes, setBikeTypes] = useState<{ id: number; name: string }[]>(
    []
  );
  const [brands, setBrands] = useState<{ id: number; brandName: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brands, types] = await Promise.all([
          ApiService.getBrands(),
          ApiService.getBikeTypes(),
        ]);

        setBrands(brands);
        setBikeTypes(types?.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const collapseItems = [
    {
      key: "1",
      label: "Brand",
      children: (
        <Select
          allowClear
          placeholder="Select Brand"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("brand", value)}
        >
          {brands.map((brand: any) => (
            <Option key={brand.id} value={brand.brandName}>
              {brand.brandName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "2",
      label: "Bike Type",
      children: (
        <Select
          allowClear
          placeholder="Select Type"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("bikeType", value)}
        >
          {bikeTypes?.map((type: any) => (
            <Option key={type.id} value={type.name}>
              {type.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "3",
      label: "Engine CC",
      children: (
        <Slider
          range
          min={50}
          max={2000}
          step={50}
          value={filters.ccRange}
          onChange={(value) => handleChange("ccRange", value)}
        />
      ),
    },
    {
      key: "4",
      label: "Price",
      children: (
        <Slider
          range
          min={30000}
          max={2500000}
          step={10000}
          value={filters.priceRange}
          onChange={(value) => handleChange("priceRange", value)}
        />
      ),
    },

    {
      key: "6",
      label: "ABS",
      children: (
        <Select
          allowClear
          placeholder="ABS Type"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("abs", value)}
        >
          <Option value="None">None</Option>
          <Option value="Single Channel">Single Channel</Option>
          <Option value="Dual Channel">Dual Channel</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="flex flex-col mt-5">
      <Collapse defaultActiveKey={["1", "2", "3"]} items={collapseItems} />
      <button
        className="btn-secondary rounded"
        style={{ marginTop: 16 }}
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default BikeFilterSidebar;
