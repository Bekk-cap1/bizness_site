import './App.scss';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import About from './pages/About/About';
import Product from './pages/Product/Product';
import { useEffect, useState } from 'react';
import NotFound from './pages/NotFound/NotFound';
import Catalog__product from './pages/Product/Catalog__product/Catalog__product';
import { listData } from './assets/data/data';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Korzinka from './pages/Korzinka/korzinka';
import { useDispatch, useSelector } from 'react-redux';
import { setNumber, setPage } from './features/app/appSlice';

function App() {
  const dispatch = useDispatch()

  const local = useLocation()
  const number = useSelector(state=> state.app.number)
  const page = useSelector(state => state.app.page)


  const {userId} = useParams()
  let navig = local.pathname.split('/products/').join('') 
  useEffect(()=>{
    dispatch(setNumber(navig))
  }, [navig])
  const alona = '/products/' + number


  dispatch(setPage(alona))

  const [count, setCount] = useState(0)
  useEffect(()=>{
    listData.map((e)=>{
      setCount(e.id)   
    })
  }, [])
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Product/>}>
          <Route path=':userId'></Route>
        </Route>
        <Route path={number <= count? alona : ''} element={<Catalog__product/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/korzinka' element={<Korzinka/>}/>
        <Route path='/signup' element={<SignUp/>}/> 
        <Route path='/signin' element={<SignIn/>}/> 
      </Routes>
      {local.pathname == '/signin' || local.pathname == '/signup' ? <Footer style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}/> : <Footer/>} 
    </div>
  );
}

export default App;
