const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var div1 = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("text-align", "left")
  .style("width", "155px")
  .style("height", "100px")
  .style("padding", "2px")
  .style("font", "10px sans-serif")
  .style("background", "rgba(255,255,255,0.9)")
  .style("border", "0px")
  .style("border-radius", "5px")
  .style("pointer-events", "none")
  //.style("color", "rgba(43,40,145,1)");
  .style("color", "black");

var div2 = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("text-align", "center")
  .style("width", "40px")
  .style("height", "12px")
  .style("padding", "2px")
  .style("font", "10px sans-serif")
  .style("border", "0px")
  .style("border-radius", "5px")
  .style("pointer-events", "none")
  .style("color", "white");

var div3 = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("text-align", "center")
  .style("width", "130px")
  .style("height", "80px")
  .style("padding", "2px")
  .style("font", "10px sans-serif")
  .style("border", "2px")
  .style("border-radius", "5px")
  .style("pointer-events", "none")
  .style("color", "white");

var div4 = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("text-align", "center")
  .style("width", "126px")
  .style("height", "50px")
  .style("padding", "2px")
  .style("font", "10px sans-serif")
  .style("border", "2px")
  .style("border-radius", "5px")
  .style("pointer-events", "none")
  .style("color", "white");

let isIndustryFiltered = 0;
let startYear = 2010;
let endYear = 2023;
//let globalFilteredData = [];
/*
// industry selector
d3.select("#allIndustry").on("change", function() {
  var isChecked = d3.select(this).property("checked");
  d3.selectAll(".industry").property("checked",false);
});
d3.selectAll(".industry").on("change", function() {
  d3.select("#allIndustry").property("checked", false);
});
*/
// setup for vis1
let svg1 = d3.select("#vis1");
svg1.append("text")
  .attr("x", (700 / 2))             
  .attr("y", 20)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("font-weight", "bold")
  .text("Number of Billionaires in Each Country and Area");
let margin1 = {top: 60, right: 0, bottom: 0, left: -80},
    width1 = +svg1.attr("width") - margin1.left - margin1.right,
    height1 = +svg1.attr("height") - margin1.top - margin1.bottom;
let g1 = svg1.append("g")
           .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
const projection = d3.geoNaturalEarth1()
  .scale((width1 / 2 / Math.PI) * 1.1)
  .translate([width1 / 2, height1 / 2]);
const pathGenerator = d3.geoPath().projection(projection);

let genderColors = {
  "male": "#1f77b4",
  "female": "#ff7f0e",
  "other": "#2ca02c"
};

// setup for vis2
let svg2 = d3.select("#vis2");
svg2.append("text")
  .attr("x", (700 / 2))             
  .attr("y", 12)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("font-weight", "bold")
  .text("Sum of Net Worth in Selected Industries");
svg2.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", 10)
  .attr("x", -150)
  .attr("dy", "1em") 
  .style("font-size", "10px")
  .text("Net Worth in billions");

let margin2 = {top: 30, right: 0, bottom: 30, left: 60},
    width2 = +svg2.attr("width") - margin2.left - margin2.right,
    height2 = +svg2.attr("height") - margin2.top - margin2.bottom;
let g2 = svg2.append("g")
           .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
let chartGroup2 = g2.append('g')
           .attr('class', 'chart-content');
let y2_max = 0;
let y2_min = 100000000;
let year_total = ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023"];
let customColors = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f","#bab0ab", "#1b9e77","#d95f02", "#7570b3", "#e7298a","#66a61e", "#e6ab02", "#a6761d",  "#666666",  "#8dd3c7", "#bebada", "#fb8072", "#80b1d3", "#fdb462",  "#fccde5",  "#bc80bd","#ffed6f"];
let industries = ["Automotive", "Billionaire", "Business", "Celebrity", "Construction & Engineering", "Diversified", "Energy","Fashion & Retail","Finance & Investments","Food & Beverage","Gambling & Casinos", "Gaming", "Healthcare", "Logistics", "Manufacturing", "Media & Entertainment","Medicine", "Metals & Mining", "Oil", "Politics", "Real Estate","Retail", "Service", "Sports", "Technology", "Telecom"];
let colorScale2 = d3.scaleOrdinal().domain(industries).range(customColors);

// setup for vis3
let svg3 = d3.select("#vis3");
let margin3 = {top: 40, right: 0, bottom: 20, left: 125},
    width3 = +svg3.attr("width") - margin3.left - margin3.right,
    height3 = +svg3.attr("height") - margin3.top - margin3.bottom;
let g3 = svg3.append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");
svg3.append("text")
    .attr("x", (700 / 2))             
    .attr("y", 15)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("font-weight", "bold")
    .text("Minimum Age of Billionaires by Industry and Region");
let overlayGroup = g3.append("g")
    .attr("class", "overlay-group");
let regionOrder = ["NA","LAC","NE","WE","SE","EE","CE","SSA","MENA","WA","CA","SA","SEA","EA","ANZ"];
let regionToFullname = {"NA":"North America","LAC":"Latin America and the Caribbean","NE":"Northern Europe","WE":"Western Europe","SE":"Southern Europe","EE":"Eastern Europe","CE":"Central Europe","SSA":"Sub-Saharan African","MENA":"Middle East and North Africa","WA":"West Asia","CA":"Central Asia","SA":"South Asia","SEA":"Southeast Asia","EA":"East Asia","ANZ":"Australia and New Zealand"};
let countryToContinent = {"Mexico":"LAC", "United States":"NA", "India":"SA", "France":"WE", "Brazil":"LAC", "Spain":"SE", "Germany":"WE","Sweden":"NE", "Hong Kong":"EA", "Saudi Arabia":"WA", "Canada":"NA", "Italy":"SE", "Russia":"EE", "Malaysia":"SEA", "United Kingdom":"NE", "Chile":"LAC", "Switzerland":"WE",
    "Kuwait":"WA", "Cyprus":"WA", "Czech Republic":"EE", "Japan":"EA", "South Korea":"EA", "Netherlands":"WE", "China":"EA", "Israel":"WA", "Colombia":"LAC", "Egypt":"MENA", "Ireland":"NE", "Taiwan":"EA", "New Zealand":"ANZ", "Greece":"SE", "Ukraine":"EE", "South Africa":"SSA", "Austria":"WE", "Venezuela":"LAC", "Philippines":"SEA",
    "Australia":"ANZ", "Thailand":"SEA", "Portugal":"SE", "Kazakhstan":"CA", "United Arab Emirates":"MENA", "Norway":"NE", "Indonesia":"SEA", "Denmark":"NE", "Singapore":"SEA", "Belgium":"WE", "Turkey":"WA", "Lebanon":"WA", "Romania":"EE", "Nigeria":"SSA", "Poland":"EE", "Argentina":"LAC", "Finland":"NE","Belize":"LAC",
    "Monaco":"WE", "Pakistan":"SA", "Georgia":"LAC", "Morocco":"MENA", "Peru":"LAC", "St. Kitts and Nevis":"LAC", "Swaziland":"SSA", "Angola":"SSA", "Guernsey":"NE", "Vietnam":"SEA", "Nepal":"SA", "Algeria":"MENA", "Macau":"EA", "Oman":"WA", "Uganda":"SSA", "Tanzania":"SSA", "Lithuania":"NE", "Liechtenstein":"WE",
    "Iceland":"NE", "Guatemala":"LAC", "Qatar": "WA", "Slovakia":"EE", "Zimbabwe":"SSA", "Hungary":"EE", "Czechia":"CE", "Eswatini (Swaziland)":"SSA", "Macao":"EA", "Armenia":"WA", "Bulgaria":"EE", "Barbados":"LAC", "Uruguay":"LAC", "Estonia":"NE", "Bangladesh":"SA", "Panama":"LAC"
  };
