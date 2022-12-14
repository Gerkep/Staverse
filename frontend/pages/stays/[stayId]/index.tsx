import Navbar from "../../../components/layout/Navbar";
import {  ExternalLinkIcon } from '@chakra-ui/icons'
import Footer from "../../../components/layout/Footer";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import Booker from '../../../artifacts/contracts/Booker.sol/Booker.json';
import {USDCabi} from '../../../artifacts/contracts/USDC/USDC';
import { Booker as BookerType } from '../../../typechain-types';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {HiOutlinePhotograph, HiOutlineDuplicate} from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../../components/Loading";
import { useRouter } from "next/router";
import Feedback from "../../../components/popups/Feedback";
import UserDetails from "../../../components/popups/UserDetails";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stayId = context.params?.stayId
  let stay = {};
  if(typeof stayId == "string"){
    const docRef = doc(db, "Stays", stayId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      stay = docSnap.data();
    } else {
      console.log("No such document!");
    }
  }
  return {
    props: {
      stay,
      stayId,
    }
  }
}

export default function Stay({ stay, stayId }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [spots, setSpots] = useState(0);
  const [ success, setSuccess ] = useState(false);
  const [ failure, setFailure ] = useState(false);
  const [ hasJoined, setHasJoined ] = useState(false);
  const [copyMessage, setCopyMessage ] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { asPath } = useRouter();
  const router = useRouter();

  useEffect(() => {
    const getSpots = async () => {
      if(signer){
        const contract = new ethers.Contract('0xb1339D62a1129c9aB146AdA1cEb9760feA24a811', Booker.abi, signer) as BookerType;
        const stayStruct = await contract.getStay(stayId);
        const userBookingId = await contract.getStay(stayId);
        const housemantes = stayStruct[5];
        for (let i = 0; i < housemantes.length; i++){
          if(housemantes[i] === address){
            setHasJoined(true);
          }
        }
        setSpots(stayStruct[3]);
      }
    }
    getSpots();
  })
const approveERC20 = async () => {
  setLoading(true);
  if(!signer) return;
  const costPerPerson = parseInt(stay.price)/parseInt(stay.spots);
  const contract = new ethers.Contract('0xe11A86849d99F524cAC3E7A0Ec1241828e332C62', USDCabi, signer);
  try {
    const approveTx = await contract.approve('0xb1339D62a1129c9aB146AdA1cEb9760feA24a811', costPerPerson*1040000);
    await approveTx.wait();
    setApproved(true)
    setLoading(false);
    setSuccess(true);
    setTimeout(function(){
      setSuccess(false);
  }, 2500);
  }catch{
    console.log("Approval error");
    setLoading(false);
    setFailure(true);
  }
}
const joinStay = async () => {
  setShowModal(true);
}

const resign = async () => {
  setLoading(true);
  if(!signer) return;
  const contract = new ethers.Contract('0xb1339D62a1129c9aB146AdA1cEb9760feA24a811', Booker.abi, signer) as BookerType;
  try {
    const resignTx = await contract.resign(stayId);
    await resignTx.wait();
    router.reload();
  }catch{
    console.log("Smart contract tx error");
    setLoading(false);
    setFailure(true);
    setTimeout(function(){
      setFailure(false);
  }, 2500);
  }
}

const copyLink = () => {
  navigator.clipboard.writeText("https://hackerhouse.app" + asPath);
  setCopyMessage(true);
  setTimeout(function(){
    setCopyMessage(false);
}, 1500);
}

  return (
    <>
      <Loading />
      <Navbar style="dark" showNav={true}/>
      {success == true && 
        <Feedback close={() => setSuccess(false)} type="success"/>
        }
      {failure == true && 
        <Feedback close={() => setFailure(false)} type="false"/>
      }
      {showModal ? <UserDetails onCloseModal={() => setShowModal(false)} link={stay.link} price={stay.price} dates={stay.date} eventName={stay.eventName} spots={stay.spots} image={stay.image} createNew={false} stayId={stayId}/> : '' }
      <div className="w-full h-full lg:h-screen flex justify-center">
        <div className="w-11/12 lg:w-10/12 h-full lg:h-5/6 lg:grid lg:grid-cols-2 items-center pt-4 lg:pt-0 lg:pt-0 border-4 border-gray-200 mt-36 lg:mt-24 rounded-xl bg-gray-100 px-6 lg:px-12 justify-center">
            <a href={`${stay.link}`} className="w-full h-48 lg:h-5/6 hover:scale-105 hover:shadow-[5px_8px_30px_rgba(0,0,0,0.24)] rounded-xl transition ease-in duration-240">
                <div className="w-full h-48 lg:h-full rounded-xl cursor-pointer overflow-hidden relative">
                {stay.image ? 
                <Image alt="stayImage" layout='fill' objectFit='cover'  src={stay.image}></Image>
                :
                <div className="w-full h-full flex justify-center items-center"><HiOutlinePhotograph className="w-16 h-16 text-gray-200"/></div>
                }
                </div>
            </a>
            <div className="w-full lg:h-5/6 flex justify-end">
            <div className="w-full lg:w-5/6 lg:h-full border-t-4 border-gray-200 rounded-sm lg:border-4 mt-8 lg:mt-0 pb-8 pt-4 lg-pt-0 lg:pb-0 lg:border-black lg:rounded-xl lg:shadow-[12px_15px_0_rgba(0,0,0,1)]">
                <div className="w-full grid grid-cols-2">
                  <h2 className="text-2xl lg:text-3xl font-black ml-2 lg:ml-4">{stay.eventName}</h2>
                  <div className="w-full flex justify-end">
                      <HiOutlineDuplicate onClick={() => copyLink()} className="w-10 h-10 lg:mr-4 hover:scale-110 cursor-pointer transition ease-in duration-180"/>
                      {copyMessage ? <div className="absolute mt-10 mr-4 py-2 px-4 bg-subtle-gray rounded-md">Link copied!</div> : ''}
                  </div>
                </div>
                <a href={`${stay.link}`} className="mt-2 lg:mt-4 ml-2 lg:ml-4 underline text-gray-400">Link to offer</a>
                <div className="flex justify-center">
                  <div className="w-full lg:w-11/12 h-40 mt-6 lg:mt-16 border-4 border-gray-200 rounded-xl grid grid-cols-2 grid-rows-2">
                      <div className="border-b-4 border-r-4 pt-2 border-gray-200">
                          <label className="text-xs lg:text-md font-black ml-4 mt-4 w-full">CHECK-IN</label>
                          {stay.date && <p className="ml-4 mt-1 text-gray-400">{(stay.date.split('-'))[0]}</p>}
                      </div>
                      <div className="border-b-4 pt-2 border-gray-200">
                          <label className="text-xs lg:text-md font-black ml-4 mt-4 w-full">CHECK-OUT</label>
                          {stay.date && <p className="ml-4 mt-1 text-gray-400">{(stay.date.split('-'))[1]}</p>}
                      </div>
                      <div className="pt-2 border-r-4">
                          <label className="text-xs lg:text-md font-black ml-4 mt-4 w-full">FREE SPOTS</label>
                          <div className="flex flex-wrap mt-1 ml-3">
                          {Array(spots)
                            .fill('')
                            .map((x, idx) => (
                              <div key={idx} className="h-4 w-4 lg:h-6 lg:w-6 bg-light-green rounded-full ml-1 mr-1"></div>
                            ))}
                          </div>
                      </div>
                      <div className="pt-2 border-gray-200">
                          <label className="text-xs lg:text-md font-black ml-4 mt-4 w-full">TOTAL GUESTS</label>
                          <p className="ml-4 mt-1 text-gray-400">{stay.spots}</p>
                      </div>
                  </div>
                </div>
                {hasJoined ? 
                <div className="flex flex-wrap justify-center w-full mt-16">
                    <button onClick={() => resign()} className="w-11/12 bg-red-400 py-4 flex justify-center rounded-xl font-bold text-white cursor-pointer">
                      {loading ? 
                      <div className='spinner-white'></div>
                      :
                      <p>
                        Resign
                      </p>
                      }
                    </button> 
                    <p className="text-gray-400 mt-2 text-sm">If you resign you will get 95% money back.</p>
                </div>
                :
                <div className="mt-6 lg:mt-10">
                <div className="w-full grid grid-cols-2 mt-2 lg:mt-2 text-sm text-gray-500">
                    <h2 className="lg:ml-6 ">Booking price: </h2>
                    <div className="w-full flex justify-end">
                      <div className="lg:mr-6 flex items-center">${((parseInt(stay.price)/parseInt(stay.spots))).toFixed(2)}</div>
                    </div>
                </div>
               <div className="w-full grid grid-cols-2 mt-2 lg:mt-2 text-sm text-gray-500">
                    <h2 className="lg:ml-6 ">Service fee: </h2>
                    <div className="w-full flex justify-end">
                      <div className="lg:mr-6 flex items-center">${((parseInt(stay.price)/parseInt(stay.spots))*0.03).toFixed(2)}</div>
                    </div>
                </div>
                  <div className="w-full grid grid-cols-2 mt-2 lg:mt-2">
                    <h2 className="text-xl lg:ml-6 ">Total: </h2>
                    <div className="w-full flex justify-end">
                      <div className="lg:mr-6 text-xl font-bold lg:font-medium lg:text-2xl flex items-center"><div className="bg-USDC w-6 h-6 bg-contain bg-center bg-no-repeat mr-1"></div>{((parseInt(stay.price)/parseInt(stay.spots))*1.03).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-2">
                    {approved ? 
                      <button onClick={() => joinStay()} className="w-full lg:w-11/12 bg-indigo-600 py-4 flex justify-center rounded-xl font-bold text-white cursor-pointer">
                      {loading ? 
                      <div className='spinner-white'></div>
                      :
                      <p>
                        Join
                      </p>
                      }
                    </button> 
                    :
                    <button onClick={() => approveERC20()} className="w-full lg:w-11/12 flex justify-center bg-indigo-600 py-4 rounded-xl font-bold text-white cursor-pointer">
                      {loading ? 
                      <div className='spinner-white'></div>
                      :
                      <p>
                        Approve
                      </p>
                      }
                    </button>               
                    }
                  </div>
                </div>
                }
            </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

