import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Constructor() {
  const[constructorInfo, setConstructorInfo] = useState({});
  const { constructorId } = useParams();

  // useEffect(() => {
  //   axios.get(`http://ergast.com/api/f1/constructors/${constructorId}`).then((res) => {
  //     console.log(res.data);
  //   })
  // }, []);

  return(
    <div>
      Hello {constructorId}
    </div>
  );
}

