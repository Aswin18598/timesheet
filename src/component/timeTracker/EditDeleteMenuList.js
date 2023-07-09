import React from "react"
import MoreActionMenuList from "./MoreActionMenuList"
import MenuItem from "@mui/material/MenuItem"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const EditDeleteMenuList = (props) => {
  const {
    setShowDeleteModal,
    handleMenuClose,
    setIsOpen,
    setSelectedTask,
    tempSelectedTask,
  } = props
  const handleEdit = () => {
    handleMenuClose()
    setIsOpen(true)
    setSelectedTask({ ...tempSelectedTask })
  }
  return (
    <>
      <MenuItem
        onClick={handleEdit}
        disableRipple
        disabled={tempSelectedTask?.isApproved}
      >
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          setShowDeleteModal(true)
          handleMenuClose()
          setSelectedTask({ ...tempSelectedTask })
        }}
        disableRipple
        disabled={tempSelectedTask?.isApproved}
      >
        <DeleteIcon />
        Delete
      </MenuItem>
    </>
  )
}

export default MoreActionMenuList(EditDeleteMenuList)
