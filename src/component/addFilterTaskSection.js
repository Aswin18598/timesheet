import React, { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { EMPLOYEE_REQUEST } from "../redux/sagas/types"

const AddFilterTaskSection = ({ setIsOpen }) => {
  return (
    <div className="time-banner">
      <Button onClick={() => setIsOpen(true)}>Add New Entry</Button>
    </div>
  )
}

export default AddFilterTaskSection
