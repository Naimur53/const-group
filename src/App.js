import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Pages/Login/Login'
import PrivateRoute from './Components/Pages/PrivateRoute/PrivateRoute';
import Home from './Components/Pages/Home/Home';
import useFirebase from './hooks/useFirebase';
import TopBar from './Components/SmallComponents/TopBar/TopBar';
import SignUp from './Components/Pages/SignUp/SignUp';
import Help from './Components/Pages/Help/Help';
import Announcement from './Components/Pages/Announcement/Announcement';
import ShowOff from './Components/Pages/ShowOff/ShowOff';
import Discussion from './Components/Pages/Discussion/Discussion';
import Personal from './Components/Pages/Personal/Personal';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import AdminRoute from './Components/Pages/AdminRoute/AdminRoute';
function App() {
  const { handleSignOut } = useFirebase();

  return (
    <div className="App">
      <BrowserRouter>
        <TopBar></TopBar>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home></Home></PrivateRoute>}>
            <Route path='/' element={<PrivateRoute><Help></Help></PrivateRoute>}> </Route>
            <Route path='/help' element={<PrivateRoute><Help></Help></PrivateRoute>}></Route>
            <Route path='/showoff' element={<PrivateRoute><ShowOff></ShowOff></PrivateRoute>}> </Route>
            <Route path='/announcement' element={<PrivateRoute><Announcement></Announcement></PrivateRoute>}> </Route>
            <Route path='/discussion' element={<PrivateRoute><Discussion></Discussion></PrivateRoute>}> </Route>
            <Route path='/:email/*' element={<PrivateRoute><Personal></Personal></PrivateRoute>}> </Route>
          </Route>
          <Route path='/dashboard' element={<AdminRoute><Dashboard></Dashboard></AdminRoute>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
