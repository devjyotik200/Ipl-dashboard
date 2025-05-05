// api.js
import axios from "axios";

export const fetchLiveScores = async () => {
  const response = await axios.get(
    "https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-livescores",
    {
      headers: {
        'x-rapidapi-host': 'free-cricbuzz-cricket-api.p.rapidapi.com',
        'x-rapidapi-key': '68e7358fd0msh72ef939a665e958p197aa9jsn81d190e976d7',
      },
    }
  );
  return response.data;
};
