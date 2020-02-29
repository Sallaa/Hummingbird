const svg = d3.select("#svg1")
    .append("svg")
    .attr("id", "svg")
    .attr("width", 700)
    .attr("height", 300);

const width = svg.attr("width");
const height = svg.attr("height");

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "grey");

