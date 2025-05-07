// src/pages/Dashboard.jsx
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const initialData = [
  { name: "Général", value: 50, color: "#6366F1" },
  { name: "Loisirs", value: 30, color: "#FBBF24" },
  { name: "Épargne", value: 20, color: "#10B981" },
];

const accounts = [
  { name: "SG", balance: 750000 },
  { name: "Wave", balance: 215000 }
];

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("Social");
  const [newPercentage, setNewPercentage] = useState(0);
  const [editingBox, setEditingBox] = useState(null);
  const [editPercentage, setEditPercentage] = useState(0);
  const [editColor, setEditColor] = useState("#6366F1");

  const handleAddCategory = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total >= 100) {
      alert("Le total est déjà à 100 %. Réduisez une catégorie avant d’en ajouter une.");
      return;
    }
    setShowModal(true);
  };

  const confirmAddCategory = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const maxAvailable = 100 - total;

    if (!isNaN(newPercentage) && newPercentage > 0 && newPercentage <= maxAvailable) {
      const color = newCategory === "Social" ? "#E879F9" : "#94A3B8";
      const newData = {
        name: newCategory,
        value: newPercentage,
        color
      };
      setData(prev => [...prev, newData]);
      setShowModal(false);
      setNewPercentage(0);
      const next = newCategory === "Social" ? "Divers" : "Social";
      setNewCategory(next);
    } else {
      alert("Valeur invalide ou trop élevée.");
    }
  };

  const handleBoxClick = (box) => {
    const totalWithoutThis = data.reduce((sum, item) =>
      item.name === box.name ? sum : sum + item.value, 0);
    const maxAvailable = 100 - totalWithoutThis;
    setEditingBox({ ...box, max: maxAvailable });
    setEditPercentage(box.value);
    setEditColor(box.color);
  };

  const confirmEditCategory = () => {
    if (!isNaN(editPercentage) && editPercentage >= 0 && editPercentage <= editingBox.max) {
      const updated = data.map(item =>
        item.name === editingBox.name ? { ...item, value: editPercentage, color: editColor } : item
      );
      setData(updated);
      setEditingBox(null);
    } else {
      alert("Valeur invalide.");
    }
  };

  const handleDeleteCategory = () => {
    if (editingBox.name !== "Social" && editingBox.name !== "Divers") {
      alert("Seules les catégories 'Social' et 'Divers' peuvent être supprimées.");
      return;
    }
    const updated = data.filter(item => item.name !== editingBox.name);
    setData(updated);
    setEditingBox(null);

    if (editingBox.name === "Social") setNewCategory("Social");
    else if (editingBox.name === "Divers") setNewCategory("Divers");

    if (editingBox.name === "Social") setNewCategory("Social");
    else if (editingBox.name === "Divers") setNewCategory("Divers");
  };

  const hasSocial = data.some(d => d.name === "Social");
  const hasDivers = data.some(d => d.name === "Divers");
  const canAdd = !(hasSocial && hasDivers);
  const visibleBoxes = canAdd ? data.slice(-4) : data.slice(-5);

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Solde total</h1>
        <p className="text-4xl text-indigo-600 font-bold">965 000 CFA</p>

        <div className="mt-2 text-sm text-gray-600 flex justify-center gap-4">
          {accounts.map((acc, index) => (
            <span key={acc.name}>
              {acc.name} : {acc.balance.toLocaleString()} CFA
              {index === 0 && <span className="mx-2">||</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {visibleBoxes.map((box) => (
          <div
            key={box.name}
            className="p-4 border rounded shadow text-center hover:bg-gray-100 cursor-pointer transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: box.color }}
            onClick={() => handleBoxClick(box)}
          >
            <p className="text-xs text-white">{box.value}%</p>
            <p className="text-sm text-white font-medium">{box.name}</p>
            <p className="text-xl text-white font-bold">
              {(965000 * (box.value / 100)).toLocaleString()} CFA
            </p>
          </div>
        ))}

        {canAdd && (
          <div
            onClick={handleAddCategory}
            className="p-4 border rounded shadow bg-white text-center flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <p className="text-2xl text-blue-600">+</p>
            <p className="text-sm font-semibold text-gray-600">Ajouter une catégorie</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 space-y-4">
            <h3 className="text-lg font-semibold">Nouvelle catégorie</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Catégorie</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {!hasSocial && <option value="Social">Social</option>}
                {!hasDivers && <option value="Divers">Divers</option>}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pourcentage</label>
              <input
                type="number"
                min="1"
                max="100"
                className="w-full border rounded px-3 py-2"
                value={newPercentage}
                onChange={(e) => setNewPercentage(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:underline">Annuler</button>
              <button onClick={confirmAddCategory} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {editingBox && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 space-y-4">
            <h3 className="text-lg font-semibold">Modifier "{editingBox.name}"</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Pourcentage</label>
              <input
                type="number"
                min="0"
                max={editingBox.max}
                className="w-full border rounded px-3 py-2"
                value={editPercentage}
                onChange={(e) => setEditPercentage(parseInt(e.target.value, 10))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Couleur</label>
              <input
                type="color"
                className="w-full border rounded px-3 py-2"
                value={editColor}
                onChange={(e) => setEditColor(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-4">
              {editingBox.name === "Social" || editingBox.name === "Divers" ? (
                <button onClick={handleDeleteCategory} className="text-red-600 hover:underline">Supprimer</button>
              ) : <div />}
              <div className="flex gap-2">
                <button onClick={() => setEditingBox(null)} className="px-4 py-2 text-gray-600 hover:underline">Annuler</button>
                <button onClick={confirmEditCategory} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-80 bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-center">Répartition</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
