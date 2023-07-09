import React from "react"
import MoreActionMenuList from "../timeTracker/MoreActionMenuList"
import { MenuItem } from "@mui/material"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt"
import { useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import { APPROVE_REJECT_ALL_TASK_REQUEST } from "../../redux/sagas/types"

const GlobalApproveDenyMenuList = ({ selectedTask, handleMenuClose }) => {
  const { task } = selectedTask
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const isApproveAllDisabled = task?.every((t) => t?.isApproved)
  const isDenyAllDisabled = task?.every((t) => !t?.isApproved)
  const handleApproveReject = (isApproved) => {
    dispatch({
      type: APPROVE_REJECT_ALL_TASK_REQUEST,
      payload: {
        empID: task?.length ? task[0]?.empID : "",
        date: task?.length ? task[0]?.date : "",
        enqueueSnackbar,
        isApproved,
      },
    })
    handleMenuClose()
  }
  return (
    <>
      <MenuItem
        onClick={() => handleApproveReject(true)}
        disableRipple
        disabled={isApproveAllDisabled}
      >
        <ThumbUpAltIcon />
        Approve All
      </MenuItem>
      <MenuItem
        onClick={() => handleApproveReject(false)}
        disableRipple
        disabled={isDenyAllDisabled}
      >
        <ThumbDownAltIcon />
        Deny All
      </MenuItem>
    </>
  )
}

export default MoreActionMenuList(GlobalApproveDenyMenuList)
