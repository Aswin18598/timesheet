import React from "react"
import MoreActionMenuList from "../timeTracker/MoreActionMenuList"
import { MenuItem } from "@mui/material"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt"
import { useDispatch } from "react-redux"
import { TASK_APPROVE_REJECT_REQUEST } from "../../redux/sagas/types"
const ApproveDenyMenuList = (props) => {
  const { handleMenuClose, selectedTask } = props
  const dispatch = useDispatch()
  const handleApproveReject = (isApproved) => {
    dispatch({
      type: TASK_APPROVE_REJECT_REQUEST,
      payload: { selectedTask, isApproved },
    })
    handleMenuClose()
  }
  return (
    <>
      <MenuItem
        onClick={() => handleApproveReject(true)}
        disableRipple
        disabled={selectedTask?.isApproved}
      >
        <ThumbUpAltIcon />
        Approve
      </MenuItem>
      <MenuItem
        onClick={() => handleApproveReject(false)}
        disableRipple
        disabled={!selectedTask?.isApproved}
      >
        <ThumbDownAltIcon />
        Deny
      </MenuItem>
    </>
  )
}

export default MoreActionMenuList(ApproveDenyMenuList)
