import { useState } from "react";
import { FaUniversity, FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";

export default function Accounts() {
  const [accounts, setAccounts] = useState([
    { name: "SG", balance: 750000, type: "bank" },
    { name: "Wave", balance: 215000, type: "mobile" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [newType, setNewType] = useState("bank");

  const handleAddAccount = (e) => {
    e.preventDefault();
    const balanceParsed = parseInt(newBalance);
    if (!newName || isNaN(balanceParsed)) return;

    const newAccount = { name: newName, balance: balanceParsed, type: newType };
    setAccounts([...accounts, newAccount]);
    setShowModal(false);
    setNewName("");
    setNewBalance("");
    setNewType("bank");
  };

  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const getIcon = (type) => {
    switch (type) {
      case "bank": return <FaUniversity className="text-blue-600" />;
      case "mobile": return <FaMobileAlt className="text-green-600" />;
      case "cash": return <FaMoneyBillWave className="text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes comptes</h1>
      <div className="text-right mb-2 font-semibold text-gray-700">Total : {total.toLocaleString()} CFA</div>

      <ul className="space-y-4">
        {accounts.map((a, i) => (
          <li
            key={i}
            className="p-4 border rounded shadow bg-white flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {getIcon(a.type)}
              <span className="font-medium">{a.name}</span>
            </div>
            <span className="font-semibold">{a.balance.toLocaleString()} CFA</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Ajouter un compte
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl text-gray-600"
            >×</button>
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">Nouveau compte</h2>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom du compte</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="ex: Orange, Chèque..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Solde initial</label>
                <input
                  type="number"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="ex: 150000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="bank">Banque</option>
                  <option value="mobile">Mobile Money</option>
                  <option value="cash">Espèces</option>
                </select>
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
