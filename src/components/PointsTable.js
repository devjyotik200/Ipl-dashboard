export default function PointsTable({ points }) {
  if (!points || points.length === 0)
    return <p className="text-center">No Points Table Data</p>;

  const colorCoding = {
    "Punjab Kings": "bg-orange-300",
    "Royal Challengers Bengaluru": "bg-red-300",
    "Mumbai Indians": "bg-blue-300",
    "Gujarat Titans": "bg-blue-400",
    "Delhi Capitals": "bg-red-400",
    "Lucknow Super Giants": "bg-blue-400",
    "Kolkata Knight Riders": "bg-purple-300",
    "Rajasthan Royals": "bg-pink-300",
    "Sunrisers Hyderabad": "bg-orange-400",
    "Chennai Super Kings": "bg-yellow-300",
  };

  return (
    <div className="overflow-x-auto max-w-3xl mx-auto">
      <table className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden text-sm">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Team</th>
            <th className="px-2 py-2">M</th>
            <th className="px-2 py-2">W</th>
            <th className="px-2 py-2">L</th>
            <th className="px-2 py-2">Pts</th>
            <th className="px-2 py-2">NRR</th>
          </tr>
        </thead>
        <tbody>
          {points.map((team, index) => (
            <tr
              key={index}
              className={`text-center border-t ${
                colorCoding[team.team]
              }`}
            >
              <td className="px-4 py-2 text-left">{team.team}</td>
              <td className="px-2 py-2">{team.matches}</td>
              <td className="px-2 py-2">{team.wins}</td>
              <td className="px-2 py-2">{team.losses}</td>
              <td className="px-2 py-2 ">{team.points}</td>
              <td className="px-2 py-2">{team.nrr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
