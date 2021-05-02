import { tableStyles } from "../../../Styles/TableStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styles from "./DriversListTable.module.css";
import Pagination from "@material-ui/lab/Pagination";
import _ from "lodash";

export default function DriversListTable() {
  const [drivers, setDrivers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const classes = tableStyles();

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

  const history = useHistory();
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

  const onRowClick = useCallback(
    (id) => {
      history.push(`/drivers/${id}`);
    },
    [history]
  );

  const handleChange = useCallback((event, value) => {
    setOffset(value * limit - limit);
  }, []);

  return (
    <div>
      {/* <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="center" key={column}>
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
                  {keys.slice(1).map((key, j) => (
                    <TableCell
                      className={classes.cell}
                      component="th"
                      scope="row"
                      align="center"
                      key={key === "permanentNumber" ? i : _.get(row, key)}
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
      /> */}
    </div>
  );
}
