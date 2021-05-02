import { useHistory } from "react-router";
import { tableStyles } from "../../../Styles/TableStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useCallback } from "react";

export default function DriverRaceTable({ driverRaces }) {
  const history = useHistory();
  const classes = tableStyles();

  const columns = [
    "Race",
    "Circuit",
    "Constructor",
    "Grid",
    "Position",
    "Status",
  ];

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

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
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
          {driverRaces.map((row, i) => {
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
                  {row.Results[0].grid}
                </TableCell>
                <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center"
                >
                  {row.Results[0].positionText}
                </TableCell>
                <TableCell
                  className={`${classes.cell}`}
                  scope="row"
                  align="center"
                >
                  {row.Results[0].status}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
