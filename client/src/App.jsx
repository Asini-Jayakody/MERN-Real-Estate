import  {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import Listing from './pages/CreateListing'
import GetListing from './pages/Listing'
import UpdateListing from './pages/UpdateListing'
import Search from './pages/Search'
import PrivateRoute from './components/privateRoute'

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/signin' element={<SignIn />}/>
    <Route path='/signup' element={<SignUp />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/search' element={<Search />}/>
    <Route path='/listing/:listingId' element={<GetListing />}/>
    <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/create-listing' element={<Listing />}/>
      <Route path='/update-listing/:id' element={< UpdateListing/>} />
    </Route>
    
  </Routes>
  </BrowserRouter>
}
