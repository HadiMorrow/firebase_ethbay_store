import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { NavBar, AddTask, Products, Admin, SellerPage, MainPage, SellerForm, BuyerForm } from './components/'
import { SignInWrapper } from './utils/SignInWrapper'

import { TransactionContext } from './context/TransactionContext'
import { adminAddress } from './utils/constants'
import Cart from "./components/Cart";

function App() {
  
  const { currentAccount } = useContext(TransactionContext)
  return (
    <div  style={{"background-color": "rgba(245,245,245)"}}>
      <BrowserRouter>
          <NavBar/>
          <Routes>
              <Route path="/" element={<MainPage />} />

              <Route
                path='/adminPage'
                element={<SignInWrapper currentAccount={parseInt(currentAccount)} adminAddress={parseInt(adminAddress)}>
                          <Admin />
                        </SignInWrapper>}
              />

              <Route path="/addProduct" element={<AddTask />} />
              {/* <Route path="/viewProduct" element={<Products />} /> */}
              <Route path="/viewProduct/:name" element={<Products />} />
              <Route path="/viewCart" element={<Cart />} />              
              {/* <Route path="/adminPage" element={<Admin /> } /> */}
              <Route path="/sellerPage" element={<SellerPage /> } />
              <Route path="/sellerForm" element={<SellerForm />} />              
              <Route path="/buyerForm" element={<BuyerForm />} />              
              
          </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
