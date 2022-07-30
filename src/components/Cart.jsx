import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from '.'
import emptyCart from '../images/empty-cart.png'
import blackCart from '../images/cart-black.png'
import { Link } from "react-router-dom";

const ProductPurchased = (props) => {
    return (
        <div className=" flex items-center my-8">
        
            <img className="w-20" src={props.productImageURL} alt=""/>
        
            <div className="flex-1 ml-8">
                <h1 className="font-medium"> {props.productName} </h1>
            </div>

            <span className="flex-1 font-mono font-bold text-lg"> {props.productPrice} </span>
        
            <button className="flex-1 rounded-md p-2 text-center w-1/5 font-semibold text-mx text-white hover:bg-blue-400 bg-blue-600" onClick={ () => props.confirmOrderToSeller(props.productId, props.sellerAddress, props.buyerAddress)}> Confirm </button>
            { Date.now() > props.timeToRevert ?  
                <button className="flex-1 ml-4 rounded-md p-2 text-center w-1/5 font-semibold text-mx text-white hover:bg-red-400 bg-red-500" onClick={ () => props.requestForRevertOrder(props.sellerAddress, props.sellerEmailAddress, props.buyerAddress, props.productName)}> Revert  </button>
            : 
                <button disabled className="flex-1 ml-4 rounded-md p-2 text-center w-1/5 font-semibold text-mx text-white hover:bg-black bg-black"> Revert </button>
            }
        </div>
    );

};

const Cart = () => {
    const { Cart, confirmOrderToSeller, requestForRevertOrder, isLoading } = useContext(TransactionContext);
    
    return (
        <section className="cart py-16">
            {Cart.length !== 0 && 

                <div className="order container mx-auto xl:w-1/2">
                    <div className="flex items-center border-b border-gray-300 pb-4">
                        <img src={blackCart} alt=""/>
                        <h1 className="font-bold ml-4 text-2xl"> Order Summary </h1>
                    </div>

                    <div className="pizza-list bg-white p-5">
                        
                    {isLoading ? (
                        <Loader/>
                        ): 

                        <div>

                            {Cart.map((product, i) => (
                                <ProductPurchased key={i} {...product} index={i} confirmOrderToSeller={confirmOrderToSeller} requestForRevertOrder={requestForRevertOrder} />
                            
                            ))}
                        </div>
                     }

                    </div>
                    <hr/>
                </div>
            }

            {Cart.length == 0 && 

                <div className="empty-cart py-16">
                    <div className="container mx-auto text-center">
                        <h1 className="text-3xl font-bold mb-2"> Cart Empty </h1>
                        <p className="text-gray-500 text-lg mb-12"> You probably haven't ordered a pizza yet.
                            <br/> To order a pizza go to home page </p>
                        <img className="w-4/12 mx-auto" src={emptyCart} alt="empty-cart"/>
                        <Link to='/' className="inline-block px-6 py-2 text-white bg-orange-500 hover:bg-orange-400 rounded-full btn-primary font-bold mt-12" href=""> Go Back</Link>
                    </div>
                </div>
            }

        </section>
    );
};

export default Cart;