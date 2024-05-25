# Twitrade
Our primary objective is to develop a comprehensive tool that provides insights into how
social media activities around top technology companies influence their stock market
performance. By examining likes, comments, and retweets, we aim to uncover trends
and patterns that could suggest a relationship between social media sentiment and stock
market movements.

## Application Functionality:
Company Insights: Offers detailed overviews of each company, including information
about their domains, assets, workforce, and revenue, enabling users to gain a deep
understanding of the businesses they are investigating.
Stock Trend Analysis: Users can access and analyze the stock performance of these
companies over various time frames—daily, monthly, and yearly—within the selected years,
providing a graphical representation of trends and patterns.
Social Media Interactions: This feature allows users to review the social media
engagement of the companies by examining specific posts, including the total likes and
comments they received. Additionally, the website features a random tweet display to
enhance user interaction and engagement.
Sentiment Analysis: As an advanced feature, if time and resources permit, we plan to
incorporate machine learning APIs to perform sentiment analysis on the social media posts
to draw more precise correlations between public sentiment and stock performance.

## Demo
![1b67b7207145184955ac94de588ab65](https://github.com/ZhiyuL1u/Twitrade/assets/144643293/78522f02-d1a5-4183-bce1-d23f19d45670)
![d67ce984f271984c074ab6eb2527e5e](https://github.com/ZhiyuL1u/Twitrade/assets/144643293/260df5b9-770b-49de-971f-d3fbfb6b0021)
![8a1e66e51d20cde54c114f02c43dbcc](https://github.com/ZhiyuL1u/Twitrade/assets/144643293/1a81c329-8d1a-4e9b-9349-b14b12047ace)



## Tech Stack
### The backend:
spring Boot, mybaits, Swagger2
1. Install ```Java 8``` and ```Maven```
2. Build
    ```
    sudo mvn clean package
    ```
### The frontend:
React.js
1. Install ```Nodejs 18```
    ```
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
2. Install Dependencies
    ```
    npm install
    ```
3. Run and Build
    ```
    npm run dev
    npm run build
    ```

### Data analysis:
Pandas, NumPy, NLP

## Data:
### Processed data
There are six datasets in our database and here is the link to the folder that contains all of
them: https://drive.google.com/drive/folders/1b0BOj9sl2xh21I0z3u3r7_oRlRt1mXn0?usp=sharing

### Raw data
#### Tweets about the Top Companies from 2015 to 2020
(https://www.kaggle.com/datasets/omermetinn/tweets-about-the-top-companies-from-2015-to-2020):
contains over 3 million unique tweets with their information such as tweet id, author of the tweet, post date, the 
text body of the tweet, and the number of comments, likes, and retweets of tweets matched with the related 
company.

#### 500 largest companies stock data from 2018-11-29 to 2023-11-29
(https://www.kaggle.com/datasets/iveeaten3223times/massive-yahoo-finance-dataset):
comprises historical stock market data extracted from Yahoo Finance, spanning a period of five years. It includes 
daily records of stock performance metrics for the top 500 companies based on market capitalization

#### Fortune 500 Companies 1955-2021
(https://www.kaggle.com/datasets/darinhawley/fortune-500-companies-19552021/data):
Fortune magazine has published the top 500 companies in the US based on annual revenue.

#### RevelOne Top Companies Jobs Tool
(https://public.tableau.com/app/profile/revel.talent/viz/RevelOneTopCompaniesJobsTool/JobsTool):
Description Company introduction + Staff and other information

## Database
### ER-Diagram
 ![1716625752321](https://github.com/ZhiyuL1u/Twitrade/assets/144643293/26c68bc8-3768-4ddc-a63f-f1a415efb249)
Even though it might look like a simple ER-Diagram as shown above, lots of modifications
were needed as the project progressed. For instance, we needed to continuously update the
schema as we found inconsistencies between relations or any other problems during the
data-cleansing process. 
### Number of instances of each relation
1. SP500 – 503 instances
2. CompanyInfo – 482 instances
3. Fortune500 – 4402 instances
4. TradingInfo – 730k instance
5. Tweet – 3.7 million instances
6. CompanyTweet – 4.2 million instances
Adding up to a total of over eight million instances

Regarding the proof of aligning with the 3NF, the first several instances of each relation are
shown above in the data section and those screenshots can prove the establishment of 3NF
in all relations in the database.

## Technical challenges

### Data Format Mismatch Between MySQL and Java:
One of the initial challenges was the mismatch between the date formats in MySQL and
Java, which led to compatibility issues. To resolve this, we opted to handle the dates as
strings. We wrote scripts to parse these string representations to extract and manipulate
the dates as required, effectively bridging the format gap.
### Database Duplicates and Data Loss:
We encountered significant challenges with duplicate rows and data loss in our database,
which caused errors such as duplicate primary keys. Our first step was to implement data
cleansing processes to ensure the uniqueness of primary keys. Additionally, many
comments contained inappropriate content (such as illegal characters and explicit material).
To address this, we utilized APIs designed to filter out such content, ensuring compliance
with content regulations.
### Backend and Frontend Development Isolation:
The backend and frontend were developed independently by different team members,
which introduced several integration challenges. To facilitate smoother interaction between
the two, backend files were packaged into JAR files. However, this led to cross-origin
resource sharing (CORS) issues due to the applications running on different ports. We
resolved this by configuring the backend to allow cross-origin requests from the frontend.
### Data Transfer to Cloud Servers:
Another significant hurdle was transferring large datasets to the cloud server's database.
The database was too large to upload in a single session, and we experienced unexpected
interruptions with DataGrip, which also failed to generate debug files. To overcome this,
we split the dataset into five parts and uploaded each batch sequentially, which ultimately
proved successful.

## Optimization Approach and Significant Reduction in Response Time

To maximize speed, a comprehensive evaluation and rewrite of the original set
of difficult queries was conducted. During this procedure, duplicate calculations had
to be found and removed, and better SQL expressions and techniques had to be
used.
Indexing was one of the primary optimization techniques used. The big
datasets presented serious difficulties for data retrieval efficiency, especially in
tables like Tweets and Trading_Info. Significant improvements in query execution
speeds were achieved by the queries by using the proper indices that had been
created on the pertinent columns to speed up data lookup operations.
 The group concentrated on streamlining the join procedures between the tables in
addition to indexing. Reducing the computational burden related to these intricate
join processes required careful examination of the join orders and the selection of
suitable join algorithms. To find the most effective method for each unique query,
this optimization procedure involves experimenting with several join methods,
including hash joins, merge joins, and nested loop joins.
 Subquery optimization was yet another crucial optimization method. Through the
process of decomposing the intricate queries into more manageable and smaller
subqueries, the team managed to remove redundant information and enhance the
overall efficiency of execution. Better query plan creation and more efficient use of
database resources were made possible by this method.
 In order to optimize the processes for data processing, the team also used batch
processing techniques. The queries were changed to handle the data in batches
rather than iterating over each database row separately. This reduced the amount of
iterations needed and greatly enhanced overall speed.
These optimization techniques, along with ongoing observation and adjustment, led
to a notable decrease in the complicated queries' response times, improving the
effectiveness and efficiency of the study as a whole
![1716626253161](https://github.com/ZhiyuL1u/Twitrade/assets/144643293/e27ef2ee-2d9d-4f34-9fda-5eaf49a7e942)




