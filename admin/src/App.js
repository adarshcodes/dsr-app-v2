import {Routes, Route} from 'react-router-dom';
import Dashboard from './Log/Dashboard';


function App() {
  return (
    <Routes>
      <Route path='/Dashboard' element={<Dashboard/>} />
    </Routes>
  );
}

export default App;
