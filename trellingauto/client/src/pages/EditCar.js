import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import {  editCar, getAllCars } from "../redux/actions/carsActions";

const EditCar = ({ match }) => {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id === match.params.carid));
      console.log(car);
    }
  }, [cars]);

  const onFinish = (values) => {
    values._id = car._id;

    dispatch(editCar(values));
    console.log(values);
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>
              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[
                  {
                    required: true,
                    message: "Please enter car name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[
                  {
                    required: true,
                    message: "Please input car image!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerKm"
                label="Rent per km"
                rules={[
                  {
                    required: true,
                    message: "Please enter charges per Km!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[
                  {
                    required: true,
                    message: "Please enter seating capacity!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[
                  {
                    required: true,
                    message: "Please enter fuel type!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">EDIT CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default EditCar;
