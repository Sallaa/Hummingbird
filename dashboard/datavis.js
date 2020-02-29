const svg = d3.select("#svg1")
    .append("svg")
    .attr("id", "svg")
    .attr("width", 330)
    .attr("height", 586);

const width = svg.attr("width");
const height = svg.attr("height");

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "grey");

// x axis scale
const xScale = d3.scaleLinear().domain([0, chartWidth]).range([0, chartWidth]);

//y axis scale
const yScale = d3.scaleLinear().domain([0, chartHeight]).range([chartHeight, 0]);


// define color scale
let percentColors = [{
        pct: 0.0,
        color: {
            r: 0xff,
            g: 0x00,
            b: 0
        }
    },
    {
        pct: 0.5,
        color: {
            r: 0xff,
            g: 0xff,
            b: 0
        }
    },
    {
        pct: 1.0,
        color: {
            r: 0x00,
            g: 0xff,
            b: 0
        }
    }
];

// compute rgb values for the percentage
let getColorForPercentage = function (pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
};