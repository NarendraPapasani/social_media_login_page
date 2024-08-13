import Navbar from "../Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  let a = currentUser.email;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`/profile/:${a}`);
        setData(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <Navbar />
      <div className="bg-gray-700 h-screen w-screen">
        <h1 className="text-white">Home</h1>
      </div>
    </>
  );
};

export default Home;
