interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

function SummaryCard({ title, value, subtitle }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-200">
      <p className="text-sm font-medium text-slate-500 mb-2">{title}</p>

      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>

      {subtitle && <p className="text-sm text-slate-400 mt-2">{subtitle}</p>}
    </div>
  );
}

export default SummaryCard;
