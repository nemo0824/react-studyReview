import axios from "axios";

export async function leagueFetch(){
    const response = await axios.get('v4/competitions',{
        headers:{
            "X-Auth-Token" : 'bb7ff2b2ebc34e639ed557d487951f77'
        }
    })
    const filterLeague = response.data.competitions.fitler((league:any)=> league.name !== "Copa Libertadores")
    return filterLeague
}