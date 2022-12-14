import Link from "next/link"
import Image from 'next/image'
import logo from '../../public/img/HH-logo-white.png'
import blackLogo from '../../public/img/staverse-final-logo.png'
import {  AddIcon } from '@chakra-ui/icons'
import { useState } from "react"
import CreateStay from "../popups/CreateStay"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HiX } from "react-icons/hi";

const Navbar: React.FC<{style:string, showNav: boolean}> = ({style, showNav}) => {
  const [showCreationModal, setShowCreationModal] = useState(false);

    return (
      <>
      <div className="absolute top-0">
      {showCreationModal ? <CreateStay onCloseModal={() => setShowCreationModal(false)} /> : '' }
      </div>
      <div className={showNav ? "fixed z-40 lg:z-40 top-0 w-full backdrop-blur flex items-center justify-end py-7 pb-20 lg:pb-6" : "fixed z-40 lg:z-20 top-0 w-full backdrop-blur lg:backdrop-blur-none flex justify-end py-7 pb-20 lg:pb-6"}>
      <Link href="/">
        <div className="h-20 w-48 lg:w-48 lg:h-16 inset-x-0 mx-auto lg:mx-2 fixed top-2 lg:top-4 left-2 lg:left-4 cursor-pointer hover:scale-105 transition ease-in duration-180">
            {style === "light" ? 
            <div className="w-full h-full bg-logo-mobile-white lg:bg-logo-desktop-white bg-center bg-contain bg-no-repeat">
            </div>
            :
            <div className="w-full h-full bg-logo-mobile-black lg:bg-logo-desktop-black bg-center bg-contain bg-no-repeat">
            </div>
            }
        </div>
      </Link>
      <div>
      {showNav ? 
      <div className="z-20 top-0 w-full hidden lg:flex items-center justify-end">
        {style === "light" ? 
        <Link href="/profile"><p className="mr-10 text-white text-xl font-base cursor-pointer hover:scale-105 transition ease-in duration-180">Profile</p></Link>
        :
        <Link href="/profile"><p className="mr-10 text-black text-xl font-base  cursor-pointer hover:scale-105 transition ease-in duration-180">Profile</p></Link>
        }
          <button onClick={() => setShowCreationModal(true)} className="px-8 py-2 rounded-xl text-white mr-6 z-30 
            bg-indigo-600 flex items-center text-base hover:scale-105 transition ease-in duration-180 shadow-[2px_2px_10px_rgba(0,0,0,0.25)] font-bold">
            <AddIcon className="h-4 w-4 mr-2"/>Add Stay
          </button>
      </div>
      :
      <div className="z-20 top-0 w-full hidden lg:flex items-center justify-end">
        <div className="mr-4">
          <ConnectButton />
        </div>
      </div>
      }
      </div>
      </div>
      </>
    )
  }
  
  export default Navbar;