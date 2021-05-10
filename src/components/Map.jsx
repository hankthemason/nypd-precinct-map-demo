import React, { useEffect, useState, useRef  } from 'react'
import * as d3 from 'd3'

export const PrecinctsMap = (props) => {

  let { mapData: data, heatData: allegations } = props
  //return an object where each key is the precinct number and the value is the number of allegations
  const allegationsByPrecinct = new Map(allegations.map(e => [e[0], e[1]]))

  //make a color scale to map precincts by # of allegations
  const maxAllegations = d3.max(allegationsByPrecinct.values())
  
  const scale = d3.scaleSequential([0, maxAllegations], d3.interpolateBlues)


  const svgRef = useRef();

  const tooltipMouseOver = (event, d) => {
    
    const numAllegations = allegationsByPrecinct.get(d.properties.Precinct)

    const rect = d3.select('#precincts-map').node().getBoundingClientRect()
		let tooltip = d3.select(".tooltip")
		
    //3. tooltip mouseover
		tooltip
		  .style("left", (event.pageX - rect.x) + "px")
  	  .style("top", (event.pageY - rect.y + 20) + "px")
		  .transition()
   	  .duration(100)
   	  .style("opacity", .9)
    
    tooltip.html("<strong> Precinct: " + d.properties.Precinct + "</strong>"
     								+ "<br>" + `allegations: ${numAllegations}`)
  }
  
  const renderMap = (mapData, path) => {

    //1. create the tooltip
    const tooltip = d3.select(svgRef.current)
			.append("div")
    	.attr("class", "tooltip")
    	.style("position", "absolute")
    	.style("opacity", 0)
    	.style("pointer-events", "none")
    	.style("border", "1px solid black")
    	.style("background", "white")
    
    d3.select(svgRef.current)
      .selectAll('path')
      .data(mapData.features)
      .join('path')
        .attr('precinct', d => `${d.properties['Precinct']}`)
        .attr('d', path)
        .attr('stroke', '#000000')
        .attr('stroke-width', '.2')
        .attr('fill', function(d) {
          const numAllegations = allegationsByPrecinct.get(d.properties['Precinct'])
          return scale(numAllegations)
        })
        //2. mouseon/mouseover
        .on("mouseover mousemove", tooltipMouseOver)
        .on("mouseout", function(event, d) {
          tooltip.transition()
           .duration(100)
            .style("opacity", 0);
        });
  }
  
  useEffect(() => {

    const height = svgRef.current.clientHeight
    const width = svgRef.current.clientWidth

    const projection = d3.geoAlbers().fitSize([height, width], data)
	  const pathGenerator = d3.geoPath().projection(projection) 
    
    if (data) {
      renderMap(data, pathGenerator)
    }
  }, [data])
 
  return (
    <svg id='precincts-map' ref={svgRef} width="500" height="500"/>
  )
}