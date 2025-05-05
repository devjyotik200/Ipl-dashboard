import MyIcon from "/Users/aakash/Documents/ipl-dashboard/public/ticket.svg";

export default function ScheduleList({ scheduleList,selectedTeam,selectedVenue }) {
  const filteredMatches = (scheduleList ?? []).filter((match) => {
    const matchesTeam =
      !selectedTeam ||
      match.teamA.name === selectedTeam ||
      match.teamB.name === selectedTeam;
  
    const matchesVenue =
      !selectedVenue || match.GroundName === selectedVenue;
  
    return matchesTeam && matchesVenue;
  });
  if(filteredMatches.length==0){
    return
  }

  return (
    <div className="relative text-black space-y-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-md px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">

  {filteredMatches.map((schedule, index) =>
    !!schedule?.MatchID ? (
      <div
        key={index}
        className="bg-white flex flex-col border-b border-[#eee]"
      >
        <div className="flex items-center mb-3 pb-3">
          <div className="relative w-[25%] sm:w-[20%] flex flex-row mr-3 sm:mr-5">
            <div className="py-1 text-[10px] sm:text-[11px] px-2 border border-[#FF783E] whitespace-nowrap">
              {schedule.matchNumber}
            </div>
            <div className="flex-1 border-t border-[#FF783E] my-auto hidden sm:block"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF783E] my-auto hidden sm:block"></div>
          </div>
          <div className="text-xs sm:text-sm font-medium">{schedule?.GroundName}</div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4 pb-6">
          <div className=" w-full sm:w-[20%]">
            <div className="text-base sm:text-lg font-semibold">
              {schedule?.MatchDate}
            </div>
            <div className="text-xs font-medium">{schedule?.MatchTime}</div>
          </div>
          <div className="flex w-full sm:w-[80%] justify-between items-center font-semibold text-gray-700">
            <div className="flex w-[40%] items-center gap-2 justify-center">
              <img
                src={schedule?.teamA.logo}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                alt="Team A"
              />
              <span className="text-sm sm:text-base">{schedule?.teamA?.code}</span>
            </div>

            <div className="text-sm sm:text-base text-center w-[10%]">vs</div>

            <div className="flex w-[40%] items-center gap-2 justify-center">
              <img
                src={schedule?.teamB.logo}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                alt="Team B"
              />
              <span className="text-sm sm:text-base">{schedule?.teamB?.code}</span>
            </div>
            <a
              href={schedule?.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex justify-center items-center ml-2"
            >
              <MyIcon className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    ) : null
  )}
</div>


  );
}
