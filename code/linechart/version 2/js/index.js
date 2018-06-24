// zoom with screen.width
//for mobile device but can't support HORIZON MODE
if(screen.width<768){
  var svgwidth=window.screen.availWidth*1.1+20;
  var svgheight=window.screen.availHeight*0.75;
  document.write("<style>html{zoom:"+(screen.width/1920)*4+";}</style>");
  document.write("<style>header > h1{ font-size:150% !important ;}</style>");
  // console.log("screen.width is "+screen.width +",zoom html "+parseInt((screen.width/1920)*100)*4+"%");
}
else if(screen.width<750){
  var svgwidth=window.screen.availWidth*0.7+20;
  var svgheight=window.screen.availHeight*0.75;
  document.write("<style>html{zoom:"+(screen.width/1920)*4+";}</style>");
  // console.log("screen.width is "+screen.width +",zoom html "+parseInt((screen.width/1920)*100)*4+"%");
}

//for desktop or tablet
else{
  var svgwidth=window.screen.availWidth*0.95+20;
  var svgheight=window.screen.availHeight*0.7;
  document.write("<style>header, .button{zoom:"+screen.width/1920*+";}</style>");
  console.log("screen.width is "+screen.width +",zoom button & header "+parseInt((screen.width/1920)*100)+"%");
}




// var svgwidth=window.screen.availWidth*0.95+20;
// var svgheight=window.screen.availHeight*0.7;
var endPos=15000;
var sections=3;




var maxFreqofSegs=Array(sections).fill(0);
function getRandomColor() {
  var letters = '0123456789ABCDE';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 15)];
  }
  return color;
}
// function getCharacterColor(){
//
//
// }



/*
var scaleX=d3.scale.linear()
.range([0,1600])
.domain([0,15000]);

var scaleY=d3.scale.linear()
.range([0,900])
.domain([0,15000]);*/

function scaleX(x){
  return parseFloat(x/endPos*(svgwidth-50)+50);
}
function scaleY(y,maxFreq){
  if(endPos>100000){
    return parseFloat((1-y/maxFreq)*(svgheight-50)+50);
  }
  else{
    return parseFloat((1-y/maxFreq)*(svgheight-50)+50);
  }
}
function scaleLineWidth(w){
  if(endPos>100000){
    return parseInt((Math.log(w)/5)+1);
  }
  else{
    if(w>30){
      return parseInt(w/6+1);
    }
    else{
      return parseFloat(w/4+1);//Math.log(w,1.5);
    }
  }
}
function scaleCircleR(r){
  if(endPos>100000){
    return parseInt((Math.log(r)/3)+1);
  }
  else{
    if(r>30){
      return parseFloat(r/6+1);
    }
    else{
      return parseFloat(r/4+1);//2*(Math.log(r)+1);
    }
  }
}
function randomMove(x){
  return parseFloat(x+Math.random()*0.5-0.25);
}
function calculateSections(x){
  var delta = endPos/ sections;
  // console.log(parseInt(x/delta+1));
  return parseInt(x/delta);
}

