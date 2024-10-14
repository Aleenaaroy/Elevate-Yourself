//frontend\src\App.tsx
import {Routes , Route} from 'react-router-dom';
import Home from './Pages/intro/Home';
import Profile from './Pages/user/Profile';
import UserFeed from './Pages/user/UserFeed';
import NotFound from './Pages/intro/NotFound';
import { Toaster } from 'react-hot-toast';
import Auth from './Pages/auth-pages/Auth';


function App() {


  return (
    <>
      <Routes>
        <Route index path='/' element={<Home/>} />
        <Route path='/login' element={<Auth isLogin={true}/>}/>
        <Route path='/register' element={<Auth isLogin={false}/>}/>
        <Route path='/feed' element={<UserFeed />} />
        <Route path='/account' element={<Profile/>} />
        <Route path='/account/:id' element={<Profile/>} />

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster position='top-right'/>
    </>
  )
}

export default App
