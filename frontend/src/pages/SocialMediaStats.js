import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles/SocialMediaStats.css';

// Register necessary components for Chart.js
ChartJS.register(Tooltip, Legend, ArcElement);

function SocialMediaStats() {
    const [companyName, setCompanyName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [socialStats, setSocialStats] = useState(null);
    const [reputationData, setReputationData] = useState(null);
    const [sentimentData, setSentimentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchSocialMediaStats = async () => {
        if (new Date(endDate) < new Date(startDate)) {
            setError('End date cannot be earlier than start date.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const socialResponse = await axios.get(`http://localhost:8080/company_Info/companyPopularityMetric`, {
                params: { companyName, startDate, endDate }
            });
            const reputationResponse = await axios.get(`http://localhost:8080/company_Info/getCompanyReputationIndex`, {
                params: { companyName }
            });
            const sentimentResponse = await axios.get(`http://localhost:8080/company_Info/getSentimentDistribution`, {
                params: { companyName, startDate, endDate }
            });

            setSocialStats(socialResponse.data[0]);
            setReputationData(reputationResponse.data[0]);
            setSentimentData(sentimentResponse.data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError('Failed to fetch data.');
            setSocialStats(null);
            setReputationData(null);
            setSentimentData(null);
        } finally {
            setLoading(false);
        }
    };

    const reputationPieData = reputationData ? {
        labels: ['Positive Comments', 'Other Comments'],
        datasets: [{
            data: [reputationData.positiveCommentsRatio, 1 - reputationData.positiveCommentsRatio],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
    } : {};

    const sentimentPieData = sentimentData ? {
        labels: ['Positive', 'Negative'],
        datasets: [{
            data: [sentimentData.positivePercentage, sentimentData.negativePercentage],
            backgroundColor: ['#4CAF50', '#F44336'],
            hoverBackgroundColor: ['#4CAF50', '#F44336']
        }]
    } : {};

    return (
        <div className="SocialMediaStats">
            <h1>Social Media and Reputation Stats for {companyName}</h1>
            <input type="text" placeholder="Enter company name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min="2015-01-01" max="2019-12-31" />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min="2015-01-01" max="2019-12-31" />
            <button onClick={fetchSocialMediaStats} disabled={loading}>Get Stats</button>
            {error && <p className="error">{error}</p>}
            {loading ? <p className="loading">Loading...</p> : (
                <>
                    {socialStats && (
                        <div>
                            <p>Likes: {socialStats.likedNumSum}</p>
                            <p>Comments: {socialStats.commentsNumSum}</p>
                            <p>Retweets: {socialStats.retweetsNumSum}</p>
                            <p>Positive Comments: {socialStats.positiveCommentsNumSum}</p>
                        </div>
                    )}
                    <div className="charts-container">
                        {reputationData && (
                            <div className="chart-container pie-chart-container">
                                <Pie data={reputationPieData}/>
                                <p>The ratio of positive to other comments.</p>
                                <p>Reputation Index: {reputationData.reputationIndex.toFixed(2)}</p>
                            </div>
                        )}
                        {sentimentData && (
                            <div className="chart-container pie-chart-container">
                                <Pie data={sentimentPieData}/>
                                <p>The positive and negative sentiment distribution.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default SocialMediaStats;
