import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { fetchLiveScores } from '../pages/api/liveScore';

export default function LiveScorecard({score}) {
//   const [score, setScore] = useState({
//     seriesId: "",
//     matchId: "",
//     matchTitle: "",
//     matchFormat: " ",
//     matchVenue: "",
//     matchDate: "",
//     matchTime: " ",
//     teamOne: {
//       name: "",
//       score: "",
//       status: "",
//     },
//     teamTwo: {
//       name: "",
//       score: "",
//       status: "",
//     },
//     matchStatus: "",
//     currentStatus: "",
//   });

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["liveScores"],
//     queryFn: fetchLiveScores,
//     refetchInterval: 30000,
//   });

//   const isLive = true;

//   useEffect(() => {
//     if (data) {
//       const matchDetails = data?.response?.filter(
//         (match) => match.seriesName == "INDIAN PREMIER LEAGUE 2025"
//       );

//       setScore(matchDetails?.[0]?.matchList?.[0]);
//     }
//   }, [data]);

//   if (isLoading) return <p>Loading live scores...</p>;
//   if (isError) return <p>Error: {error.message}</p>;


  return (
    <div className="max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 border rounded-md shadow-sm bg-white">
      <p className="text-red-600 font-semibold text-xs sm:text-sm mb-1">LIVE</p>
      <p className="text-gray-700 text-xs sm:text-sm mb-2">
        {score?.matchFormat}, {score?.matchVenue}
      </p>
      <p className="text-gray-700 text-xs sm:text-sm mb-2">
        {score?.matchDate}
      </p>

      <div className="flex flex-row sm:items-center sm:justify-between mb-1">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          <p className="font-bold text-gray-900">
            {score?.teamOne?.name}
            {score?.teamOne?.status == "bat" && (
              <span className="text-red-500">•</span>
            )}
          </p>
        </div>
        <p className="font-bold text-gray-900 text-left sm:text-right ml-auto">
          {score?.teamOne?.score}
        </p>
      </div>

      <div className="flex flex-row sm:items-center sm:justify-between mb-1">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          <p className="font-bold text-gray-900">
            {score?.teamTwo?.name}
            {score?.teamTwo?.status == "bat" && (
              <span className="text-red-500">•</span>
            )}
          </p>
        </div>
        <p className="font-bold text-gray-900 text-left sm:text-right ml-auto">
          {score?.teamTwo?.score}
        </p>
      </div>

      <p className="text-gray-700 text-xs sm:text-sm mt-2">
        {score?.matchStatus}
      </p>
    </div>
  );
}
