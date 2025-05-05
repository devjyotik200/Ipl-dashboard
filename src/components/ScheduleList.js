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
  console.log("filteredMatches",filteredMatches)
  if(filteredMatches.length==0){
    return
  }

  return (
    // <div className="relative text-black space-y-6 max-w-[90%] mx-auto bg-white rounded-2xl shadow-md px-[40px] py-8">
    //   <div className="absolute z-10 mt-[8x] !h-[calc(100%_-_60px)] left-[22%] border-r-[1px] border-[#11141C] border-dashed "></div>
    //   {scheduleList.map((schedule, index) =>
    //     !!schedule?.MatchID ? (
    //       <div
    //         key={index}
    //         className="bg-white flex flex-col border-b-[1px] border-[#eee] "
    //       >
    //         <div className="flex flex-row mb-[10px] pb-[10px]">
    //           <div className="relative w-[20%] h-[25px] flex flex-row mr-[20px]">
    //             <div className="py-[5px] h-[25px] text-[10px] text-black px-[10px] border-solid border-[#FF783E] border-[1px] whitespace-nowrap ">
    //               {schedule.matchNumber}
    //             </div>
    //             <div className="justify-center items-center my-auto w-full border-t-[1px] border-solid border-[#FF783E] "></div>
    //             <div className="justify-center z-30 items-center my-auto !w-[10px] !h-[10px] rounded-full bg-[#FF783E] "></div>
    //           </div>
    //           <div className="text-[12px] flex justify-center items-center">
    //             {schedule?.GroundName}
    //           </div>
    //         </div>
    //         <div className="flex flex-row w-full pb-8">
    //           <div className="flex flex-col w-[20%] mr-[20px]">
    //             <div className="text-[20px] font-semibold ">
    //               {schedule?.MatchDate	}
    //             </div>
    //             <div className="text-[12px] font-medium ">{schedule?.MatchTime}</div>
    //           </div>
    //           <div className="flex w-[90%] justify-between  font-semibold text-gray-700 pr-[20px]">
    //             <div className="flex w-[45%] justify-center items-center">
    //               <img
    //                 src={schedule?.teamA.logo}
    //                 className="w-20 h-20 object-contain mr-2"
    //               />
    //               {schedule?.teamA?.code}
    //             </div>
    //             <div className="flex w-[10%] justify-center items-center">
    //               vs{" "}
    //             </div>
    //             <div className="flex w-[45%] justify-center items-center">
    //               <img
    //                 src={schedule?.teamB.logo}
    //                 className="w-20 h-20 mr-2 object-contain"
    //               />
    //               {schedule?.teamB?.code}
    //             </div>
    //             <a
    //               href={schedule?.ticketLink}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="flex justify-center items-center cursor-pointer"
    //             >
    //               <MyIcon className="w-10 h-10" />
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <></>
    //     )
    //   )}
    // </div>
    <div className="relative text-black space-y-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-md px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
  {/* <div className="absolute z-10 top-[60px] h-[calc(100%-60px)] left-[8%] border-r border-[#11141C] border-dashed hidden sm:block"></div> */}

  {filteredMatches.map((schedule, index) =>
    !!schedule?.MatchID ? (
      <div
        key={index}
        className="bg-white flex flex-col border-b border-[#eee]"
      >
        {/* Top Row: Match Number and Ground Name */}
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

        {/* Middle Row: Date, Time, Teams, Ticket */}
        <div className="flex flex-col sm:flex-row w-full gap-4 pb-6">
          {/* Match Date and Time */}
          <div className=" w-full sm:w-[20%]">
            <div className="text-base sm:text-lg font-semibold">
              {schedule?.MatchDate}
            </div>
            <div className="text-xs font-medium">{schedule?.MatchTime}</div>
          </div>

          {/* Teams + Ticket */}
          <div className="flex w-full sm:w-[80%] justify-between items-center font-semibold text-gray-700">
            {/* Team A */}
            <div className="flex w-[40%] items-center gap-2 justify-center">
              <img
                src={schedule?.teamA.logo}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                alt="Team A"
              />
              <span className="text-sm sm:text-base">{schedule?.teamA?.code}</span>
            </div>

            {/* VS */}
            <div className="text-sm sm:text-base text-center w-[10%]">vs</div>

            {/* Team B */}
            <div className="flex w-[40%] items-center gap-2 justify-center">
              <img
                src={schedule?.teamB.logo}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                alt="Team B"
              />
              <span className="text-sm sm:text-base">{schedule?.teamB?.code}</span>
            </div>

            {/* Ticket Icon */}
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
