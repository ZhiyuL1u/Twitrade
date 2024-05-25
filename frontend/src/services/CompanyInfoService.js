
const fetchCompanyInfoByName = async () => {
    try {
        const response = await fetch('http://localhost:8080//company_Info/search');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}