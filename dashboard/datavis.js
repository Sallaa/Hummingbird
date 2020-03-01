const svg = d3.select("#svg1")
    .append("svg")
    .attr("id", "svg")
    .attr("width", 330)
    .attr("height", 585);

const width = svg.attr("width");
const height = svg.attr("height");

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "grey");

// x axis scale
const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

//y axis scale
const yScale = d3.scaleLinear().domain([0, height]).range([0, height]);


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


d3.json("knn.json").then((data) => {
    data.forEach((d, i) => {
        const r = d['r'];
        const g = d['g'];
        const b = d['b'];

        let rect = d3.select("svg")
            .append("rect")
            .attr("x", xScale(d["x"] * 5))
            .attr("y", yScale(d["y"] * 5))
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", "rgb(" + d['b'] + "," + d['g'] + "," + d['r'] + ")");
    });
}, (error) => {
    console.log(error);
});


function updateData() {
    d3.json("knn_disease.json").then((data) => {
        data.forEach((d, i) => {
            const r = d['r'];
            const g = d['g'];
            const b = d['b'];

            let rect = d3.select("svg")
                .append("rect")
                .attr("x", xScale(d["x"] * 5))
                .attr("y", yScale(d["y"] * 5))
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", "rgb(" + d['b'] + "," + d['g'] + "," + d['r'] + ")");
        });
        d3.json("dots.json").then((data) => {
            data.forEach((d, i) => {
                let r;
                let g;
                let b;

                if (d["color"] == 1) {
                    r = 255;
                    g = 0;
                    b = 0;
                } else if (d["color"] == 0) {
                    r = 0;
                    g = 255;
                    b = 0;
                }

                let rect = d3.select("svg")
                    .append("circle")
                    .attr("cx", xScale(d["x"] * 330 / 200))
                    .attr("cy", yScale(d["y"] * 586 / 369))
                    .attr("r", 3)
                    .style("fill", "rgb(" + r + "," + g + "," + b + ")");
            });

        }, (error) => {
            console.log(error);
        });
    }, (error) => {
        console.log(error);
    });
}

console.log(xScale(120));