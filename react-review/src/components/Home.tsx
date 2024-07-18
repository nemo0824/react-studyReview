import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Fotmob from "fotmob";
import { response } from "express";

interface ICompetition{
   id:number;
   name:string;
   type:string;
   code:string;
   flag:string;
}

interface ICategory{
    competitions: ICompetition[]
}




function Home(){
    const [todayMatch, setTodayMatch] = useState<ICompetition[]>([]);
    

    const getPL = async () => {
       
          const response = await axios.get<ICategory>('v4/competitions',{
            headers:{
                "X-Auth-Token" : 'bb7ff2b2ebc34e639ed557d487951f77'
            }
          });  // 프록시 설정에 따라 요청을 보냄
        //   setTodayMatch(response.data);
          console.log(response.data);
          setTodayMatch(response.data.competitions);
         
      };

    //   const getMatch =  () =>{
    //     fetch("/v4/matches",{
    //         headers:{
    //             "X-Auth-Token" : 'bb7ff2b2ebc34e639ed557d487951f77'
    //         }
    //     }).then((response)=> response.json().then((data)=> console.log(data)))
       
    //   }
    


   useEffect(()=>{
    // getMatch()
    getPL()
  

   
   },[])

    return (
        <>
        <h1>HOME</h1>
        <ul>
            {todayMatch.map((matches)=> (
                <li key={matches.id}>
                    {matches.name}
                </li>
            ))}
        </ul>
        </>
    )
}

export default Home;