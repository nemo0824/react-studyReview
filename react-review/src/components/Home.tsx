import { useEffect } from "react";
import { BASE_PATH, API_KEY, PROXY } from "../api";
import { useState } from "react";

function Home(){
    const [todayMatch, setTodayMatch] = useState(null);
    
    const getToday = async () => {
        const response = await fetch(`/competitions/PL`,{
            method: 'GET',
            headers: {
               'X-Auth-Token': 'bb7ff2b2ebc34e639ed557d487951f77' 
            }
        })
        const data = await response.json()
       setTodayMatch(data)
       console.log(data)
    }


   useEffect(()=>{
    getToday()
   },[])

    return (
        <>
        <h1>HOME</h1>
        <p>{todayMatch}</p>
        </>
    )
}

export default Home;