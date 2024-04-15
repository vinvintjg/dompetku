import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileImage from "../Assets/profile.jpg";
import { useParams } from 'react-router-dom';

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC' // Tambahkan opsi timeZone di sini
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function ApiGetDataBySlot({ match }) {
  const [slotData, setSlotData] = useState(null);
  const slotId = match.params.id; // Mendapatkan ID slot dari URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=Vincent`);
        const requestedSlot = response.data.wallet.slots.find(slot => slot.id === parseInt(slotId));
        setSlotData(requestedSlot);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [slotId]);

  return (
    <>
      {slotData ? (
        <>
            {slotData && slotData.histories.map(history => (
              <tr className="w100" key={history.id}>
              <td className="w10">
                <img className="img-50 radius-12" src={ProfileImage} alt="" />
              </td>
              <td className="w20">
                <div className="activity-name">
                  <div className="font-16 black-color">{slotData.name}</div>
                  <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                </div>
              </td>
              <td className="w25">
                <div className="font-12 black-color-50">{history.description}</div>
              </td>
              <td className="w25 pl6">
                <div className="font-14 black-color">
                  - Rp {history.amount.toLocaleString()},00
                </div>
              </td>
            </tr>
            ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

function Testing() {
  // Dapatkan nilai id dari URL menggunakan useParams
  const { id } = useParams();

  // Atur nilai id ke currentId menggunakan useState
  const [currentId, setCurrentId] = useState(id);

  const handleNavClick = (id) => {
    setCurrentId(id);
  };
  console.log(currentId);

  return (
    <>
      <ApiGetDataBySlot match={{ params: { id: currentId } }} />
    </>
  );
}

export default Testing;