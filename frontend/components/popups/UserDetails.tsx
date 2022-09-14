import React, { useEffect, useState } from 'react';
import Booker from '../../artifacts/contracts/Booker.sol/Booker.json';
import { Booker as BookerType } from '../../typechain-types';
import { ethers } from 'ethers'
import { useSigner } from 'wagmi'
import { CloseIcon } from '@chakra-ui/icons';
import { doc, collection, addDoc, deleteDoc, updateDoc, arrayUnion, getDoc, DocumentData} from "firebase/firestore"; 
import { db } from "../../firebase/clientApp";
import Link from 'next/link';
import { HiOutlinePhotograph, HiOutlineCheckCircle } from 'react-icons/hi';
import { useAccount, useNetwork, useSendTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { send } from "@emailjs/browser";
import { useRouter } from 'next/router';
import Feedback from './Feedback';

export default function Signin(props: {onCloseModal: any, link: string, price: string, dates: string, eventName: string, spots: string, image: File, createNew: boolean, stayId: string}){

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ failure, setFailure ] = useState(false);

  const { address, isConnected: isWagmiConnected } = useAccount();
  const { data: signer } = useSigner();
  const router = useRouter()

    const handleCloseClick = () => {
        props.onCloseModal();
    };

    const addStay = async (e: React.FormEvent<HTMLFormElement>) => {
      setLoading(true);
      e.preventDefault();
      if(!signer) return;
      const contract = new ethers.Contract('0xb1339D62a1129c9aB146AdA1cEb9760feA24a811', Booker.abi, signer) as BookerType;
          await updateDoc(doc(db, "Stays", props.stayId), {
            fullNames: arrayUnion(fullName),
            emails: arrayUnion(email),
          }).then(async () => {
            try{
              const costPerPerson = parseInt(props.price)/parseInt(props.spots);
              const joinTx = await contract.joinStay(costPerPerson*1040000, props.stayId);
              await joinTx.wait();
              const stayStruct = await contract.getStay(props.stayId);

              if(stayStruct[3] === 0){
              let fetchedStay = {} as DocumentData;
              if(typeof props.stayId == "string"){
                const docSnap = await getDoc(doc(db, "Stays", props.stayId));
                if (docSnap.exists()) {
                  fetchedStay = docSnap.data();
                } else {
                  console.log("No such document!");
                }
              }
              console.log((fetchedStay.emails), props.stayId, props.link, parseInt(props.price)*parseInt(props.spots), props.dates)
              const total = parseInt(props.price)*parseInt(props.spots)
              const templateParams = {
                stayId: `${props.stayId}`,
                emails: `${fetchedStay.emails}`,
                names: `${fetchedStay.fullNames}`,
                link: `${props.link}`,
                totalPrice: `${total}`,
                dates: `${props.dates}`
              };
              send('service_8wes2jm', 'template_7dw9y3i', templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_KEY)
                .then(function(response) {
                    console.log('SUCCESS!', response.status);
                    for(let i = 0; i < fetchedStay.emails.length; i++){
                      const templateUserParams = {
                        eventName: `${props.eventName}`,
                        email: `${fetchedStay.emails[i]}`,
                        link: `${props.link}`
                      };
                      send("service_8wes2jm","template_aj717a7", templateUserParams, process.env.NEXT_PUBLIC_EMAILJS_USER_KEY)
                      .then(function(response) {
                          console.log('SUCCESS!', response.status, response.text);
                      }, function(error) {
                          console.log('FAILED...', error);
                      });  
                    }
                }, function(error) {
                    console.log('FAILED...', error);
                });  
                await deleteDoc(doc(db, "Stays", props.stayId));
              }
              setLoading(false);
              router.push("/success");
            }catch{
              console.log("Smart contract tx error");
              setLoading(false);
              setFailure(true);
              setTimeout(function(){
                setFailure(false);
            }, 2500);
            }
          })
    }


  return(
    <div className='fixed z-50 w-full h-screen flex justify-center items-center  backdrop-blur-lg cursor-pointer' onClick={handleCloseClick}>
              <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-xl border-4 border-black shadow-[20px_20px_0_rgba(0,0,0,1)] cursor-auto">
        {failure == true && 
          <Feedback close={() => setFailure(false)} type="false"/>
        }
        <div className="bg-white py-8 pb-16 px-4 shadow sm:rounded-lg sm:px-10 cursor-auto v" onClick={(e) => e.stopPropagation()}>
          <h1 className=' text-center font-bold text-3xl'>Who is joining?</h1>
          <div className='flex pb-8 w-full justify-center'>
                  <p className='text-center mt-8 text-gray-500'>Note: We need your email to add you to bookings and send details about your reservations.</p>
              </div>
          <form className="space-y-6" onSubmit={(e) => addStay(e)} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  type="text"
                  autoComplete="current-name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Book only for me
                </label>
            </div>
            <div>
              {address ?
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
              >
                {loading ? 
                <div className='spinner-white'></div>
                :
                props.createNew ? 
                <p>
                  Add Stay
                </p>
                :
                <p>
                  Join Stay
                </p>
                }
              </button>
              :
              <div className='w-full flex justify-center mt-12'>
                  <ConnectButton />   
              </div>
              }
            </div>
          </form>
        </div>
        </div>
    </div>
  )
};