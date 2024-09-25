"use client";
import React,{ useState , useEffect,useCallback} from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";


function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      setVideos(response.data);
    } catch (error) {
      
    }
  },[])

  return <div>Home</div>;
}

export default Home;
