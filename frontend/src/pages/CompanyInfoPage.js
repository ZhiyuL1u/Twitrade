import React, { useState } from 'react';
import './styles/CompanyFilterPage.css';

const CompanyFilterPage = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [year, setYear] = useState('');
    const [averageRevenue, setAverageRevenue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [companyDetails, setCompanyDetails] = useState(null);

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (!value.trim()) {
            setCompanies([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/SP500/search?input=${value}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();

            const statusPromises = data.map(company =>
                fetch(`http://localhost:8080/company_Info/status?symbol=${company.symbol}`)
                    .then(res => res.json())
            );
            const statuses = await Promise.all(statusPromises);

            const newData = data.map((company, index) => ({
                ...company,
                inFortune500: statuses[index][0].inFortune500
            }));
            setCompanies(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = async (event) => {
        const yearValue = event.target.value;
        setYear(yearValue);
    };

    const fetchAverageRevenue = async () => {
        if (!year.trim()) {
            setAverageRevenue(null);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/company_Info/getAverageRevenue?Year=${year}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const revenueData = await response.json();
            setAverageRevenue(revenueData);
        } catch (error) {
            console.error('Error fetching average revenue:', error);
            setAverageRevenue(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanyDetails = async (companyName) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/company_Info/search?companyName=${companyName}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const details = await response.json();
            setCompanyDetails(details[0]); // Assume the API returns an array
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching company details:', error);
            setCompanyDetails(null);
        } finally {
            setLoading(false);
        }
    };

    const CompanyModal = ({ details, onClose }) => (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{details.name}</h2>
                <p>Date Added: {details.dateAdded}</p>
                <p>Industry: {details.industry}</p>
                <p>Sub-industry: {details.subIndustry}</p>
                <p>Ticker: {details.ticker}</p>
                <p>Founded: {details.founded}</p>
                <p>Headquarters: {details.headquartersLocation}</p>
            </div>
        </div>
    );

    return (
        <div className="CompanyFilterPage">
            <h1>Company Info</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="CompanyName"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearchChange} disabled={loading}>
                    Get Company Info
                </button>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Year"
                    value={year}
                    onChange={handleYearChange}
                />
                <button onClick={fetchAverageRevenue} disabled={loading}>
                    Get Average Revenue (1955-2021)
                </button>
                {averageRevenue !== null && (
                    <span style={{ marginLeft: '20px' }}>Average Revenue: ${averageRevenue.toLocaleString()}</span>
                )}
            </div>
            {loading ? <p>Loading...</p> : (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Company Name</th>
                            <th>In Fortune 500</th>
                        </tr>
                        </thead>
                        <tbody>
                        {companies.map((company, index) => (
                            <tr key={index}>
                                <td>{company.symbol}</td>
                                <td onClick={() => fetchCompanyDetails(company.companyName)}
                                    className="company-name">{company.companyName}</td>
                                <td>{company.inFortune500 ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
            {showModal && <CompanyModal details={companyDetails} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default CompanyFilterPage;
