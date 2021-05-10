import React, { useEffect, useState, useRef  } from 'react'
import * as d3 from 'd3'

export const Map = (props) => {

  const { data } = props

  const svgRef = useRef();

  const renderMap = (mapData, path) => {
    d3.select(svgRef.current)
      .selectAll('path')
      .data(mapData.features)
      .join('path')
        .attr('id', d => `precinct-${d.properties['Precinct']}`)
        .attr('d', path)
        .attr('stroke', '#000000')
        .attr('stroke-width', '.2')
        .attr('fill', 'transparent')
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