let groupedByContinentAndIndustry = new Map();
let colorScale3 = d3.scaleDiverging(d3.interpolatePuOr).domain([15, 47, 95]);
let heatmapData = [];
/*
let y3Scale = d3.scaleBand()
   .range([height3, 0])
    .domain(industries)
    .padding(0.1);
let y3Axis = g3.append("g")
    .style("font-size", 10)
    .call(d3.axisLeft(y3Scale).tickSize(0))
    .select(".domain").remove(); 
*/
// setup for vis4
let svg4 = d3.select("#vis4");
let margin4 = {top: 30, right: 40, bottom: 30, left: 60},
    width4 = +svg3.attr("width") - margin4.left - margin4.right,
    height4 = +svg3.attr("height") - margin4.top - margin4.bottom;
let g4 = svg4.append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");
svg4.append("text")
    .attr("x", (700 / 2))             
    .attr("y", 15)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("font-weight", "bold")
    .text("Top 10 Billionares Each Year in Selected Industries");

svg4.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)
    .attr("x", -40)
    .attr("dy", "1em") 
    .style("font-size", "10px")
    .text("Average Net Worth in Billions (on years ranked top 10)");

let colorScale4 = d3.scaleSequential(t => d3.interpolateBlues(t * 0.9 + 0.1)).domain([1,14]);

