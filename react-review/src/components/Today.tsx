import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import styled from "styled-components";
// interface ITodayMatches {
//     utcDate: string;
//     status: string;
//     homeTeam: {
//         name: string;
//         crest: string;
//     };
//     awayTeam: {
//         name: string;
//         crest: string;
//     };
//     competition: {
//         emblem: string;
//     };
//     score: {
//         fullTime: {
//             home: number | null;
//             away: number | null;
//         };
//     }
// }

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 8px;
`

const Th = styled.th`
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    background-color: #bbb;
    
`
const Td = styled.td`
      border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    background-color: #f4f4f4;
    vertical-align: middle;
   
`
const Img = styled.img`
    width: 30px;
`



interface IProcessedMatch {
    utcDate: string;
    status: string;
    homeTeamName: string;
    homeTeamCrest: string;
    awayTeamName: string;
    awayTeamCrest: string;
    competitionEmblem: string;
    fullTimeHomeScore: number | string | null;
    fullTimeAwayScore: number | string | null;
}



function Today(){
    const [TodayMatches, setTodayMatches] = useState<IProcessedMatch[]>([])
  


    // 날짜 변환 함수
    const getTodayDate = ()=>{
        const todayDate = new Date()
        const tomorrowDate = new Date(todayDate)

        tomorrowDate.setDate(tomorrowDate.getDate() + 1)

        const formatDate = (date:any) =>{
            const year = date.getFullYear();
            const month = String(date.getMonth() +1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return {
            todayDate: formatDate(todayDate),
            tomorrowDate: formatDate(tomorrowDate)
        };
    }
    const { todayDate, tomorrowDate } = getTodayDate();

    // 렌더링시 날짜형식 변경
    const changeUtcDate = (utcDate:any) =>{
        const date = new Date(utcDate)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    // 스코어 렌더링시 null일경우 
    const notPlayedMatch = (score:number|null): string|number => {
       return score === null ? "경기전" : score
    }

    // 필요한데이터만 가져오기
    const processMatches = (matches: any[]): IProcessedMatch[] => {
        return matches.map(match => ({
            utcDate: changeUtcDate(match.utcDate),
            status: match.status,
            homeTeamName: match.homeTeam.name,
            homeTeamCrest: match.homeTeam.crest,
            awayTeamName: match.awayTeam.name,
            awayTeamCrest: match.awayTeam.crest,
            competitionEmblem: match.competition.emblem,
            fullTimeHomeScore: notPlayedMatch(match.score.fullTime.home),
            fullTimeAwayScore: notPlayedMatch(match.score.fullTime.away)
        }));
    };
    
    

    // 오늘 내일 축구매치 호출 api 
    const getTodayMatch = async () => {
        const response = await axios.get('v4/matches',{
            headers:{
                 "X-Auth-Token" : 'bb7ff2b2ebc34e639ed557d487951f77'
            },
            params: {
                dateFrom: todayDate,
                dateTo: tomorrowDate,
              }
        });

        

        const processedMatches = processMatches(response.data.matches)
        setTodayMatches(processedMatches)

        console.log(processedMatches)
      }



      useEffect(()=>{
        getTodayMatch()
        
      },[])
    return <>
    
        <Table>
            <tr>
                <Th>리그</Th>
                <Th>날짜</Th>
                <Th>상태</Th>
                <Th>홈팀 이미지</Th>
                <Th>팀명</Th>
                <Th>vs</Th>
                <Th>어웨이팀 이미지</Th>
                <Th>팀명</Th>
                <Th>스코어</Th>
                <Th>스코어</Th>
            </tr>
            {TodayMatches.map((today)=>(
                 <tr>
                 <Td><Img  src={today.competitionEmblem}/></Td>
                 <Td>{today.utcDate}</Td>
                 <Td color={today.status}>{today.status}</Td>
                 <Td><Img  src={today.homeTeamCrest}/></Td>
                 <Td>{today.homeTeamName}</Td>
                 <Td>vs</Td>
                 <Td><Img  src={today.awayTeamCrest}/></Td>
                 <Td>{today.awayTeamName}</Td>
                 <Td>{today.fullTimeHomeScore}</Td>
                 <Td>{today.fullTimeAwayScore}</Td>
             </tr>
            ))
           
            }
        </Table>
       
    
        
    </>
}

export default Today