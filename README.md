# TradeSim

Live Project: https://tradesim.netlify.app/login

If you don't feel like making an account, here is a test user:  
Username: JimmyNeutron223
Password: Testme123%

## Introduction

This project was developed with the intention of simulating a typical stock brokerage website.

- Pulls and displays prices, price changes, and other price stats.
- Allows users to purchase and sell shares, gives details on their profit/loss, and allows them to create watchlists.
- Displays an updating feed of finance related breaking news.
  This application gives users a way to do super simple paper trading, where they can purchase a stock and see if it would have been a good decision or not.

Tickers Supported (More coming soon):  
MSFT, NVDA, AAPL, AMZN, META, GOOGL, GOOG, BRK.B, LLY, AVGO, JPM, XOM, TSLA, UNH, V, PG, COST, MA, JNJ, HD, MRK, ABBV, WMT, NFLX, BAC, CVX, AMD, KO, PEP, QCOM, CRM, TMO, WFC, LIN, ADBE, ORCL, MCD, CSCO, AMAT, DIS, ACN, ABT, TXN, GE, DHR, VZ, CAT, PFE, AMGN

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Hosting](#hosting)
- [What is Happening?](#what-is-happening)
- [Reproducing the Dev Environment](#reproducing-the-dev-environment)
- [Running the Project](#running-the-project)
- [Examples](#examples)

## Features

- Provides a searchable list of stocks, with ticker name, price, 24-hour percent change, 24-hour dollar change, day open price, and previous closing price.  
  ![Main List](https://i.imgur.com/37n9YoJ.png)

- Provides the user with an easily clickable list of recipes
- Scrapes general details, such as prep time and servings, for the recipe
- Scrapes the ingredients for the recipe
- Scrapes the Steps for the recipe
- Scrapes the nutrion info for the recipe
- Formats all the scraped information to be easily readable for the user

## Technologies Used

### Language

- [Python](https://www.python.org/)
- [JavaScript](https://www.javascript.com/)
- [HTML](https://html.spec.whatwg.org/multipage/)
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html)

### Frameworks

- [Flask (Back End)](https://flask.palletsprojects.com/en/3.0.x/)
- [ReactJS (Front End)](https://react.dev/)

### Libraries

- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Selenium](https://selenium-python.readthedocs.io/)
- [Fake User Agent](https://pypi.org/project/fake-useragent/)
- [Requests](https://requests.readthedocs.io/en/latest/)

## Hosting

- The Back End is hosted on an nginx server inside a [Docker](https://www.docker.com/) container hosted on a [Digital Ocean](https://www.digitalocean.com/) droplet.
- The Front End is hosted on [Netlify](https://www.netlify.com/).

## What is Happening?

1. When a user enters their search, the search term is appended to the search url associated with each of the specific websites being scraped.
2. Requests or Selenium is used to get the html content of the search results page.
3. The content is then parsed using BeautifulSoup to pull all the strictly relevant details.
4. All of the details are returned to the frontend, which are then nicely formatted and styled, for easing viewing by the user.

## How to use

## Reproducing the Dev Environment

1. Get the link, and clone the repository on your device, in the location you want the source files.
2. Navigate to the top level of the directory: ![Top Level](https://i.imgur.com/LU1MGxh.png)
3. To setup and run the backend, first navigate into the backend source files using `cd jump-to-recipe-api`.
4. Next, run `pip install -r requirements.txt` to ensure all required packages are installed.
5. Then, to run the API, run `flask run`. If all goes correctly, you should see something like this: ![Running Backend](https://i.imgur.com/h35NdQ2.png)
6. To setup and run the frontend, first navigate from the top level into the frontend source files using `cd frontend`.
7. Next, run `npm install`. If all goes correct, you should see something like this: ![npm install result](https://i.imgur.com/yabNOcZ.png)
8. Now, you can run `npm run dev`. If the frontend runs correctly, you should see something like this: ![Running Frontend](https://i.imgur.com/XslER0X.png)

## Running the Project

## Examples
