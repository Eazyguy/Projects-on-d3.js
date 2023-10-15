    const scatterWidth = 700;
    const scatterHeight = 500;
    const scatterPadding = 50;
    
    const scatter = d3.select("#scatter")
    
    const svg = scatter.append("svg")
    .attr("width",scatterWidth)
    .attr("height",scatterHeight)
    .style("background","#7472705c")
    
  // Fetch data from API
  
    function scatterFunc(data){
      
      // Scale and Axis
    
      const min = data.map((i)=>i.Time)
      
      const timeformat = '%M:%S'
    const proTime =  min.map((d)=>d3.timeParse(timeformat)(d))
     
     const domain = d3.extent(proTime)
     
      const y = d3.scaleTime()
      .domain(domain)
      .range([scatterHeight-scatterPadding,scatterPadding])
     
     const format=d3.timeFormat(timeformat)
      
      svg.append("g")
      .call(d3.axisLeft(y).tickFormat(format))
      .attr("transform","translate("+scatterPadding+",0)")
   
   const years = data.map((i)=>i.Year)
   
   const yearformat = '%Y'
   
   const proYear = years.map((d)=>d3.timeParse(yearformat)(d))
   
   const yearDom = d3.extent(proYear)
   
   
   const x = d3.scaleTime()
   .domain(yearDom)
   .range([scatterPadding,scatterWidth-scatterPadding])
   
   svg.append("g")
   .call(d3.axisBottom(x))
   .attr("transform","translate(0,"+(scatterHeight-scatterPadding)+")")
   
 // Y axis title
 
   svg.append("g")
   .append("text")
   .attr("transform",`translate(13,${scatterHeight/2})rotate(270)`)
   .text("Time in Minutes")
   .style("font-weight","bold")
   
  // X axis title
  
   svg.append("g")
   .append("text")
   .attr("transform",`translate(${scatterWidth/2},${scatterHeight-10})`)
   .text("Year")
   .style("font-weight","bold")
   
   // Chart Title
   
   svg.append("g")
   .append("text")
   .text("Doping in Professional Bicycle Racing")
   .attr("transform",`translate(${(scatterWidth/4)+10},30)`)
   .style("font-weight","bolder")
   .style("font-size","18px")
   
// Initialize Tooltip

  var tooltip = scatter.append("div")
.style("opacity",0)
 .style("border","solid")
 .style("border-width","2px")
 .style("border-radius","5px")
 .style("padding-left","10px")
 .style('padding-top','10px')
 .style("width","200px")
 .style("color","#eeeeee")
 .style("box-shadow","4px 4px 3px grey")
 .style('font-size','12px')
 .style('line-height',1)
  
  
   svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy",(d)=>{
   const cy = d3.timeParse(timeformat)(d.Time)
      return y(cy)
    })
    .attr("cx",(d)=>{
      const cx = d3.timeParse(yearformat)(d.Year)
     return x(cx)
    })
    .attr("r",0)
    .attr("fill",(d)=>{
      if(d.Doping==""){
        return "#b85507"
      }else{
        return "blue"
      }
    })
    .attr("stroke","white")
    .on("mouseover",function(event, d){
      tooltip
     .style("opacity",0.8)
     d3.select(this)
    .style("stroke","black")
    .style("opacity",1)
})

// Tooltip Event

.on("mousemove",function(event,d){
  tooltip
   .html("<p>"+"Name: "+d.Name+"</p>"+"<p>"+"Time: "+d.Time+"</p>"+"Year: "+d.Year+"</p>"+"Nationality: "+d.Nationality+"</p>"+"<p>"+d.Doping+"</p>")
   .style("left",(event.pageX+5)+'px')
   .style("top",(event.pageY)+'px')
   .style("position","absolute")
   .style("font-weight","bold")
   .style("background",()=>
      {if(d.Doping==""){
        return "#b85507"
      }else{
        return "blue"
      }}
   )
 })
 .on("mouseleave",function(d){
   tooltip
   .style("opacity",0)
   d3.select(this)
   .style("stroke","white")
   .style("opacity",0.8)
 })
 
 // Animation
 svg.selectAll("circle")
 .transition()
 .duration(800)
  .attr("r",5)
    .delay((d,i)=>i*100)
    
    //legend
    
    svg.append("rect").attr("width",15).attr("height",15).attr("x",scatterWidth-30).attr("y",scatterHeight/2).attr("fill","#b85507")
        svg.append("rect").attr("width",15).attr("height",15).attr("x",scatterWidth-30).attr("y",(scatterHeight/2)+25).attr("fill","blue")
        svg.append("text").text("No doping Allegations").attr("x",(scatterWidth-165)).attr("y",(scatterHeight/2)+12).style("font-size","12px").style("font-weight","bold")
        svg.append("text").text("Riders with doping Allegations").attr("x",(scatterWidth-210)).attr("y",(scatterHeight/2)+37).style("font-size","12px").style("font-weight","bold")
    }
