import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './styles/StockData.css';

function StockData() {
    const [companyName, setCompanyName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [threshold, setThreshold] = useState('');  // 新增：用于存储用户输入的阈值
    const [stockData, setStockData] = useState([]);
    const [anomalyData, setAnomalyData] = useState([]);  // 新增：用于存储异常数据
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && stockData.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            ctx.canvas.width = chartRef.current.offsetWidth;
            ctx.canvas.height = chartRef.current.offsetHeight;

            const chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: stockData.map(data => data.date),
                    datasets: [
                        {
                            label: 'Open',
                            data: stockData.map(data => data.open),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'High',
                            data: stockData.map(data => data.high),
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'Low',
                            data: stockData.map(data => data.low),
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        },
                        {
                            label: 'Close',
                            data: stockData.map(data => data.close),
                            borderColor: 'rgb(255, 205, 86)',
                            backgroundColor: 'rgba(255, 205, 86, 0.5)',
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            labels: stockData.map(data => data.date),
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            return () => chartInstance.destroy();
        }
    }, [stockData]);

    const fetchStockData = async () => {
        if (new Date(endDate) < new Date(startDate)) {
            setError('End date cannot be earlier than start date.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/company_Info/getCompanyHistoricalFinancialData`, {
                params: {
                    startYear: 2016,
                    endYear: 2016,
                    companyName: companyName,
                    startDate: startDate,
                    endDate: endDate

                }
            });
            setStockData(response.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
            setError('Failed to fetch data. Please try again.');
            setStockData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnomalyData = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/company_Info/getCompanyStockPriceDetection`, {
                params: {
                    companyName: companyName,
                    startDate: startDate,
                    endDate: endDate,
                    threshold: threshold
                }
            });
            setAnomalyData(response.data);
        } catch (error) {
            console.error("Error fetching anomaly data:", error);
            setError('Failed to fetch anomaly data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="StockData">
            <h1>Stock Data for {companyName}</h1>
            <input
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min="2015-01-02"
                max="2020-12-30"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min="2015-01-02"
                max="2020-12-30"
            />
            <button onClick={fetchStockData} disabled={loading}>
                Get Stock Data
            </button>
            <input
                type="text"
                placeholder="Enter threshold"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
            />
            <button onClick={fetchAnomalyData} disabled={loading}>
                Detect Anomalies
            </button>
            {error && <p className="error">{error}</p>}
            {loading ? <p className="loading">Loading...</p> : stockData.length > 0 && (
                <div className="chart-container">
                    <canvas ref={chartRef}></canvas>
                </div>
            )}
            <div>
                <h2>Anomaly Data</h2>
                {anomalyData.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Open</th>
                            <th>Close</th>
                            <th>Daily Change</th>
                        </tr>
                        </thead>
                        <tbody>
                        {anomalyData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.open}</td>
                                <td>{item.close}</td>
                                <td>{item.dailyChange.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <p>No anomalies detected or data available</p>}
            </div>
        </div>
    );

}

export default StockData;
