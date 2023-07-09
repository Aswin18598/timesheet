import React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { DELETE_TASK_REQUEST } from "../../redux/sagas/types"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
  outline: "none",
  p: 2,
}

const TaskDeleteConfirmationModal = ({
  showDeleteModal,
  handleMenuClose,
  setShowDeleteModal,
  selectedTaskToDelete,
  setSelectedTask,
}) => {
  const dispatch = useDispatch()
  const handleDeleteTask = () => {
    handleMenuClose()
    setShowDeleteModal(false)
    dispatch({
      type: DELETE_TASK_REQUEST,
      payload: selectedTaskToDelete,
    })
    setSelectedTask(null)
  }
  return (
    <Modal keepMounted open={showDeleteModal}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Are you sure!.
        </Typography>
        <Typography sx={{ mt: 2 }}>You want to delete this task?.</Typography>
        <Box
          sx={{
            width: "100%",
            p: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false)
              setSelectedTask(null)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteTask}>Yes</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default TaskDeleteConfirmationModal
