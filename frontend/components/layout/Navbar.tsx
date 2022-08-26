import Link from "next/link"
import Image from 'next/image'
import logo from '../../public/img/staverse-long-white.png'
import blackLogo from '../../public/img/staverse-long.png'
import {  AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useState } from "react"
import Create from "../popups/Create"


const Navbar: React.FC<{style:string}> = ({style}) => {
  const router = useRouter()
  const [showCreationModal, setShowCreationModal] = useState(false);

    return (
      <>
      {showCreationModal ? <Create onClose={() => setShowCreationModal(false)}/> : '' }
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
      {router.pathname === "/" ?
      ''
      :
      <div>
      <div className="navbar fixed z-10 top-0 w-full flex items-center justify-end py-7">
        {style === "light" ? 
        <Link href="/profile"><p className="mr-64 text-white text-xl cursor-pointer hover:scale-105 transition ease-in duration-180">Profile</p></Link>
        :
        <Link href="/profile"><p className="mr-64 text-black text-xl cursor-pointer hover:scale-105 transition ease-in duration-180">Profile</p></Link>
        }
        
      </div>
      <button onClick={() => setShowCreationModal(true)} className="px-8 py-2 rounded-md fixed text-white right-8 top-4 z-30 top-0 bg-black flex items-center text-xl hover:scale-105 transition ease-in duration-180"><AddIcon className="h-5 w-5 mr-2"/>Add stay</button>
      </div>
      }
      </>
    )
  }
  
  export default Navbar;