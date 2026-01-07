function DashboardCards({
  icon,
  value,
  title,
  bgColor = "bg-orange-50",
  iconColor = "text-orange-500",
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl ${bgColor}`}
      >
        <i className={`${icon} text-xl ${iconColor}`}></i>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCards;
