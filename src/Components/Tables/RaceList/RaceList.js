import { tableStyles } from "../../../Styles/TableStyles";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";

export default function RaceList({ results }) {
  const columns = ["Race Name", "Circuit", "Date", "Winner"]
  const classes = tableStyles();

  return (
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
          {results.map((row) => (
            <TableRow key={row.round}>
              <TableCell className={classes.cell} scope="row" align="center">
                {row.raceName}
              </TableCell>
              <TableCell
                className={`${classes.cell}`}
                scope="row"
                align="center"
              >
                {row.Circuit.circuitName}
              </TableCell>
              <TableCell
                className={`${classes.cell}`}
                scope="row"
                align="center"
              >
                {row.date}
              </TableCell>
              <TableCell
                className={`${classes.cell}`}
                scope="row"
                align="center"
              >
                {row.Results[0].Driver.givenName + " " + row.Results[0].Driver.familyName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
