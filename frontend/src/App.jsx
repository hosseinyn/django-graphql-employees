import { BrowserRouter , Routes , Route } from 'react-router-dom';

import List from './pages/List';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add-employee' element={<Add />} />
        <Route path='/edit-employee/:employeeId' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
