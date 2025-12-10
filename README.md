## FreeCodeCamp Data Visualization – Bar Chart (React + D3)

This project is a learning exercise for the FreeCodeCamp Data Visualization certification. I chose to build the Bar Chart project with React and D3 to get comfortable integrating D3’s SVG manipulation and scales inside a modern React app.

## What I built

- A responsive SVG bar chart that visualizes the US GDP dataset provided by FreeCodeCamp.
- Data is fetched from the FCC reference JSON at runtime and bound to SVG `rect` elements.
- D3 scales and axes are used to map dates (time scale) and GDP values (linear scale) to chart coordinates.
- An accessible tooltip that shows the date and GDP value on hover, positioned absolutely over the chart.

## Key implementation details

- Data source: `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`.
- Dimensions and layout: width `1200`, height `400`, padding `40` for axes and margins.
- Scales:
	- `xScale`: `d3.scaleTime()` using the min/max dates.
	- `yScale`: `d3.scaleLinear()` from `0` to the max GDP value.
- Bars: created via D3’s data join, one `rect` per data point, with `data-date` and `data-gdp` attributes to meet FCC tests.
- Axes: `d3.axisBottom` for X and `d3.axisLeft` for Y, appended with IDs `x-axis` and `y-axis`.
- Tooltip: a simple div with id `tooltip`. Styling is kept minimal, using absolute positioning and opacity transitions. See `src/components/BarChart.css`.

## Files of interest

- `src/components/BarChart.jsx` – Main chart logic (fetching data, scales, axes, bars, tooltip behavior).
- `src/components/BarChart.css` – Minimal styles for the tooltip (absolute positioning, basic appearance).

## Tech stack

- React (Vite) for app structure and lifecycle.
- D3 v7 for scales, axes, and SVG rendering.
- ESLint for linting.

## Run locally

Prerequisites: Node.js 18+ recommended.

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build and preview production build:

```bash
npm run build
npm run preview
```

## Demo

[https://danfrunza.me/FreeCodeCamp-DataVisualization-BarChart/](https://danfrunza.me/FreeCodeCamp-DataVisualization-BarChart/)

## Notes and next steps

- This implementation focuses on learning D3’s core concepts within React: data joins, scales, axes, and simple interactivity.
- Future improvements could include:
	- Responsive sizing (using container width or `viewBox`).
	- Accessible focus/keyboard interactions for bars and tooltip.
	- Formatting GDP values and dates for readability.
	- Transitions for hover and data updates.

