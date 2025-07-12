const MenuIconList = ({ items, columns = 1 }) => {
  const gridClass = columns === 1 
    ? 'grid-cols-1' 
    : columns === 2 
      ? 'grid-cols-2' 
      : 'grid-cols-3';

  return (
    <div className="mt-2 top-14 left-4 z-30 bg-white rounded-md shadow-sm w-50 p-2 overflow-hidden border border-gray-200">
      <div className={`grid ${gridClass} gap-0`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="text-left py-2 px-3 hover:bg-indigo-100 rounded-sm transition-colors flex items-center gap-3 min-w-[180px]"
            >
              <Icon className={`text-${item.color}`} />
              <span className="text-gray-800 font-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuIconList;