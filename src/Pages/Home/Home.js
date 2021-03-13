import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home(){
  return(
    <div>
      <h1 className={styles.link}><Link to="/drivers">Drivers</Link></h1>
      <h1 className={styles.link}><Link to="/constructors">Constructors</Link></h1>
      <h1 className={styles.link}><Link to="/seasons">Seasons</Link></h1>
    </div>
  );
}

export default Home;