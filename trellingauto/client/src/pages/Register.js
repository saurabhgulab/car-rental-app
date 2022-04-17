import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

const Register = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(userRegister(values));
    console.log(values);
  };

  return (
    <Form
      onFinish={onFinish}
      name="basic"
      wrapperCol={{
        span: 8,
      }}
      labelCol={{
        span: 8,
      }}
    >
      <h1>Registeration Page</h1>
      <hr />
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="cpassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary ml-2 mt-4" htmlType="submit">
        Submit
      </Button>
      <hr />
      <Link to="/login">Click Here to Login</Link>
    </Form>
  );
};

export default Register;
