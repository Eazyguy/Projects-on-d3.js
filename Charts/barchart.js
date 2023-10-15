var barWidth = 800
var barHeight = 500
var padding = 60

const bar = d3.select("#bar")

var barSvg = bar.append("svg")
.attr("width",barWidth)
.attr("height",barHeight)
.style("background","#7472705c")


function barFunc(data){
  const dataset = data.data

  
const y = d3.scaleLinear()
.range([barHeight-padding,padding])
.domain([0,d3.max(dataset,(d)=>d[1])])

var dates = []
dataset.forEach((d)=>{
 dates.push( new Date(d[0]))
})

var domain = d3.extent(dates)


const x = d3.scaleTime()
.domain(domain)
.range([padding,barWidth-padding])

  
  barSvg.append("g")
 .attr("transform","translate(0, "+ (barHeight-padding) + ")")
  .call(d3.axisBottom(x))

 barSvg.append("g")
  .append("text")
  .attr("transform",`translate(20,${barHeight/2})rotate(270)`)
  .text("Value")
  .style("font-weight","bold")

 barSvg.append("g")
  .append("text")
  .attr("transform",`translate(${barWidth/2},${barHeight-20})`)
  .text("Year")
  .style("font-weight","bold")

  barSvg.append("g")
 .call(d3.axisLeft(y))
 .attr("transform","translate("+padding+",0)")
 .append("text")
 .attr("y",80)
 .attr("x", barWidth/2)


barSvg.append("g")
.append("text")
.attr("x", (barWidth/2))
.attr("y",padding-10)
.attr("text-anchor","middle")
.text(data.name.slice(0,-11))
.style("font-weight","bolder")
.style("font-size",18)

var tooltip = bar.append("div")
.style("opacity",0)
.style("background-color","steelblue")
 .style("border","solid")
 .style("border-width","2px")
 .style("border-radius","5px")
 .style("padding-left","10px")
 .style("width","120px")
  .style("color","#eeeeee")
 .style("box-shadow","4px 4px 3px grey")

 
 barSvg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("x",(d)=>{const date = new Date (d[0])
 return x(date)
  })
.attr("y",(d)=>y(0))
.attr("height",0)
.attr("width",1.8)
.style("fill","navy")
.attr("class","bar")
.on("mouseover",function(event, d){
      tooltip
     .style("opacity",0.8)
     d3.select(this)
    .style("stroke","black")
    .style("opacity",1)
})
.on("mousemove",function(event,d){
  tooltip
   .html("<p>"+"Value: "+d[1]+"</p>"+"<p>"+"Date: "+d[0]+"</p>")
   .style("left",(event.pageX+5)+'px')
   .style("top",(event.pageY)+'px')
   .style("position","absolute")
   .style("font-weight","bold")
 })
 .on("mouseleave",function(d){
   tooltip
   .style("opacity",0)
   d3.select(this)
   .style("stroke","none")
   .style("opacity",0.8)
 })
 
barSvg.selectAll("rect")
 .transition()
 .duration(800)
 .attr("y",(d)=>y(d[1]))
.attr("height",(d)=>barHeight-y(d[1])-padding)
.delay((d,i)=>i*5)

}
/*let specifier = '%M:%S'
document.write(d3.timeParse(specifier)("12:30"))*/