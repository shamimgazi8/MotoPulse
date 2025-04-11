import { Popover, Space } from 'antd';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import ProfileCard from '../profileCard';

const ProfileAvater = () => {
  const handleOpenChange = (newOpen: any) => {
    setOpen(newOpen);
  };
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    console.log('User has logged out');
    // Add your logout logic here, e.g., clearing session, redirecting, etc.
  };

  return (
    <div>
      <Popover
        content={
          <div className="">
            <ProfileCard
              name="shamim gazi "
              title="ADMIN"
              avatarUrl="https://media.istockphoto.com/id/1465504312/vector/young-smiling-man-avatar-man-with-brown-beard-mustache-and-hair-wearing-yellow-sweater-or.jpg?s=612x612&w=0&k=20&c=9AyNmOwjadmLC1PKpANKEXj56e1KxHj9h9hGknd-Rb0="
              description="An administrator is responsible for overseeing and coordinating various administrative tasks"
              onLogout={handleLogout}
            />
          </div>
        }
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <a className="cursor-pointer" onClick={e => e.preventDefault()}>
          <Space className=" flex justify-center items-center">
            <CgProfile className=" text-[25px]" />
          </Space>
        </a>
      </Popover>
    </div>
  );
};
export default ProfileAvater;
