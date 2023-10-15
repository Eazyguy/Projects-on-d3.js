Promise.all([
    d3.json('Data/d3json.json'),
    d3.json('Data/Heatjson.json'),
    d3.json('Data/geojson.json'),
    d3.json('Data/mapdata.json'),
    d3.json('Data/scatterjson.json'),
    d3.json('Data/videoGameSales.json'),
    d3.json('Data/Movies.json'),
    d3.json('Data/kickStarter.json')
]).then((data)=>{
    const barData = data[0]
    const heatData = data[1]
    const mapData = [data[2],data[3]]
    const scatterData = data[4]
    const treeData = [data[5],data[6],data[7]]


  var barChart =  document.getElementById('bar')
  var heatChart =  document.getElementById('heat')
  var mapChart =  document.getElementById('map')
  var scatterChart = document.getElementById('scatter')
  var treeChart = document.getElementById('treeCon')
  const loadBar = document.getElementById('loadBar')
  const loadScatter = document.getElementById('loadScatter')
  const loadHeat = document.getElementById('loadHeat')
  const loadMap = document.getElementById('loadMap')
  const loadTree = document.getElementById('loadTree')

  barFunc(barData)

  loadBar.addEventListener('click',()=>{
    barFunc(barData)
    barChart.style.display='block'
    scatterChart.style.display='none'
    heatChart.style.display='none'
    mapChart.style.display='none'
    treeChart.style.display='none'
  })

  loadScatter.addEventListener('click',()=>{
    scatterFunc(scatterData)
    scatterChart.style.display='block'
    barChart.style.display='none'
    heatChart.style.display='none'
    mapChart.style.display='none'
    treeChart.style.display='none'
  })

  loadHeat.addEventListener('click',()=>{
    heatFunc(heatData)
    heatChart.style.display='block'
    barChart.style.display='none'
    scatterChart.style.display='none'
    mapChart.style.display='none'
    treeChart.style.display='none'
  })

  loadMap.addEventListener('click',()=>{
    mapFunc(mapData)
    mapChart.style.display='block'
    barChart.style.display='none'
    scatterChart.style.display='none'
    heatChart.style.display='none'
    treeChart.style.display='none'
  })

  loadTree.addEventListener('click',()=>{
    treeFunc(treeData)
    treeChart.style.display='block'
    barChart.style.display='none'
    scatterChart.style.display='none'
    heatChart.style.display='none'
    mapChart.style.display='none'
  })

})