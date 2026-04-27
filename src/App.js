import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Scheduling from './Components/Scheduling/Scheduling'; 
import DataCitation from './Components/DataCitation/DataCitation'; 
import History from './Components/History/History';

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' element={<LoginRegister />} />
              <Route path='/home' element={<Home />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/DataCitation" element={<DataCitation />} />
              <Route path="/history" element={<History />} />
              {/* Añade más rutas según sea necesario para tu aplicación */}
          </Routes>
      </Router>
  );
}

export default App;
