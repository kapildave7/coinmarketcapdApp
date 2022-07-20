import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Wallet = () => {
  // const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [defaulAmount, setDefaulAmount] = useState(null);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    // console.log('inside use')
    // setConnect(localStorage.getItem("metamask"));
    if (window.ethereum.isConnected()) {
      setConnect(true);
      connectWalletHandler();
    }
  }, []);

  //connect wallet to metamask
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
      localStorage.setItem("metamask", "login");
    } else {
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount[0]);
    getbalance(newAccount);
  };

  // update account, will cause chain Change re-render
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
    // localStorage.removeItem('metamask')
  };

  // listen for account changes
  if (typeof window !== "undefined") {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
  }

  //get current account balance
  const getbalance = async (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address[0], "latest"],
      })
      .then((balance) => {
        setDefaulAmount(ethers.utils.formatEther(balance));
      });
  };

  // if (connect !== "login") {
  return <>
  {connect?
       <div className="inline-flex justify-center w-full">
       {/* {connectWalletHandler} */}
       <div className="bg-white dark:bg-neutral-800 rounded-lg w-2/5 h-2/6 px-6 mt-10 py-8 ring-1 ring-slate-900/5 shadow-xl">
         <div className="flex justify-between border-solid border-b pb-2.5 dark:border-gray-600 border-zinc-300">
           <span className="inline-flex items-center justify-center rounded-md ">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               strokeWidth="2"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M13 10V3L4 14h7v7l9-11h-7z"
               />
             </svg>
             <p className="ml-2.5 text-sm font-semibold">Energi Network</p>
           </span>
           <div className="inline-flex justify-between">
             <span className="mt-0.5">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-4 w-4 text-emerald-600"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 strokeWidth="2"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                 />
               </svg>
             </span>
             <span className="ml-1 text-emerald-600 text-sm">Connected</span>
           </div>
         </div>
         <div className="mt-2.5 flex justify-between">
           <span className="inline-flex items-center justify-center">
             <img
               className="h-6 w-6 text-white"
               src="images/metamask.png"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               aria-hidden="true"
             ></img>
             <p className="ml-2.5 text-sm font-semibold">
               {defaultAccount?.substring(0, 5)}...
               {defaultAccount?.substring(defaultAccount.length - 5)}
             </p>
           </span>
           <div className="inline-flex justify-between">
             <span>
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-5 w-5"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 strokeWidth="2"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                 />
               </svg>
             </span>
             <span className="ml-8 mr-4">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-5 w-5"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 strokeWidth="2"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                 />
               </svg>
             </span>
           </div>
         </div>
         <div className="text-center mt-4">
           <p className="text-neutral-500 text-sm">Total Balance</p>
           <div className="inline-flex justify-between">
             {defaulAmount ? (
               <h2 className="font-semibold ml-2 ">
                 {parseFloat(defaulAmount).toFixed(6)}
               </h2>
             ) : (
               <h2 className="font-semibold">$ 0.00</h2>
             )}

             <span className="ml-2 mt-1">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-4 w-4"
                 viewBox="0 0 20 20"
                 fill="currentColor"
               >
                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                 <path
                   fillRule="evenodd"
                   d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                   clipRule="evenodd"
                 />
               </svg>
             </span>
           </div>
         </div>
         <div className="text-center mt-4">
           <div className="inline-flex justify-between">
             <button className="bg-emerald-500 text-white-800   py-1 px-3 rounded inline-flex items-center">
               <span>Buy</span>
             </button>
             <button className="bg-emerald-500 text-white-800 ml-4 py-1 px-3 rounded inline-flex items-center">
               <span>Send</span>
             </button>
           </div>
         </div>

         <div className="flex justify-between mt-8">
           <span className="inline-flex items-center justify-center rounded-md ">
             <img
               className="h-6 w-6 text-white"
               src="images/3218.png"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               aria-hidden="true"
             ></img>
             <p className="ml-2.5 text-sm font-semibold">
               NRG{" "}
               <span className="flex text-neutral-500 text-xs">Energi</span>
             </p>
           </span>
           <div className="inline-flex justify-between">
             <p className="text-sm font-semibold mr-2">
               200
               <span className="flex text-neutral-500 text-xs ">$200</span>
             </p>
           </div>
         </div>
         <div className="flex justify-between mt-2">
           <span className="inline-flex items-center justify-center rounded-md ">
             <img
               className="h-6 w-6 text-white"
               src="images/eth3.png"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             ></img>
             <p className="ml-2.5 text-sm font-semibold">
               ETH{" "}
               <span className="flex text-neutral-500 text-xs">Ethereum</span>
             </p>
           </span>
           <div className="inline-flex justify-between">
             <p className="text-sm font-semibold">
               2.01
               <span className="flex text-neutral-500 text-xs">$2000</span>
             </p>
           </div>
         </div>
         <div className="flex justify-between mt-2">
           <span className="inline-flex items-center justify-center rounded-md ">
             <img
               className="h-6 w-6 text-white"
               src="images/eth1.png"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               aria-hidden="true"
             ></img>
             <p className="ml-2.5 text-sm font-semibold">
               WETH{" "}
               <span className="flex text-neutral-500 text-xs">
                 Wipped Ethereum
               </span>
             </p>
           </span>
           <div className="inline-flex justify-between">
             <p className="text-sm font-semibold">
               2.1
               <span className="flex text-neutral-500 text-xs">$2000</span>
             </p>
           </div>
         </div>
       </div>
     </div>
:  
   
      <div>
      <section className="hero container mt-14 h-48 w-48 mx-auto pb-10">
        <img
          className="mx-auto"
          src="images/metamask.png"
          alt="screenshot"
        ></img>
      </section>
      <h2 className="text-center uppercase decoration-8 tracking-widest font-bold text-3xl">
        metamask
      </h2>
      <div className="text-center">
        <button
          onClick={connectWalletHandler}
          className="bg-green-500 text-white-800 mt-8 py-1 px-3 rounded inline-flex items-center"
        >
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>
  }
  </>
};

export default Wallet;
