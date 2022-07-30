import React, {useContext} from 'react'

import { TransactionContext } from '../context/TransactionContext'
import iNoteBook5 from '../images/iNoteBook5.gif'
import Category from './Category'

  
const MainPage = () => {
    const { connectWallet, currentAccount } = useContext(TransactionContext)

    return (
        <div>
            <div className='relative'>
                <div className="grid grid-cols-2 gap-2 absolute inset-0 flex items-center justify-center mt-10">
                    <div className="col-span-2 sm:col-span-1">
                        <div className='mx-10 sm:mx-20 space-y-4 mt-10 sm:mt-16'>
                        
                            <h2  className="text-2xl sm:text-4xl font-bold text-black " style={{'fontFamily': 'Trebuchet MS '}} 
                                >Welcome to Core_Volt - <span className='text-sky-600'>Ethereum</span> Web App</h2>

                            <p className=' text-xl font-semibold text-slate-600'>Here you can sell and purchase Items/products using Ethereum. Happing shopping and selling.</p>

                            {!currentAccount && (

                                <button className=' px-4 sm:px-20 py-1.5 sm:py-2.5 uppercase rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium
                                text-md' type='button' onClick={connectWallet} > Connect Wallet </button>

                            )}
                        </div>
                    </div>
                    
                    <div className="col-span-2 sm:col-start-2 flex justify-center mt ">
                        <img className='w-9/12 rounded' src={iNoteBook5} alt="iNoteBook" />
                    </div>

                    <div className='col-span-2 '>
                        <Category/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage