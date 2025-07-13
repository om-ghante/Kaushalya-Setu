const MyMatch = () => {
  return (
    <div className="bg-white rounded-sm shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">My Matches</h2>
      <ul className="space-y-4">
        {[
          {title: 'Team A vs Team B', stats: 'Tomorrow 4:00 PM'},
          {title: 'Team C vs Team D', stats: 'Today 7:30 PM'},
          {title: 'Team E vs Team F', stats: 'Yesterday - Completed'},
        ].map((match, i) => (
          <li key={i} className="pb-2 border-b last:border-0 last:pb-0">
            <h3 className="font-semibold mb-1">{match.title}</h3>
            <p className="text-xs text-gray-500">{match.stats}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyMatch;