// components/BikeFilterSidebar.tsx
import React, { useEffect, useState } from "react";
import { Slider, Select, Checkbox, InputNumber, Button, Collapse } from "antd";
import ApiService from "@/service/apiService";

const { Option } = Select;
const { Panel } = Collapse;

const BikeFilterSidebar = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState<any>({
    brand: undefined,
    bikeType: undefined,
    ccRange: [100, 1000],
    priceRange: [50000, 2000000],
    abs: undefined,
    fuelType: [],
    rating: undefined,
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

  console.log("brand", brands, "types", bikeTypes);
  const handleChange = (field: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="  flex flex-col mt-5">
      <Collapse defaultActiveKey={["1", "2", "3"]}>
        <Panel header="Brand" key="1">
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
        </Panel>

        <Panel header="Bike Type" key="2">
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
        </Panel>

        <Panel header="Engine CC" key="3">
          <Slider
            range
            min={50}
            max={2000}
            step={50}
            value={filters.ccRange}
            onChange={(value) => handleChange("ccRange", value)}
          />
        </Panel>

        <Panel header="Price (₹)" key="4">
          <Slider
            range
            min={30000}
            max={2500000}
            step={10000}
            value={filters.priceRange}
            onChange={(value) => handleChange("priceRange", value)}
          />
        </Panel>

        <Panel header="Fuel Type" key="5">
          <Checkbox.Group
            options={["Petrol", "Electric"]}
            value={filters.fuelType}
            onChange={(value) => handleChange("fuelType", value)}
          />
        </Panel>

        <Panel header="ABS" key="6">
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
        </Panel>

        <Panel header="Min Rating" key="7">
          <InputNumber
            min={1}
            max={5}
            step={0.5}
            value={filters.rating}
            onChange={(value) => handleChange("rating", value)}
          />
        </Panel>
      </Collapse>

      <button
        className=" btn-secondary rounded"
        style={{ marginTop: 16 }}
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default BikeFilterSidebar;
