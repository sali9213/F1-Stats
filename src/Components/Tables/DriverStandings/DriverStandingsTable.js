import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { tableStyles } from "../../../Styles/TableStyles";

export default function DriverStandingsTable({ driverStandings }) {

  const Columns = ["Position", "Driver", "Points"];
  const classes = tableStyles();

  return (
    <div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow key="head">
              {Columns.map((column) => (
                <TableCell align="center" key={column}>
                  <b>{column}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {driverStandings.map((row) => (
              <TableRow key={row.Driver.permanentNumber}>
                <TableCell className={classes.cell} scope="row" align="center">
                  {row.positionText}
                </TableCell>
                <TableCell className={classes.cell} scope="row" align="center">
                  {row.Driver.givenName + " " + row.Driver.familyName}
                </TableCell>
                <TableCell className={classes.cell} scope="row" align="center">
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
