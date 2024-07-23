import axios from "axios";
import { useEffect, useState } from "react";

interface ITodayMatches {
    utcDate: string;
    status: string;
    homeTeam: {
        name: string;
        crest: string;
    };
    awayTeam: {
        name: string;
        crest: string;
    };
    competition: {
        emblem: string;
    };
    score: {
        fullTime: {
            home: number | null;
            away: number | null;
        };
    }
}


interface IProcessedMatch {
    utcDate: string;
    status: string;
    homeTeamName: string;
    homeTeamCrest: string;
    awayTeamName: string;
    awayTeamCrest: string;
    competitionEmblem: string;
    fullTimeHomeScore: number | null;
    fullTimeAwayScore: number | null;
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


    const processMatches = (matches: any[]): IProcessedMatch[] => {
        return matches.map(match => ({
            utcDate: match.utcDate,
            status: match.status,
            homeTeamName: match.homeTeam.name,
            homeTeamCrest: match.homeTeam.crest,
            awayTeamName: match.awayTeam.name,
            awayTeamCrest: match.awayTeam.crest,
            competitionEmblem: match.competition.emblem,
            fullTimeHomeScore: match.score.fullTime.home,
            fullTimeAwayScore: match.score.fullTime.away
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
        <table>
            <tr>
                <th>리그</th>
                <th>날짜</th>
                <th>상태</th>
                <th>홈팀 이미지</th>
                <th>홈팀</th>
                <th>vs</th>
                <th>어웨이팀 이미지</th>
                <th>어웨이</th>
                <th>스코어</th>
                <th>스코어</th>
            </tr>
            {TodayMatches.map((today)=>(
                 <tr>
                 <td><img  src={today.competitionEmblem}/></td>
                 <td>{today.utcDate}</td>
                 <td>{today.status}</td>
                 <td><img  src={today.homeTeamCrest}/></td>
                 <td>{today.homeTeamName}</td>
                 <td>vs</td>
                 <td><img  src={today.awayTeamCrest}/></td>
                 <td>{today.awayTeamName}</td>
                 <td>{today.fullTimeHomeScore}</td>
                 <td>{today.fullTimeAwayScore}</td>
             </tr>
            ))
           
            }
        </table>
        
    </>
}

export default Today