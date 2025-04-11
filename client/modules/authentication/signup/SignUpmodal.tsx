'use client';
import { Modal } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loginmodal from '../login/LoginModal';
const SignUpModal: React.FC = ({ button }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <>
      <button className=" btn-primary" onClick={showModal}>
        SignUp
      </button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className=" flex items-center justify-center ">
          <div className="p-8 rounded-lg  w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="gradient-border outline-none mt-1 w-full px-3 py-2  text-black font-semibold rounded-md transition-all"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="gradient-border outline-none mt-1 w-full px-3 py-2  text-black font-semibold rounded-md transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="gradient-border outline-none mt-1 w-full px-3 py-2  text-black font-semibold rounded-md transition-all"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className=" text-black" />
                    ) : (
                      <FaEye className=" text-black" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirm-password"
                  className="block text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    className="gradient-border outline-none mt-1 w-full px-3 py-2  text-black font-semibold rounded-md transition-all"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className=" text-black" />
                    ) : (
                      <FaEye className=" text-black" />
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className={`${'btn-primary w-full'}`}>
                Sign Up
              </button>
              <div
                key={1}
                className=" w-full flex justify-center items-center mt-2"
              >
                Already Have Account?{' '}
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  <Loginmodal />
                </span>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUpModal;
