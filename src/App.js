import './App.css';
import { PrecinctsMap } from 'components/Map'
import { useFetch } from 'hooks/useDataApi'
import { allegations } from 'data/cleanedPctAllegations'

const url = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/police_precincts.geojson'

function App() {
  const [{ data }] = useFetch(url)

  return (
    <div className="App">
      <PrecinctsMap mapData={data} heatData={allegations}/>
    </div>
  );
}

export default App;
