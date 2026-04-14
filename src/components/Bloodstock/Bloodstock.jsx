import React, { useState } from "react";
import "./Bloodstock.css";

const initialData = [
  { type: "A+", units: 120, status: "Normal" },
  { type: "A-", units: 30, status: "Low" },
  { type: "B+", units: 90, status: "Normal" },
  { type: "O+", units: 75, status: "Critical" },
  { type: "O-", units: 45, status: "Low" },
  { type: "AB+", units: 25, status: "Normal" },
  { type: "AB-", units: 15, status: "Critical" },
];

const Bloodstock = () => {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState(null);
  const [addUnits, setAddUnits] = useState("");

  const openModal = (item) => {
    setSelected(item);
    setAddUnits("");
  };

  const closeModal = () => {
    setSelected(null);
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) => {
      if (item.type === selected.type) {
        const newUnits = item.units + parseInt(addUnits || 0);

        let newStatus = "Normal";
        if (newUnits < 30) newStatus = "Critical";
        else if (newUnits < 60) newStatus = "Low";

        return { ...item, units: newUnits, status: newStatus };
      }
      return item;
    });

    setData(updatedData);
    closeModal();
  };

  return (
    <div className="bloodstock-container">
      <h2>Blood Stock Management</h2>

      {/* Summary Cards */}
      <div className="cards">
        {data.map((item) => (
          <div key={item.type} className={`card ${item.status}`}>
            <h3>{item.type}</h3>
            <p>{item.units} Units</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.type}>
                <td>{item.type}</td>
                <td>{item.units}</td>
                <td>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => openModal(item)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update {selected.type} Stock</h3>

            <p>Current Units: {selected.units}</p>

            <input
              type="number"
              placeholder="Add Units"
              value={addUnits}
              onChange={(e) => setAddUnits(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={closeModal} className="cancel">
                Cancel
              </button>
              <button onClick={handleUpdate} className="save">
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bloodstock;