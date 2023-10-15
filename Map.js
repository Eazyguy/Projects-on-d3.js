
      //Initialize
      var mapWidth = 1000
      var mapHeight = 700
      var mapPadding = 70
      
      const map = d3.select('#map')
      
      const mapSvg = map.append('svg')
      .attr("width",mapWidth)
      .attr("height",mapHeight)
      .style("background","#7472705c")
      
      const path = d3.geoPath();
      
      const minColor = "#a4e8cb"
      const pivotColor = "#00d177"
      const maxColor = "#026d3f"
      
      // Title
      
      mapSvg.append("g")
            .append("text")
      .attr("transform","translate("+((mapWidth/2)-100)+",30)")
      .text("United States Educational Attainment")
              .attr("font-size",20)
        .attr("font-weight","bolder")
        
        // Subtitle
        
            mapSvg.append("g")
            .append("text")
      .attr("transform","translate("+((mapWidth/2)-200)+",50)")
      .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
              .attr("font-size",14)
        .attr("font-weight","bolder")
      
      //Load Datas
      
          function mapFunc(data){

            console.log(data)
          const topo = data[0]
          const edu = data[1]
          
          const min = d3.min(edu,d=>d.bachelorsOrHigher)
          const mean = d3.mean(edu,d=>d.bachelorsOrHigher)
          const max = d3.max(edu,d=>d.bachelorsOrHigher)
          
          // ColorScale
         
          const colorScale = d3.scaleLinear()
          .domain([min,mean,max])
          .range([minColor,pivotColor,maxColor])
          
          // Fetch Educational data
          
          let recentEdu = [edu[0]]
          
          const fetchEdu = (d,keyName)=>{
            
            if(recentEdu[0].fips != d.id){
              recentEdu=edu.filter((val)=>val.fips==d.id)
            }
            return recentEdu[0][keyName]
          }
          
          // Initialize tooltip
          
          let tootip = function (d){
            let currentCounty = edu.filter((val)=>val.fips==d.id)[0];
            
            let area_name = currentCounty.area_name
            let state = currentCounty.state
            let fips = d.id
            let eduLevel = currentCounty.bachelorsOrHigher
            return area_name +", "+state+"<br>"+eduLevel+"%"
          }
         
         // Legend
          
          const legendColorScale = d3.scaleLinear()
          .domain([min+7.4,mean,max-20])
          .range([minColor,pivotColor,maxColor])
          
          
          const x = d3.scaleLinear()
          .domain([min+7.4,max-20])
          .range([10,400])
          
          let eduData = edu.map((d)=>d.bachelorsOrHigher)
          let fin = eduData.filter((i)=>i<50 && i > 10)
          
          const legend = mapSvg.append("g")

          legend.append("g")
          .call(d3.axisBottom(x).tickFormat(d=>d + "%"))
          .attr("transform","translate(550,110)")
          
          legend.append("g")
          .selectAll("rect")
          .data(fin)
          .enter()
          .append("rect")
          .attr("x",(d,i)=>x(d))
          .attr("height",30)
          .attr("width",40)
          .attr("fill",d=>legendColorScale(d))
          .attr("transform","translate(550,79)")
          .attr("stroke","black")
          
          // Initialize tooltip
          
          var tooltipbox = map.append("div")
           .style("opacity",0)
           .style("border","solid")
           .style("border-width","2px")
           .style("border-radius","5px")
           .style("padding","10px")
           .style("color","#eeeeee")
           .style("box-shadow","4px 4px 3px grey")
           
           // Draw using counties
           
            mapSvg.append("g")
            .selectAll("path")
            .data(topojson.feature(topo,topo.objects.counties).features)
            .enter()
            .append("path")
          .attr("d",path)
          .attr("fill",d=>colorScale(
            fetchEdu(d,"bachelorsOrHigher")
            ))
            .style("opacity",1)
            .attr("transform","translate (50,80)")
            
            // Mouse Events
            
            .on("mouseover",function(event, d){
              d3.selectAll("path")
              .style("opacity",0.5)
     
      tooltipbox
     .style("opacity",0.8)
     d3.select(this)
    .style("stroke","black")
    .style("opacity",1)
})
.on("mousemove",function(event,d){
  tooltipbox
   .html(tootip(d))
   .style("left",(event.pageX+5)+'px')
   .style("top",(event.pageY)+'px')
   .style("position","absolute")
   .style("font-weight","bold")
   .style("background",colorScale(fetchEdu(d,"bachelorsOrHigher")))
   
 })
  .on("mouseleave",function(d){
    d3.selectAll("path")
    .style("opacity",1)
    
   tooltipbox
   .style("opacity",0)
   d3.select(this)
   .style("stroke","none")
   .style("opacity",1)
  })
  
  // Map out the States
            
            mapSvg.append("g")
            .selectAll("path")
            .data(topojson.feature(topo,topo.objects.states).features)
            .enter()
            .append("path")
            .attr("d",path)
            .attr("fill","none")
            .attr("stroke","#5f8e05")
            .attr("transform","translate (50,80)")
        }

