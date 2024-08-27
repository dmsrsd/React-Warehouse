import React, { useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

import "../styling/Login.css";
import BackgroundImage from "../assets/img/loading-bubbles.svg";
import Logo from "../assets/img/default-avatar.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [captchaToken, setCaptchaToken] = useState(null);

  const [show, setShow] = useState(false);
  const [errMassege, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const recaptchaRef = useRef(null);

  const loginProcess = async (data) => {
    const user_email = data.email;
    localStorage.setItem("userEmail", user_email);

    setLoading(true);
    await delay(500);

    // const token_jwt = "dumy";
    // const user_role = "Administrator";

    // // Login berhasil
    // localStorage.setItem("isLoggedIn", "true");
    // localStorage.setItem("token", token_jwt);
    // localStorage.setItem("userRole", user_role);

    // history.replace("/admin/dashboard");

    // if (captchaToken) {
    if (user_email != "") {
      try {
        // Mengirim permintaan login ke API
        // const response = await fetch("http://localhost:8000/api/login", {
          const response = await fetch("http://localhost:3001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res_data = await response.json();

        
        const res_status = res_data.status;
        const token_jwt = res_data.token;
        const user_role = res_data.role;

        console.log('token_jwt', token_jwt);

        if (res_status === true && token_jwt != false) {
          // Login berhasil
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", token_jwt);
          localStorage.setItem("userRole", user_role);

          history.replace("/admin/dashboard"); // Navigate to /admin route
          window.location.reload();
          setShow(false);
        } else {
          // Login gagal
          // setCaptchaToken(null);
          setError("email atau password anda salah!");

          // if (recaptchaRef.current) {
          //   recaptchaRef.current.reset(); // Reset the captcha
          // }
        }
      } catch (error) {
        setError(error.message);
        setShow(true);
      }
    } else {
      setShow(true);
      setError("Completed Captcha !");
    }
    setLoading(false);
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>

      {/* Form */}
      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit(loginProcess)}
      >
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>

        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {errMassege}
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
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

        <Form.Group className="mb-2" controlId="password">
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

        <br></br>
        
        {/* <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Lfs8QgqAAAAAKCmCSr4_eyT4nQr-YMK55miKadr"
          onChange={onCaptchaChange}
        /> */}

        <br></br>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}

        <br></br>

        {/* Tautan ke halaman pendaftaran */}
        <div className="text-center mt-3">
          <Link to="/register">Don't have an account? Register here.</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
