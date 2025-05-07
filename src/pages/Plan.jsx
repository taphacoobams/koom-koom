// src/pages/Plan.jsx
import { useState } from "react";
import budgetCategories from "../assets/categories";

function initializeState() {
  const state = {};
  for (const parent in budgetCategories) {
    state[parent] = {};
    for (const child in budgetCategories[parent]) {
      state[parent][child] = 0; // Valeur initiale : 0%
    }
  }
  return state;
}

export default function Plan() {
  const [categories, setCategories] = useState(initializeState());

  const handleChange = (parent, child, value) => {
    setCategories(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: Number(value)
      }
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Plan budgétaire</h1>
      {Object.entries(categories).map(([category, subs]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="space-y-4">
            {Object.entries(subs).map(([subcat, val]) => (
              <div key={subcat}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {subcat}: {val}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => handleChange(category, subcat, e.target.value)}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
