import React, { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import axios from 'axios';
import '../../src/Stylist.css';

function GraphChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const getUsername = localStorage.getItem('getUsername');
    const getPassword = localStorage.getItem('getPassword');
    const Mode = localStorage.getItem('darkMode');
    const xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [yValues, setYValues] = useState(Array.from({ length: 12 }, () => 0)); // Define yValues state with initial values for each month

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${getUsername}&password=${getPassword}`);
                const userData = response.data;
                if (userData && userData.wallet && userData.wallet.slots) {
                    const monthlyDecreaseAmounts = Array.from({ length: 12 }, () => 0); // Initialize array to hold decrease amounts for each month
                    userData.wallet.slots.forEach(slot => {
                        if (slot.histories) {
                            slot.histories.forEach(history => {
                                if (history.type === "DECREASE") {
                                    const monthIndex = new Date(history.date).getMonth(); // Get the month index from history date
                                    // Update the correct index in monthlyDecreaseAmounts based on the monthIndex
                                    monthlyDecreaseAmounts[monthIndex] += history.amount; // Add decrease amount to respective month's slot
                                }
                            });
                        }
                    });
                    setYValues(monthlyDecreaseAmounts); // Set the decrease amounts organized by month to yValues state
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getUsername, getPassword]);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        if (chartInstance.current !== null) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{ 
                    data: yValues,
                    borderColor: "#0177FB",
                    backgroundColor: "#0177FB",
                    fill: false
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y;
                            }
                        }
                    },
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: {
                            color: Mode === 'true' ? '#FFFFFFCC' : '#000000CC', 
                        },
                        grid: {
                            color: Mode === 'true' ? 'rgba(255, 255, 255, 0.2)' : '#E5E5E5'
                        }
                    },
                    y: {
                        ticks: {
                            color: Mode === 'true' ? '#FFFFFFCC' : '#000000CC', 
                        },
                        grid: {
                            color: Mode === 'true' ? 'rgba(255, 255, 255, 0.2)' : '#E5E5E5'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'cuaks'
                }
            }
        });

        return () => {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy();
            }
        };
    }, [Mode, xValues]);

    return <canvas ref={chartRef} id="myChart" width="30" height="12"></canvas>;
}

export default GraphChart;
