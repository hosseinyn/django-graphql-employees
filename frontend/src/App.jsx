import { BrowserRouter , Routes , Route } from 'react-router-dom';

import List from './pages/List';
import Add from './pages/Add';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add-employee' element={<Add />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
