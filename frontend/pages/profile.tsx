import Navbar from "../components/layout/Navbar";
import Loading from "../components/Loading";
import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import Link from "next/link";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";

const config = {
  apiKey: "UqL-g9DI5zMqq-ijYZleberB2DY81VK6",
  network: Network.ETH_GOERLI,
};

export default function Profile() {

  const [nfts, setNfts ] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();
  const alchemy = new Alchemy(config);

  useEffect(() => {
    const getNFTs = async () => {
      let fetchedNfts: string[] = [];
      if (typeof address === "string"){
        const allNfts = await alchemy.nft.getNftsForOwner(address);
        allNfts.ownedNfts.map((nft) => {
          console.log(nft)
          if(nft.contract.address === "0xc44a1a274f81da3651568ad43c19109f834b88ea" && nft.tokenUri){
            fetchedNfts.push(nft.tokenUri.gateway);
          }
        })
      }
      setNfts(fetchedNfts);
      setLoading(false);
    }
    getNFTs();
  }, [])

  const renderStays = () => {
    const stays = nfts.map((stay) => {
      return(
        <div key={stay} className="h-64 w-64 rounded-xl m-8 ml-10 mr-10">
          <div className="w-full h-full rounded-xl shadow-[1px_1px_35px_rgba(0,0,0,0.15)] hover:scale-105 hover:shadow-[1px_1px_25px_rgba(0,0,0,0.25)] transition ease-in duration-180 cursor-pointer overflow-hidden relative">          
            <Link className="z-10" href={`#`}><Image alt="stay image" layout='fill' objectFit='cover' src={stay}></Image></Link>
          </div>
        </div>
      )
    })
    return (
      <div className="w-full flex flex-wrap justify-center">
        {stays}
      </div>
    )
  }
  return (
    <>
      <Loading />
      <Navbar style="light" showNav={false}/>
      <div className="w-full h-80 bg-dimmedBackground bg-cover bg-bottom bg-no-repeat fixed top-0 z-0">
      </div>
      <div className="w-full flex justify-center">
        <div className="absolute top-40 rounded-xl pt-8 pb-16 border-4 border-black shadow-[12px_15px_0_rgba(0,0,0,1)] w-11/12 lg:w-10/12 bg-white">
          <h2 className="text-4xl text-gray-900 font-black ml-8">Hello there!</h2>
          <div className="w-full flex justify-center h-full mt-8">
            <div className="w-11/12 h-96 bg-gray-200 pb-10 mx-0-auto rounded-xl overflow-scroll">
              <h3 className="mt-4 ml-4 text-xl text-gray-400">Your stay NFTs:</h3>
                {loading ? 
                    <div className="w-full mt-28 flex justify-center">
                      <div className="spinner"></div>
                    </div>
                    :
                    nfts[0] ? 
                    renderStays()
                    :
                    <div className="w-full items-center flex text-center justify-center mt-28 text-3xl text-gray-400">
                      You have no stays :( <br/>Book one!
                    </div>
                }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
