import axios from "axios";
import React, { useState, useEffect } from "react";
import TableWrapper from "../../Components/Table/Table";
import Pagination from "@material-ui/lab/Pagination";
import { useCallback } from "react";
import styles from "./Drivers.module.css";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    maxWidth: 1200,
    margin: "2em auto",
  },
  cell: {
    maxHeight: 20,
    padding: "0",
  },
  row: {
    height: "1.5rem",
    transition: "0.3s",
    "&:hover": {
      background: "#ffb3b3",
      transition: "0.2s",
    },
  },
});

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  const columns = [
    "Driver No.",
    "First Name",
    "Last Name",
    "Nationality",
    "Date of Birth",
  ];
  const keys = [
    "driverId",
    "permanentNumber",
    "givenName",
    "familyName",
    "nationality",
    "dateOfBirth",
  ];

  // Number of drivers per page
  const limit = 30;

  useEffect(() => {
    axios
      .get(
        `http://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`
      )
      .then((res) => {
        setTotalPages(Math.ceil(res.data.MRData.total / limit));
        setDrivers(res.data.MRData.DriverTable.Drivers);
      });
  }, [offset]);

  const handleChange = useCallback((event, value) => {
    setOffset(value * limit - limit);
  }, []);

  const onRowClick = useCallback(
    (id) => {
      history.push(`/drivers/${id}`);
    },
    [history]
  );

  return (
    <div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow key="head">
              {columns.map((column) => (
                <TableCell align="center">
                  <b>{column}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((row, i) => {
              return (
                <TableRow
                  className={classes.row}
                  key={keys.length === columns.length ? i : row[keys[0]]}
                  onClick={() => onRowClick(row[keys[0]])}
                >
                  {keys.slice(1).map((key, i) => (
                    <TableCell
                      className={classes.cell}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {_.get(row, key)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className={styles.pagination}
        count={totalPages}
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
