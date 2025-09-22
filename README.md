# 🌍 WorldWise
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
[![React](https://img.shields.io/badge/React-18+-61dafb?logo=react)](https://reactjs.org/)
## Description

**WorldWise** is an interactive travel app designed to help users track their adventures, visualize places they've visited, and plan future trips. With an intuitive map-based UI, you can pin cities, add personal notes, and see your journey unfold at a glance. WorldWise is perfect for globetrotters, travel bloggers, and anyone who loves exploring the world!

## Live Demo 
[https://world-wise-ubr4.vercel.app/](https://world-wise-gilt-ten.vercel.app/)
## Features

* 🗺️ **Interactive Map:** Pin cities and see them on a live world map.
* ✍️ **Personal Notes:** Attach notes, memories, or tips to each place.
* 📅 **Travel Log:** Track visited locations and add travel dates.
* 🔎 **Search & Filter:** Easily find places or filter by trip.
* 📱 **Responsive Design:** Works beautifully on desktop and mobile devices.

## Folder Structure

Here’s a suggested / assumed folder structure for WorldWise:

```
WorldWise/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/           # static images like logos, icons, map markers
├── src/
│   ├── components/           # reusable UI components (buttons, modals, map pins etc.)
│   ├── pages/                # page-level components (Home, MapView, TravelLog, etc.)
│   ├── contexts/             # React context providers for global state
│   ├── hooks/                # custom hooks (e.g. useMap, useFetchCities etc.)
│   ├── App.jsx               # main app component
│   ├── index.jsx             # React entry point
│   └─
├── .env.example              # example environment variable file
├── package.json
├── README.md
└── .gitignore
```

You can adjust this based on actual directories: add `backend/` if there’s a server, tests directories if you have tests, etc.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/o064/WorldWise.git
   cd WorldWise
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```



3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## Usage

After starting the app:

* Log in / Sign up (if authentication is implemented).
* Explore the map: click / tap locations to add pins.
* Attach notes, dates, photos to places.
* View your travel log: filter by trip, search for cities, edit or remove entries as needed.


```

## API Endpoints (If applicable)

If there’s a backend, possible endpoints might look like:

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/cities`     | Get all pinned cities |
| POST   | `/api/cities`     | Add a new city        |
| GET    | `/api/cities/:id` | Get details of a city |
| PUT    | `/api/cities/:id` | Update a city         |
| DELETE | `/api/cities/:id` | Remove a city         |

## Technologies Used

* **Frontend:**

  * React
  * React Router
  * Mapbox GL JS (or another map library)
  * CSS / styled-components / CSS Modules

* **Backend:** (if exists or planned)

  * Node.js with Express (or another framework)

* **Tools & Utilities:**

  * ESLint, Prettier for code style
  * dotenv (for environment variables)

