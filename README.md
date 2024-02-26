# Financial Market Analysis

## Description

Financial Market Analysis is a web application designed to provide users with real-time financial market data. This application features a dashboard for viewing stock prices, currency rates, and market news. It also includes a multi-language support feature for personalized user experience.

## Features

- Real-time stock market data visualization.
- Currency exchange rates and conversion tool.
- Multi-language support (English, Russian, Kazakh).
- Admin page for managing market information and user data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ozzy0153/financial-market-analysis.git

2. Navigate to the project directory:
    ```bash
   cd financial-market-analysis

3. Install dependencies:
    ```bash
   npm install

4. Start the server:
    ```bash
   node app.js

## Usage

After starting the server, navigate to `http://localhost:3000` in your web browser to access the application.

- Use the navbar to switch between different sections of the application.
- Convert currencies using the conversion tool on the dashboard.
- View current currency rates in the rates section.
- Admin users can add, edit, and delete market information through the admin page.

## APIs Used

- **Alpha Vantage API** for stock market data.
- **ExchangeRatesAPI** for currency conversion rates.

Ensure you have API keys for each of these services.

## Deployment

This project is deployed on Render. You can access the deployed application at:

- Deployed Link: `<https://financial-market-analysis.onrender.com>`

## Administrative Functionality

### Admin Page

The admin page allows administrators to manage user accounts effectively. As an admin, you can perform the following actions:

- **Add Users**: Create new user accounts by specifying a username, password, and whether the account should have admin privileges.
- **Edit Users**: Update existing user account details, including changing their username, password, and admin status.
- **Delete Users**: Remove user accounts from the system.
- **Add Market Info Cards**: Create new market info card by entering the name and description in 3 languages(en, ru, kz)
- **Edit Market Info Cards**: Update existing market info details, including changing their names, description and images.
- **Delete Market Info Cards**: Remove market info cards from the system.

### Accessing the Admin Account

For demonstration purposes, an admin account is pre-configured with the following credentials:

- **Username**: Orazaly
- **Password**: Orazaly

## Project Images:

### Greeting page
![img.png](README_png/img.png)
User can choose register or login
### Registration
![img.png](README_png/img_1.png)
User enters username and password to register
### Login
![img.png](README_png/img_2.png)
User enters username and password to login
### Admin page
![img.png](README_png/img_3.png)
![img.png](README_png/img_4.png)
![img.png](README_png/img_5.png)
![img.png](README_png/img_6.png)
![img.png](README_png/img_7.png)
Admin can add, edit and delete the users' information
Also, admin can add, edit and delete market information cards
### Main page
![img.png](README_png/img_8.png)
![img.png](README_png/img_9.png)
![img.png](README_png/img_10.png)
User can see the market info cards 
### Dashboard page
![img.png](README_png/img_11.png)
User can convert and check the current currency rates
### Stocks page
![img.png](README_png/img_12.png)
![img.png](README_png/img_13.png)
User can check the prices of stocks by their stock market tags




