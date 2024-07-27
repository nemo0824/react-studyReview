import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Fotmob from "fotmob";
import { response } from "express";
import Today from "./Today";
import { useQuery } from "react-query";
import { leagueFetch } from "../api";


const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    padding: 0px 20px;
    margin: 0 auto;
`

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`

const Card = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px;
    width: calc(25% - 16px);
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
`;

const CardTittle = styled.li`
    list-style-type: none;
    list-style: none;
`






 

interface ICompetition{
   id:number;
   name:string;
   type:string;
   code:string;
   flag:string;
   emblem:string;
}


export interface ICategory{
    competitions: ICompetition[]
}

function Home(){
    const {isLoading, data} = useQuery<ICompetition[]>("allLeague", leagueFetch)
    // const {isLoading, data} = useQuery("allLeague", League)

    // const [league, setLeague] = useState<ICompetition[]>([]);
    

    // const getLeague = async () => {
    //       const response = await axios.get<ICategory>('v4/competitions',{
    //         headers:{
    //             "X-Auth-Token" : 'bb7ff2b2ebc34e639ed557d487951f77'
    //         }
    //       });  
    //       const filterdCategory = response.data.competitions.filter((match) => match.name !== "Copa Libertadores")
    //       setLeague(filterdCategory);

    //   };

     


//    useEffect(()=>{
//     getLeague()
//    },[])

 

    return (
        <>
        <Wrapper>
            <Row>
                <Today></Today>
            </Row>
            {/* <Row>
                {league.map((matches, index)=> (
                         <Card key={index}>
                            <img  src={matches.emblem}/>
                            <CardTittle>{matches.name} </CardTittle>
                            
                        </Card>
                        ))}
               
            </Row> */}
            <Row>
                {
                    isLoading ? (<h1>Loading....</h1>

                    ) : (
                        data?.map((element, index)=> (
                            <Card key={index}>
                                <img src={element.emblem}/>
                                <CardTittle>{element.name}</CardTittle>
                            </Card>
                        ))

                        
                    )
                }
            </Row>
           
        </Wrapper>
        
        
        </>
    )
}

export default Home;