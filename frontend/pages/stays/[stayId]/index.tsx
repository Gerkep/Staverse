import Navbar from "../../../components/layout/Navbar";
import {  ExternalLinkIcon } from '@chakra-ui/icons'

export default function Stay() {
  return (
    <>
      <Navbar style="dark"/>
      <div className="w-full h-screen grid grid-cols-2">
          <a href="#" className="mt-36 h-3/4 ml-16 w-full hover:scale-105 hover:shadow-[5px_8px_40px_rgba(0,0,0,0.34)] rounded-xl transition ease-in duration-240">
              <div className="w-full h-full bg-stay1 bg-center bg-cover rounded-xl"></div>
              </a>

          <div className="w-4/6 h-3/4 ml-36 mt-36 border-8 border-black rounded-xl shadow-[12px_15px_0_rgba(0,0,0,1)]">
              <div className="w-full grid grid-cols-2">
                <h2 className="text-4xl font-black mt-4 ml-4">ETHBogota</h2>
                <div className="w-full flex justify-end">
                    <ExternalLinkIcon className="w-10 mt-4 mr-4"/>
                </div>
              </div>
              <a href="#" className="mt-4 ml-4 underline text-xl">Link to offer</a>
              <div className="flex justify-center">
                <div className="w-11/12 h-40 mt-16 border-4 border-gray-200 rounded-xl grid grid-cols-2 grid-rows-2">
                    <div className="border-b-4 border-r-4 pt-2 border-gray-200">
                        <label className="text-md font-black ml-4 mt-4 w-full">CHECK-IN</label>
                        <p className="ml-4 mt-1 text-gray-500">19.09.2022</p>
                    </div>
                    <div className="border-b-4 pt-2 border-gray-200">
                        <label className="text-md font-black ml-4 mt-4 w-full">CHECK-OUT</label>
                        <p className="ml-4 mt-1 text-gray-500">19.09.2022</p>
                    </div>
                    <div className="pt-2 border-r-4">
                        <label className="text-md font-black ml-4 mt-4 w-full">FREE SPOTS</label>
                        <div className="flex mt-1 ml-3">
                            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
                            <div className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
                        </div>
                    </div>
                    <div className=" pt-2 border-gray-200">
                        <label className="text-md font-black ml-4 mt-4 w-full">TOTAL GUESTS</label>
                        <p className="ml-4 mt-1 text-gray-500">4</p>
                    </div>
                </div>
              </div>
              <div className="w-full grid mt-24 grid-cols-2">
                <h2 className="text-xl ml-4 ">You pay:</h2>
                <div className="w-full flex justify-end">
                   <p className="font-black mr-4 text-4xl">$240</p>
                </div>
              </div>
              <div className="flex justify-center w-full mt-2">
                <button className="w-11/12 bg-black py-6 rounded-xl text-4xl font-black text-white hover:scale-105 
                hover:shadow-[3px_5px_30px_rgba(0,0,0,0.24)] transition ease-in duration-240 cursor-pointer">
                    JOIN
                </button>
              </div>
          </div>
      </div>
    </>
  )
}
