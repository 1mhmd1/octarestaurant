function DashboardCards({ icon, value, title }) {
  return (
    <div className=" border rounded-xl p-6 flex flex-col  gap-2">
      <i className={icon}></i>

      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-orange-600">{value}</h2>
    </div>
  );
}
export default DashboardCards;
