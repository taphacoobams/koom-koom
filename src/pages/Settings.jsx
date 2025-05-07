import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("CFA");
  const [theme, setTheme] = useState("light");

  const handleExport = () => {
    // Exemple d'export fictif
    const data = [
      { date: "01/05/2025", description: "Salaire", montant: 500000 },
      { date: "02/05/2025", description: "Loyer", montant: -150000 },
    ];
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Date,Description,Montant", ...data.map(d => `${d.date},${d.description},${d.montant}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">🌍 Devise utilisée</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="CFA">CFA</option>
            <option value="EUR">Euro</option>
            <option value="USD">Dollar</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">🌗 Thème</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">📁 Exporter mes données</label>
          <button
            onClick={handleExport}
            className="mt-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Exporter (CSV)
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">🔐 Sécurité</label>
          <p className="text-sm text-gray-600">Connexion sécurisée, PIN bientôt disponible.</p>
        </div>
      </div>

      <div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
