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

export default function ConstructorStandings({ constructorStandings }) {
  const Columns = ["Position", "Constructor", "Points"];
  const classes = tableStyles();

  return (
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
          {constructorStandings.map((row) => (
            <TableRow key={row.Constructor.constructorId}>
              <TableCell className={classes.cell} scope="row" align="center">
                {row.positionText}
              </TableCell>
              <TableCell className={classes.cell} scope="row" align="center">
                {row.Constructor.name}
              </TableCell>
              <TableCell className={classes.cell} scope="row" align="center">
                {row.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
