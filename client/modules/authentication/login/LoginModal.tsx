'use client';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import React, { useState } from 'react';
import { Button, Drawer, Input, Modal } from 'antd';
import { RiSearchEyeLine } from 'react-icons/ri';
import Link from 'next/link';
import { DiJava } from 'react-icons/di';

import LoginForm from '@/modules/@common/login';

const Loginmodal: React.FC = () => {
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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };
  const [signIn, toggle] = React.useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <button className=" btn-primary" onClick={showModal}>
        Login
      </button>

      <Drawer
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        footer={[]}
      >
        <LoginForm />
      </Drawer>
    </>
  );
};

export default Loginmodal;
