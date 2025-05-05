import MyIcon from "/Users/aakash/Documents/ipl-dashboard/public/ticket.svg";

export default function PastMatches({ matches,selectedTeam,selectedVenue }) {
  const filteredMatches = (matches ?? []).filter((match) => {
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
    <div className="relative text-black space-y-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-md px-4 py-6 sm:px-6 sm:py-8 md:px-10">

      {filteredMatches.map((schedule, index) =>
        !!schedule?.MatchID ? (
          <div
            key={index}
            className="bg-white flex flex-col border-b border-[#eee]"
          >
            <div className="flex items-start gap-4 mb-3 pb-3">
              <div className="relative w-[25%] sm:w-[20%] flex flex-row">
                <div className="py-1 px-2 text-[11px] sm:text-xs border border-[#FF783E] whitespace-nowrap">
                  {schedule.matchNumber}
                </div>
                <div className="flex-1 border-t border-[#FF783E] my-auto hidden sm:block"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF783E] my-auto hidden sm:block"></div>
              </div>
              <div className="flex flex-col justify-center text-xs sm:text-sm">
                <div className="font-medium">{schedule?.GroundName}</div>
                <div className="text-[10px] text-gray-500">
                  {schedule?.matchDateTime}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-4 pb-6">
              <div className="w-full sm:w-[20%]">
                <div className="text-base sm:text-lg font-semibold">
                  {schedule?.Comments}
                </div>
              </div>

              <div className="flex w-full sm:w-[80%] justify-between items-center font-semibold text-gray-700">
                <div className="flex w-[45%] items-center gap-2">
                  <img
                    src={schedule?.teamA.logo}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    alt="Team A"
                  />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-800">
                      {schedule.teamA.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {schedule.teamA.summary}
                    </div>
                  </div>
                </div>
                <div className="w-[10%] text-center text-sm sm:text-base">
                  vs
                </div>
                <div className="flex w-[45%] items-center gap-2 ">
                  <img
                    src={schedule?.teamB.logo}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    alt="Team B"
                  />
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-semibold text-gray-800">
                      {schedule.teamB.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {schedule.teamB.summary}
                    </div>
                  </div>
                </div>
                <a
                  href={schedule?.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto hidden sm:flex justify-center items-center"
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
