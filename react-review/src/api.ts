import axios from "axios";

export const API_KEY = "bb7ff2b2ebc34e639ed557d487951f77"
export const BASE_PATH = "https://api.football-data.org/v4/matches"
export const PROXY = "https://cors-anywhere.herokuapp.com"
// const dateFrom = '2024-07-16';
// const dateTo = '2024-07-17';




// export function getMatch() {
//   return fetch(`${BASE_PATH}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${API_KEY}`  // 또는 'X-Auth-Token': API_KEY
//     }
//   }).then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   }).catch(error => {
//     console.error('Error fetching match:', error);
//     throw error;
//   });
// }

