import { Popover, Space, Button } from "antd";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ProfileCard from "../profileCard";
import ProfileCardWrapper from "../profileCard/ProfileWrapped";

type JWTPayload = {
  name: string;
  role: string;
  avatarUrl: string;
  description?: string;
  exp: number;
  iat: number;
};

const ProfileAvater = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<JWTPayload | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: JWTPayload = jwtDecode(token);

        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          Cookies.remove("token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error("Invalid token");
        Cookies.remove("token");
      }
    }
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    setOpen(false);
    console.log("User logged out");
    window.location.href = "/users/login";
  };

  const handleLogin = () => {
    console.log("Redirect to login");
    window.location.href = "/users/login";
    // Example: router.push('/login');
  };

  const handleSignup = () => {
    console.log("Redirect to signup");
    window.location.href = "/users/signup";
    // Example: router.push('/signup');
  };

  const content = user ? (
    <ProfileCardWrapper />
  ) : (
    <div className="space-y-2 text-center">
      <p className="text-gray-700 dark:text-white text-sm">
        Welcome! Please log in or sign up.
      </p>
      <div className="flex justify-center gap-2">
        <button className=" btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button onClick={handleSignup} className="btn-primary">
          Sign Up
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Popover
        content={content}
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
          <Space className="flex justify-center items-center">
            <CgProfile className="text-[28px]" />
          </Space>
        </a>
      </Popover>
    </div>
  );
};

export default ProfileAvater;
