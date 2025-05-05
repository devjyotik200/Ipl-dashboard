# 🏏 IPL Dashboard

A responsive web application that displays **live IPL scores**, **match schedules**, and **past/upcoming matches**, with filtering by **team** and **venue**. Built with modern frontend technologies and optimized for mobile, tablet, and desktop.

---

## 🚀 Features

- 🟢 Live Match Score Updates
- 📅 Upcoming & Past Match Schedule
- 🔍 Filter Matches by Team and Venue
- 📊 Points Table
- 🧠 Responsive UI for all screen sizes
- ⚡ Fast data fetching with React Query

---

## 🛠️ Tech Stack

- **React**
- **NodeJS** for api calling/scraping
- **Tailwind CSS** for styling
- **React Query** for data fetching
- **JavaScript**
- **Redis** for caching

---

## 📦 Setup Instructions

### 1. Clone the Repository

``bash
git clone https://github.com/devjyotik200/Ipl-dashboard.git
``

### 2. Install Dependencies

``bash
npm install``

### 3. Run The Server

``bash
npm run dev
``

---

## Challenges faced

### Scrapping and data fetching
I never scrapped a website previously but I had knowledge in dom manipulation so I tried to use that. First I searched good libraries to scrap data in nodeJs, I found puppeteer. So I tried to use that to scrap the iplt20.com website, however it was not that easy. Finding the exact element names to retrieve the text data, image urls, table data was a challenge. I wasn't able to log the retrieved values as it was scrapping in the server so I had to check how to debug the issues. Then it was calling the api but the api call was throwing 403 which means unauthorized access. SO I added some http headers. You can look at the **scrapeSchedule.js** file to check the scrapping implementation.

While going through the network tabs I checked that they were calling some S3 js files while checking them I found that they get all the data for schedules and points table from here. So I decided to use these apis directly as this will reduce the scrapping overhead time. So currently I am fetching the data for points table and matches schedule from these s3 js files. Currently I am fetching these data and caching it in redis for 1 hour.


### Live Matches
I was confused on how to show the live matches, I checked cricbuzz app, espncricinfo and google's dashboard too. But I wasnt able to find any api from where I can retrieve these live data and scrapping a website every 5 secs was not a good implementation. So I searched in chat gpt on where can I find live score apis, and it referred me to https://rapidapi.com/. They provide readymade apis but they are paid. However I subscribed to the free version where I can hit 100 times per month(I know its very less but had to do with it for now).

