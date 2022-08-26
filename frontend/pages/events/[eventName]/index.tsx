import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import Create from "../../../components/popups/Create";

export default function Event() {
  const [showCreationModal, setShowCreationModal] = useState(false);

  return (
    <>
      <Navbar style="dark"/>
      {showCreationModal ? <Create onCloseModal={() => setShowCreationModal(false)}/> : '' }
      <div className="w-full h-80 bg-ETHBogota bg-cover bg-center bg-no-repeat fixed top-0 z-0"></div>
      <div style={{marginTop: "20rem"}} className="z-20 bg-white w-full absolute border-t-4 border-gray-300 ">
        <div className="sticky top-0 w-full">
          <button onClick={() => setShowCreationModal(true)} className="px-8 py-2 rounded-xl absolute text-white right-8 top-8 z-30 bg-indigo-600 flex items-center text-xl hover:scale-105 transition ease-in duration-180 shadow-[2px_2px_10px_rgba(0,0,0,0.25)] font-bold"><AddIcon className="h-5 w-5 mr-2"/>Add stay</button>
        </div>
        <h2 className="absolute mt-8 ml-8 text-5xl font-black">Open stays</h2>
      <div className="flex flex-wrap mt-8 justify-center py-8 pb-16 items-center z-10 bg-white">
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay1 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay1 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay1 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay1 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay1 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay1 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mt-20 mr-12 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay2 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
        <div className="w-1/4 h-64 shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mr-12 mt-20 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
          <div className="w-full h-44 bg-stay3 bg-center bg-cover rounded-md"></div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
            <div className="flex ml-2 mt-2">
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
              <div className="h-7 w-7 bg-light-green rounded-full ml-1 mr-1"></div>
            </div>
            <p className="text-right text-xl mr-2 mt-2">7-12 Oct</p>
            <p> </p>
            <p className="text-right mr-2 mb-1 text-xl font-black">$200</p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
