// services/StockService.js

const fetchCompanyPopularityMetrics = async () => {
    try {
        const response = await fetch('http://localhost:8080//company_Info/companyPopularityMetric');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}


