import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      master_data_submenu_id: [],
      scm_planner_submenu_id: [],
      wms_principle_submenu_id: [],
      tms_planner_submenu_id: [],
      dc_wms_submenu_id: [],
    },
  });

  const history = useHistory();

  const [show, setShow] = useState(false);
  const [errMsg, setError] = useState("");

  const onSubmit = async (data) => {
    const body = JSON.stringify(data);

    try {
      const response = await fetch("http://localhost:3001/api/users", {
      // const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      console.log("body", body);

      const responseData = await response.json();
      const is_success = responseData.success;
      const is_fail = responseData.message;

      console.log("responseData", responseData);

      if (is_success == true) {
        console.log("OK");
        history.replace("/login");
      } else {
        console.log(is_fail);
        setShow(true);
        setError(is_fail);
      }
    } catch (error) {
      setShow(true);
      console.error(error);
    }
  };

  const roles = ["Administrator", "SCM", "WMS", "TMS", "DCWMS"];

  const categoryFieldMap = {
    1: "master_data_submenu_id",
    2: "scm_planner_submenu_id",
    3: "wms_principle_submenu_id",
    4: "tms_planner_submenu_id",
    5: "dc_wms_submenu_id",
    6: "wms_principle_submenu_id",
  };

  const [dataMenu, setDataMenu] = useState([]);

  useEffect(() => {
    const getDataMenu = async () => {
      const response = await axios.get("http://localhost:3001/api/menus");
      // const response = await axios.get("http://localhost:8000/api/menus");

      const menus = response.data.data.map((item) => ({
        name: item.submenu_name,
        submenu_id: item.submenu_id,
        category_id: item.category_id,
        category_name: item.category_name,
      }));

      console.log("menus", menus);

      const groupedMenus = menus.reduce((acc, menu) => {
        if (!acc[menu.category_id]) {
          acc[menu.category_id] = [];
        }
        acc[menu.category_id].push(menu);
        return acc;
      }, {});
      setDataMenu(groupedMenus);

      console.log("menus", menus);
    };

    getDataMenu();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Register</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <div className="alert alert-danger">Name is required</div>
          )}
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
          />
          {errors.email && (
            <div className="alert alert-danger">{errors.email.message}</div>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters long",
              },
              validate: (value) =>
                !/\s/.test(value) || "Password should not contain spaces",
            })}
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password.message}</div>
          )}
        </Form.Group>

        <div className="row">
          <Form.Group className="mt-3 col-4">
            <Form.Label>Role</Form.Label>
            <Col>
              {roles.map((role, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    value={role}
                    {...register("role", { required: true })}
                  />
                  <label>&nbsp;&nbsp;{role}</label>
                </div>
              ))}
              {errors.role && (
                <div className="alert alert-danger">Role is required</div>
              )}
            </Col>
          </Form.Group>

          {Object.keys(dataMenu).map((category_id) => (
            <Form.Group key={category_id} className="mt-3 col-4">
              <Form.Label>{dataMenu[category_id][0].category_name}</Form.Label>
              <Col>
                {dataMenu[category_id].map((menu, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={menu.submenu_id}
                      {...register(categoryFieldMap[category_id], {
                        required: false,
                        defaultValue: [],
                      })}
                    />
                    <label>&nbsp;&nbsp;{menu.name}</label>
                  </div>
                ))}
              </Col>
            </Form.Group>
          ))}
        </div>

        <br></br>

        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {errMsg}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
        <br></br>
        <br></br>
      </Form>
    </div>
  );
};

export default Register;
