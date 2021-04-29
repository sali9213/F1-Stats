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
import { useCallback } from "react";
import { useHistory } from "react-router";

function convertDate(date) {
  let d = new Date(date);
  let dateString =
    d.getDate() +
    " " +
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(d) +
    " " +
    d.getFullYear();
  return dateString;
}

export default function RaceList({ results }) {
  const columns = ["Race Name", "Circuit", "Date", "Winner"];
  const classes = tableStyles();
  const history = useHistory();

  const onRaceClick = useCallback((season, round) => {
    history.push(`/seasons/${season}/${round}`);
  }, []);

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
              <TableCell
                className={`${classes.cell} ${classes.clickable}`}
                scope="row"
                align="center"
                onClick={() => onRaceClick(row.season, row.round)}
              >
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
                {/* {new Date(row.date).toDateString()} */}
                {convertDate(row.date)}
              </TableCell>
              <TableCell
                className={`${classes.cell}`}
                scope="row"
                align="center"
              >
                {row.Results[0].Driver.givenName +
                  " " +
                  row.Results[0].Driver.familyName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
