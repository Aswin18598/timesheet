import React from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { LOGIN_PAGE_PATH } from "../routes/routePath"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { FORGOT_PASSWORD_REQUEST } from "../redux/sagas/types"
import { useSnackbar } from "notistack"
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is Required"),
  })
  .required()

export default function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleForgotPass = (data) => {
    const { email } = data
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
      payload: {
        navigate,
        email,
        reset,
        enqueueSnackbar,
      },
    })
  }
  return (
    <div className="login-banner">
      <div className="card">
        <h4>Forget Password</h4>
        <form onSubmit={handleSubmit(handleForgotPass)}>
          <Form.Label htmlFor="basic-url">Email</Form.Label>
          <InputGroup className="mb-1">
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
          <p
            className="Login-Forget-Password"
            onClick={() => navigate(LOGIN_PAGE_PATH)}
          >
            LogIn
          </p>
          <Button type="submit">Forgot Password</Button>
        </form>
      </div>
    </div>
  )
}
