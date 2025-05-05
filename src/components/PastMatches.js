import MyIcon from "/Users/aakash/Documents/ipl-dashboard/public/ticket.svg";
// export default function PastMatches({ matches }) {
//   console.log("insideee");
//   return (
//     <div className="relative space-y-6 max-w-[90%] mx-auto bg-white rounded-2xl shadow-md px-[40px] py-8">
//       {matches.map((match, index) => (
//         <div key={index} className="border-l-4 border-green-500 pl-4">
//           {/* Match Number + Result */}
//           <div className="text-sm text-gray-600 font-semibold mb-1">
//             {match.matchNumber}
//           </div>
//           <div className="text-md font-bold text-gray-800 mb-1">
//             {match.Comments}
//           </div>

//           {/* Venue + Date */}
//           <div className="text-sm text-gray-500 mb-2">
//             {match.GroundName} | {match.MatchDate} | {match.MatchTime}
//           </div>

//           {/* Teams and Scores */}
//           <div className="flex flex-col w-full sm:flex-row sm:justify-between items-center gap-4 mb-4">
//             {/* Team A */}
//             <div className="flex items-center gap-3 w-full sm:w-1/2 justify-between">
//               <div className="flex items-center gap-2">
//                 <img src={match.teamA.logo} alt="Team A" className="w-8 h-8" />
//                 <div>
//                   <div className="font-semibold whitespace-nowrap text-gray-700">
//                     {match.teamA.name}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {match.teamA.summary}
//                   </div>
//                 </div>
//               </div>
//               <span className="text-sm text-gray-400">vs</span>
//               <div className="flex items-center gap-3 w-full sm:w-1/2 justify-between sm:justify-start">
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={match.teamB.logo}
//                     alt="Team B"
//                     className="w-8 h-8"
//                   />
//                   <div>
//                     <div className="font-semibold text-gray-700">
//                       {match.teamB.name}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {match.teamB.summary}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Team B */}
//             {/* <div className="flex items-center gap-3 w-full sm:w-1/2 justify-between sm:justify-start">
//                 <div className="flex items-center gap-2">
//                   <img src={match.teamB.logo} alt="Team B" className="w-8 h-8" />
//                   <div>
//                     <div className="font-semibold text-gray-700">{match.teamB.name}</div>
//                     <div className="text-xs text-gray-500">{match.teamB.summary}</div>
//                   </div>
//                 </div>
//               </div> */}
//           </div>

//           {/* Match Centre Button */}
//           <div className="flex justify-end">
//             <a
//               href={match.ticketLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium"
//             >
//               Match Centre
//             </a>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

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
    // <div className="relative text-black space-y-6 max-w-[90%] mx-auto bg-white rounded-2xl shadow-md px-[40px] py-8">
    //   <div className="absolute z-10 mt-[8x] !h-[calc(100%_-_60px)] left-[22%] border-r-[1px] border-[#11141C] border-dashed sm:hidden "></div>
    //   {matches.map((schedule, index) =>
    //     !!schedule?.MatchID ? (
    //       <div
    //         key={index}
    //         className="bg-white flex flex-col border-b-[1px] border-[#eee] "
    //       >
    //         <div className="flex flex-row mb-[10px] pb-[10px]">
    //           <div className="relative w-[20%] h-[25px] flex flex-row mr-[20px]">
    //             <div className="py-[5px] h-[30px] text-[12px] text-black px-[10px] border-solid border-[#FF783E] border-[1px] whitespace-nowrap ">
    //               {schedule.matchNumber}
    //             </div>
    //             <div className="justify-center items-center my-auto w-full border-t-[1px] border-solid border-[#FF783E] "></div>
    //             <div className="justify-center z-30 items-center my-auto !w-[10px] !h-[10px] rounded-full bg-[#FF783E] "></div>
    //           </div>
    //           <div className="flex flex-col justify-center ">
    //             <div className="text-[12px] font-medium flex justify-center items-center">
    //               {schedule?.GroundName}
    //             </div>
    //             <div className="text-[10px] font-light ">
    //               {schedule?.matchDateTime}
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex flex-row w-full pb-8">
    //           <div className="flex flex-col w-[20%] mr-[20px]">
    //             <div className="text-[20px] font-semibold ">
    //               {schedule?.Comments}
    //             </div>
    //             {/* <div className="text-[12px] font-medium ">{schedule?.MatchTime}</div> */}
    //           </div>
    //           <div className="flex w-[90%] justify-between font-semibold text-gray-700 pr-[20px]">
    //             <div className="flex w-[45%] pl-10 items-center">
    //               <img
    //                 src={schedule?.teamA.logo}
    //                 className="w-20 h-20 object-contain mr-2"
    //               />
    //               <div>
    //                 <div className="font-semibold  text-gray-700">
    //                   {schedule.teamA.name}
    //                 </div>
    //                 <div className="text-xs text-gray-500">
    //                   {schedule.teamA.summary}
    //                 </div>
    //               </div>
    //               {/* <div className=""></div>
    //               {schedule?.teamA?.code} */}
    //             </div>
    //             <div className="flex w-[10%] justify-center items-center">
    //               vs{" "}
    //             </div>
    //             <div className="flex w-[45%] ml-auto items-center">
    //               <img
    //                 src={schedule?.teamB.logo}
    //                 className="w-20 h-20 mr-2 object-contain"
    //               />
    //               <div>
    //                 <div className="font-semibold text-gray-700">
    //                   {schedule.teamB.name}
    //                 </div>
    //                 <div className="text-xs text-gray-500">
    //                   {schedule.teamB.summary}
    //                 </div>
    //               </div>
    //               {/* {schedule?.teamB?.code} */}
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
    <div className="relative text-black space-y-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-md px-4 py-6 sm:px-6 sm:py-8 md:px-10">
      {/* <div className="absolute z-10 top-[60px] h-[calc(100%-60px)] left-[8%] border-r border-[#11141C] border-dashed hidden sm:block"></div> */}

      {filteredMatches.map((schedule, index) =>
        !!schedule?.MatchID ? (
          <div
            key={index}
            className="bg-white flex flex-col border-b border-[#eee]"
          >
            {/* Match Info Row */}
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

            {/* Teams Row */}
            <div className="flex flex-col sm:flex-row w-full gap-4 pb-6">
              {/* Comment */}
              <div className="w-full sm:w-[20%]">
                <div className="text-base sm:text-lg font-semibold">
                  {schedule?.Comments}
                </div>
              </div>

              {/* Match Details */}
              <div className="flex w-full sm:w-[80%] justify-between items-center font-semibold text-gray-700">
                {/* Team A */}
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

                {/* VS */}
                <div className="w-[10%] text-center text-sm sm:text-base">
                  vs
                </div>

                {/* Team B */}
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

                {/* Ticket Icon */}
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
