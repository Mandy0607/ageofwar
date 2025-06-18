import React, { useState } from "react";

const classes = ["Militia", "Spearmen", "LightCavalry", "HeavyCavalry", "FootArcher", "CavalryArcher"];

export default function ArmyInput({ label, onChange }) {
  const [units, setUnits] = useState([]);

  const addUnit = () => {
    setUnits([...units, { class: "Militia", count: 0 }]);
  };

  const updateUnit = (index, field, value) => {
    const newUnits = [...units];
    newUnits[index][field] = field === "count" ? parseInt(value) : value;
    setUnits(newUnits);
    onChange(newUnits);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>{label}</h2>
      <button onClick={addUnit}>Add Platoon</button>
      {units.map((unit, i) => (
        <div key={i}>
          <select value={unit.class} onChange={(e) => updateUnit(i, "class", e.target.value)}>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <input
            type="number"
            value={unit.count}
            onChange={(e) => updateUnit(i, "count", e.target.value)}
            placeholder="Count"
          />
        </div>
      ))}
    </div>
  );
}
