// pages/schedule.js

import { useEffect, useState, useMemo } from "react";
import ScheduleList from "../components/ScheduleList";
import PastMatches from "../components/PastMatches";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";

export default function SchedulePage() {
  const [tab, setTab] = useState("past");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ipl-schedule"],
    queryFn: async () => {
      const res = await fetch("/api/getMatchSchedule");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 60 * 1000, 
  });
  const pastSchedule = useMemo(() => {
    return data?.schedule.filter((sch) => sch.MatchStatus === "Post") || [];
  }, [data]);

  const upcomingSchedule = useMemo(() => {
    return data?.schedule.filter((sch) => sch.MatchStatus === "UpComing") || [];
  }, [data]);

  const teamOptions = useMemo(() => {
    const allTeams = [
      ...(pastSchedule ?? []),
      ...(upcomingSchedule ?? []),
    ].flatMap((m) => [m.teamA.name, m.teamB.name]);
    return Array.from(new Set(allTeams)).sort();
  }, [pastSchedule, upcomingSchedule]);

  const venueOptions = useMemo(() => {
    const allVenues = [
      ...(pastSchedule ?? []),
      ...(upcomingSchedule ?? []),
    ].map((m) => m.GroundName);
    return Array.from(new Set(allVenues)).sort();
  }, [pastSchedule, upcomingSchedule]);
  console.log("pastSchedule",pastSchedule)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-2xl text-black font-bold text-center mb-6 mt-6">
        IPL Match Schedule
      </h1>
      {isLoading && (
        <div className="text-center text-blue-600 animate-pulse">
          Loading...
        </div>
      )}

      {isError && (
        <div className="text-center text-red-600">Error fetching data</div>
      )}
      <div className="flex flex-col mx-auto sm:flex-row sm:w-1/2 gap-4 mb-6">
        {/* Team Filter */}
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Team
          </label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">All Teams</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Venue Filter */}
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Venue
          </label>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">All Venues</option>
            {venueOptions.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex text-black text-[12px] sm:text-[16px] items-center rounded-2xl border-[1px] justify-center w-[50%] mx-auto mb-4">
        <div
          className={`flex items-center rounded-2xl justify-center w-[50%] p-2 ${
            tab === "past" ? " bg-blue-500 font-semibold" : ""
          }`}
          onClick={() => setTab("past")}
        >
          Past Matches
        </div>
        {/* <button
          className={`flex-1 w-[100px] p-2 ${
            tab === "past" ? "border-b-2 border-blue-500 font-semibold" : ""
          }`}
          onClick={() => setTab("past")}
        >
          Past Matches
        </button> */}
        <button
          className={`flex-1 w-[25%] p-2 ${
            tab === "upcoming" ? " bg-blue-500 rounded-2xl  font-semibold" : ""
          }`}
          onClick={() => setTab("upcoming")}
        >
          Upcoming Matches
        </button>
      </div>
      {tab === "past"
        ? pastSchedule && (
            <PastMatches
              matches={pastSchedule}
              selectedTeam={selectedTeam}
              selectedVenue={selectedVenue}
            />
          )
        : upcomingSchedule && (
            <ScheduleList
              scheduleList={upcomingSchedule}
              selectedTeam={selectedTeam}
              selectedVenue={selectedVenue}
            />
          )}
      {/* <PastMatches matches={data?.schedule} /> */}

      {/* {data && <ScheduleList scheduleList={data?.schedule} />} */}
    </div>
  );
}
