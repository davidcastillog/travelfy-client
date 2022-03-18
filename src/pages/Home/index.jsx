import "./Home.css";
import SearchBox from "../../components/SearchBox";


export default function HomePage({user,...props}) {

  return (
    <div
      style={{ height: "70vh", width: "100%" }}
      className="home-div-container"
    >
      <SearchBox/>
    </div>
  );
}
