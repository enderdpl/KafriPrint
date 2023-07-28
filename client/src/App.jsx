// Para esto usamos vite lo instalamos con npm i vite y genera el local host de esta vista from para asi trabajar con api ademas de generar toda la estructura de client
import { BrowserRouter,Routes,Route } from "react-router-dom"; 
import { AuthProvider } from "./context/authContex";
import PageRigis from "./pages/pageRegis";

import PageLog from "./pages/PageLog";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute  from "./ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";


function App() { 
  return(
    <AuthProvider>
      <TaskProvider>
        
        <BrowserRouter>
        
        <main className=" container mx-auto px-10 ">
        <Navbar />
          <Routes>
        
            <Route path='/' element={< HomePage />} />

            <Route path='/login' element={<PageLog />} />

            <Route path='/register' element={<PageRigis />} />



            <Route element={ < ProtectedRoute />}>
            <Route path='/tasks' element={<TaskPage /> }/> 
 
            <Route path='/add/task' element={<TaskFormPage /> }/>

            <Route path='/task/:id' element={<TaskFormPage /> }/>
              
            <Route path='/profile' element={<ProfilePage />} />
                
          </Route>
            
        </Routes>
    
        </main>
          
      </BrowserRouter>
    </TaskProvider>

    </AuthProvider>
  )
}
export default App