import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ConstructorStandings from "../../Components/Tables/ConstructorStandings/ConstructorStandings";
import DriverStandingsTable from "../../Components/Tables/DriverStandings/DriverStandingsTable";
import RaceList from "../../Components/Tables/RaceList/RaceList";
import Race from "../Race/Race";

export default function Season() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [races, setRaces] = useState([]);

  const { season } = useParams();

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/${season}/driverStandings.json`)
      .then((res) => {
        setDriverStandings(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      });
  }, [season]);

  useEffect(() => {
    axios.get(`http://ergast.com/api/f1/${season}/constructorStandings.json`)
    .then((res) => {
      setConstructorStandings(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    });
  }, [season])

  useEffect(() => {
    axios.get(`https://ergast.com/api/f1/${season}/results/1.json`).then((res) => {
      setRaces(res.data.MRData.RaceTable.Races);
    });
  }, [season])

  return (
    <div>
      <DriverStandingsTable driverStandings={driverStandings}></DriverStandingsTable>
      <ConstructorStandings constructorStandings={constructorStandings}></ConstructorStandings>
      <RaceList results={races}></RaceList>
    </div>
  );
}
