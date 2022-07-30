import React, { useContext, useState, useRef } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const Input = ({ placeholder, name, type, value, handleSellerForm }) => (
    <input placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleSellerForm(e, name)}
        className="block w-full px-3 py-1.5 border border-gray-300
        rounded-md focus:text-gray-700 focus:bg-white focus:border-blue-700 
        focus:outline-cyan-500"
    />
)


const AddTask = () => {

    const {  handleSellerForm, sendToAdminBySeller } = useContext(TransactionContext)

    return (
        <div>
            <div className="sm:container px-48 my-5 sm:mx-auto sm:mt-10">
                <div className="border border-solid border-gray-300 rounded-md">
                    <div className="grid grid-cols-6 gap-6 m-6 sm:p-5">
                        
                        <div className='col-start-2 col-end-6 '>
                            <p className='p-2 rounded text-center bg-sky-500 text-white sm:text-xl font-bold'> Send Message To Admin </p>
                        </div>
                        
                        <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                            <label className='form-label text-gray-700 text-base font-medium'> Product Name </label>
                            
                            <Input placeholder="Name" name="name" type="text" handleSellerForm={handleSellerForm} />
                        
                        </div>

                        <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                            <label className='form-label text-gray-700 text-base font-medium'> Product Description </label>
                            
                            <Input placeholder="Description" name="description" type="text" handleSellerForm={handleSellerForm} />
                        
                        </div>

                        <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                            <label className='form-label text-gray-700 text-base font-medium'> Product Price </label>
                            
                            <Input placeholder="Price" name="price" type="number" handleSellerForm={handleSellerForm} />

                        </div>

                        <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                            <label className='form-label text-gray-700 text-base font-medium'> Transaction Hash </label>
                            
                            <Input placeholder="Transaction Hash" name="hash" type="text" handleSellerForm={handleSellerForm} />
                        
                        </div>

                        <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                            <label className='form-label text-gray-700 text-base font-medium'> Message </label>
                            
                            <Input placeholder="Your message to Admin" name="message" type="text" handleSellerForm={handleSellerForm} />
                        
                        </div>
                    </div>
                    
                    <div className='flex justify-center mb-7'>

                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
                            leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
                            active:shadow-lg transition duration-150 ease-in-out" onClick={() => sendToAdminBySeller()} >
                            
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask
