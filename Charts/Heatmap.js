
        //Initialize
      var heatWidth = 1000
      var heatHeight = 500
      var heatPadding = 70
      
      const heat = d3.select('#heat')
      
      var heatSvg = heat.append('svg')
      .attr("width",heatWidth)
      .attr("height",heatHeight+heatPadding)
      .style("background","#7472705c")
   
   // Load data

       
       function heatFunc(data){
console.log(data)
// Parse months and year

        const parseMonth = d3.utcParse('%m')
        const forMattedMonth = d3.utcFormat('%B')
        
       const monthNames =()=>{
         const monthNames = [];
         for(let i = 1; i <= 12; i++){
           monthNames.push(forMattedMonth(parseMonth(i)))
         }
         return monthNames;
       }
      const months = monthNames()
      const monthlyData = data.monthlyVariance
      
      const xValue = (d)=>{
       const yearParse = d3.utcParse('%Y')
        return yearParse(d.year)
      }
      
    const yValue =(d)=>{
      const monthParse = forMattedMonth(parseMonth(d.month))
   return monthParse
    }
    
    // Scaling and Domain
    
    const x = d3.scaleUtc()
    .range([heatPadding,heatWidth-heatPadding])
    .domain(d3.extent(monthlyData,xValue))
     
     heatSvg.append("g")
 .attr("transform","translate(0, "+ (heatHeight-heatPadding) + ")")
  .call(d3.axisBottom(x))
     
     const y = d3.scaleBand()
     .range([heatHeight-heatPadding,heatPadding])
     .domain(months)
     
     heatSvg.append("g")
 .call(d3.axisLeft(y))
 .attr("transform","translate("+heatPadding+",0)")
 .append("text")
 .attr("y",80)
 .attr("x", heatWidth/2)
 
 // X axis title
 
 heatSvg.append("g")
  .append("text")
  .attr("transform",`translate(${heatWidth/2},${heatHeight-40})`)
  .text("Year")
  .style("font-weight","bold")
 
// Creating Color Scale

 const numYears = d3.max(monthlyData,(d)=>d.year)-d3.min(monthlyData,(d)=>d.year)
const colorScale = d3.scaleSequential()
.domain([d3.max(monthlyData,(d)=>d.variance),d3.min(monthlyData,(d)=>d.variance)])
.interpolator(d3.interpolateRdYlBu)

const colorValue = d => d.variance

//Initialize tooltip

var tooltip = heat.append("div")
.style("opacity",0)
//.style("background-color","steelblue")
 .style("border","solid")
 .style("border-heatWidth","2px")
 .style("border-radius","5px")
 .style("padding-left","10px")
 .style("width","150px")
 .style("color","black")
 .style("box-shadow","4px 4px 3px grey")

// Creating Heatmap

heatSvg.selectAll('rect')
.data(monthlyData)
.enter()
.append('rect')
.attr("height",y.bandwidth())
.attr('width',heatWidth/numYears)
.attr('x',d=>x(xValue(d)))
.attr('y',d=>y(yValue(d)))
.attr('fill',d=>colorScale(colorValue(d)))

// Mouse Events

  .on("mouseover",function(event, d){
      tooltip
     .style("opacity",0.8)
     d3.select(this)
    .style("stroke","black")
    .style("opacity",1)
})
.on("mousemove",function(event,d){
  tooltip
   .html("<p>"+yValue(d)+"," +d.year+"</p>"+"<p>"+"Temperature: "+(8.66+d.variance)+"°C"+"</p>"+"<p>"+"Variance: "+d.variance+"</p>")
   .style("left",(event.pageX+5)+'px')
   .style("top",(event.pageY)+'px')
   .style("position","absolute")
   .style("font-weight","bold")
   .style("background",colorScale(colorValue(d)))
 })
 .on("mouseleave",function(d){
   tooltip
   .style("opacity",0)
   d3.select(this)
   .style("stroke","none")
   .style("opacity",0.8)
 })
    
    // Creating Legend
    
    // Legend Axis
    const legend = d3.scaleLinear()
    .range([heatPadding,400])
    .domain([d3.min(monthlyData,d=>d.variance+8.66),d3.max(monthlyData,d=>d.variance+9.66)])
     
     heatSvg.append('g')
     .attr('transform','translate(0,530)')
     .call(d3.axisBottom(legend))
     
     // Legend
     
     heatSvg.append('g')
     .selectAll('rect')
     .data(monthlyData)
     .enter()
     .append('rect')
     .attr('height',30)
     .attr('width',25)
     .attr('x',d=>legend(d.variance+8.66))
     .attr('y',500)
     .attr('fill',d=>colorScale(colorValue(d)))
      }
      
      // Chart Title
      
      heatSvg.append("g")
      .append("text")
      .attr("x",(heatWidth/2)-30)
      .attr("y",30)
      .text("Global Monthly Temperature")
      .attr("font-weight","bolder")
      .attr("font-size",18)
      
      // Subtitle
     
     heatSvg.append("g")
      .append("text")
      .attr("x",heatWidth/2)
      .attr("y",45)
      .text("Base Temperature 8.66°C")
      .attr("font-weight","bolder")
      .attr("font-size",14)
      
      // Y axis Title
      
      heatSvg.append("g")
      .append("text")
      .attr("transform",`translate(30,${(heatHeight/2)+50})rotate(270)`)
      .text("Months")
      .attr("font-weight","bolder")
      .attr("font-size",18)
      
      // Legend Title
      
      heatSvg.append("g")
      .append("text")
      .attr("x",200)
      .attr("y",heatHeight-10)
      .text("Temperature")
      .attr("font-weight","bolder")
      .attr("font-size",16)