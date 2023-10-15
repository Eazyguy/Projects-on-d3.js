    //Initialize
      var treeWidth = 1000
      var treeHeight = 700
      var treePadding = 100
      
      const tree = d3.select('#Tree')
      
   var TreeSvg =  tree.select("svg")
         .attr("width",treeWidth)
         .attr("height",treeHeight)
         .style("background","#7472705c")
         .style("margin-top",20)
         
         // load all data
           
           function treeFunc(data){
             //ready(data)
            const videoGameSales = data[0]
             const movies = data[1]
             const kickStarter = data[2]
             
             console.log(data)
             
             //input first data on update function
            
             update(videoGameSales)
             
             // Button Click Events
             
             d3.select("#video").on(
               "click", ()=>{update(data[0])
               }
               )
               d3.select("#movie").on(
               "click", ()=>update(data[1])
               )
               
               d3.select("#kick").on(
               "click", ()=>update(data[2])
               )
           }
           
           //Update Data
           
               function update(data){
             var root = d3.hierarchy(data,d=>d.children).sum((d)=>d.value)
             
                       d3.treemap()
          .size([treeWidth, treeHeight])
           (root)

          d3.select("#head")
         .style("width",treeWidth)
         .style("height",100)
         .style("text-align","center")
         .html(()=>{if(root.data.name==="Video Game Sales Data Top 100"){
           return `<h1>${root.data.name}</h1>
           <h3>Top 100 Most Sold Video Games Grouped by Platform</h2>`
         }else if(root.data.name==="Movies"){
           return  `<h1>${root.data.name.slice(0,-1)} Sales</h1>
           <h3>Top 100 Highest Grossing Movies Grouped By Genre</h2>`
         }else if(root.data.name==="Kickstarter"){
           return  `<h1>${root.data.name} Pledges</h1>
           <h3>Top 100 Most Pledged Kickstarter Campaigns Grouped By Category</h2>`
         }
         })
         .style("line-height",0.5)
         
         //Color Scale
          
          var color = d3.scaleOrdinal()
          .range([...d3.schemeCategory10,...d3.schemeDark2])
          
          // tooltip
          
         var tooltip = tree.select("#tooltip")
         .style("opacity",0)
         .style("border","solid")
         .style("border-width","2px")
         .style("border-radius","5px")
         .style("padding","10px")
         .style("color","black")
         .style("box-shadow","4px 4px 3px grey")
         .style("width","150px")

         console.log(tooltip)
          
          // Draw treemap
          
          const node = TreeSvg
          .selectAll("g")
          .data(root.leaves())
          
          node.join("rect")
          .attr("x",d=>d.x0)
          .attr("y",d=>d.y0)
          .attr("height",d=>(d.y1-d.y0))
           .attr("width",d=>(d.x1-d.x0))
           .style("stroke","black")
           .style("fill",d=>color(d.data.category))
           .on("mouseover",function(event, d){
         tooltip
         .style("opacity",0.8)
         d3.select(this)
         .style("stroke","#black")
         .style("stroke-width",5)
         })
.on("mousemove",function(event,d){
  tooltip
   .html(`Name: ${d.data.name}<br>
   Category: ${d.data.category} <br>
   Value: ${d.data.value}`)
   .style("left",(event.pageX+5)+'px')
   .style("top",(event.pageY)+'px')
   .style("position","absolute")
   .style("font-weight","bold")
   .style("background",color(d.data.category))
   .style("z-index",2)
 })
 .on("mouseleave",function(d){
   tooltip
   .style("opacity",0)
   d3.select(this)
   .style("stroke","black")
   .style("opacity",1)
   .style("stroke-width",1)
 })
 
 // Text on treemap
 
 node.join("text")
          .selectAll("tspan")
          .data(d=>{
            return d.data.name.split(/(?=[A-Z\s][^A-Z])/g).map(v=>{
              return {
                text:v,
                x0:d.x0,
                y0:d.y0
              }
            })
          })
          .join('tspan')
         . attr("x",d=>d.x0+5)
         .attr("y",(d,i)=>d.y0+10+(i*10))
         .text((d)=>d.text)
         .style("font-size",8)
         .style('cursor','pointer')
         
         // Legend
        
         let categories = root.leaves().map(i=>i.data.category)
         
         categories = categories.filter((category,index,item)=>item.indexOf(category)===index)
         
        const legendWidth = 700;
        const legendRow = 4;
        const columnWidth = legendWidth/legendRow
        const legendHeight = 15;
        const legendRectSize = 15;
        
       let legend = d3.select("#legend svg")
       .style("width",legendWidth)
       .style("margin-top",15)
       
       let legendItem = legend.attr("transform","translate(60,0)")
      legendItem.selectAll("rect")
       .data(categories)
       .join(enter=>enter.append("rect"),
       update=>update
       )
         .attr("width",legendRectSize)
         .attr("height",legendRectSize)
         .attr("fill",d=>color(d))
         .attr("transform",(d,i)=>`translate(${(i%legendRow)*columnWidth},${Math.floor(i/legendRow)*legendRectSize + (legendHeight*Math.floor(i/legendRow))})`)
         
         legendItem.select("g")
         .selectAll("text")
         .data(categories)
         .join("text")
         .attr("x",legendRectSize+3)
         .attr("y",legendRectSize-2)
         .text(d=>d)
         .attr("transform",(d,i)=>`translate(${(i%legendRow)*columnWidth},${Math.floor(i/legendRow)*legendRectSize + (legendHeight*Math.floor(i/legendRow))})`)
         
       }