var line = d3.svg.line()
.x((d) => scaleX(d.x))
.y((d) => scaleY(d.y,d.mf))
.interpolate("step-after");
// .interpolate("monotone");

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
var ep=1;
var chap=1;
// console.log(data[0][0][0].endPosition);
function drawData(ep,chap){

  // console.log("when drawData,segment is "+sections);
  endPos=data[ep][chap][0].endPosition;
  var alltooltipData=[];
  var allLineDatas=[];//all person's line
  for(var i=0;i<sections;i++){
    maxFreqofSegs[i]=0;
  }
  //console.log(data[ep][chap][0].endPosition)
  //console.log(data[ep][chap][1]["character"].length)
  for(var ch=0;ch<data[ep][chap][1]["character"].length;ch++){
    var linedata=[];
    var posList=data[ep][chap][1]["character"][ch]["posList"];
    var freqOfSegs=Array(sections).fill(0);
    var freqOfAllSegs=0;
    var lineColor=getRandomColor();
    for(var i=0;i<posList.length;i++){
      let x=posList[i];
      freqOfSegs[calculateSections(x)]++;
      freqOfAllSegs++;
      // console.log(calculateSections(x)+"||"+freqOfSegs[calculateSections(x)]+"||"+maxFreqofSegs[calculateSections(x)]);
      if(freqOfSegs[calculateSections(x)]>maxFreqofSegs[calculateSections(x)]){
        maxFreqofSegs[calculateSections(x)]=freqOfSegs[calculateSections(x)];
      }
    }

    for(var i=0;i<sections;i++){
      var firstOccur=-1;
      for(var j=0;j<posList.length;j++){
        if(calculateSections(posList[j])==i){
          firstOccur=posList[j];
          break;
        }
      }
      let point={name:data[ep][chap][1]["character"][ch]["name"],
      x:firstOccur,
      y:freqOfSegs[i],
      mf:0,
      f:freqOfAllSegs,
      color:lineColor};

      if(firstOccur==-1){
        point.x=i*endPos/sections+1;
      }
      else{
        point.y=randomMove(point.y);
        alltooltipData.push(point);
      }
      linedata.push(point);
    }
    let point={
      name:linedata[linedata.length-1].name,
      x:endPos+100,
      y:linedata[linedata.length-1].y,
      f:linedata[linedata.length-1].f,
      color:linedata[linedata.length-1].color
    }
    linedata.push(point);
    allLineDatas.push(linedata);
  }

  for(var i=1;i<sections;i++){
    var sectionLine=[];
    let Point1={
      x:i*endPos/sections,
      y:1,
      mf:1
    };
    let Point2={x:i*endPos/sections,
      y:0,
      mf:1
    };
    sectionLine.push(Point1);
    sectionLine.push(Point2);
    d3.select('#chart')
    .append("path")
    .attr('stroke-width',2)
    .attr('d', line(sectionLine))
    .style("stroke","#00000070");
  }

  for(var i=0;i<allLineDatas.length;i++){
    for(var j=0;j<allLineDatas[i].length;j++){
      allLineDatas[i][j].mf=maxFreqofSegs[calculateSections(allLineDatas[i][j].x)]+1;
    }
    d3.select('#chart')
    .append("path")
    .attr('stroke-width',scaleLineWidth(allLineDatas[i][0].f ))
    .attr('d', line(allLineDatas[i]))
    .style("stroke",allLineDatas[i][0].color);
  }
  //console.log(alltooltipData.length);
  d3.select('#chart').selectAll("circle")
  .data(alltooltipData)
  .enter()
  .append("circle")
  .attr("cx",function(d){return scaleX(d.x);})
  .attr("cy",function(d){var maxFreq=maxFreqofSegs[calculateSections(d.x)]+1;
    return scaleY(d.y,maxFreq);
  })
  .attr("r",function(d){return scaleCircleR(Math.round(d.f));})
  .style("fill",function(d){return d.color;})
  .on("mouseover", mouseover)
  .on("mousemove", function (d) {
    divToolTip
    .html(d.name+ "<br>" +"出現頻率: "+Math.round(d.y))
    .style("left", (d3.event.pageX + 15) + "px")
    .style("top", (d3.event.pageY - 10) + "px");
  })
  .on("mouseout", mouseout);
}




$('.episode-select').on('click',function(){
  d3.selectAll('svg').remove();
  ep=$('.episode-select').index(this);
  // console.log(ep);
  $('#episode-select-show').text($(this).text());

  $('#chapter-select-show').text("chapter");
  $('#chapter-id').text("");

  var result=chapList[ep];

  $('#chapter-select').empty();
  for(i=0;i<result.length;i++){
    if(i==0){
      $('#chapter-select').append('<li><a href="#" class="chapter-select">'+result[i]+'</a></li>')
    }
    else{
      $('#chapter-select').append('<li><a href="#" class="chapter-select">'+'第' +parseInt(i).toString() +'章 '+result[i]+'</a></li>')
    }
  }
});
$('body').on('click','.chapter-select', function(){
  d3.selectAll('svg').remove();
  chap=$('.chapter-select').index(this);
  // console.log(chap);
  $('#chapter-select-show').text($(this).text());
  var s = d3.select('body').append('svg' );
  s.attr({
    'id':'chart',
    'width': svgwidth,
    'height': svgheight
  }).style({
    // 'border': '1px dotted #aaa'
    'border':'0px'
  });
  $("#SegCount").text(sections);
  drawData(ep,chap);

});

//add segment select bar
$("#segmentSelectBar").on("input", function(){
  d3.selectAll('svg').remove();
  // console.log("you change segment into "+$(this).val());
  sections=parseInt($(this).val());
  var s = d3.select('body').append('svg' );
  s.attr({
    'id':'chart',
    'width': svgwidth,
    'height': svgheight
  }).style({
    'border': '0px dotted #aaa'
  });
  $("#SegCount").text(sections);
  drawData(ep,chap);
});
