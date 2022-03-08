import './Home.css';
import { useState, useEffect } from "react";
import { searchPlace } from "../../api/TravelAPI";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";

export default function HomePage() {
  const [valor, setValor] = useState("");

  const navigate = useNavigate();

  const initData = () => {
    getUserWS().then(response =>{
      if(response.status){
      } else {
        navigate('/auth')
      }
    })
  }

  useEffect(() => {
    initData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchPlace(valor);
    console.log(data);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValor(value);
  };
  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input name="nombre" onChange={handleChange} />
        <button>Search</button>
      </form>
    </div>
  );
}