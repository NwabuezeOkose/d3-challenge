// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var chart = d3.select("#scatter").append("div").classed("chart", true);

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


//To append the an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


d3.csv("data.csv").then(function (data, err) {
    if (err) throw err;
    console.log(healthData)
    //tho parse the data
    healthData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthCare = +healthCare;
    });

    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);

    //creating the axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xMin;
    var xMax;
    var yMin;
    var yMax;


    xMin = d3.min(healthData, function (data) {
        return data.healthCare;
    });

    xMax = d3.max(healthData, function (data) {
        return data.healthCare;
    });

    yMin = d3.min(healthData, function (data) {
        return data.poverty;
    });

    yMax = d3.max(healthData, function (data) {
        return data.poverty;
    });

    xLinearScale.domain([xMin, xMax]);
    yLinearScale.domain([yMin, yMax]);

    console.log(xMin);
    console.log(yMax);


    //To append the xaxis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    //To append the yaxis
    chartGroup.append("g")
        .call(leftAxis);
    
    //To append the intiial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.healthCare))
        .attr("cy", d => yLinearScale(d.poverty))
        .attr("r", 20)
        .attr("fill", "blue")
        .attr("opacity", ".5")
        .on("mouseout", function(data, index){
            toolTip.hide(data);
        });

    
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d){
        return (abbr + '%');
    })

    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(healthData){
        toolTip.show(healthData);
    })

    .on("mouseout", function(healthData, index) {
        toolTip.hide(healthData);
    });

    chartGroup.append("text")
    .style("font-size", "10px")
    .selectAll("tspan")
    .data(healthData)
    .enter()
    .append("tspan")
        .attr("x", function(data) {
            return xLinearScale(data.healthCare +1.8);
        })

        .attr("y", function(data) {
            return yLinearScale(data.poverty +.4);
        })

        .text(function(data){
            return data.abbr
        });

        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left +40)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Health Care(%)");

    chartGroup.append("g")
        .attr("transform", `translate(${width / 1.5}, ${height + margin.top + 50})`)
        .attr("class", "axistext")
        .text("Those in Poverty (%)")
});