// load & process data for all graphs
d3.csv("billionaires_2010_2023_cleaned.csv").then(function(data) {
  var original_data = data;
  globalFilteredData = original_data;
  var doubleSlider = document.getElementById('year-range-slider');
  noUiSlider.create(doubleSlider, {
    start: [2010, 2023],
    connect: true,
    step: 1,
    range: {
      'min': 2010,
      'max': 2023
    }
  });
// set scale & axis for vis1
  let num_count = d3.rollups(data, 
    /*
    v => {
      const uniqueNames = new Set(v.map(d => d.full_name));
      return uniqueNames.size;
    },
    */
    v => {
      const uniqueMales = new Set(v.filter(d => d.gender === 'Male').map(d => d.full_name));
      const uniqueFemales = new Set(v.filter(d => d.gender === 'Female').map(d => d.full_name));
      const uniqueOther = new Set(v.filter(d => d.gender === '').map(d => d.full_name));
      return {
        total: uniqueMales.size + uniqueFemales.size + uniqueOther.size,
        male: uniqueMales.size,
        female: uniqueFemales.size,
        other: uniqueOther.size
      }
    },
    d => d.country_of_citizenship
  );
  let countryCounts = new Map(num_count);
  //onsole.log(countryCounts);
  let size = d3.scaleSqrt()
    .domain([0, d3.max(Array.from(countryCounts.values()),d => d.total)])
    .range([0, 24]);

  let legend1 = svg1.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + 649 + ", " + 50 + ")");
  let legendSize = [1, 10, 50, 100, 500, 1000];
  let maxY = 0;
  let textXPosition = 24;
  legendSize.forEach(function(number_people, index){
    //console.log(number_people);
    //console.log(index);
    var radius = size(number_people);
    var yPosition = maxY + 5 + radius;
    legend1.append("circle")
      .attr("cy", yPosition)
      .attr("r",radius)
      .attr("fill", "rgba(43,131,186,0.7)");
    legend1.append("text")
      .attr("x", textXPosition)
      .attr("y", yPosition + radius/2)
      .style("font-size","12")
      .text(number_people);
    maxY = yPosition + radius + 5
    });
  legend1.insert("rect", ":first-child")
    .attr("x", -26)
    .attr("y", -10)
    .attr("width", 76)
    .attr("height", 180)
    .style("fill", "none")
    .style("stroke", "rgba(43,131,186,1.0)");

  
  //set scale & axis for vis2
  var dataForLine = aggregateData(data);
  for (i in dataForLine) {
    var max = 0;
    var min = 100000000;
    for (j in dataForLine[i]) {
      if (dataForLine[i][j].net_worth >= max) {
        max = dataForLine[i][j].net_worth;
      }
      if (dataForLine[i][j].net_worth <= min) {
        min = dataForLine[i][j].net_worth;
      }
    }
    if (max >= y2_max) {
      y2_max = max;
    }
    if (min <= y2_min) {
      y2_min = min;
    }
  }
  let x2Scale = d3.scaleBand()
    .range([0, width2 * 0.8])
    .domain(year_total)
    .padding(0.09);
  let y2Scale = d3.scaleLinear()
    .domain([y2_min, y2_max])
    .range([height2, 0]);
  let x2Axis = g2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2Scale));
  let y2Axis = g2.append("g")
    .call(d3.axisLeft(y2Scale));
  //console.log(dataForLine);
  const legendMargin = { left: 0, top: 10 };
  const legend2 = g2.append("g") .attr('class', 'legend')
                .attr('transform', `translate(${width2 - 140},${legendMargin.top - 40})`);  
  v2legend(legend2,colorScale2,industries);     
  
  //1173+1096+914+628+1085+1136+707+1215+1180+2194 = 11328
  //set scale & axis for vis3 
  groupedByContinentAndIndustry = updateHeatmapData(data,groupedByContinentAndIndustry,countryToContinent);
  let myRegion = Array.from(groupedByContinentAndIndustry.keys());
      myRegion = myRegion.filter((location) => location != "Other");
  let x3Scale = d3.scaleBand()
    .range([0, width3 * 0.8])
    .domain(regionOrder)
    .padding(0.1);
  let x3Axis = g3.append("g")
    .style("font-size", 10)
    .call(d3.axisTop(x3Scale).tickSize(0))
    .select(".domain").remove();
  
  industries.sort((a, b) => d3.descending(a,b));
  console.log(industries);
  let y3Scale = d3.scaleBand()
   .range([height3, 0])
    .domain(industries)
    .padding(0.2);
  let y3Axis = g3.append("g")
    .call(d3.axisLeft(y3Scale).tickSize(0))
    .style("font-size", 10);
    //.select(".domain").remove(); 

  var legend3 = g3.append("g") .attr('class', 'legend')
    .attr('transform', `translate(${500},${300})`);
  var legendWidth = 189;
  var legendHeight = 20;
  var defs = legend3.append("defs");
  var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient-heatmap");
  linearGradient.selectAll("stop")
      .data(colorScale3.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale3(t) })))
      .enter().append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);
  legend3.append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("transform", "rotate(-90)")
      .style("fill", "url(#linear-gradient-heatmap)");
  legend3.selectAll("text")
      .data([20, 47, 90])
      .enter().append("text")
      .attr("x", d => legendWidth * (d - colorScale3.domain()[0]) / (colorScale3.domain()[2] - colorScale3.domain()[0]) - 10)
      .attr("y", legendHeight + 10)
      .style("font-size","12")
      .attr("transform", "rotate(-90)")
      .text(d => d);
  /*
  legend3.insert("rect", ":first-child")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 210)
      .attr("height", 50)
      .style("fill", "none")
      .attr("transform", "rotate(-90)")
      .style("stroke", "rgba(43,131,186,1.0)");
  */

  //set scale & axis for vis4
  var top10networthData = updateFirst10(data);
  var names = Array.from(new Set(top10networthData.map(d => d.full_name)));
  var y4max = d3.max(top10networthData, d => d.net_worth);

  var x4Scale = d3.scaleBand()
    .range([0, width4])
    .domain(names)
    .padding(0.05);
  var x4Axis = g4.append("g")
    .style("font-size", 10)
    .attr("transform", "translate(0," + height4 *0.7 + ")")
    .call(d3.axisBottom(x4Scale).tickSize(0));
  x4Axis.selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-90)");
  var y4Scale = d3.scaleLinear()
    .range([height4 * 0.7, 0])
    .domain([0, y4max]);
  var y4Axis = g4.append("g")
    .call(d3.axisLeft(y4Scale));

  var legend4 = g4.append("g") .attr('class', 'legend')
  .attr('transform', `translate(${621},${10})`);
  var legend4Height = 200;
  var defs = legend4.append("defs");
  var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0).attr("y1", legend4Height)
    .attr("x2", 0).attr("y2", 0);
  var n = 10;
  Array.from(Array(n).keys()).forEach(i => {
    linearGradient.append("stop")
        .attr("offset", i / (n - 1))
        .attr("stop-color", colorScale4(1 + i * (14 - 1) / (n - 1)));
  });
  legend4.append("rect")
    .attr("width", 10)
    .attr("height", legend4Height)
    .style("fill", "url(#linear-gradient)");

  var legendScale = d3.scaleLinear()
    .domain([1, 14])
    .range([legend4Height, 0]);

  var legendAxis = d3.axisLeft(legendScale)
    .ticks(5);

  legend4.append("g")
    .attr("class", "legend axis")
    .attr("transform", "translate(0, 0)") 
    .call(legendAxis)
    .select(".domain").remove();

  legend4.append("text")
    .attr("class", "legend-title")
    .attr("transform", "rotate(90)")
    .attr("x", 0) 
    .attr("y", -12)
    .text("Number of Years Ranked Top 10") 
    .attr("font-size", "10px");


  
  v1dataUpdate(data,size);
  v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
  v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
  v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
  
  let industry_checked = [];
  let self_made_checked = document.querySelectorAll('.self_made_check');
  let filter_by_selfmade = "on";

  document.getElementById('year-range-slider').noUiSlider.on('update', function (values, handle) {
    startYear = parseInt(values[0]);
    endYear = parseInt(values[1]);
    document.getElementById('start-value').innerHTML = "Year Start: " + startYear;
    document.getElementById('end-value').innerHTML = "Year End: " + endYear;
    if (isIndustryFiltered == 0) {
      if (filter_by_selfmade == "on") {
        data = updateDatabyYear(original_data,startYear,endYear);
        console.log(data);
        v1dataUpdate(data,size);
        v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
        v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
      }
      else {
        data = updateDatabyYear(original_data,startYear,endYear);
        data = filterData(filter_by_selfmade,data);
        v1dataUpdate(data,size);
        v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
        v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
      }
    }
    else {
      if (filter_by_selfmade == "on") {
        data = updateDatabyYear(original_data,startYear,endYear);
        console.log(data);
        v3dataUpdate(data,x3Scale,y3Scale,colorScale3);
        data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v1dataUpdate(data,size);
        v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
        maintainSelectedHeight(industry_checked);
      }
      else {
        data = updateDatabyYear(original_data,startYear,endYear);
        v3dataUpdate(data,x3Scale,y3Scale,colorScale3);
        data = filterData(filter_by_selfmade,data);
        data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v1dataUpdate(data,size);
        v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
        maintainSelectedHeight(industry_checked);
      }
    }
    self_made_checked.forEach(checkbox => {
      checkbox.addEventListener('change', function(event) {
          if (!event.target.checked) {
            d3.select("#both").property("checked",true);
            data = updateDatabyYear(original_data,startYear,endYear);
            if (industry_checked.length == 0) {
              v1dataUpdate(data,size);
              v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
              v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
              v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
            }
            else {
              v3dataUpdate(data,x3Scale,y3Scale,colorScale3);
              data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
              v1dataUpdate(data,size);
              v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
              v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
              maintainSelectedHeight(industry_checked);
            }
          }
          if(event.target.checked) {
            self_made_checked.forEach(box => {
              if(box !== event.target) {
                box.checked = false;
              }
            });
            data = updateDatabyYear(original_data,startYear,endYear);
            if (event.target.value == "True") {
              filter_by_selfmade = "True";
              data = filterData(event.target.value, data);
              v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
              if(industry_checked.length != 0) {
                data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
                maintainSelectedHeight(industry_checked);
              }
              v1dataUpdate(data,size);
              v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
              v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
            }
            else if (event.target.value == "False"){
              filter_by_selfmade = "False";
              data = filterData(event.target.value, data);
              v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
              if(industry_checked.length != 0) {
                data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
                maintainSelectedHeight(industry_checked);
              }
              v1dataUpdate(data,size);
              v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
              v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
            }
            else {
              filter_by_selfmade = "on";
              console.log(data);
              if (industry_checked.length == 0) {
                v1dataUpdate(data,size);
                v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
                v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
                v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
              }
              else {
                v3dataUpdate(data,x3Scale,y3Scale,colorScale3);
                data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
                v1dataUpdate(data,size);
                v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
                v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
                maintainSelectedHeight(industry_checked);
              }
            }
          }
      });
    });

    //console.log(data);
    d3.select("#allIndustry").on("change", function() {
      var isChecked = d3.select(this).property("checked");
      d3.selectAll(".industryCheck").property("checked", false);
      industry_checked = [];
      isIndustryFiltered = 0;
      data = updateDatabyYear(original_data,startYear,endYear);
      v1dataUpdate(data,size);
      v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
      v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
      v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
      highlightHeatmapRows(industry_checked,y3Scale,y3Axis);
    });

    //let industry_checked = [];
    d3.selectAll(".industryCheck").on("change", function() {
      var checkBoxValue = this.value;
      d3.select("#allIndustry").property("checked", false);
      //console.log(d3.select(this).property("checked"));
      if (d3.select(this).property("checked") == true) {
        industry_checked.push(checkBoxValue);
      }
      else {
        industry_checked = industry_checked.filter(function(d) {return d !== checkBoxValue;});
      }
      //console.log(industry_checked.length);
      isIndustryFiltered = 1;
      if (industry_checked.length == 0) {
        console.log(1);
        d3.selectAll(".industryCheck").property("checked", false);
        d3.select("#allIndustry").property("checked",true);
        industry_checked = [];
        isIndustryFiltered = 0;
        data = updateDatabyYear(original_data,startYear,endYear);
        v1dataUpdate(data,size);
        v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
        v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
        highlightHeatmapRows(industry_checked,y3Scale,y3Axis);
      }
      else {
        data = updateDatabyYear(original_data,startYear,endYear);
        console.log(data);
        v3dataUpdate(data,x3Scale,y3Scale, colorScale3);
        data = updateDataIndustry(data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        //data = updateDataIndustry(original_data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        //data = updateDatabyYear(data,startYear,endYear);
        v2dataUpdate(data, x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear);
        v1dataUpdate(data,size);
        v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis);
        highlightHeatmapRows(industry_checked,y3Scale,y3Axis);
      }
    });
  });
}).catch(function(error) {
  console.log(error);
});



