import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./Driver.module.css";
import { tableStyles } from "../../Styles/TableStyles";

export default function Driver() {
  const [driverInfo, setDriverInfo] = useState({});
  const [driverResults, setDriverResults] = useState([]);
  const { name } = useParams();
  const history = useHistory();

  const columns = ["Race", "Circuit", "Constructor", "Position"];

  // const keys = [
  //   "url",
  //   ["season", "raceName"],
  //   ["Circuit.circuitName"],
  //   ["Results[0].Constructor.name"],
  //   ["Results[0].position"],
  // ];

  const classes = tableStyles();

  useEffect(() => {
    axios.get(`http://ergast.com/api/f1/drivers/${name}.json`).then((res) => {
      if (res.data.MRData.DriverTable.Drivers.length > 0) {
        setDriverInfo(res.data.MRData.DriverTable.Drivers[0]);
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/drivers/${name}/results.json?limit=1000`)
      .then((res) => {
        if (res.data.MRData.RaceTable.Races.length > 0) {
          res.data.MRData.RaceTable.Races.reverse();
          setDriverResults(res.data.MRData.RaceTable.Races);
        }
      });
  }, []);

  function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  const onConstructorClick = useCallback((constructorId) => {
    history.push(`/constructors/${constructorId}`);
  }, []);

  const onCircuitClick = useCallback((circuitId) => {
    console.log(circuitId);
    // history.push(`/circuits/${circuitId}`);
  }, []);

  const onRaceClick = useCallback((season, round) => {
    history.push(`/seasons/${season}/${round}`);
  }, []);

  if (isEmpty(driverInfo)) {
    return <div>Driver Information not found</div>;
  } else {
    return (
      <div>
        <ul>
          <li>Name: {driverInfo.givenName + " " + driverInfo.familyName}</li>
          <li>Driver Number: {driverInfo.permanentNumber}</li>
          <li>Nationality: {driverInfo.nationality}</li>
          <li>Date of Birth: {driverInfo.dateOfBirth}</li>
        </ul>
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
              {driverResults.map((row, i) => {
                return (
                  <TableRow className={classes.row} key={row.url}>
                    <TableCell
                      className={`${classes.cell} ${classes.clickable}`}
                      component="th"
                      scope="row"
                      align="center"
                      onClick={() => {
                        onRaceClick(row.season, row.round);
                      }}
                    >
                      {row.season + " " + row.raceName}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell} ${classes.clickable}`}
                      scope="row"
                      align="center"
                      onClick={() => {
                        onCircuitClick(row.Circuit.circuitId);
                      }}
                    >
                      {row.Circuit.circuitName}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell} ${classes.clickable}`}
                      scope="row"
                      align="center"
                      onClick={() => {
                        onConstructorClick(
                          row.Results[0].Constructor.constructorId
                        );
                      }}
                    >
                      {row.Results[0].Constructor.name}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell}`}
                      scope="row"
                      align="center"
                    >
                      {row.Results[0].position}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
