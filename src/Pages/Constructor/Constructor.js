import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConstructorRaceTable from "../../Components/Tables/ConstructorRaceTable/ConstructorRaceTable";

export default function Constructor() {
  const [constructorInfo, setConstructorInfo] = useState({});
  const [constructorResults, setConstructorResults] = useState([]);
  const { constructorId } = useParams();

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/constructors/${constructorId}.json`)
      .then((res) => {
        setConstructorInfo(res.data.MRData.ConstructorTable.Constructors[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://ergast.com/api/f1/constructors/${constructorId}/results.json?limit=1000`
      )
      .then((res) => {
        setConstructorResults(res.data.MRData.RaceTable.Races);
      });
  }, []);

  return (
    <div>
      <ul>
        <li>{constructorInfo.name}</li>
        <li>{constructorInfo.nationality}</li>
        <li>{constructorInfo.url}</li>
      </ul>
      <ConstructorRaceTable constructorRaces={constructorResults}/>


    </div>
  );
}