// helper functions
// data manipulation
function updateDatabyYear(data,startYear,endYear){
  return data.filter(function(d) { return d.year >= startYear && d.year <= endYear; });
}

function updateDataIndustry(original_data,industry_checked,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear) {
  var selectedCategories = [];
  selectedCategories = original_data.filter(function (d) { return industry_checked.includes(d.business_category)});
  //console.log(selectedCategories);
  d3.selectAll(".categoryCheckbox:checked").each(function() {
      var category = d3.select(this).property("value");
      var categoryData = filterDataForCategory(category);
      selectedCategories.push(...categoryData);
  });
  return selectedCategories;
}

function filterData(value,data){
  var filteredData;
    if(value === "True") {
        filteredData = data.filter(d => d.self_made == "TRUE");
    } else if(value === "False") {
        filteredData = data.filter(d => d.self_made == "FALSE");
    } else {
        filteredData = data;
    }
    return filteredData;
}

// V1
function v1dataUpdate(data,size) {
  num_count = {};
  num_count = d3.rollups(data, 
    /*
    v => {
      const uniqueNames = new Set(v.map(d => d.full_name));
      return uniqueNames.size;
    },
    */ 
    v => {
      const uniqueMales = new Set(v.filter(d => d.gender === 'Male').map(d => d.full_name));
      const uniqueFemales = new Set(v.filter(d => d.gender === 'Female').map(d => d.full_name));
      const uniqueOther = new Set(v.filter(d => d.gender === '').map(d => d.full_name));
      return {
        total: uniqueMales.size + uniqueFemales.size + uniqueOther.size,
        male: uniqueMales.size,
        female: uniqueFemales.size,
        other: uniqueOther.size
      };
    },
    d => d.country_of_citizenship
  );
  //console.log(num_count);
  countryCounts = {};
  countryCounts = new Map(num_count);
  //console.log(countryCounts);
  /*
  size = d3.scaleSqrt()
    .domain([0, d3.max(Array.from(countryCounts.values()))])
    .range([0, 24]);
  */
  updateVisualization1(countryCounts,g1,size);
}

