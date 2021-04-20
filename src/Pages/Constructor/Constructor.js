import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Constructor() {
  const [constructorInfo, setConstructorInfo] = useState({});
  const [constructorResults, setConstructorResults] = useState([]);
  const { constructorId } = useParams();
  const classes = useStyles();

  const columns = ["Race", "No.", "Driver", "Grid", "Result", "Points"];
  /**
   * keys:
   * -
   */

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/constructors/${constructorId}.json`)
      .then((res) => {
        setConstructorInfo(res.data.MRData.ConstructorTable.Constructors[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://ergast.com/api/f1/constructors/${constructorId}/results.json?limit=1000`
      )
      .then((res) => {
        setConstructorResults(res.data.MRData.RaceTable.Races);
      });
  }, []);

  return (
    <div>
      <ul>
        <li>{constructorInfo.name}</li>
        <li>{constructorInfo.nationality}</li>
        <li>{constructorInfo.url}</li>
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
            {constructorResults.map((row, i) => {
              return(row.Results.map((result) => {
                return (
                  <TableRow className={classes.row} key={row.url}>
                    <TableCell
                      className={`${classes.cell}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {row.season + " " + row.raceName}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {result.number}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {result.Driver.givenName + " " + result.Driver.familyName}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {result.grid}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {result.position}
                    </TableCell>
                    <TableCell
                      className={`${classes.cell}`}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {result.points}
                    </TableCell>
                  </TableRow>
                );
              }));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
