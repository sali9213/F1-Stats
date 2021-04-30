import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { tableStyles } from "../../Styles/TableStyles";
import DriverRaceTable from "../../Components/Tables/DriverRaceTable/DriverRaceTable";

export default function Driver() {
  const [driverInfo, setDriverInfo] = useState({});
  const [driverResults, setDriverResults] = useState([]);
  const [numberOfRaces, setNumberOfRaces] = useState(0);
  const [numberOfPoints, setNumberOfPoints] = useState(0);
  const [numberOfPodiums, setNumberOfPodiums] = useState(0);
  const [numberOfWins, setNumberOfWins] = useState(0);
  const { name } = useParams();
  const history = useHistory();

  const classes = tableStyles();

  useEffect(() => {
    axios.get(`http://ergast.com/api/f1/drivers/${name}.json`).then((res) => {
      if (res.data.MRData.DriverTable.Drivers.length > 0) {
        setDriverInfo(res.data.MRData.DriverTable.Drivers[0]);
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/drivers/${name}/results.json?limit=1000`)
      .then((res) => {
        if (res.data.MRData.RaceTable.Races.length > 0) {
          res.data.MRData.RaceTable.Races.reverse();
          setDriverResults(res.data.MRData.RaceTable.Races);
          setNumberOfRaces(res.data.MRData.total);
        }
      });
  }, [name]);

  useEffect(() => {
    let podiums = 0;
    let wins = 0;
    let points = 0;
    driverResults.forEach((race) => {
      race = race.Results[0];
      if (
        race.positionText === "1" ||
        race.positionText === "2" ||
        race.positionText === "3"
      ) {
        podiums += 1;
      }
      if (race.positionText === "1") {
        wins += 1;
      }
      // setNumberOfPoints(numberOfPoints + Number(race.points));
      points += Number(race.points);
    });

    setNumberOfPodiums(podiums);
    setNumberOfWins(wins);
    setNumberOfPoints(points);
  }, [driverResults])


  if (Object.keys(driverInfo) === 0) {
    return <div>Driver Information not found</div>;
  } else {
    return (
      <div>
        <ul>
          <li>Name: {driverInfo.givenName + " " + driverInfo.familyName}</li>
          <li>Driver Number: {driverInfo.permanentNumber}</li>
          <li>Nationality: {driverInfo.nationality}</li>
          <li>Date of Birth: {driverInfo.dateOfBirth}</li>
          <li>Number of Races: {numberOfRaces}</li>
          <li>Number of wins: {numberOfWins}</li>
          <li>Number of Podiums: {numberOfPodiums}</li>
          <li>Total Points: {numberOfPoints}</li>
        </ul>
        <DriverRaceTable raceData={driverResults}/>
      </div>
    );
  }
}