function updateVisualization1(data,group,size) {
  myGeoJSONPath = d3.json('custom.geo.json').then(geoData => {
    group.selectAll("path")
    .data(geoData.features)
    .join("path")
    .attr("d", pathGenerator)
    .attr("fill", "lightgray");
  
    group.selectAll("circle")
    .data(geoData.features)
    .join("circle")
    .attr("cx", d => {
      const centroid = pathGenerator.centroid(d);
      return centroid[0];
    })
    .attr("cy", d => {
      const centroid = pathGenerator.centroid(d);
      return centroid[1];
    })
    .attr("r", d => {
      //console.log(data.get(d.properties.name).total);
      var count = data.get(d.properties.name);
      if (count) {
        count = count.total;
      }
      else {
        count = 0;
      }
      //console.log(count);
      return size(count);
    })
    .attr("fill", "rgba(43,131,186,0.7)")
    .attr("class", d => `country ${countryToContinent[d.properties.name]}`)
    .transition()
    .duration(100);
    
    group.selectAll("circle")
    .data(geoData.features)
    .on("mouseover", function(event,d) {
        var count = data.get(d.properties.name);
        var male = 0;
        var female = 0;
        var other = 0;
        if (count) {
          male = count.male;
          female = count.female;
          other = count.other;
          count = count.total;
        }
        else {
          count = 0;
        }
        const country = d.properties.name;
        d3.select(event.currentTarget)
          .style("fill", "rgb(165,38,52)");
        div1.transition()
          .duration(100)
          .style("opacity", 1);
        div1.html(country + "<br/>" + "Number of Billionaires: " + count + "<br/>" + "Male: " + male + "; " + "Female: " + female + "; " + "Other: " + other + "<br/>" + "Gender ratio:" + "<br/>")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 18) + "px");
        v1v3MouseOver(country);
        highlightBarsByCountry(country);

         var pieData = [
          { gender: "male", value: male},
          { gender: "female", value: female},
          { gender: "other", value: other},
          { gender: "total", value: count}
        ];

        //div1gender.html("");
        //genderPieChart(pieData, div1);
        genderWaffle(pieData, div1);
        /*
        div1.style("visibility", "visible")
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
        */
      })
      .on("mouseout", function(event,d){
        const country = d.properties.name;
        d3.select(event.currentTarget)
          .style("fill", "rgba(43,131,186,0.7)");
        div1.transition()
          .duration('200')
          .style("opacity", 0);
        v1v3MouseOut(country);
        highlightBarsByCountry(null);
        //div1gender.style("visibility", "hidden");
      });
  });
}

function v1v3MouseOver(countryName) {
  const region = countryToContinent[countryName];
  console.log(region);
  overlayGroup.selectAll(".region-overlay")
              .style("opacity", function(d) {return d[0] == region ? 1 : 0});
}

function v1v3MouseOut(countryName) {
  //const region = countryToContinent[countryName];
  overlayGroup.selectAll(".region-overlay")
              .style("opacity", 0);
}

function genderWaffle(pieData, tooltipElement) {
  var width = 50, height = 50;
  const cellSize = 5;
  const cellsPerRow = 10;
  const totalCells = 100; 

  var totalcount = pieData[3].value;
  var maleCells = Math.round((pieData[0].value / totalcount) * totalCells);
  var femaleCells = Math.round((pieData[1].value/ totalcount) * totalCells);
  var otherCells = totalCells - (maleCells + femaleCells);
  if (otherCells < 0) {
    otherCells = 0;
  }
  let cells = Array(maleCells).fill({gender: "male"})
              .concat(Array(femaleCells).fill({gender: "female"}))
              .concat(Array(otherCells).fill({gender: "other"}));
  //console.log(cells);
  var svg = tooltipElement.append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.selectAll(".cell")
    .data(cells)
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", (d, i) => (i % cellsPerRow) * (cellSize + 0.1))
    .attr("y", (d, i) => Math.floor(i / cellsPerRow) * (cellSize + 0.1))
    .attr("width", cellSize - 0.1)
    .attr("height", cellSize - 0.1)
    .style("fill", d => genderColors[d.gender]);
}

//V2
function v2dataUpdate(data,x2Scale,y2Scale,x2Axis,y2Axis,colorScale2,startYear,endYear) {
  dataForLine = {};
  dataForLine = aggregateData(data);
  //console.log(dataForLine);
  var new_year_total = [];
  for (year in year_total) {
    if (startYear <= year_total[year] && year_total[year] <= endYear) {
      new_year_total.push(year_total[year]);
    }
  }
  x2Scale = d3.scaleBand()
  .range([0, width2 * 0.8])
  .padding(0.1)
  .domain(new_year_total);
  x2Axis.call(d3.axisBottom(x2Scale));
  y2_max = 0;
  y2_min = 100000000;
  for (i in dataForLine) {
    var max = 0;
    var min = 100000000;
    for (j in dataForLine[i]) {
      if (dataForLine[i][j].net_worth >= max) {
        max = dataForLine[i][j].net_worth;
      }
      if (dataForLine[i][j].net_worth <= min) {
        min = dataForLine[i][j].net_worth;
      }
    }
    if (max >= y2_max) {
      y2_max = max;
    }
    if (min <= y2_min) {
      y2_min = min;
    }
  }
  y2Scale = d3.scaleLinear()
    .domain([y2_min, y2_max])
    .range([height2, 0]);
  y2Axis.call(d3.axisLeft(y2Scale));
  updateVisualization2(dataForLine,chartGroup2,x2Scale,y2Scale,colorScale2);
}

function aggregateData(data) {
  let rolledUpData = d3.rollups(data, 
    v => d3.sum(v, d => +d.net_worth),
    d => d.year,
    d => d.business_category 
  );
  let completeIndustryData = {};
  rolledUpData.forEach(([year, industries]) => {
    industries.forEach(([industry, net_worth]) => {
      if (!completeIndustryData[industry]) {
        completeIndustryData[industry] = [];
      }
      completeIndustryData[industry].push({ year: year, net_worth: net_worth });
    });
  });
  return completeIndustryData;
}

function v2legend(legend,colorScale){
  const legendItemHeight = 15;
  const legendItemWidth = 15;
  legend.selectAll('.legend-item')
        .data(colorScale.domain(), d => d)
        .join(
          enter => {
            const legendEnter = enter.append('g').attr('class', 'legend-item').attr('data-industry', d => d);
            legendEnter.append('rect').attr('width', legendItemWidth).attr('height', legendItemHeight - 5)
                       .attr('fill', d => colorScale(d));
            legendEnter.append('text')
                      .attr('x', legendItemWidth + 5)
                      .attr('y', (legendItemHeight - 5) / 2)
                      .attr('dy', '0.35em')
                      .text(d => d)
                      .style('font-size', '10px')
                      .style("font-weight", "lighter");
            return legendEnter;
          },
          update => {
            return update;
          },
          exit => exit.remove())
        .attr('transform', (d, i) => `translate(0, ${i * legendItemHeight})`);
}

