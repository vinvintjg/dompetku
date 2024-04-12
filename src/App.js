import React, { useState, useEffect } from 'react';

function WalletInfo({ username }) {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch data from the API
    fetch(`http://localhost:8080/api/v1/dompetku/owner?username=${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setWalletData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!walletData) {
    return <div>Error: Unable to fetch data</div>;
  }

  return (
    <div>
      <h1>Welcome, {walletData.username}</h1>
      <h2>Wallet Balance: {walletData.wallet.unUsedBalance}</h2>
      <div>
        {walletData.wallet.slots.map(slot => (
          <div key={slot.id}>
            <h3>{slot.name}</h3>
            <p>Balance: {slot.balance}</p>
            <ul>
              {slot.histories.map(history => (
                <li key={history.id}>
                  {history.description} - {history.amount} ({history.date})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Usage of WalletInfo component with username set to "kevin"
function App() {
  return (
    <div>
      <WalletInfo username="kevin" />
    </div>
  );
}

export default App;
