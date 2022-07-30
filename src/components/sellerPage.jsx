import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import {
    Link
  } from "react-router-dom";

const DataRow = ({productName, productDescription, productImageURL, productPrice, hasPurchased}) => {
    return (
        <tr className="bg-white border-b dark:border-gray-700 hover:bg-gray-50">
            <tr className='px-6 py-4'>
                <img src={`${productImageURL}`} alt={`${productName}`} className="h-24 w-18 m-4 "/>
            </tr>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                {`${productName}`}
            </th>
            <td className="px-6 py-4">
                {`${productDescription}`}
            </td>
            <td className="px-6 py-4">
                {`${productPrice}`}
            </td>
            <td className="px-6 py-4">
                {`${hasPurchased}`}
            </td>
        </tr>
    )
}

const SellerPage = () => {
  const { sellerProduct } = useContext(TransactionContext)
  
    return (
        <div className="sm:container px-5 my-5 sm:mx-auto sm:mt-10">
            <div className='flex justify-end mb-2'>

                <Link to="/sellerForm" type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm 
                    leading-tight uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg 
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
                    active:shadow-lg transition duration-150 ease-in-out" >
                    
                    Submit Form
                </Link>

            </div>
            <div className="border border-solid border-gray-300  rounded-md">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-md text-left text-black">
                        <thead className="text-sm text-white uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    In CarT?
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {sellerProduct.map((product, i) => (
                            <DataRow key={i} {...product} index={i} />

                        ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SellerPage