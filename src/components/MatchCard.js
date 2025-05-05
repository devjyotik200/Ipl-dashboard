export default function MatchCard({ match }) {
  if (!match) return null;

  const { teamA, teamB, venue, time, status } = match;

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-blue-100 shadow-xl rounded-2xl p-5 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center text-blue-700 mb-3">🔥 Live Match</h2>

      <div className="flex justify-between items-center text-xl font-extrabold text-gray-800">
        <span>{teamA}</span>
        <span className="text-sm text-gray-500">vs</span>
        <span>{teamB}</span>
      </div>

      <p className="text-center text-sm text-gray-600 mt-1">{venue}</p>
      <p className="text-center text-sm text-gray-600">{time}</p>

      <div className="mt-4 text-center text-green-600 font-semibold italic">{status}</div>
    </div>
  );
}
