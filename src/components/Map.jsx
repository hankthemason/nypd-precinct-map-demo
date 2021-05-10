import React, { useEffect, useState  } from 'react'
import { useFetch } from 'hooks/useDataApi'
import * as d3 from 'd3'

const url = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/police_precincts.geojson'

export const Map = () => {

  const [{ data }] = useFetch(url)
 
  return null
}