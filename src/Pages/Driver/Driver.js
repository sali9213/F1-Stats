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
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Driver.module.css";

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
    // "&:hover": {
    //   background: "#ffb3b3",
    //   transition: "0.2s",
    // },
  },
  clickable: {
    "&:hover": {
      background: "#ffb3b3",
      transition: "0.2s",
      cursor: "pointer",
    },
  },
});

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

  const classes = useStyles();

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
    console.log(season + " " + round);
  }, []);

  // const onRowClick = useCallback(
  //   (id) => {
  //     history.push(`/drivers/${id}`);
  //   },
  //   [history]
  // );

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
                      {/* {row.season + " " + row.raceName} */}
                    </TableCell>
                    {/* <TableCell
                      className={`${classes.cell} ${classes.clickable}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {row.season}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell} ${classes.clickable}`}
                      scope="row"
                      align="center"
                    >
                      {row.raceName}
                    </TableCell> */}
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
