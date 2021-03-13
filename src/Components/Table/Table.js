import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

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
    "&:hover": {
      background: "#ffb3b3",
      transition: "0.2s",
    },
  },
});

export default function TableWrapper({
  columns,
  data,
  keys,
  onRowClickCallback,
}) {
  const classes = useStyles();
  return (
    <div>
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
            {data.map((row, i) => {
              return (
                <TableRow
                  className={classes.row}
                  key={keys.length === columns.length ? i : row[keys[0]]}
                  onClick={
                    onRowClickCallback === undefined
                      ? () => {}
                      : () =>
                          onRowClickCallback(
                            keys.length === columns.length ? i : row[keys[0]]
                          )
                  }
                >
                  {keys.slice(1).map((key, i) => (
                    <TableCell
                      className={classes.cell}
                      component="th"
                      scope="row"
                      align="center"
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
    </div>
  );
}
