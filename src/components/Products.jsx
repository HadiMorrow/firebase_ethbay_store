import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TransactionContext } from '../context/TransactionContext'
import noProduct from '../images/no_product_01.png'
import { Loader } from './'


const TransactionCard = (props) => {
return(
  <div className="m-4 max-w-sm bg-white rounded-md hover:shadow-2xl shadow-md border-dotted border-2">
    <div className='flex flex-col items-center w-full mt-3'>
          <img className="h-60 p-8 rounded-t-lg" src={props.productImageURL} alt="product image"/>
    </div>

      <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-white"> {props.productName} </h5>
          <h5 className="text-base font-semibold tracking-tight text-gray-900 text-white"> {props.productDescription} </h5>
          
          <div className="flex justify-between items-center mt-5">
              <span className="text-2xl pr-4 font-bold text-gray-900 text-white">ETH: {props.productPrice} </span>
              <button disabled={props.hasPurchased} onClick={() => props.addToCart( props.productId, props.productName, props.productDescription, props.productPrice, props.productImageURL, props.sellerEmail, props.sellerAddress)} href="#" className= {props.hasPurchased? 'text-white bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"} >Add to cart</button>
          </div>
      </div>
  </div>
  
  )
}

const Products = () => {
  
  const {  Products, addToCart, getParams, isLoading } = useContext(TransactionContext)
  const params = useParams()
  const { name } = params

  useEffect(() => {

    getParams(name)
  }, [name])
  
  return (
    <div className='flex w-fill justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:p-12 py-12 px-4'>
        
          <h3 className='text-black text-3xl text-center my-2'> Latest Products </h3>
          
          {isLoading ? (
            <Loader/>
            ): 
            
            <div>
              
              <div className='flex flex-wrap justify-center items-center ' >
                { Products.length !== 0 ? Products.reverse().map((transaction, i) => (
                    <TransactionCard key={i} {...transaction} addToCart={addToCart} />
                  ))
                  :
                  <>
                    <img className="w-full mx-auto" src={noProduct} alt="No Product" />
                    <h1 className='text-2xl my-2'> No Product Found </h1>
                  </>
                }
              </div>
        
            </div>
          }
      </div>
    </div>
  )
}

export default Products