# CN Dashboard App (https://dasabhi22.github.io/cn-dashboard-app/) Live preview

A modern, interactive dashboard application built with React and Vite that allows users to view, add, and manage widgets organized by categories.

## Features

- **Dynamic Widget Management:** Add and remove widgets from different categories  
- **Category Organization:** Widgets organized by customizable categories  
- **Showing Search Functionality:** Showing filter widgets by search terms  
- **Responsive Layout:** Optimized for various screen sizes  
- **Interactive Components:** Including donut charts and risk meters  

## Technologies Used

- **React**: UI library  
- **Vite**: Build tool and development server  
- **Zustand**: State management  
- **TailwindCSS**: Utility-first CSS framework  
- **React Icons & Heroicons**: Icon libraries  

## Screenshots

![Dashboard Overview](./public/dashboard-overview.png)  

## Project Structure

root/
├── dist/
├── node_modules/
├── public/
|   └── dashboard-overview.png
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── widgets/
│   │   │   ├── DonutChart.jsx
│   │   │   ├── NoDataWidget.jsx
│   │   │   ├── RiskMeter.jsx
│   │   ├── AddWidgetModal.jsx
│   │   ├── CategorySection.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── WidgetCard.jsx
│   ├── data/
│   │   └── jsonData.jsx
│   ├── store/
│   │   └── dashboardStore.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js


## Installation

```bash
# Clone repo
git clone https://github.com/dasabhi22/cn-dashboard-app.git
cd cn-dashboard-app

# Install dependencies
npm install

# Start dev server
npm run dev



