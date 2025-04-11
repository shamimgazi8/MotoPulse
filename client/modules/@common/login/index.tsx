import React, { useState } from 'react';
import { Checkbox, Form, Input, Flex } from 'antd';
import { FaPhoneAlt, FaRegUser } from 'react-icons/fa';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';

const LoginForm: React.FC = () => {
  const [isSignUp, setSignUp] = useState(false);
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      {isSignUp ? (
        <Form
          data-aos="fade-left"
          name="Signup"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <h1 className=" text-3xl text-white font-semibold w-full flex justify-center items-center mb-5">
            Sing Up
          </h1>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name',
              },
            ]}
          >
            <Input prefix={<FaRegUser />} placeholder="Your Name" />
          </Form.Item>
          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your Email Adress',
              },
            ]}
          >
            <Input
              prefix={<MdOutlineMailOutline />}
              placeholder="Email Adress"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your Phone Number',
              },
            ]}
          >
            <Input prefix={<FaPhoneAlt />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<RiLockPasswordLine />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your Confirm Password!',
              },
            ]}
          >
            <Input
              prefix={<RiLockPasswordFill />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item className=" text-white ">
            <button className="btn-secondary w-full " type="submit">
              Sign Up
            </button>
            <div className=" w-full flex flex-col  justify-center items-center">
              <div className="">
                Already have Account?{' '}
                <button
                  className=" hover:text-blue-400 transition-all "
                  onClick={() => {
                    setSignUp(false);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <Form
          data-aos="fade-left"
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <h1 className=" text-3xl text-white font-semibold w-full flex justify-center items-center mb-5">
            Login
          </h1>

          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your Email or Phone Number!',
              },
            ]}
          >
            <Input prefix={<FaRegUser />} placeholder="Email or Phone Number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<RiLockPasswordLine />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className=" text-white">Remember me</Checkbox>
              </Form.Item>
              <a className=" text-white" href="">
                Forgot password
              </a>
            </Flex>
          </Form.Item>

          <Form.Item className=" text-white ">
            <button className="btn-secondary w-full" type="submit">
              Log in
            </button>
            <div className=" w-full flex flex-col  justify-center items-center">
              <div className=" ">
                Dont&apos;t have any Account?{' '}
                <button
                  className=" hover:text-blue-400 transition-all"
                  onClick={() => {
                    setSignUp(true);
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