function updateVisualization2(dataForLine,group,xScale,yScale,colorScale) {
  //delete dataForLine[""];
  group.selectAll('*').remove();
  //console.log(dataForLine);
  var lineGenerator = d3.line()
    .x(d => xScale(d.year) + xScale.bandwidth() / 2)
    .y(d => yScale(d.net_worth));

  //const industryColors = {"Automotive": "#4e79a7", "Billionaire": "#f28e2c","Business": "#e15759","Celebrity": "#76b7b2", "Construction & Engineering": "#59a14f", "Diversified": "#edc949", "Energy": "#af7aa1", "Fashion & Retail": "#ff9da7","Finance & Investments": "#9c755f","Food & Beverage": "#bab0ab","Gambling & Casinos": "#1b9e77", "Gaming": "#d95f02",
  //"Healthcare": "#7570b3", "Logistics": "#e7298a", "Manufacturing": "#66a61e", "Media & Entertainment": "#e6ab02", "Medicine": "#a6761d", "Metals & Mining": "#666666", "Oil": "#8dd3c7", "Politics": "#bebada","Real Estate": "#fb8072","Retail": "#80b1d3", "Service": "#fdb462", "Sports": "#fccde5", "Technology": "#bc80bd","Telecom": "#ffed6f",};
  //const customColors = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f","#bab0ab", "#1b9e77","#d95f02", "#7570b3", "#e7298a","#66a61e", "#e6ab02", "#a6761d",  "#666666",  "#8dd3c7", "#bebada", "#fb8072", "#80b1d3", "#fdb462",  "#fccde5",  "#bc80bd","#ffed6f"];
  //const colorScale = d3.scaleOrdinal().domain(industries).range(customColors);

  Object.entries(dataForLine).forEach(([industry, data]) => {
    if (industry != "") {
      //console.log(`path[data-industry="${industry}"]`);
      group.selectAll(`path[data-industry="${industry}"]`)
        .data([data])
        .join(
          function (enter) {
            return enter.append('path')
            .attr('class', 'line-path')
            .attr('data-industry', industry)
            .style('stroke', colorScale(industry))
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator); 
          },
          function (update) {
            return update.attr('class', 'line-path')
            .attr('data-industry', industry)
            .style('stroke', colorScale(industry))
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator); 
          },
          function (exit) {
            return exit.remove();
          }
        );
        //console.log(data);
        //console.log(industry);
      group.selectAll(`circle.dot[data-industry="${industry}"]`)
        .data(data)
        .join(
          function (enter) {
            return enter.append('circle')
            .attr('class', 'dot')
            .attr('data-industry', industry)
            .attr('r', 3)
            .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.net_worth))
            .style('fill', colorScale(industry));
          },
          function (update) {
            return update.attr('class', 'dot')
            .attr('data-industry', industry)
            .attr('r', 3)
            .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.net_worth))
            .style('fill', colorScale(industry));
          },
          function (exit) {
            return exit.remove();
          }
        );
      }
  });
  const deemphasizedOpacity = 0.2;
  //console.log(deemphasizedOpacity);
  const emphasizedOpacity = 1;
  const normalLineWidth = '2px';
  const lines = group.selectAll('.line-path');
  const dots = group.selectAll('.dot');
  const legendItems = g2.selectAll('.legend-item');
  lines.on('mouseover', function (event, d) {
    const currentIndustry = d3.select(this).attr('data-industry');
    lines.style('opacity', deemphasizedOpacity);
    dots.style('opacity', function () {
          return d3.select(this).attr('data-industry') === currentIndustry ? emphasizedOpacity : deemphasizedOpacity;
    });
    legendItems.style('opacity', function () {
      return d3.select(this).attr('data-industry') === currentIndustry ? emphasizedOpacity : deemphasizedOpacity;
    });
    d3.select(this).style('opacity', emphasizedOpacity);
    })
    .on('mouseout', function () {
      lines.style('opacity', emphasizedOpacity)
          .style('stroke-width', normalLineWidth);
      dots.style('opacity', emphasizedOpacity);
      legendItems.style('opacity', emphasizedOpacity);
    });

  dots.on("mouseover", function(event,d) {
    const currentIndustry = d3.select(this).attr('data-industry');
    console.log(this);
    d3.select(this).transition().duration('100').style("r", "5");
    div2.transition().duration(100).style("opacity", 1);
    div2.html(d3.format(".2f")(d.net_worth))
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 18) + "px")
        .style("background", colorScale(currentIndustry));
    lines.style('opacity', function () {
        return d3.select(this).attr('data-industry') === currentIndustry ? emphasizedOpacity : deemphasizedOpacity;
    });
    dots.style('opacity', function () {
        return d3.select(this).attr('data-industry') === currentIndustry ? emphasizedOpacity : deemphasizedOpacity;
    });
    legendItems.style('opacity', function () {
        return d3.select(this).attr('data-industry') === currentIndustry ? emphasizedOpacity : deemphasizedOpacity;
    });
    })
    .on("mouseout", function(event,d){
      d3.select(event.currentTarget).transition().duration('100').style("r", "3");
      div2.transition().duration('200').style("opacity", 0);
      lines.style('opacity', emphasizedOpacity);
      dots.style('opacity', emphasizedOpacity);
      legendItems.style('opacity', emphasizedOpacity);
    });
}

// V3
function v3dataUpdate(data,x3Scale,y3Scale, colorScale3) {
  groupedByContinentAndIndustry = new Map();
  groupedByContinentAndIndustry = updateHeatmapData(data,groupedByContinentAndIndustry,countryToContinent);
  updateVisualization3(groupedByContinentAndIndustry,g3,x3Scale,y3Scale, colorScale3);
}

function updateHeatmapData(data,groupedByContinentAndIndustry,countryToContinent) {
  data.forEach(item => {
    let continent = countryToContinent[item.country_of_citizenship] || 'Other';
    let industry = item.business_category;
    if (!groupedByContinentAndIndustry.has(continent)) {
      groupedByContinentAndIndustry.set(continent, {});
    }
    let industryGroup = groupedByContinentAndIndustry.get(continent);
    if (!industryGroup[industry]) {
        industryGroup[industry] = [];
    }
    industryGroup[industry].push(item);
  });
  //console.log(groupedByContinentAndIndustry);
  return groupedByContinentAndIndustry;
}

