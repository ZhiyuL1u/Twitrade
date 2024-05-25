import React, { useState } from 'react';
import axios from 'axios';

function CompanySearch() {
    const [companyName, setCompanyName] = useState('');
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCompanyInfo = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.example.com/company-info/${companyName}`);
            setCompanyInfo(response.data);
        } catch (error) {
            console.error("Error fetching company data:", error);
            setCompanyInfo(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Company Search</h1>
            <input
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <button onClick={fetchCompanyInfo} disabled={loading}>
                Search
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : companyInfo ? (
                <div>
                    <h2>{companyInfo.Name}</h2>
                    <p>Ticker: {companyInfo.Ticker}</p>
                    <p>Industry: {companyInfo.Industry}</p>
                    <p>Sub-Industry: {companyInfo.Sub_Industry}</p>
                    <p>Headquarters: {companyInfo.Headquarters_Location}</p>
                    <p>Date Added: {companyInfo.Date_added}</p>
                    <p>Founded: {companyInfo.Founded}</p>
                </div>
            ) : null}
        </div>
    );
}

export default CompanySearch;
