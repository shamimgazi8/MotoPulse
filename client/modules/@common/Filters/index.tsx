import { Drawer, Select, Slider } from 'antd';
import { useState } from 'react';
import { RiArchiveDrawerLine } from 'react-icons/ri';

const Filters = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [range, setRange] = useState<[number, number]>([10000, 120000]);
  const handleRangeChange = (value: number[]) => {
    setRange([value[0], value[1]]);
    console.log('Selected Range:', value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let inputValue = e.target.value.trim();

    // Handle empty input and prevent leading zero issues
    if (inputValue === '') {
      const newRange: [number, number] = [...range] as [number, number];
      newRange[index] = 0; // Set to 0 when the input is cleared
      setRange(newRange);
      return;
    }

    // Remove leading zeros
    inputValue = inputValue.replace(/^0+/, '');

    // Parse the value as a number
    const newValue = parseInt(inputValue, 10);

    if (isNaN(newValue)) {
      // If the value is not a valid number, don't update the state
      return;
    }

    const newRange = [...range];
    newRange[index] = newValue;

    // Ensure the new range is valid
    if (newRange[0] <= newRange[1]) {
      setRange([newRange[0], newRange[1]]);
    } else {
      // Adjust the "From" and "To" values independently
      if (index === 0 && newRange[0] > range[1]) {
        setRange([newValue, range[1]]);
      } else if (index === 1 && newRange[1] < range[0]) {
        setRange([range[0], newValue]);
      }
    }
  };

  return (
    <>
      <button
        className=" flex gap-2 justify-center items-center btn-primary mb-5"
        onClick={showDrawer}
      >
        Filter
        <RiArchiveDrawerLine />
      </button>
      <Drawer
        title="Filters"
        onClose={onClose}
        open={open}
        placement="left"
        footer={
          <>
            <button className=" hover:bg-red-400 hover:text-white transition-all p-2">
              Clear All Filters
            </button>
          </>
        }
      >
        <div className="backdrop-blur-lg shadow-md  rounded flex flex-col justify-start items-center p-4 w-full">
          <div>
            {/* <h1 className="text-3xl font-semibold text-gray-600">Filters</h1> */}
          </div>
          <div className="w-full my-5 flex flex-col gap-5">
            <div>
              <Select
                className="w-full gradient-border outline-none rounded-md transition-all border-none dark:darkSelect"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                defaultValue={'ALL'}
                options={[
                  { value: '1', label: 'All' },
                  { value: '2', label: 'Available' },
                  { value: '3', label: 'Pre-Order' },
                  { value: '4', label: 'Price: Low to High' },
                  { value: '5', label: 'Price: High to Low' },
                ]}
              />
            </div>
            <div>
              <div>
                <h1>Price Range: </h1>
              </div>
              <Slider
                range={{ draggableTrack: true }}
                onChange={handleRangeChange}
                value={range}
                max={200000}
                min={5000}
              />
              <div className="grid grid-cols-2 gap-2 ">
                <div>
                  <p>From</p>
                  <input
                    // type="number"
                    placeholder="From"
                    className="p-2 w-full  gradient-border outline-none rounded transition-all text-black dark:bg-black dark:text-white"
                    value={range[0]}
                    onChange={e => handleInputChange(e, 0)}
                  />
                </div>
                <div>
                  <p>To</p>
                  <input
                    // type="number"
                    placeholder="To"
                    className="p-2  w-full gradient-border outline-none rounded transition-all text-black dark:bg-black dark:text-white"
                    value={range[1]}
                    onChange={e => handleInputChange(e, 1)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Filters;
