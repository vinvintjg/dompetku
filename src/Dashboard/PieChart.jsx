import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function PieChart() {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const Mode = localStorage.getItem('darkMode');
    const getUsername = localStorage.getItem('getUsername');
    const getPassword = localStorage.getItem('getPassword');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${getUsername}&password=${getPassword}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getUsername, getPassword]);

    useEffect(() => {
        if (!userData) return;

        const xxValues = userData.wallet.slots.map(slot => slot.name);
        const yyValues = userData.wallet.slots.map(slot => slot.balance);
        const barrColors = ["#0177FB", "#EAC941", "#D9D9D9", "#000"]; // Example barrColors

        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destroy the previous chart instance
        }

        chartInstance.current = new Chart(chartContainer.current, {
            type: 'pie',
            data: {
                labels: xxValues,
                datasets: [{
                    backgroundColor: barrColors,
                    data: yyValues,
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let value = context.parsed; // Get value from tooltip context
                                let percentage = ((value / context.dataset.data.reduce((a, b) => a + b)) * 100).toFixed(2); // Calculate percentage
                                return `${percentage}%`; // Return label with percentage
                            }
                        }
                    },
                    legend: {
                        position: 'right', // Set legend position to bottom
                        labels: {
                            color: Mode === 'true' ? '#ffffff80' : '#00000080', // Conditional label color based on dark mode
                            fontSize: 12,
                            usePointStyle: true,
                            pointStyle: 'circle',
                        }
                    }
                    
                },
                title: {
                    display: true,
                    text: "World Wide Wine Production"
                },
                hoverOffset: 10 // Add hoverOffset
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Cleanup the chart on component unmount
            }
        };
    }, [Mode, userData]);

    return <canvas ref={chartContainer} id="myPieChart" width="2" height="1"></canvas>;
}

export default PieChart;
