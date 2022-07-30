import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { adminAddress } from '../utils/constants'
import { TransactionContext } from '../context/TransactionContext'
import logo from '../images/download (1).jfif'
import cart from '../images/cart.png'

const NavBar = () => {
  
  const { Cart, currentAccount } = useContext(TransactionContext)

  return (

    <nav className=" mx-auto bg-white flex items-center justify-between py-4 px-6">
              
        <div>
          <Link to="/"> <img className='w-10' src={logo} alt="logo" /> </Link>           
        </div>

      <div>
          <ul className="flex items-center">
            {parseInt(currentAccount) == parseInt(adminAddress) &&
                <li className="ml-6 hover:text-orange-500">
                    <Link to='adminPage'> Admin </Link>
                </li>
            }


              <li className="ml-6 hover:text-orange-500"><Link to="addProduct"> Add Product </Link></li>

              <li className="ml-6 hover:text-orange-500"><Link to="sellerPage"> Seller Page </Link></li>

              <li className="ml-6 bg-orange-500 hover:bg-orange-400 rounded-full" ><Link to="viewCart" className="inline-block px-4 py-2 rounded-full flex items-center">
                  <span id='cartCounter' className="font-bold text-white pr-2"> {Cart.length} </span> 
                  <img src={cart} />
              </Link></li>

            </ul>
        </div>
    </nav>

  )
}

export default NavBar

// {!currentAccount && (

//   <div className="sm:col-start-7 sm:col-end-9 col-start-1 navBar">
//     <button className='px-4 sm:px-6 py-1.5 sm:py-2.5 ml-5 sm:mb-0 mb-2 sm:m-0 uppercase rounded bg-sky-600 hover:bg-sky-700 text-white font-medium \
//       text-md' type='button' onClick={connectWallet} > Connect Wallet </button>
//   </div>

// )}