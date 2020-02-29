const svg2 = d3.select("#svg2")
    .append("svg")
    .attr("id", "svg2")
    .attr("width", 330)
    .attr("height", 586);

const width2 = svg2.attr("width");
const height2 = svg2.attr("height");

svg2.append("rect")
    .attr("width", width2)
    .attr("height", height2)
    .attr("fill", "grey");