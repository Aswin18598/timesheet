import React, { useEffect } from "react"
import Layout from "../component/layout/Layout"
import {
  Paper,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { TIME_TRACKER_PAGE_PATH } from "../routes/routePath"
import { EMPLOYEE_REQUEST } from "../redux/sagas/types"

const EmployeeLists = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { employeeDetails } = useSelector((state) => state?.employee)
  const { currentUser } = useSelector((state) => state.auth)
  useEffect(() => {
    if (currentUser?.userRole === "manager") {
      dispatch({
        type: EMPLOYEE_REQUEST,
      })
    } else {
      navigate(TIME_TRACKER_PAGE_PATH)
    }
  }, [])
  return (
    <Layout>
      <section className="employee-lists">
        <h5>Employees List</h5>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: `0.5px solid ${theme.palette?.border?.main}`,
            my: 2,
          }}
          elevation={0}
        >
          <TableContainer className="table-wrapper">
            <Table stickyHeader>
              <TableHead>
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      fontSize: "16px",
                      py: "0.7rem",
                      whiteSpace: "nowrap",
                      width: `${100 / 3}%`,
                    },
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeDetails?.map((d, i) => (
                  <TableRow
                    hover
                    key={i}
                    sx={{
                      "&:last-of-type .MuiTableCell-root": {
                        borderBottom: "none",
                      },
                      "& .MuiTableCell-root": {
                        fontSize: "15px",
                        width: `${100 / 3}%`,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        "& p": {
                          margin: 0,
                          width: "14rem",
                          overflowX: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          "& .link": {
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": {
                              textDecoration: "underline",
                              color: theme.palette.primary.main,
                            },
                          },
                          "&.userName": {
                            textTransform: "capitalize",
                          },
                          "&.empID": {
                            textTransform: "uppercase",
                          },
                        },
                      },
                    }}
                  >
                    <TableCell>
                      <p title={d?.userName} className="userName">
                        <Link to={`/team/${d?.empID}`} className="link">
                          {d?.userName}
                        </Link>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p title={d?.empID} className="empID">
                        {d?.empID}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p title={d?.email}>{d?.email}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </section>
    </Layout>
  )
}

export default EmployeeLists
