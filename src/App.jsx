
import './App.css'
import CounterApp from './components/CounterApp'

import TodoApp from './components/TodoApp'
import CreateFunctionality from './components/ReactCrud/CreateFunctionality';
import UpdateFunctionality from './components/ReactCrud/UpdateFunctionality';
import DeleteFuctions from './components/ReactCrud/DeleteFuctions';

function App() {

  return (
    <>
   {/* <CounterApp/> */}
   {/* <TodoApp/> */}
  <CreateFunctionality/>
  <DeleteFuctions/>
<UpdateFunctionality/>

    </>
  )
}

export default App
