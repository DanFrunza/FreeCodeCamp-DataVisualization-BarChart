import * as d3 from 'd3';
import {useEffect, useRef} from 'react';
import './BarChart.css';

const BarChart = () => {
    const ref = useRef(); // Reference to the div that will contain the chart

    useEffect( () => {
        //Async function to fetch data and create the bar chart
        const fetchData = async () => {

            // Fetch the GDP data
            const data = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
            const json = await data.json();
            const dataset = json.data;

            // Set dimensions and margins for svg
            const w = 1200;
            const h = 400;
            const padding = 40;

            // Create SVG element
            // First clear any existing content
            d3.select(ref.current).selectAll("*").remove();

            // Create SVG
            const svg = d3.select(ref.current)
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            //Prepare scales
            const xScale = d3.scaleTime()
                .domain([d3.min(dataset, d => new Date(d[0])), d3.max(dataset, d => new Date(d[0]))])
                .range([padding, w - padding]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => d[1])])
                .range([h - padding, padding]);

            //Create bars
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", d => xScale(new Date(d[0])))
                .attr("y", d => yScale(d[1]))
                .attr("width", (w - 2 * padding) / dataset.length)
                .attr("height", d => h - padding - yScale(d[1]))
                .attr("fill", "teal")
                .attr("class", "bar")
                .attr("data-date", d => d[0])
                .attr("data-gdp", d => d[1]);

            //Create axes and tooltip
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);
            const tooltip = d3.select("#tooltip");

            //Add interactivity for tooltip
            svg.selectAll(".bar")
                .on("mouseover", function (event, d) {
                    tooltip.style("opacity", 1)
                    .html(`${d[0]}<br>${d[1]} Billion`)
                    .attr("data-date", d[0])
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 40 + "px");
                })
                .on("mouseout", () => tooltip.style("opacity", 0));
            
            //Append axes to svg
            svg.append("g")
                .attr("id", "x-axis")
                .attr("transform", `translate(0, ${h - padding})`)
                .call(xAxis);

                svg.append("g")
                .attr("id", "y-axis")
                .attr("transform", `translate(${padding}, 0)`)
                .call(yAxis);
        };

        fetchData();


     }, []);



    return (
        <div>
            <h1 id="title">Bar Chart</h1>
            <div ref={ref}></div>
            <div id="tooltip"></div>
        </div>
    );
};

export default BarChart;