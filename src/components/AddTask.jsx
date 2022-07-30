import React, { useContext, useState, useRef } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import {Buffer} from 'buffer';
import { create } from "ipfs-http-client";
import { Loader } from './'
import { categoryData } from '../utils/constants'


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        required
        onChange={(e) => handleChange(e, name)}
        className="block w-full px-3 py-1.5 border border-gray-300
        rounded-md focus:text-gray-700 focus:bg-white focus:border-blue-700 
        focus:outline-cyan-500"
    />
)

const client = create('https://ipfs.infura.io:5001/api/v0');

const AddTask = () => {

    const {  handleChange, setImgURL, isLoading } = useContext(TransactionContext)
    const [file, setFile] = useState(null);

    const handleFile = async (e) => {

        const data = e.target.files[0];
        const reader = new window.FileReader();
        
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(Buffer(reader.result));
        }

        e.preventDefault()
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const created = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${created.path}`;
            setImgURL(url)   

        } catch (error) {
            alert("Please fill all the text and choose a image")
        }

    }
    return (
        <div>
            <form>
                <div className="sm:container px-48 my-5 sm:mx-auto sm:mt-10">
                    <div className="border border-solid border-gray-300 rounded-md bg-white">
                        <div className="grid grid-cols-6 gap-6 m-6 sm:p-5">
                            
                            <div className='col-start-2 col-end-6 '>
                                <p className='p-2 rounded text-center bg-sky-500 text-white sm:text-xl font-bold'> Add Product </p>
                            </div>
                            
                            <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                                <label className='form-label text-gray-700 text-base font-medium'> Product Name </label>
                                
                                <Input placeholder="Name" name="name" type="text" handleChange={handleChange}/>
                            
                            </div>

                            <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                                <label className='form-label text-gray-700 text-base font-medium'> Product Description </label>
                                
                                <Input placeholder="Description" name="description" type="text" handleChange={handleChange} />
                            
                            </div>

                            <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                                <label className='form-label text-gray-700 text-base font-medium'> Product Category </label>
                                
                                <select name="category" id="category" placeholder='Please Select a Category' onChange={(e) => handleChange(e, "category")} className='block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-cyan-500'>
                                    {categoryData.map((transaction, i) => (
                                        <option key={i} value={transaction.name}> {transaction.name} </option>
                                    ))}
                                </select>                            
                            </div>

                            <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                                <label className='form-label text-gray-700 text-base font-medium'> Seller E-mail Address </label>
                                
                                <Input placeholder="Seller Email Address" name="email" type="email" handleChange={handleChange} />
                            
                            </div>

                            <div className="col-span-6 sm:col-start-2 sm:col-end-6 ">
                                <label className='form-label text-gray-700 text-base font-medium'> Product Price </label>
                                
                                <Input placeholder="Price" name="price" type="number" handleChange={handleChange} />

                            </div>


                            <input type="file" className="col-span-6 sm:col-start-2 sm:col-end-6
                                block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                                onChange={handleFile} required
                            />
                        </div>
                        
                        <div className='flex justify-center mb-7'>
                           
                            {isLoading ? (
                                <Loader/>
                                ): (
                                
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
                                    leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
                                    active:shadow-lg transition duration-150 ease-in-out" onClick={handleSubmit} >
                                    
                                    Submit
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddTask