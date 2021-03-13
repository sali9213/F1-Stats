import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableWrapper from "../../Components/Table/Table";

export default function Driver() {
  const [driverInfo, setDriverInfo] = useState({});
  const [driverResults, setDriverResults] = useState([]);
  const { name } = useParams();

  const columns = ["Race", "Circuit", "Constructor", "Position"];

  /**
   * Object = {
   *  key,
   *  id,
   *  callback_func
   * }
   */

  // const keys = [
  //   'url',
  //   {
  //     key: 'season',
  //     id_key: ''
  //   }
  // ]

  const keys = [
    "url",
    ["season", "raceName"],
    ["Circuit.circuitName"],
    ["Results[0].Constructor.name"],
    ["Results[0].position"],
  ];

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
        }
      });
  }, []);

  function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  if (isEmpty(driverInfo)) {
    return <div>Driver Information not found</div>;
  } else {
    return (
      <div>
        <ul>
          <li>Name: {driverInfo.givenName + " " + driverInfo.familyName}</li>
          <li>Driver Number: {driverInfo.permanentNumber}</li>
          <li>Nationality: {driverInfo.nationality}</li>
          <li>Date of Birth: {driverInfo.dateOfBirth}</li>
        </ul>
        <TableWrapper
          columns={columns}
          data={driverResults}
          keys={keys}
        ></TableWrapper>
      </div>
    );
  }
}
