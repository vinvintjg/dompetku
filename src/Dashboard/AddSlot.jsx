import React, { useState } from "react";

function AddSlot() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const getWalletId = localStorage.getItem('getWalletId');

  const handleAddSlot = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/dompetku/wallet/addNewSlot/${getWalletId}?name=${name}&balance=${balance}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, balance }),
        }
      );

      if (response.ok) {
        setMessage("Wallet updated successfully.");
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setMessage(data.message); // Assuming the API returns an error message
      }
    } catch (error) {
      console.error("Error adding wallet:", error);
      setMessage("Error adding wallet. Please try again later.");
    }
  };

  return (
    <>
      <div id="" className="popup show">
        <div className="form-update">
          <div className="font-24 black-color" style={{ textAlign: "center" }}>
            New Slots
          </div>
          <div className="label-input black-color">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="label-input black-color hidden">
            <label for="number">Balance</label>
            <input
              type="text"
              name="balance"
              placeholder="Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <button className="btn-icon2 font-12" onClick={handleAddSlot}>
            Update
          </button>
          <a className="btn-icon2 btn-icon3 font-12 no-deco" href="/dashboard">
            Cancel
          </a>

          {message && (
            <p className="font-12 red-color text-center">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AddSlot;
