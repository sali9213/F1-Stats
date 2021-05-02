import { tableStyles } from "../../../Styles/TableStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function ConstructorRaceTable({ constructorRaces }){
  const classes = tableStyles();
  const columns = ["Race", "No.", "Driver", "Grid", "Result", "Points"];

  return(
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
        {constructorRaces.map((row, i) => {
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
  );
}