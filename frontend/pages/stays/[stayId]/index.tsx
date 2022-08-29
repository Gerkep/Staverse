import Navbar from "../../../components/layout/Navbar";
import {  ExternalLinkIcon } from '@chakra-ui/icons'
import Footer from "../../../components/layout/Footer";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {HiOutlinePhotograph} from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

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
      stay
    }
  }
}

export default function Stay({ stay }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Navbar style="dark"/>
      <div className="w-full h-screen flex justify-center">
        <div className="w-10/12 h-5/6 grid grid-cols-2 items-center border-4 border-gray-200 mt-24 rounded-xl bg-gray-100 px-12 justify-center">
            <a href={`${stay.link}`} className="w-full h-5/6 hover:scale-105 hover:shadow-[5px_8px_30px_rgba(0,0,0,0.24)] rounded-xl transition ease-in duration-240">
                <div className="w-full h-full rounded-xl cursor-pointer overflow-hidden relative">
                {stay.image ? 
                <Image alt="stayImage" layout='fill' objectFit='cover'  src={stay.image}></Image>
                :
                <div className="w-full h-full flex justify-center items-center"><HiOutlinePhotograph className="w-16 h-16 text-gray-200"/></div>
                }
                </div>
            </a>
            <div className="w-full h-5/6 flex justify-end">
            <div className="w-5/6 h-full border-4 border-black rounded-xl shadow-[12px_15px_0_rgba(0,0,0,1)]">
                <div className="w-full grid grid-cols-2">
                  <h2 className="text-4xl font-black mt-4 ml-4">{stay.eventName}</h2>
                  <div className="w-full flex justify-end">
                      <ExternalLinkIcon className="w-10 mt-4 mr-4"/>
                  </div>
                </div>
                <a href={`${stay.link}`} className="mt-4 ml-4 underline text-xl">Link to offer</a>
                <div className="flex justify-center">
                  <div className="w-11/12 h-40 mt-16 border-4 border-gray-200 rounded-xl grid grid-cols-2 grid-rows-2">
                      <div className="border-b-4 border-r-4 pt-2 border-gray-200">
                          <label className="text-md font-black ml-4 mt-4 w-full">CHECK-IN</label>
                          {stay.date && <p className="ml-4 mt-1 text-gray-500">{(stay.date.split('-'))[0]}</p>}
                      </div>
                      <div className="border-b-4 pt-2 border-gray-200">
                          <label className="text-md font-black ml-4 mt-4 w-full">CHECK-OUT</label>
                          {stay.date && <p className="ml-4 mt-1 text-gray-500">{(stay.date.split('-'))[1]}</p>}
                      </div>
                      <div className="pt-2 border-r-4">
                          <label className="text-md font-black ml-4 mt-4 w-full">FREE SPOTS</label>
                          <div className="flex flex-wrap mt-1 ml-3">
                          {Array(parseInt(stay.spots))
                            .fill('')
                            .map((x, idx) => (
                              <div key={idx} className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
                            ))}
                          </div>
                      </div>
                      <div className="pt-2 border-gray-200">
                          <label className="text-md font-black ml-4 mt-4 w-full">TOTAL GUESTS</label>
                          <p className="ml-4 mt-1 text-gray-500">{stay.spots}</p>
                      </div>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 mt-20">
                  <h2 className="text-xl ml-5 ">You pay: </h2>
                  <div className="w-full flex justify-end">
                    <p className="font-black mr-5 text-4xl">${(parseInt(stay.price)/parseInt(stay.spots)).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-center w-full mt-2">
                  <button className="w-11/12 bg-indigo-600 py-4 rounded-xl font-bold text-white cursor-pointer">
                      JOIN
                  </button>
                </div>
            </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

