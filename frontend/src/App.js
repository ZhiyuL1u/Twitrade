import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import HomePage from './pages/HomePage';
import CompanyInfo from './pages/CompanyInfoPage';
import StockData from './pages/StockData';
import SocialMediaStats from './pages/SocialMediaStats';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff', // 例如使用一种深蓝色作为主题颜色
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h6: {
            fontWeight: 600,
        },
    },
});




function App() {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Company Data Dashboard
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/company-info">Company Info</Button>
                    <Button color="inherit" component={Link} to="/stock-data">Stock Data</Button>
                    <Button color="inherit" component={Link} to="/social-media-stats">Social Media Stats</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/company-info" element={<CompanyInfo />} />
                <Route path="/stock-data" element={<StockData />} />
                <Route path="/social-media-stats" element={<SocialMediaStats />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
}

export default App;
