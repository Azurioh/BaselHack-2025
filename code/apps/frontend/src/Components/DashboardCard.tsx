interface DashboardCardProps {
  title: string;
  value: number;
  percentage: string;
  icon: React.ReactNode;
}
export function DashboardCard({ title, value, percentage, icon }: DashboardCardProps) {
  return (
    <div className="flex flex-1 h-[150px] border border-gray-200 rounded-lg">
      <div className="flex-2 flex flex-col !p-5">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-4xl !font-bold">{value}</h3>
        <p className="text-sm text-gray-500 !mt-[-15px]">{percentage}</p>
      </div>
      <div className="icon">
        <div className="flex items-center justify-center bg-primary/5 !rounded-lg p-2 !mt-3 !mr-3 !p-2">{icon}</div>
      </div>
    </div>
  );
}
