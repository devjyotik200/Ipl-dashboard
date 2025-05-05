// api.js
import axios from "axios";

export const fetchLiveScores = async () => {
  const response = await axios.get(
    "https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-livescores",
    {
      headers: {
        'x-rapidapi-host': 'free-cricbuzz-cricket-api.p.rapidapi.com',
        'x-rapidapi-key': 'b7a8b7af03msh7a628e703d25185p1e788fjsnf09a643e4921',
      },
    }
  );
  return response.data;
};
