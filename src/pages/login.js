import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AUTH_REQUEST } from "../redux/sagas/types"
import { FORGOT_PAGE_PATH } from "../routes/routePath"
import { Loader } from "../utils"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is Required"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Minimum 6 letter required"),
  })
  .required()

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.loader)
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const handleLogin = (data) => {
    dispatch({
      type: AUTH_REQUEST,
      payload: {
        data,
        reset,
        navigate,
        enqueueSnackbar,
      },
    })
  }
  return (
    <div className="login-banner">
      {loading && <Loader />}
      <div className="card">
        <h4>Login</h4>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Form.Label htmlFor="basic-url">Email</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text id="basic-addon3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1667 17.0833H5.83334C3.33334 17.0833 1.66667 15.8333 1.66667 12.9167V7.08334C1.66667 4.16667 3.33334 2.91667 5.83334 2.91667H14.1667C16.6667 2.91667 18.3333 4.16667 18.3333 7.08334V12.9167C18.3333 15.8333 16.6667 17.0833 14.1667 17.0833Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29166 10.2667 8.43332 9.58333L5.83333 7.5"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </InputGroup.Text>
            <Form.Control
              id="basic-url"
              type="email"
              aria-describedby="basic-addon3"
              placeholder="Enter your email here..."
              {...register("email", { required: true })}
            />
          </InputGroup>
          {errors.email && <p>{errors?.email?.message}</p>}
          <Form.Label htmlFor="basic-url">Password</Form.Label>
          <InputGroup className="mb-0">
            <InputGroup.Text id="basic-addon3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4917 12.4417C14.775 14.15 12.3167 14.675 10.1583 14L6.23333 17.9167C5.95 18.2083 5.39166 18.3833 4.99166 18.325L3.17499 18.075C2.57499 17.9917 2.01666 17.425 1.92499 16.825L1.67499 15.0083C1.61666 14.6083 1.80833 14.05 2.08333 13.7667L5.99999 9.85C5.33333 7.68333 5.85 5.225 7.56666 3.51666C10.025 1.05833 14.0167 1.05833 16.4833 3.51666C18.95 5.975 18.95 9.98333 16.4917 12.4417Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.74167 14.575L7.65833 16.4917"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0833 9.16666C12.7737 9.16666 13.3333 8.60702 13.3333 7.91666C13.3333 7.22631 12.7737 6.66666 12.0833 6.66666C11.393 6.66666 10.8333 7.22631 10.8333 7.91666C10.8333 8.60702 11.393 9.16666 12.0833 9.16666Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </InputGroup.Text>
            <Form.Control
              id="basic-url"
              type="password"
              aria-describedby="basic-addon3"
              placeholder="Enter your password here..."
              {...register("password", { required: true })}
            />
          </InputGroup>
          {errors.password && <p>{errors?.password?.message}</p>}
          <p
            className="Login-Forget-Password"
            onClick={() => navigate(FORGOT_PAGE_PATH)}
          >
            Forgot Password?
          </p>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  )
}
