import { useEffect, useState,useMemo } from "react";
import MatchCard from "../components/MatchCard";
import LiveScorecard from '../components/LiveScoreCard'
import ScheduleList from '../components/ScheduleList'
import Navbar from "../components/Navbar";
// import { fetchLiveScores } from '../pages/api/liveScore';
import { useQuery } from "@tanstack/react-query";


export default function Home() {

  const [score, setScore] = useState({
    seriesId: "",
    matchId: "",
    matchTitle: "",
    matchFormat: " ",
    matchVenue: "",
    matchDate: "",
    matchTime: " ",
    teamOne: {
      name: "",
      score: "",
      status: "",
    },
    teamTwo: {
      name: "",
      score: "",
      status: "",
    },
    matchStatus: "",
    currentStatus: "",
  });

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["liveScores"],
  //   queryFn: fetchLiveScores,
  //   refetchInterval: 1000000,
  // });

  const { data:scheduleData, scheduleIsLoading, scheduleIsError } = useQuery({
    queryKey: ["ipl-schedule"],
    queryFn: async () => {
      const res = await fetch("/api/getMatchSchedule");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    // enabled: !isLoading && !score?.matchId,
    enabled:true,
    staleTime: 60 * 1000, 
  });

  const upcomingSchedule = useMemo(() => {
    console.log("hiiii",scheduleData)
      return scheduleData?.schedule?.filter((sch) => sch.MatchStatus === "UpComing") || [];
    }, [scheduleData]);
  console.log("scheduleData",scheduleData)

  useEffect(()=>{
    console.log("scheduleData insideeeee",scheduleData)
  },[scheduleData])

  // useEffect(() => {
  //   if (data) {
  //     const matchDetails = data?.response?.filter(
  //       (match) => match.seriesName == "INDIAN PREMIER LEAGUE 2025"
  //     );

  //     setScore(matchDetails?.[0]?.matchList?.[0]);
  //   }
  // }, [data]);

  // if (isLoading) return <p>Loading live scores...</p>;
  // if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          IPL T20 Dashboard
        </h1>
        {/* <MatchCard match={data?.liveMatch} /> */}
        {score?.matchId ?<LiveScorecard score={score}/> : <ScheduleList
                      scheduleList={upcomingSchedule}
                      selectedTeam={""}
                      selectedVenue={""}
                    />} 
      </div>
    </>
  );
}
