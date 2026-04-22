import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BloodStock.css";

const BloodStock = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [addUnits, setAddUnits] = useState("");

 const bloodBankToken = sessionStorage.getItem("bloodBankToken");

  const getStatus = (units) => {
    if (units < 30) return "Critical";
    if (units < 60) return "Low";
    return "Normal";
  };

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7156/api/BloodBankBloodStock",
          {
            headers: {
              Authorization: `Bearer ${bloodBankToken}`
            }
          }
        );

        const stock = res.data;

        const formatted = [
          { type: "A+", units: stock.aPositive || 0 },
          { type: "A-", units: stock.aNegative || 0 },
          { type: "B+", units: stock.bPositive || 0 },
          { type: "B-", units: stock.bNegative || 0 },
          { type: "O+", units: stock.oPositive || 0 },
          { type: "O-", units: stock.oNegative || 0 },
          { type: "AB+", units: stock.abPositive || 0 },
          { type: "AB-", units: stock.abNegative || 0 }
        ];

        const updatedData = formatted.map((item) => ({
          ...item,
          status: getStatus(item.units)
        }));

        setData(updatedData);
      } catch (err) {
        console.error(err);
      }
    };

    if (bloodBankToken) {
      fetchStock();
    }
  }, [bloodBankToken]);

  const openModal = (item) => {
    setSelected(item);
    setAddUnits(item.units.toString());
  };

  const closeModal = () => {
    setSelected(null);
    setAddUnits("");
  };

  const refreshStock = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7156/api/BloodBankBloodStock",
        {
          headers: {
            Authorization: `Bearer ${bloodBankToken}`
          }
        }
      );

      const stock = res.data;

      const formatted = [
        { type: "A+", units: stock.aPositive || 0 },
        { type: "A-", units: stock.aNegative || 0 },
        { type: "B+", units: stock.bPositive || 0 },
        { type: "B-", units: stock.bNegative || 0 },
        { type: "O+", units: stock.oPositive || 0 },
        { type: "O-", units: stock.oNegative || 0 },
        { type: "AB+", units: stock.abPositive || 0 },
        { type: "AB-", units: stock.abNegative || 0 }
      ];

      const updatedData = formatted.map((item) => ({
        ...item,
        status: getStatus(item.units)
      }));

      setData(updatedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        "https://localhost:7156/api/BloodBankBloodStock/update",
        {
          bloodGroup: selected.type,
          units: parseInt(addUnits)
        },
        {
          headers: {
            Authorization: `Bearer ${bloodBankToken}`
          }
        }
      );

      alert("Stock updated successfully");

      await refreshStock();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to update stock");
    }
  };

  return (
    <div className="bloodstock-container">
      <h2>Blood Stock Management</h2>

      <div className="cards">
        {data.map((item) => (
          <div key={item.type} className={`card ${item.status}`}>
            <h3>{item.type}</h3>
            <p>{item.units} Units</p>
          </div>
        ))}
      </div>

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

      {selected && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update {selected.type} Stock</h3>

            <p>Current Units: {selected.units}</p>

            <input
              type="number"
              placeholder="Enter Units"
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

export default BloodStock;