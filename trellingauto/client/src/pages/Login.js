import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const onFinish = (values) => {
    dispatch(userLogin(values));
    console.log(values);
  };

  return (
    <div>
      {loading && (<Spinner />)}
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
        <h1>Login Page</h1>
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
        <Button type="primary ml-2 mt-4" htmlType="submit">
          Submit
        </Button>
        <hr />
        <Link to="/register">Click Here to Register</Link>
      </Form>
    </div>
  );
};

export default Login;
