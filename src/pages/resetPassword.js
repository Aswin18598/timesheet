import { useSnackbar } from "notistack"
import React from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { RESET_PASSWORD_REQUEST } from "../redux/sagas/types"
import { Loader } from "../utils"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Layout from "../component/layout/Layout"
import { useEffect } from "react"
import { FORGOT_PAGE_PATH } from "../routes/routePath"

// const formSchema = Yup.object({
//   password: Yup.string().required("Password is required"),
//   confirmPass: Yup.string().oneOf(
//     [Yup.ref("password"), null],
//     "Passwords must match"
//   ),
// })

export default function ResetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loader)
  const { enqueueSnackbar } = useSnackbar()
  const { state } = useLocation()

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be at 6 char long"),
    confirmPass: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  useEffect(() => {
    if (!state) {
      navigate(`/${FORGOT_PAGE_PATH}`)
    }
  }, [state])

  const handleResetPass = (data) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
      payload: {
        data: { email: state?.data?.email, password: data?.password },
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
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit(handleResetPass)}>
          <Form.Group>
            <Form.Label htmlFor="basic-url">Password</Form.Label>
            <InputGroup className="mb-3">
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
                name="password"
                id="basic-url"
                type="password"
                {...register("password", { required: true })}
                isInvalid={!!errors.password}
                aria-describedby="basic-addon3"
                placeholder="Enter password here..."
                className="reset-password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && <p>{errors?.password?.message}</p>}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="basic-url">Confirm Password</Form.Label>
            <InputGroup className="mb-3">
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
                isInvalid={!!errors.confirmPass}
                placeholder="Enter confirm password here..."
                {...register("confirmPass", { required: true })}
                className="reset-confirm-password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPass && <p>{errors?.confirmPass?.message}</p>}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button type="submit">Reset Password</Button>
        </form>
      </div>
    </div>
  )
}