function updateVisualization3(continentCategoryData,group,xScale,yScale,colorScale) {
  heatmapData = [];
  //console.log(continentCategoryData);
  continentCategoryData.forEach((infoIndustry, region) => {
    if (region != "Other") {
      for (let industry in infoIndustry) {
        var filteredAgeData = infoIndustry[industry].filter(d => d.age !== "" && !isNaN(Number(d.age)));
        filteredAgeData.sort((a, b) => a.age - b.age);
        var ages = filteredAgeData.map(d => Number(d.age));
        var min_age = d3.min(ages);
        var max_age = d3.max(ages);
        var median_age = d3.median(ages);
        var q1 = d3.quantile(ages, .25);
        var q3 = d3.quantile(ages, .75);
      heatmapData.push({region, industry, min_age, max_age,median_age,q1,q3});
    }
  }
});
  heatmapData = heatmapData.filter(item => item.industry !== "");
  //heatmapData.sort((a, b) => d3.ascending(a.industry, b.industry));
  heatmapData.sort((a, b) => d3.descending(a.industry, b.industry));
  console.log(heatmapData);
  heatmapData.sort((a, b) => {
    let regionIndexA = regionOrder.indexOf(a.region);
    let regionIndexB = regionOrder.indexOf(b.region);
    if (a.industries === b.industries) {
      return regionIndexA - regionIndexB;
    }
  });
  xScale.domain(regionOrder);
  console.log(heatmapData);

  //console.log(heatmapData);
  group.selectAll(".heatmap-rect")
    .data(heatmapData, d => d.region + d.industry)
    .join(
      function (enter) {
        //console.log(yScale.bandwidth());
        return enter.append("rect")
          .attr("x", d => xScale(d.region))
          .attr("y", d => yScale(d.industry))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("class", d => `heatmap-column ${d.region}`) 
          .attr("class", d => `heatmap-rect industry-${d.industry}`)
          .style("fill", d => colorScale(d.min_age));
      },
      function (update) {
        return update.attr("x", d => xScale(d.region))
            .attr("y", d => yScale(d.industry))
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            //.attr("class", d => `heatmap-column ${d.region}`) 
            //.attr("class", d => `heatmap-rect industry-${d.industry}`)
            .attr("class", d => `heatmap-column ${d.region} heatmap-rect industry-${d.industry}`)
            .style("fill", d => colorScale(d.min_age));
      },
      function (exit) {
        return exit.remove();
      }
    )
    .on("mouseover", function(event,d) {
      div3.transition().duration(100).style("opacity", 1);
      //console.log(d.min_age);
      var display_age;
      if (d.min_age != undefined) {
        display_age = d.min_age;
      }
      else {
        display_age = "unknown";
      }
      div3.html(regionToFullname[d.region] + "<br/>" + d.industry + "<br/>"+ "Min age: " + display_age)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 18) + "px")
      .style("background", "rgba(43,40,145,0.7)");
      if (display_age != "unknown"){
        ageBoxPlot(d,div3);
      }
    })
    .on("mouseout", function(event,d){ 
      div3.transition().duration('200').style("opacity", 0);
    });

  //var uniqueRegions = Array.from(new Set(Object.values(countryToContinent)));
  //console.log(uniqueRegions);

  var regionGroups = d3.groups(heatmapData, d => d.region);
  overlayGroup.selectAll(".region-overlay")
    .data(regionGroups)
    .join("rect")
    .attr("class", "region-overlay")
    .attr("y", -13)
    .attr("x", d => xScale(d[0]))
    .attr("width", xScale.bandwidth())
    .attr("height", (yScale.bandwidth() + 3) * 26 + 4)
    .style("fill", "none")
    .style("stroke", "rgb(165,38,52)")
    .style("stroke-width", "2px")
    .style("opacity", 0)
    .style("pointer-events", "none");
  overlayGroup.raise();
}

function highlightHeatmapRows(industry_checked,y3Scale,y3Axis) {
  console.log(heatmapData);
  var highlightedIndustries = new Set(industry_checked);
  heatmapData.sort((a, b) => {
      const aIsHighlighted = highlightedIndustries.has(a.industry);
      const bIsHighlighted = highlightedIndustries.has(b.industry);
      //return aIsHighlighted - bIsHighlighted || d3.ascending(a.industry, b.industry);
      return aIsHighlighted - bIsHighlighted || d3.descending(a.industry, b.industry);
  });

  //var newIndustryOrder = Array.from(new Set(heatmapData.map(d => d.industry)));
  var newIndustryOrder = industries.sort((a, b) => {
    const aIsHighlighted = highlightedIndustries.has(a);
    const bIsHighlighted = highlightedIndustries.has(b);
    //return aIsHighlighted - bIsHighlighted || d3.ascending(a, b);
    return aIsHighlighted - bIsHighlighted || d3.descending(a, b);
});
  console.log(newIndustryOrder);
  var unselectedHeight;
  if (industry_checked.length == 0) {
    unselectedHeight = 11;
  }
  else {
    unselectedHeight = 6;
  }

  y3Scale.domain(newIndustryOrder);
  y3Axis.selectAll("*").remove();
  console.log(1);
  y3Axis.call(d3.axisLeft(y3Scale).tickSize(0));

  /*
  g3.selectAll(".heatmap-rect")
      .data(heatmapData, d => d.region + d.industry)
      .attr("height", d => highlightedIndustries.has(d.industry) ? 11 : unselectedHeight)
      .attr("padding", "0.1px")
      .transition()
      .attr("y", function(d) {return y3Scale(d.industry)});
  */

  g3.selectAll(".heatmap-rect")
    .data(heatmapData, d => d.region + d.industry)
    .join(
      function(enter) {
        return enter.append("rect")
        //.attr("x", d => xScale(d.region))
        .attr("y", function(d) {console.log(y3Scale(d.industry)); return y3Scale(d.industry)})
        //.attr("width", xScale.bandwidth())
        .attr("height", d => highlightedIndustries.has(d.industry) ? 11 : unselectedHeight)
        .attr("class", d => `heatmap-column ${d.region}`) 
        .attr("class", d => `heatmap-rect industry-${d.industry}`)
        .style("fill", d => colorScale(d.min_age));
      },
      function(update){
        return update.attr("height", d => highlightedIndustries.has(d.industry) ? 11 : unselectedHeight)
        .attr("padding", "0.1px")
        .transition()
        .attr("y", function(d) {console.log(y3Scale(d.industry)); return y3Scale(d.industry)});
      },
      function(exit) {
        return exit.remove();
      }
    )
}

function maintainSelectedHeight(industry_checked) {
  //console.log(industry_checked);
  var unselectedHeight;
  var highlightedIndustries = new Set(industry_checked);
  if (industry_checked.length == 0) {
    unselectedHeight = 11;
  }
  else {
    unselectedHeight = 6;
  }
  g3.selectAll(".heatmap-rect")
    .data(heatmapData, d => d.region + d.industry)
    .attr("height", d => highlightedIndustries.has(d.industry) ? 11 : unselectedHeight);
}

