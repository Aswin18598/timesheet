import React, { useState } from "react"
import { Container, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import NavBarMenuAction from "./navBarMenuList/navBarMenuAction"
import { useNavigate } from "react-router-dom"
import { logoutAuthToken } from "../redux/sagas/auth/authSlice"

export default function NavItem() {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const handleMenuClose = () => {
    setOpen(false)
  }

  const logOutChange = () => {
    dispatch(logoutAuthToken())
    navigate("/")
  }
  return (
    <>
      <div className="nav-bar">
        <Navbar className="nav">
          <Container>
            <Navbar.Brand href="#home" className="title">
              Time Tracker
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.44V9.77"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12.0199 2C8.3399 2 5.3599 4.98 5.3599 8.66V10.76C5.3599 11.44 5.0799 12.46 4.7299 13.04L3.4599 15.16C2.6799 16.47 3.2199 17.93 4.6599 18.41C9.4399 20 14.6099 20 19.3899 18.41C20.7399 17.96 21.3199 16.38 20.5899 15.16L19.3199 13.04C18.9699 12.46 18.6899 11.43 18.6899 10.76V8.66C18.6799 5 15.6799 2 12.0199 2Z"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M15.3299 18.82C15.3299 20.65 13.8299 22.15 11.9999 22.15C11.0899 22.15 10.2499 21.77 9.64992 21.17C9.04992 20.57 8.66992 19.73 8.66992 18.82"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                </svg>
              </Navbar.Text>
              <div className="border"></div>
              <div
                className="user-initial"
                onClick={() => setOpen((prev) => !prev)}
              >
                {currentUser?.userName?.at(0)?.toUpperCase()}
              </div>
              <NavBarMenuAction
                handleMenuClose={handleMenuClose}
                logOutChange={logOutChange}
                isOpen={isOpen}
              />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}
