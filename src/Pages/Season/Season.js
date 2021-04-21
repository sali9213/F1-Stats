import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DriverStandingsTable from "../../Components/Tables/DriverStandings/DriverStandingsTable";

export default function Season() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [races, setRaces] = useState([]);

  const { season } = useParams();

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/${season}/driverStandings.json`)
      .then((res) => {
        setDriverStandings(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
      });
  }, [season]);

  return (
    <div>
      <DriverStandingsTable driverStandings={driverStandings}></DriverStandingsTable>
    </div>
  );
}
