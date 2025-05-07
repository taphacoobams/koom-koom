export default function BudgetBox({ label, percentage, amount, color, textColor }) {
    return (
      <div className={`rounded-lg shadow p-4 w-full ${color}`}>
        <p className="text-sm font-semibold">{percentage}%</p>
        <h3 className={`text-xl font-bold ${textColor}`}>{label}</h3>
        <p className="text-sm">{amount.toLocaleString()} CFA</p>
      </div>
    );
  }
  