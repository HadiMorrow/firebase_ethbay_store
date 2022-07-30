import React, { useEffect, useState } from "react"
import { send, init } from '@emailjs/browser';
import { ethers } from 'ethers'
import { contractABI, contractAddress, adminEmail } from '../utils/constants'

export const TransactionContext = React.createContext()

const { ethereum } = window;

const converToMiliSecond = (days) => {

    const miliseconds = days * 8.64e+7    ;
    return miliseconds;
}

const getEscrowContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract
}
 
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({name: '', description: '', category: '', price: '', email: ''})
    const [sellerForm, setSellerForm] = useState({name: '', description: '', price: '', hash: '', message: ''})
    const [buyerForm, setBuyerForm] = useState({sellerAddress: '', buyerAddress: '', sellerEmail: '', productName: '', productDescription: '', productPrice: '', hash: '', message: ''})
    const [Products, setProducts] = useState([])
    const [specificProduct, setSpecificProduct] = useState('')
    const [Cart, setCart] = useState([])
    const [sellerProduct, setSellerProduct] = useState([])
    const [imgURL, setImgURL] = useState('')    
    const [payed, setPayed] = useState(false)
    const [amount, setAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }))
    }

    const handleSellerForm = (e, name) => {
        setSellerForm((prevState) => ({...prevState, [name]: e.target.value }))
    }

    const handleBuyerForm = (e, name) => {
        setBuyerForm((prevState) => ({...prevState, [name]: e.target.value }))
    }


    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please download the MetaMash");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setCurrentAccount(accounts[0])

            console.log(`Account[0]: ${accounts[0]}`)

        } catch (err) {
            console.error(err)

            throw new Error("No ethereum Object Found")
        }
    }

    const handleAccountChange = (...args) => {
        const accounts = args[0] ;

        if (accounts.length === 0) {
          console.log("Please connect to metamask");
          
        } else if (accounts[0] !== currentAccount) {
          
            setCurrentAccount(accounts[0])
            window.location.reload()
        }
    };

    
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install the metamask")

            const accounts = await ethereum.request({ method: 'eth_accounts' })

            if(accounts.length){
                setCurrentAccount(accounts[0])
                getCart()
                getSellerProducts()
            }
            else{
                console.log('No account Found')
            }

        } catch (error) {
            console.error(error)

            throw new Error("No ethereum object.")
        }
    }

    const getParams = (paramName) => {
        setSpecificProduct(paramName)
    }

    const addProductToBlockChain = async () => {
        try {
            if(!ethereum) return alert("Please install the wallet like metamask or coinbase")

            if(imgURL !== ''){
                const { name, description, category, price, email } = formData

                setIsLoading(true)

                const escrowContract = getEscrowContract()
                const parsedPrice = ethers.utils.parseEther(price)

                const escrowDespoit = await escrowContract.addToBlockchain(name, description, category, parsedPrice, imgURL, email)
                console.log(`Loading - ${escrowDespoit.hash}`)

                await escrowDespoit.wait()
                
                console.log(`After Loading - ${escrowDespoit.hash}`)
                
                setIsLoading(false)

                alert("Successfully added to BlockChain")
            }

            setImgURL('')
            
        } catch (error) {

            setIsLoading(false)
            console.error(error)
            throw new Error("No ethereum object.")
        }
    }

    const getAllProducts = async () => {
        try{
            if(!ethereum) return alert("Please install the wallet like metamask or coinbase")
            setIsLoading(true)

            const escrowContract = getEscrowContract()
            const escrowCount = await escrowContract.getAllProdcuts()
            
            const structuredProducts = escrowCount.filter(pro => pro.productCategory == specificProduct).map((product) => ({
                sellerAddress: product.seller,
                productId: product.productId.toNumber(),
                productName: product.productName,
                productDescription: product.productDescription,
                productCategory: product.productCategory,
                productImageURL: product.productImageURL,
                productPrice: parseInt(product.price._hex ) / (10 ** 18),
                hasPurchased: product.hasPurchased,
                sellerEmail: product.sellerEmail,
                timestamps: new Date(product.timestamp.toNumber() * 1000 ).toLocaleString()
            }))
            
            setProducts(structuredProducts)
            setIsLoading(false)
            
        }catch(error){
            setIsLoading(false)
            console.error(error)
            throw new Error("No ethereum object.")
        }

    }

    const getSellerProducts = async () => {
        try{
            if(!ethereum) return alert("Please install the wallet like metamask or coinbase")

            const escrowContract = getEscrowContract()

            const sellerAddress = await escrowContract.getSenderAddress()

            const escrowCount = await escrowContract.getAllProdcuts()

            const structuredProducts = escrowCount.filter(pro => pro.seller == sellerAddress).map((product) => {
                    return {
                        productId: product.productId.toNumber(),
                        productName: product.productName,
                        productDescription: product.productDescription,
                        productImageURL: product.productImageURL,
                        productPrice: parseInt(product.price._hex ) / (10 ** 18),
                        hasPurchased: product.hasPurchased
                    }
            })
            setSellerProduct(structuredProducts)
            
        }catch(error){
            console.error(error)
            throw new Error("No ethereum object.")
        }

    }
    
    const addToCart = async (_id, _productName,  _productDescription, _price, _productImageURL, _sellerEmail, _sellerAddress) => {
        try {
            const escrowContract = getEscrowContract()
            const parsedPrice = ethers.utils.parseEther(_price.toString())
            const miliseconds = ( Date.now() + converToMiliSecond(20) )

            setIsLoading(true)

            const escrowDespoit = await escrowContract.addToCart(_id, _productName, _productDescription, parsedPrice, _productImageURL, _sellerEmail ,_sellerAddress, miliseconds, {value: parsedPrice._hex})
            
            console.log(`Loading - ${escrowDespoit.hash}`)
            
            await escrowDespoit.wait()
            
            console.log(`After Loading - ${escrowDespoit.hash}`);
            
            init('F69kg3OcHO9b9vyMq');

            await send("service_87tk057","template_rw1agg9",{
                from_name: "Buyer",
                to_name: " Product Seller",
                to_email: _sellerEmail,
                pId: _id,
                pName: _productName,
                pDescription: _productDescription,
                pPrice: _price,
                pImg: _productImageURL,
                cHash: escrowDespoit.hash
            });

            setIsLoading(false)

            alert("Successfully added to your Cart")

            window.location.reload()

        } catch (error) {
            setIsLoading(false)

            console.error(error)

            throw new Error("No ethereum object.")
        }

    }

    const getCart = async () => {
        try{
            if(!ethereum) return alert("Please install the wallet like metamask or coinbase")

            const escrowContract = getEscrowContract()

            const escrowCount = await escrowContract.reteriveCart()

            const userAddress = await escrowContract.getSenderAddress()

            const structuredProducts = escrowCount.filter(pro => pro.buyerAddress == userAddress).map((product) => {
                return {
                    productId: product.productId.toNumber(),
                    sellerAddress: product.sellerAddress,
                    sellerEmailAddress: product.sellerEmail,
                    buyerAddress: product.buyerAddress,
                    productName: product.productName,
                    productDescription: product.productDescription,
                    productImageURL: product.productImageURL,
                    productPrice: parseInt(product.price._hex ) / (10 ** 18),
                    timeToRevert: product.timeToRevert,
                    timestamps: new Date(product.timestamp.toNumber() * 1000 ).toLocaleString()
                }
            })
            
            setCart(structuredProducts)

        }catch(error){
            console.error(error)
            throw new Error("No ethereum object.")
        }
    }

    const confirmOrderToSeller = async (productId, sellerAddress, buyerAddress) => {
        try {
            if(!ethereum) return alert("Please install the metamask")

            setIsLoading(true)

            const escrowContract = getEscrowContract()
            
            const escrowDespoit = await escrowContract.transferToSeller(productId ,sellerAddress, buyerAddress)

            console.log(`Loading - ${escrowDespoit.hash}`)

            await escrowDespoit.wait()
            
            console.log(`After Loading - ${escrowDespoit.hash}`)
            
            setIsLoading(false)

            alert(`Successfully transferred to ${sellerAddress}`)
            window.location.reload();

        } catch (error) {
            setIsLoading(false)

            console.error(error) 
        }
    }

    const confirmOrderToBuyer = async (productId, sellerAddress, buyerAddress) => {
        try {
            if(!ethereum) return alert("Please install the metamask")

            setIsLoading(true)

            const escrowContract = getEscrowContract()
            
            const escrowDespoit = await escrowContract.transferToBuyer(productId, sellerAddress, buyerAddress)

            console.log(`Loading - ${escrowDespoit.hash}`)

            await escrowDespoit.wait()
            
            console.log(`After Loading - ${escrowDespoit.hash}`)
            
            setIsLoading(false)

            alert(`Successfully transferred to ${sellerAddress}`)

        } catch (error) {
            setIsLoading(false)

            console.error(error) 
        }
    }

    const checkPayment = async (addresses) => {
        try {
            
            if(!ethereum) return alert("Please install the metamask")
            
            setIsLoading(true)

            const escrowContract = getEscrowContract()

            const [amount, done] = await escrowContract.getDeposits(addresses.buyer, addresses.productId)
            
            console.log(`Amount ${parseInt(amount._hex ) / (10 ** 18)} done ${done}`)
            
            setPayed(done)
            setAmount(parseInt(amount._hex ) / (10 ** 18))
            
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)

            console.error(error) 
        }
    }

    const sendToAdminBySeller = async (e) => {

        const { name, description, price, hash, message } = sellerForm
        try{
            init('F69kg3OcHO9b9vyMq');

            await send("service_87tk057","template_urrxlyl",{
                to_email: adminEmail,
                pName: name,
                pDescription: description,
                pPrice: price,
                cHash : hash,
                sMessage : message
            });
            
            window.location.reload()
            
            alert("Successfully send to Admin")
        }catch(error){
            console.error(error)
        }
    }

    const sendToAdminByBuyer = async (e) => {

        const { sellerAddress, buyerAddress, sellerEmail, productName, productDescription, productPrice, hash, message } = buyerForm
        try{
            // init('F69kg3OcHO9b9vyMq');

            // await send("service_87tk057","template_urrxlyl",{
            //     to_email: adminEmail,
            //     sAddress: sellerAddress,
            //     buyerAddress: buyerAddress,
            //     sEmail: sellerEmail,
            //     pName: productName,
            //     pDescription: productDescription,
            //     pPrice: productPrice,
            //     cHash : hash,
            //     sMessage : message
            // });

            console.log(sellerAddress, buyerAddress, sellerEmail, productName, productDescription, productPrice, hash, message)

            // setSellerForm({name: '', description: '', price: '', hash: '', message: ''})
            // setSellerForm({})
            
            window.location.reload()
            
            alert("Successfully send to Admin")
        }catch(error){
            console.error(error)
        }
    }


    const requestForRevertOrder = async (sellerAddress, buyerAddress, productName, productDescription, productPrice, sellerEmail) => {
       
        setBuyerForm({sellerAddress, buyerAddress, sellerEmail, productName, productDescription, productPrice})
    }
    

    useEffect(() => {
      addProductToBlockChain()
    }, [imgURL])
    
    useEffect(() => {
        // getCart()
        checkIfWalletIsConnected()
    }, [])

    useEffect(() => {
        getAllProducts()

    }, [specificProduct])
    

    useEffect(() => {
        
        ethereum.on("accountsChanged", handleAccountChange);
        
        return () => {
          ethereum.removeListener("accountsChanged", handleAccountChange);
        };
    });


    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, handleChange, addProductToBlockChain, setImgURL, Products, addToCart, Cart, confirmOrderToSeller, confirmOrderToBuyer, checkPayment, payed, amount, sellerProduct, isLoading, handleSellerForm, sendToAdminBySeller, requestForRevertOrder, handleBuyerForm, sendToAdminByBuyer, getParams}}>
            {children}
        </TransactionContext.Provider>
    )
}