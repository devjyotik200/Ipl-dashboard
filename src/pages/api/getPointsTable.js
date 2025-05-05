import axios from "axios";
import Redis from 'ioredis';
const redis = new Redis();

export default async function handler(req, res) {
  try {
    const cached = await redis.get('ipl-points-table');
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
    const pointsRes = await axios.get(
      "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js"
    );

    const scriptContent = pointsRes.data;
    const match = scriptContent.match(/ongroupstandings\((\{.*\})\);/);
    let pointsTable = null;
    if (match && match[1]) {
      const rawPoints = JSON.parse(match[1]); 

      pointsTable = rawPoints.points.map((team) => ({
        team: team.TeamName,
        matches: team.Matches,
        wins: team.Wins,
        losses: team.Loss,
        points: team.Points,
        nrr: team.NetRunRate,
      }));
    } else {
      console.error("Failed to extract the JSON data.");
    }

    await redis.set('ipl-points-table', JSON.stringify({ pointsTable}), 'EX', 3600);

    res.status(200).json({pointsTable });
  } catch (err) {
    console.error("Scraping Error:", err);
    res.status(500).json({ error: "Failed to fetch IPL data" });
  }
}
