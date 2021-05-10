import './App.css';
import { Map } from 'components/Map'
import { useFetch } from 'hooks/useDataApi'

const url = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/police_precincts.geojson'

function App() {
  const [{ data }] = useFetch(url)
  
  return (
    <div className="App">
      <Map data={data}/>
    </div>
  );
}

export default App;
