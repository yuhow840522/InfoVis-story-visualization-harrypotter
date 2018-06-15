var Data = [
               {
                   "name": "INFOSYS",
                   "WeeklyData": [
                       { "week": "06 Apr 2015", "value": 1120 },
                       { "week": "13 Apr 2015", "value": 1240 },
                       { "week": "20 Apr 2015", "value": 1400 },
                       { "week": "27 Apr 2015", "value": 1500 }
                   ]
               },
               {
                   "name": "GOOGLE",
                   "WeeklyData": [
                       { "week": "06 Apr 2015", "value": 1220 },
                       { "week": "13 Apr 2015", "value": 1500 },
                       { "week": "20 Apr 2015", "value": 1610 },
                       { "week": "27 Apr 2015", "value": 1700 }
                   ]
               },
               {
                   "name": "HCL",
                   "WeeklyData": [
                       { "week": "06 Apr 2015", "value": 1020 },
                       { "week": "13 Apr 2015", "value": 1350 },
                       { "week": "20 Apr 2015", "value": 1160 },
                       { "week": "27 Apr 2015", "value": 1300 }
                   ]
               },
               {
                   "name": "TCS",
                   "WeeklyData": [
                       { "week": "06 Apr 2015", "value": 1320 },
                       { "week": "13 Apr 2015", "value": 1280 },
                       { "week": "20 Apr 2015", "value": 1530 },
                       { "week": "27 Apr 2015", "value": 1600 }
                   ]
               },
               {
                   "name": "MICROSOFT",
                   "WeeklyData": [
                       { "week": "06 Apr 2015", "value": 1600 },
                       { "week": "13 Apr 2015", "value": 1450 },
                       { "week": "20 Apr 2015", "value": 1640 },
                       { "week": "27 Apr 2015", "value": 1750 }
                   ]
               }
           ];

       function fnDrawMultiLineChart(Data, DivID, RevenueName) {
           var margin = { top: 20, right: 80, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

           var parseDate = d3.time.format("%d-%b");

           var x = d3.scale.ordinal()
                   .rangeRoundBands([0, width]);

           var y = d3.scale.linear()
                   .range([height, 0]);

           var color = d3.scale.category10();

           var xAxis = d3.svg.axis()
               .scale(x)
               .orient("bottom");

           var yAxis = d3.svg.axis()
               .scale(y)
               .orient("left")
               .ticks(10);

           // xData gives an array of distinct 'Weeks' for which trends chart is going to be made.
           var xData = Data[0].WeeklyData.map(function (d) { return parseDate(new Date(d.week)); });
           //console.log(xData);

           var line = d3.svg.line()
               .interpolate("basis") //change to curve line 

               .x(function (d) { return x(parseDate(new Date(d.week))) + x.rangeBand() / 2; })
               .y(function (d) { return y(d.value); });

           var svg = d3.select("#" + DivID).append("svg")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

           color.domain(Data.map(function (d) { return d.name; }));

           x.domain(xData);

           var valueMax = d3.max(Data, function (r) { return d3.max(r.WeeklyData, function (d) { return d.value; }) });
           var valueMin = d3.min(Data, function (r) { return d3.min(r.WeeklyData, function (d) { return d.value; }) });
           y.domain([valueMin, valueMax]);

           //Drawing X Axis
           svg.append("g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0," + height + ")")
                   .call(xAxis);

           // Drawing Horizontal grid lines.
           svg.append("g")
               .attr("class", "GridX")
             .selectAll("line.grid").data(y.ticks()).enter()
               .append("line")
               .attr(
               {
                   "class": "grid",
                   "x1": x(xData[0]),
                   "x2": x(xData[xData.length - 1]) + x.rangeBand() / 2,
                   "y1": function (d) { return y(d); },
                   "y2": function (d) { return y(d); }
               });
           // Drawing Y Axis
           svg.append("g")
               .attr("class", "y axis")
               .call(yAxis)
               .append("text")
                   .attr("transform", "rotate(-90)")
                   .attr("y", 6)
                   .attr("dy", ".71em")
                   .style("text-anchor", "end")
                   .text(RevenueName);

           // Drawing Lines for each segments
           var segment = svg.selectAll(".segment")
                           .data(Data)
                           .enter().append("g")
                           .attr("class", "segment");

           segment.append("path")
                   .attr("class", "line")
                   .attr("id", function (d) { return d.name; })
                   .attr("visible",1)
                   .attr("d", function (d) { return line(d.WeeklyData); })
                   .style("stroke", function (d) { return color(d.name); });
                       // Creating Dots on line
           segment.selectAll("dot")
                   .data(function (d) { return d.WeeklyData; })
                   .enter().append("circle")
                   .attr("r", 5)
                   .attr("cx", function (d) { return x(parseDate(new Date(d.week))) + x.rangeBand() / 2; })
                   .attr("cy", function (d) { return y(d.value); })
                   .style("stroke", "white")
                   .style("fill", function (d) { return color(this.parentNode.__data__.name); })
                   .on("mouseover", mouseover)
                   .on("mousemove", function (d) {
                       divToolTip
                       .text(this.parentNode.__data__.name +" : "+ d.value)
                       .style("left", (d3.event.pageX + 15) + "px")
                       .style("top", (d3.event.pageY - 10) + "px");
                   })
                   .on("mouseout", mouseout);

           segment.append("text")
                   .datum(function (d) { return { name: d.name, RevData: d.WeeklyData[d.WeeklyData.length - 1] }; })
                   .attr("transform", function (d) {
                       var xpos = x(parseDate(new Date(d.RevData.week))) + x.rangeBand() / 2;
                       return "translate(" + xpos + "," + y(d.RevData.value) + ")";
                   })
                   .attr("x", 3)
                   .attr("dy", ".35em")
                   .attr("class", "segmentText")
                   .attr("Segid", function (d) { return d.name; })
                   .text(function (d) { return d.name; });

           d3.selectAll(".segmentText").on("click", function (d) {
               var tempId = d3.select(this).attr("Segid");
               var flgVisible = d3.select("#" + tempId).attr("visible");

               var newOpacity = flgVisible == 1 ? 0 : 1;
               flgVisible = flgVisible == 1 ? 0 : 1;

               // Hide or show the elements
               d3.select("#" + tempId).style("opacity", newOpacity)
                   .attr("visible", flgVisible);

           });
            // Adding Tooltip
           var divToolTip = d3.select("body").append("div")
                       .attr("class", "tooltip")
                       .style("opacity", 1e-6);

           function mouseover() {
               divToolTip.transition()
                   .duration(500)
                   .style("opacity", 1);
           }
           function mouseout() {
               divToolTip.transition()
                   .duration(500)
                   .style("opacity", 1e-6);
           }
       }
// Calling function
fnDrawMultiLineChart(Data, "divChartTrends", "Revenue Data");
