import { useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    { date: "30/04/2023", desc: "Courses", montant: -25000 },
    { date: "29/04/2023", desc: "Loyer", montant: -150000 },
    { date: "28/04/2023", desc: "Salaire", montant: +500000 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [desc, setDesc] = useState("");
  const [montant, setMontant] = useState("");

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const now = new Date();
    const dateStr = now.toLocaleDateString("fr-FR");
    const parsed = parseInt(montant);
    if (!desc || isNaN(parsed)) return;

    const newTransaction = { date: dateStr, desc, montant: parsed };
    setTransactions([newTransaction, ...transactions]);
    setShowModal(false);
    setDesc("");
    setMontant("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes transactions</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Date</th>
            <th className="p-2">Description</th>
            <th className="p-2">Montant</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{t.date}</td>
              <td className="p-2">{t.desc}</td>
              <td className={`p-2 font-semibold ${t.montant < 0 ? "text-red-500" : "text-green-600"}`}>
                {t.montant.toLocaleString()} CFA
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Ajouter une transaction
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl text-gray-600"
            >×</button>
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">Nouvelle transaction</h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="ex: Déjeuner, Salaire..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Montant</label>
                <input
                  type="number"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="ex: -2500 ou +100000"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
