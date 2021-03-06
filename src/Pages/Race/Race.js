import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { tableStyles } from "../../Styles/TableStyles";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";

function isEmpty(obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}

export default function Race() {
  const [roundInfo, setRoundInfo] = useState({});
  const [roundResults, setRoundResults] = useState([]);
  const { season, round } = useParams();

  const columnHeaders = [
    "Position",
    "Driver No.",
    "Driver Name",
    "Constructor",
    "Laps",
    "Grid Position",
    "Status",
    "Points",
  ];

  const classes = tableStyles();

  useEffect(() => {
    axios
      .get(
        `http://ergast.com/api/f1/${season}/${round}/results.json?limit=1000`
      )
      .then((res) => {
        setRoundInfo(res.data.MRData.RaceTable.Races[0]);
        setRoundResults(res.data.MRData.RaceTable.Races[0].Results);
        console.log(res);
      });
  }, []);

  if (isEmpty(roundInfo) || isEmpty(roundResults)) {
    return <div></div>;
  } else {
    return (
      <div>
        <ul>
          <li>Season: {season}</li>
          <li>Race: {roundInfo.raceName}</li>
          <li>Circuit: {roundInfo.Circuit.circuitName}</li>
          <li>
            Location: {roundInfo.Circuit.Location.locality},{" "}
            {roundInfo.Circuit.Location.country}
          </li>
          <li>Date: {roundInfo.date}</li>
        </ul>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow key="head">
                {columnHeaders.map((column) => (
                  <TableCell align="center">
                    <b>{column}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {roundResults.map((row) => (
                <TableRow key={row.position}>
                  <TableCell
                    className={classes.cell}
                    scope="row"
                    align="center"
                  >
                    {row.position}
                  </TableCell>
                  <TableCell 
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.Driver.permanentNumber}
                  </TableCell>
                  <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.Driver.givenName + " " + row.Driver.familyName}
                  </TableCell>
                  <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.Constructor.name}
                  </TableCell>
                  <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.laps}
                  </TableCell>
                  <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.grid}
                  </TableCell>
                  <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.status}
                  </TableCell>
                  <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center">
                    {row.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
