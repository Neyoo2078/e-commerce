import './App.css';
import './Iphone.css';
import { useSelector } from 'react-redux';
import { createContext } from 'react';
import Home from './Pages/Home';
import ProductDeatils from './Pages/ProductDeatils';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components';
import Carts from './Pages/Carts';
import Signin from './Pages/Signin';
import Shipping from './Pages/Shipping';
import Payment from './Pages/Payment';
import PlaceOrder from './Pages/PlaceOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompleteOrder from './Pages/CompleteOrder';
import OrderList from './Pages/OrderList';
import { useState } from 'react';
import UserProfile from './Pages/UserProfile';
import Search from './Pages/Search';
import Footer from './Components/Footer';
import { useLocation } from 'react-router-dom';
import DashBoard from './Pages/DashBoard';

function App() {
  const { User } = useSelector((state) => state.Auth);

  const location = useLocation();
  console.log('niyi');
  const niyi = process.env.REACT_APP_MY_TEST;
  console.log({ niyi });
  console.log({ User });
  const [data, setdata] = useState([]);

  return (
    <>
      <div className="h-screen  overflow-scroll scroll-m-2 w-full">
        <div className="h-full  w-full flex flex-col">
          <ToastContainer position="bottom-center" limit={1} />
          <Header setdata={setdata} data={data} />
          <Routes>
            <Route path="/" element={<Home data={data} setdata={setdata} />} />
            <Route path="/productDetails/:id" element={<ProductDeatils />} />
            <Route path="/cart" element={<Carts />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Shipping" element={<Shipping />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Order" element={<PlaceOrder />} />
            <Route path="/CompleteOrder/:id" element={<CompleteOrder />} />
            <Route path="/OrderHistory" element={<OrderList />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/DashBoard" element={<DashBoard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
