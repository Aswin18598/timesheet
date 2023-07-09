import React, { useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Typography from "@mui/material/Typography";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Task from "./task";
import { Modal } from "react-bootstrap";

export default function TimelineView() {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="time" style={{ position: "relative", top: "4rem" }}>
        <h4 className="title">Task Status</h4>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              9:30 am to 10:00 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                className="icon"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => setIsOpen(true)}
              >
                {!isHover ? <LaptopMacIcon /> : <DriveFileRenameOutlineIcon />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                UI changes
              </Typography>
              <p className="desc">UI changes and functionality changes</p>
            </TimelineContent>
          </TimelineItem>
          {/* <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            9:30 am to 10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot className="icon">
            {!isHover ? <LaptopMacIcon /> : <DriveFileRenameOutlineIcon /> }
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              UI changes
            </Typography>
            <p className="desc">UI changes and functionality changes</p>
            <Button className="btn">EDIT</Button>
          </TimelineContent>
        </TimelineItem> */}
        </Timeline>
      </div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="header-text">Add time entry</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Task setIsOpen={setIsOpen}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
