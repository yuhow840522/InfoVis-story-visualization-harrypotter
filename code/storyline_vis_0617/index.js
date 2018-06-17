function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var scaleX=d3.scale.linear()
                 .range([0,1600])
                 .domain([0,15000]);

var scaleY=d3.scale.linear()
                 .range([50,3000])
                 .domain([0,15000]);
function scaleCircleR(r){
    return 2*(Math.log(r)+1);
}
function moveX(x){
    return x+Math.random();
}
function calculateX(chap,x){
    var delta = data[chap][0].endPosition / 8
   // console.log(parseInt(x/delta+1));
    return parseInt(x/delta)+0.5;
}
var line = d3.svg.line()
  .x((d) => scaleX(d.x))
  .y((d) => scaleY(d.y))
  .interpolate("step-after")
//console.log(data[0][1]["character"][]);


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



function drawData(chap){
    var alltooltipData=[]
    //console.log(data[chap][0].endPosition)
   //console.log(data[chap][1]["character"].length)
    for(var ch=0;ch<data[chap][1]["character"].length;ch++){
        //console.log(ch)
        var linedata=[];
        var point;
        for(var i=0;i<data[chap][1]["character"][ch]["posList"].length;i++){
            let _x=calculateX(chap,data[chap][1]["character"][ch]["posList"][i])
            if(linedata.length>0){
                if(linedata[linedata.length-1].x==_x){
                    linedata[linedata.length-1].r++;
                }
                else{
                    point={x:_x ,
                            y:data[chap][1]["character"][ch]["posList"][i],
                            r:1,
                            name:data[chap][1]["character"][ch]["name"]};
                    linedata.push(point);
                }
            }
            else{
                point={x:_x , y:data[chap][1]["character"][ch]["posList"][i],r:1,
                            name:data[chap][1]["character"][ch]["name"]};
                linedata.push(point);
            }
        }
        for(var i=0;i<linedata.length;i++){
            linedata[i].x = linedata[i].y
            alltooltipData.push(linedata[i]);
        }

        
            
        d3.select('#chart')
            .append("path")
            .attr('stroke-width', 1)
            .attr('d', line(linedata))
            .style("stroke",getRandomColor());
        
        
    }
    d3.select('#chart').selectAll("circle")
            .data(alltooltipData)
            .enter()
            .append("circle")
            .attr("cx",function(d){return scaleX(d.x);})
            .attr("cy",function(d){return scaleY(d.y);})
            .attr("r",function(d){return scaleCircleR(d.r);})
            .style("fill","black")
            .on("mouseover", mouseover)
            .on("mousemove", function (d) {
                console.log(d.name)
                divToolTip
                    .text(d.name)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 10) + "px");
            })
            .on("mouseout", mouseout);
}
$('.chapter-select').on('click',function(){
    d3.selectAll('svg').remove();
    var s = d3.select('body').append('svg' );
    s.attr({
        'id':'chart',
        'width': '1600',
        'height': '3000'
      }).style({
        'border': '1px dotted #aaa'
      });
    drawData($(this).text()-1)
});



