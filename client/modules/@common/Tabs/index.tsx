import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Overview',
    children: (
      <div className=" dark:text-white flex gap-2 flex-col mb-5">
        <span>
          Materials: Mahogany & Red Oak Veneered engineering wood with PU
          lacquer
        </span>
        <span>Size (Inch): 71Wx63Dx30H</span>
        <span>Delivery: Within 3 to 15 days</span>
        <span>
          Warranty: One year free service warranty for any manufacturing fault.
        </span>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Description',
    children: (
      <div className=" dark:text-white flex gap-2 flex-col mb-5">
        <span>
          The actual color of the physical product may slightly vary due to the
          deviation of lighting sources, photography or your device display
          settings.
        </span>
      </div>
    ),
  },
  {
    key: '3',
    label: 'Reviews',
    children: (
      <div className=" dark:text-white flex gap-2 flex-col mb-5">
        <span>Customer Reviews</span>
        <span>
          {' '}
          The actual color of the physical product may slightly vary due to the
          deviation of lighting sources, photography or your device display
          settings.
        </span>
      </div>
    ),
  },
];

const Tab: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default Tab;
