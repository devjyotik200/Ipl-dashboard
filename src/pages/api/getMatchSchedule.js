import axios from "axios";
import Redis from "ioredis";
const redis = new Redis();
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function formatDateTime(dateTimeStr) {
  const date = dayjs.tz(dateTimeStr, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');

  const month = date.format('MMM').toUpperCase();    
  const weekday = date.format('ddd').toUpperCase();  
  const day = date.format('D');                      
  const time = date.format('h:mm a');               

  return `${month}, ${weekday} ${day}, ${time} IST`;
}

function formatDate(dateStr) {
  const date = dayjs(dateStr);
  const month = date.format('MMM').toUpperCase();   
  const weekday = date.format('ddd').toUpperCase();
  const day = date.format('D');                     
  return `${month}, ${weekday} ${day}`;
}

function formatTime(timeStr) {
  const time = dayjs.tz(timeStr, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');
  return time.format('h:mm a'); 
}

export default async function handler(req, res) {
  try {
    const cached = await redis.get("ipl-schedule-7");
    console.log("cached",cached)
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
    const pointsRes = await axios.get(
      "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js"
    );

    const scriptContent = pointsRes.data;
    const match = scriptContent.match(/MatchSchedule\((\{.*\})\);/);
    let schedule = null;
    if (match && match[1]) {
      const rawSchedule = JSON.parse(match[1]); 
      schedule = rawSchedule.Matchsummary.map((team) => ({
        teamA: {
          code: team.FirstBattingTeamCode,
          name: team.FirstBattingTeamName,
          runs: team["1FallScore"],
          overs: team["1FallOvers"],
          wickets: team["1FallWickets"],
          runRate: team["1RunRate"],
          summary: team.FirstBattingSummary,
          logo:
            team.FirstBattingTeamName == team.HomeTeamName
              ? team.MatchHomeTeamLogo	
              : team.MatchAwayTeamLogo,
          color:
            team.FirstBattingTeamName == team.HomeTeamName
              ? team.HomeTeamColor1
              : team.AwayTeamColor1,
        },
        teamB: {
          code: team.SecondBattingTeamCode,
          name: team.SecondBattingTeamName,
          runs: team["2FallScore"],
          overs: team["2FallOvers"],
          wickets: team["2FallWickets"],
          runRate: team["2RunRate"],
          summary: team.SecondBattingSummary,
          logo:
            team.SecondBattingTeamName == team.HomeTeamName
              ? team.MatchHomeTeamLogo	
              : team.MatchAwayTeamLogo,
          color:
            team.SecondBattingTeamName == team.HomeTeamName
              ? team.HomeTeamColor1
              : team.AwayTeamColor1,
        },
        Comments: team.Comments,
        MatchDate: formatDate(team.MatchDate),
        MatchTime: formatTime(team.MatchDate+ " "+team.MatchTime),
        MatchID: team.MatchID,
        GroundName: team.GroundName + ", " + team.city,
        ticketLink: team.FBURL,
        MatchStatus: team.MatchStatus,
        matchNumber: team.MatchOrder,
        matchDateTime: formatDateTime(team.MatchDate+ " "+team.MatchTime)
      }));
    } else {
      console.error("Failed to extract the JSON data.");
    }
    await redis.set(
      "ipl-schedule-7",
      JSON.stringify({ schedule }),
      "EX",
      3600
    );

    console.log("api schedule",schedule)
    res.status(200).json({ schedule });
  } catch (err) {
    console.error("Scraping Error:", err);
    res.status(500).json({ error: "Failed to fetch IPL data" });
  }
}
