"use client";

import React, { useEffect, useState } from "react";
import { Slider, Select, Checkbox, InputNumber, Collapse, Radio } from "antd";
import ApiService from "@/service/apiService";
import { CheckboxGroupProps } from "antd/es/checkbox";

const { Option } = Select;

const BikeFilterSidebar = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState<any>({
    sortby: "recent",
    brand: undefined,
    bikeType: undefined,
  });

  const [bikeTypes, setBikeTypes] = useState<{ id: number; name: string }[]>(
    []
  );
  const [brands, setBrands] = useState<{ id: number; brandName: string }[]>([]);
  const [tempCcRange, setTempCcRange] = useState<[number?, number?]>([
    filters.ccRange?.[0],
    filters.ccRange?.[1],
  ]);
  const [showConfirm, setShowConfirm] = useState(false);

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

  useEffect(() => {
    onApplyFilters(filters);
  }, [filters]); // Runs only when filters state updates

  const handleChange = (field: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  const onRadioChange = (value: any) => {
    setFilters((prev: any) => {
      const updatedFilters = { ...prev, sortby: value };

      return updatedFilters;
    });
  };

  const options: CheckboxGroupProps<string>["options"] = [
    { label: "Recent Reviews", value: "recent" },
    { label: "Most Popular", value: "popular" },
  ];

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
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <InputNumber
              min={50}
              max={2000}
              step={50}
              value={tempCcRange[0]}
              onChange={(value) =>
                setTempCcRange([value ?? undefined, tempCcRange[1] ?? 2000])
              }
              placeholder="Min CC"
              style={{ width: "100%" }}
            />
            <InputNumber
              min={50}
              max={2000}
              step={50}
              value={tempCcRange[1]}
              onChange={(value) =>
                setTempCcRange([tempCcRange[0] ?? 50, value ?? undefined])
              }
              placeholder="Max CC"
              style={{ width: "100%" }}
            />
          </div>
          {tempCcRange[0] !== filters.ccRange?.[0] ||
          tempCcRange[1] !== filters.ccRange?.[1] ? (
            <button
              className="btn-outline hover:bg-white hover:text-black transition-all px-2 py-1"
              onClick={() => {
                handleChange("ccRange", tempCcRange);
                setShowConfirm(true);
              }}
            >
              Confirm
            </button>
          ) : null}
          {tempCcRange[0] != null || tempCcRange[1] != null ? (
            <button
              className="btn-outline hover:bg-white hover:text-black transition-all px-2 py-1"
              onClick={() => {
                setTempCcRange([undefined, undefined]);
                handleChange("ccRange", undefined);
                setShowConfirm(false);
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col mt-5 gap-5">
      <Radio.Group
        onChange={(e) => onRadioChange(e.target.value)}
        block
        options={options}
        defaultValue="recent"
        buttonStyle="solid"
      />
      <Collapse defaultActiveKey={["1", "2", "3"]} items={collapseItems} />
    </div>
  );
};

export default BikeFilterSidebar;
