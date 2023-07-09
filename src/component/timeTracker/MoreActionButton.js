import React from "react"

const MoreActionButton = ({ handleMenuClick }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleMenuClick}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M10.0001 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99999C10.8334 9.53976 10.4603 9.16666 10.0001 9.16666C9.53984 9.16666 9.16675 9.53976 9.16675 9.99999C9.16675 10.4602 9.53984 10.8333 10.0001 10.8333Z"
        stroke="#667085"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0001 4.99999C10.4603 4.99999 10.8334 4.6269 10.8334 4.16666C10.8334 3.70642 10.4603 3.33333 10.0001 3.33333C9.53984 3.33333 9.16675 3.70642 9.16675 4.16666C9.16675 4.6269 9.53984 4.99999 10.0001 4.99999Z"
        stroke="#667085"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0001 16.6667C10.4603 16.6667 10.8334 16.2936 10.8334 15.8333C10.8334 15.3731 10.4603 15 10.0001 15C9.53984 15 9.16675 15.3731 9.16675 15.8333C9.16675 16.2936 9.53984 16.6667 10.0001 16.6667Z"
        stroke="#667085"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default MoreActionButton