function ageBoxPlot(boxData,tooltipElement){
  //console.log(boxData);
  const width = 100, height = 50;
  const xScale = d3.scaleLinear().domain([boxData.min_age, boxData.max_age]).range([0, width]);
  const boxsvg = tooltipElement.append("svg")
  .attr("width", width)
  .attr("height", height);

  boxsvg.append("rect")
    .attr("x", xScale(boxData.q1))
    .attr("y", height / 2 - 10)
    .attr("width", xScale(boxData.q3) - xScale(boxData.q1))
    .attr("height", 20)
    .attr("fill", "lightgrey");
  
  boxsvg.append("line")
    .attr("x1", xScale(boxData.median_age))
    .attr("x2", xScale(boxData.median_age))
    .attr("y1", height / 2 - 10)
    .attr("y2", height / 2 + 10)
    .attr("stroke", "darkgrey")
    .attr("stroke-width", 2);

  boxsvg.append("line")
    .attr("x1", xScale(boxData.min_age))
    .attr("x2", xScale(boxData.q1))
    .attr("y1", height / 2)
    .attr("y2", height / 2)
    .attr("stroke", "white");

  boxsvg.append("line")
    .attr("x1", xScale(boxData.q3))
    .attr("x2", xScale(boxData.max_age))
    .attr("y1", height / 2)
    .attr("y2", height / 2)
    .attr("stroke", "white");

  boxsvg.append("line")
    .attr("x1", xScale(boxData.min_age))
    .attr("x2", xScale(boxData.min_age))
    .attr("y1", height / 2 - 2.5)
    .attr("y2", height / 2 + 2.5)
    .attr("stroke", "white");

  boxsvg.append("line")
    .attr("x1", xScale(boxData.max_age))
    .attr("x2", xScale(boxData.max_age))
    .attr("y1", height / 2 - 2.5)
    .attr("y2", height / 2 + 2.5)
    .attr("stroke", "white");
  
  if (boxData.max_age == boxData.min_age) {
    boxsvg.append("text")
    .attr("x", xScale(boxData.median_age))
    .attr("y", height / 2 + 20)
    .text(boxData.median_age)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .style("fill", "white");
  }
  else {
    boxsvg.append("text")
    .attr("x", xScale(boxData.min_age))
    .attr("y", height / 2 - 10)
    .text(boxData.min_age)
    .attr("text-anchor", "start")
    .attr("font-size", "10px")
    .style("fill", "white");

    boxsvg.append("text")
    .attr("x", xScale(boxData.max_age))
    .attr("y", height / 2 - 10)
    .text(boxData.max_age)
    .attr("text-anchor", "end")
    .attr("font-size", "10px")
    .style("fill", "white");

    boxsvg.append("text")
    .attr("x", xScale(boxData.median_age))
    .attr("y", height / 2 + 20)
    .text(boxData.median_age)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .style("fill", "white");
  }
}

// V4
function updateVisualization4(data,group,xScale,yScale,colorScale4){
  //console.log(data);
  group.selectAll(".bar")
  .data(data)
  .join("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.full_name))
  .attr("width", xScale.bandwidth())
  .attr("y", d => yScale(d.net_worth))
  .attr("height", d => height4 - yScale(d.net_worth) - 103)
  .attr("fill", d => colorScale4(d.count))
  .on("mouseover", function(event,d) {
    div4.transition().duration(100).style("opacity", 1);
    div4.html(d.full_name + "<br/>" + d.country_of_citizenship + "<br/>" + "Average Net Worth: "+ d3.format(".2f")(d.net_worth) + "<br/>" +"Ranked Top 10 for: " + d.count + " years" + "<br/>")
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 18) + "px")
      .style("background", "rgba(43,40,145,0.7)");
  })
  .on("mouseout", function(event,d){ 
    div4.transition().duration('200').style("opacity", 0);
  });
/*
  var regionGroups = d3.groups(heatmapData, d => d.region);
  overlayGroup.selectAll(".region-overlay")
    .data(regionGroups)
    .join("rect")
    .attr("class", "region-overlay")
    .attr("y", -13)
    .attr("x", d => xScale(d[0]))
    .attr("width", xScale.bandwidth())
    .attr("height", (yScale.bandwidth() + 3) * 26 + 4)
    .style("fill", "none")
    .style("stroke", "rgb(165,38,52)")
    .style("stroke-width", "2px")
    .style("opacity", 0)
    .style("pointer-events", "none");
  overlayGroup.raise();
*/

}


function v4dataUpdata(data,top10networthData,y4max,y4Scale,y4Axis,x4Scale,x4Axis){
  top10networthData = updateFirst10(data);
  //console.log(top10networthData);
  names = [];
  names = Array.from(new Set(top10networthData.map(d => d.full_name)));
  y4max = d3.max(top10networthData, d => d.net_worth);
  x4Scale = d3.scaleBand()
    .range([0, width4])
    .domain(names)
    .padding(0.05);
  x4Axis.call(d3.axisBottom(x4Scale).tickSize(0));
  x4Axis.selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-90)");
  y4Scale = d3.scaleLinear()
    .range([height4*0.7, 0])
    .domain([0, y4max]);
  y4Axis.call(d3.axisLeft(y4Scale));
  updateVisualization4(top10networthData,g4,x4Scale,y4Scale,colorScale4);
}

function updateFirst10(data){
  var Top10EachYear = d3.groups(data, d => d.year)
    .map(([year, entries]) => {
      return entries.sort((a, b) => b.net_worth - a.net_worth).slice(0, 10);
    })
  .flat();
  //console.log(Top10EachYear);
  //console.log(Top10EachYear);
  var networthByName = Array.from(d3.rollup(Top10EachYear, 
    v => ({
      net_worth: d3.mean(v, d => d.net_worth),
      count: v.length,
      country_of_citizenship: v[0].country_of_citizenship
    }), 
    d => d.full_name
  ));
  var top10networth = networthByName.map(([full_name, values]) => ({
    full_name,
    net_worth: values.net_worth,
    count: values.count,
    country_of_citizenship: values.country_of_citizenship
    })
  );
  return top10networth;
}

function highlightBarsByCountry(hoveredCountry) {
  g4.selectAll(".bar")
    .style("stroke", d => d.country_of_citizenship === hoveredCountry ? "rgb(165,38,52)" : "none")
    .style("stroke-width", d => d.country_of_citizenship === hoveredCountry ? "2px" : "0");
}