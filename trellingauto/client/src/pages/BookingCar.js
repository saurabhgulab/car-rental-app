import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;

const BookingCar = ({ match }) => {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  //time calculation
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  //price calculation
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerKm);
    if (driver) {
      setTotalAmount(totalAmount + 100 * totalHours);
    }
  }, [driver, totalHours]);

  const selectTimeSlots = (values) => {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      <>
        {loading && <Spinner />}
        <Row
          justify="center"
          className="d-flex align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <Col lg={10} sm={24} xs={24} className="p-3">
            <img
              src={car.image}
              className="carimg2 bs1 w-100"
            />
          </Col>

          <Col lg={10} sm={24} xs={24} className="text-right">
            <Divider type="horizontal" plain>
              Car Info
            </Divider>
            <div style={{ textAlign: "right" }}>
              <p>{car.name}</p>
              <p>{car.rentPerKm} Rent Per km /-</p>
              <p>Fuel Type : {car.fuelType}</p>
              <p>Max Persons : {car.capacity}</p>
            </div>

            <Divider type="horizontal" plain>
              Select Time Slots
            </Divider>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MMM DD yyyy HH:mm"
              onChange={selectTimeSlots}
            />
            <br />
            <button
              className="btn1 mt-2"
              onClick={() => {
                setShowModal(true);
              }}
            >
              See Booked Slots
            </button>
            {from && to && (
              <div>
                <p>
                  Total Hours : <b>{totalHours}</b>
                </p>
                <p>
                  Rent Per Km : <b>{car.rentPerKm}</b>
                </p>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setdriver(true);
                    } else {
                      setdriver(false);
                    }
                  }}
                >
                  Driver Required
                </Checkbox>

                <h3>Total Amount : {totalAmount}</h3>

                <StripeCheckout
                  shippingAddress
                  token={onToken}
                  currency="inr"
                  amount={totalAmount * 100} //in local stripe 
                  stripeKey="pk_test_51KdG4USCTHJqHPBiZ1DcpQSY4MTuiM3sLa5Hrkjry9uy50nqSXq5W2g3xH0iaVH9YOfhgYAu7e079wUsm0mdJcfF001Nrniobr"
                >
                  <button className="btn btn-primary">Book Now</button>
                </StripeCheckout>
              </div>
            )}
          </Col>

          {car.name && (
            <Modal
              visible={showModal}
              closable={false}
              footer={false}
              title="Booked time slots"
            >
              <div className="p-2">
                {car.bookedTimeSlots.map((slot) => {
                  return (
                    <button className="btn1 mt-2">
                      {slot.from} - {slot.to}
                    </button>
                  );
                })}

                <div className="text-right mt-5">
                  <button
                    className="btn1"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </Row>
      </>
    </DefaultLayout>
  );
};

export default BookingCar;
