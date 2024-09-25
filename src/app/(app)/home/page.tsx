"use client";
import React,{ useState , useEffect,useCallback} from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";


function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      setVideos(response.data);
    } catch (error) {
      console.log(error);
      setError("Error fetching videos");
    }
  },[])

  return <div>Home</div>;
}

export default Home;
