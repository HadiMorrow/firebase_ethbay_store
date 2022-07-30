import React, { useState ,useContext } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import { Loader } from '..'

const Input = ({ placeholder, name, id, type, value, handleChangeAddress }) => (
    <input placeholder={placeholder}
        type={type}
        value={value}
        id={id}
        onChange={(e) => handleChangeAddress(e, name)}
        className="border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block w-full p-2.5 "
    />
)

const InputTransfer = ({ placeholder, name, id, type, value, handleChangeTransfer }) => (
    <input placeholder={placeholder}
        type={type}
        value={value}
        id={id}
        onChange={(e) => handleChangeTransfer(e, name)}
        className="border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block w-full p-2.5"
    />
)

const Admin = () => {
    const [productInfo, setProductInfo] = useState({seller: '', productId: ''})
    const [transfer, setTransfer] = useState({seller: '', buyer: '', productId: ''})

    const {  checkPayment, payed, amount, confirmOrderToSeller, confirmOrderToBuyer, isLoading } = useContext(TransactionContext)

    const handleChangeAddress = (e, name) => {
        setProductInfo((prevState) => ({...prevState, [name]: e.target.value }))
    }

    const handleChangeTransfer = (e, name) => {
        setTransfer((prevState) => ({...prevState, [name]: e.target.value }))
    }


    const changeColor = () => {
        document.querySelector("#buyerAddress").classList.add(payed? 'border-green-400' : 'border-red-400')    
        document.querySelector("#sellerAddress").classList.add(payed? 'border-green-400' : 'border-red-400')
        document.querySelector("#containerDiv").classList.add(payed? 'border-green-400' : 'border-red-400')
    }

  return (
    
    <>
        <div className="sm:container px-48 my-5 sm:mx-auto sm:mt-10 ">
            <div id="containerDiv" className="border border-solid border-grey-300 shadow-lg rounded-md bg-white">
                <h3 className='mt-5 text-black text-3xl text-center my-2'> {payed? `Order Price: ${amount}` : ``} </h3>
                
                <div className="grid grid-cols-6 gap-6 m-6 sm:p-5">
                
                    <div className='col-start-2 col-end-6 '>
                        <label className=" block mb-2 text-sm font-medium text-gray-900 "> Buyer Address </label>
                        
                        <Input placeholder="Buyer Address" id="buyerAddress" name="buyer" type="text" handleChangeAddress={handleChangeAddress} />
                    
                    </div>
                    
                    <div className="col-start-2 col-end-6 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 "> Product ID </label>
                        
                        <Input placeholder="Product ID" id="productId" name="productId" type="text" handleChangeAddress={handleChangeAddress} />
                        
                    </div>

                    {isLoading ? (
                        <div className='col-start-3 col-end-5'>
                            <Loader/>
                        </div>
                        ):

                        <button type="submit" onClick={() => { checkPayment(productInfo) }} className="col-start-3 col-end-5 mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    }
                </div>
            </div>
        </div>

        <div className="sm:container px-48 my-5 sm:mx-auto sm:mt-10 ">
            <div id="containerDiv" className="border border-solid border-grey-300 shadow-lg rounded-md bg-white">
                <h3 className='mt-5 text-black text-3xl text-center my-2'> Transfer To Seller </h3>
                
                <div className="grid grid-cols-6 gap-6 m-6 sm:p-5">
                
                    <div className='col-start-2 col-end-6 '>
                        <label className=" block mb-2 text-sm font-medium text-gray-900"> Buyer Address </label>
                        
                        <InputTransfer placeholder="Buyer Address" id="buyerAddress" name="buyer" type="text" handleChangeTransfer={handleChangeTransfer} />
                    
                    </div>
                    
                    <div className="col-start-2 col-end-6 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900"> Seller Address </label>
                        
                        <InputTransfer placeholder="Seller Address" id="sellerAddress" name="seller" type="text" handleChangeTransfer={handleChangeTransfer} />
                    </div>

                    <div className="col-start-2 col-end-6 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900"> Product ID </label>
                        
                        <InputTransfer placeholder="Product ID" id="productId" name="productId" type="number" handleChangeTransfer={handleChangeTransfer} />
                        
                    </div>
                    
                    {isLoading ? (
                        <div className='col-start-3 col-end-5'>
                            <Loader/>
                        </div>
                        ): 
                        <button type="submit" onClick={() => { confirmOrderToSeller(transfer.productId, transfer.seller, transfer.buyer) }} className="col-start-3 col-end-5 mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    }
                </div>
            </div>
        </div>

        <div className="sm:container px-48 my-5 sm:mx-auto sm:mt-10 ">
            <div id="containerDiv" className="border border-solid border-grey-300 shadow-lg rounded-md bg-white">
                <h3 className='mt-5 text-black text-3xl text-center my-2'> Transfer To Buyer </h3>
                
                <div className="grid grid-cols-6 gap-6 m-6 sm:p-5">
                
                    <div className='col-start-2 col-end-6 '>
                        <label className=" block mb-2 text-sm font-medium text-gray-900"> Buyer Address </label>
                        
                        <InputTransfer placeholder="Buyer Address" id="buyerAddress" name="buyer" type="text" handleChangeTransfer={handleChangeTransfer} />
                    
                    </div>
                    
                    <div className="col-start-2 col-end-6 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900"> Seller Address </label>
                        
                        <InputTransfer placeholder="Seller Address" id="sellerAddress" name="seller" type="text" handleChangeTransfer={handleChangeTransfer} />
                    </div>

                    <div className="col-start-2 col-end-6 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900"> Product ID </label>
                        
                        <InputTransfer placeholder="Product ID" id="productId" name="productId" type="number" handleChangeTransfer={handleChangeTransfer} />
                        
                    </div>
                    
                    {isLoading ? (
                        <div className='col-start-3 col-end-5'>
                            <Loader/>
                        </div>
                        ): 
                        <button type="submit" onClick={() => { confirmOrderToBuyer(transfer.productId, transfer.seller, transfer.buyer) }} className="col-start-3 col-end-5 mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    }
                </div>
            </div>
        </div>
    </>

  )
}

export default Admin