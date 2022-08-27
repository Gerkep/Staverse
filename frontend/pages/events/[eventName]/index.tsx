import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import Create from "../../../components/popups/Create";
import Link from "next/link";

export default function Event() {
  const [showCreationModal, setShowCreationModal] = useState(false);
  return (
    <>
      <Navbar style="dark"/>
      {showCreationModal ? <Create onCloseModal={() => setShowCreationModal(false)}/> : '' }
      <div className="w-full h-72 bg-ETHBogota bg-cover bg-center bg-no-repeat fixed top-0 z-0"></div>
      <div style={{marginTop: "18rem"}} className="z-20 bg-white w-full absolute border-t-4 border-gray-200 shadow-[-2px_-2px_25px_rgba(0,0,0,0.2)]">
        <div className="sticky top-0 w-full">
          <button onClick={() => setShowCreationModal(true)} className="px-8 py-2 rounded-xl absolute text-white right-8 top-8 z-30 
            bg-indigo-600 flex items-center text-xl hover:scale-105 transition ease-in duration-180 shadow-[2px_2px_10px_rgba(0,0,0,0.25)] font-bold">
            <AddIcon className="h-5 w-5 mr-2"/>Add stay
          </button>
        </div>
        <h2 className="absolute mt-8 ml-8 text-5xl font-black">Open stays</h2>
      <div className="flex flex-wrap mt-4 justify-center py-8 pb-16 items-center z-10 bg-white">
        <div className="w-80 ml-12 mt-20 mr-12 rounded-xl pb-4 ">
          <Link href="/stays/1"><div className="w-full h-72 bg-stay1 bg-center bg-cover rounded-md shadow-[1px_1px_25px_rgba(0,0,0,0.24)] hover:scale-105 transition ease-in duration-180 cursor-pointer"></div></Link>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center mt-3">
          <p className="text-left text-xl mr-2">7-12 Oct</p>
          <div className="flex justify-end ml-2">
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
          </div>
          <p className="text-left text-gray-500 text-md">$200</p>
          </div>
        </div>
        <div className="w-80 ml-12 mt-20 mr-12 rounded-xl pb-4 ">
          <Link href="/stays/1"><div className="w-full h-72 bg-stay2 bg-center bg-cover rounded-md shadow-[1px_1px_25px_rgba(0,0,0,0.24)] hover:scale-105 transition ease-in duration-180 cursor-pointer"></div></Link>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center mt-3">
          <p className="text-left text-xl mr-2">7-12 Oct</p>
          <div className="flex justify-end ml-2">
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
          </div>
          <p className="text-left text-gray-500 text-md">$200</p>
          </div>
        </div>
        <div className="w-80 ml-12 mt-20 mr-12 rounded-xl pb-4 ">
          <Link href="/stays/1"><div className="w-full h-72 bg-stay3 bg-center bg-cover rounded-md shadow-[1px_1px_25px_rgba(0,0,0,0.24)] hover:scale-105 transition ease-in duration-180 cursor-pointer"></div></Link>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center mt-3">
          <p className="text-left text-xl mr-2">7-12 Oct</p>
          <div className="flex justify-end ml-2">
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
          </div>
          <p className="text-left text-gray-500 text-md">$200</p>
          </div>
        </div>
  
      </div>
      
      </div>
    </>
  )
}
