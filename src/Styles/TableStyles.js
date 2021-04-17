import { makeStyles } from "@material-ui/core/styles";

export const tableStyles = makeStyles({
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