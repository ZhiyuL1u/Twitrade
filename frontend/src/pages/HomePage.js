import React from 'react';

import './styles/HomePage.css';

import AboutUsDialog from './subpage/AboutUsDialog';

function HomePage() {
    return (
        <div className="container">
            <header className="header">
                <h1>Welcome to the Company Data Dashboard!</h1>
            </header>
            <section className="section">
                <h2>1. Motivation</h2>
                <p>This application is inspired by the ambition to blend technological prowess with business insights.
                    It aims to unearth unique patterns and correlations between unrelated factors and the stock market,
                    which are not extensively explored. The core problem it addresses revolves around leveraging various
                    correlations between Twitter data and stock market performance to identify profitable opportunities.
                    It also focuses on elucidating key aspects of companies, such as detailed company information and stock
                    market statistics, enabling users to conduct thorough analyses.</p>
            </section>
            <section className="section">
                <h2>2. Core Features</h2>
                <p>We will offer a suite of features designed to empower users with comprehensive insights into
                    companies
                    and their stock market performance:</p>
                <h3>(1). Company Search</h3>
                <p>Users can access in-depth details about companies, including daily stock data from 2018 to 2023 (for
                    public companies), company location, employment size, funding stage, Glassdoor rating, and whether
                    the company is a Fortune 500 entity. Information on the current funding stage and size will also be
                    available.</p>
                <h3>(2). Stock Data</h3>
                <p>Users can access in-depth details about companies, including daily stock data from 2018 to 2023 (for
                    public companies), company location, employment size, funding stage, Glassdoor rating, and whether
                    the company is a Fortune 500 entity. Information on the current funding stage and size will also be
                    available.</p>
                <h3>(3). Social Media Stats</h3>
                <p>Users can input a company name, start date, and end date. The system will output the number of likes, comments, retweets, and positive comments received by the company during the specified period. Additionally, the website will generate two visualizations:
                    A chart showing the ratio of positive comments to other comments.
                    A graph depicting the distribution of positive and negative sentiments.</p>
            </section>
            <AboutUsDialog/>
        </div>
    );
}

export default HomePage;
