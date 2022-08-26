import Link from "next/link"
import Image from 'next/image'
import logo from '../../public/img/staverse-long-white.png'
import blackLogo from '../../public/img/staverse-long.png'
import {  AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useState } from "react"
import Create from "../popups/Create"
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar: React.FC<{style:string}> = ({style}) => {
  const router = useRouter()
  const [showCreationModal, setShowCreationModal] = useState(false);

    return (
      <>
      {showCreationModal ? <Create onCloseModal={() => setShowCreationModal(false)}/> : '' }
      <Link href="/">
        <div className="h-24 w-48 mt-4 ml-4 fixed z-20 top-0 cursor-pointer hover:scale-105 transition ease-in duration-180">
            {style === "light" ? 
            <Image
                src={logo}
                alt="logo"
                layout="responsive"
            />
            :
            <Image
                src={blackLogo}
                alt="logo"
                layout="responsive"
            />
            }
        </div>
      </Link>
      <div>
      <div className="navbar fixed z-10 top-0 w-full flex items-center justify-end py-7">
        {style === "light" ? 
        <Link href="/profile"><p className="mr-8 text-white text-xl font-bold cursor-pointer hover:scale-105 transition ease-in duration-180">Profile</p></Link>
        :
        <Link href="/profile"><p className="mr-8 text-black text-xl font-bold  cursor-pointer hover:scale-105 transition ease-in duration-180">Profile</p></Link>
        }
        <div className="mr-8">
         <ConnectButton showBalance={false}/>
        </div>
      </div>
      <div className="w-full absolute top-0 flex justify-end px-8 py-4 z-50">

      </div>
      </div>
      </>
    )
  }
  
  export default Navbar;