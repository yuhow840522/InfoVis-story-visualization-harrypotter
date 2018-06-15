var data = [
  { x: 0, y: 30 },
  { x: 50, y: 20 },
  { x: 100, y: 40 },
  { x: 150, y: 80 },
  { x: 200, y: 95 }
]

var line = d3.svg.line()
  .x((d)=> d.x)
  .y((d)=> 100 - d.y)
  .interpolate("basis")

d3.select('#chart')
  .append("path")
  .attr('stroke-width', 3)
  .attr('d', line(data))
