import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import Create from "../../../components/popups/Create";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { db } from "../../../firebase/clientApp";
import {HiOutlinePhotograph} from "react-icons/hi";

type StayData = {
  email: string
  eventName: string
  fullName: string
  image?: string
  link: string
  price: string
  spots: string
  date: string
};

type Stay = {
  id: string;
  data: StayData;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventId = context.params?.eventId
  let event = {};
  if(typeof eventId == "string"){
    const docRef = doc(db, "Events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("exist")
      event = docSnap.data();
    } else {
      console.log("No such document!");
    }
  }
  return {
    props: {
      event
    }
  }
}

export default function Event({ event }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [stays, setStays] = useState<Stay[]>([]);

  useEffect(() => {
    const getStays = async () => {
      const querySnapshot = await getDocs(query(collection(db, "Stays")));
      const stays: Stay[] = [];
      querySnapshot.forEach((doc) => {
        stays.push({id: doc.id, data: doc.data() as StayData})
      });
      setStays(stays);
    }
    console.log(event)
    getStays();
  }, [])

  const renderStays = () => {
    const staysList = stays.map(stay => {
      return(
        <div key={stay.id}>
        {stay.data.eventName === event.name &&
        <div  className="w-80 ml-12 mt-20 mr-12 rounded-xl pb-4 relative">
          <div className="w-full h-72 rounded-md shadow-[1px_1px_25px_rgba(0,0,0,0.24)] hover:scale-105 transition ease-in duration-180 cursor-pointer overflow-hidden relative">
            {stay.data.image ? 
            <Link href={`/stays/${stay.id}`}><Image alt="stayImage" layout='fill' objectFit='cover'  src={stay.data.image}></Image></Link>
            :
            <Link href={`/stays/${stay.id}`}><div className="w-full h-full flex justify-center items-center"><HiOutlinePhotograph className="w-16 h-16 text-gray-200"/></div></Link>
            }
          </div>
          <div className="w-full grid grid-cols-2 grid-rows-2 items-center mt-3">
          <p className="text-left  text-xl">${(parseInt(stay.data.price)/parseInt(stay.data.spots)).toFixed(2)}</p>

          <div className="flex justify-end ml-2">
          {Array(parseInt(stay.data.spots))
            .fill('')
            .map((x, idx) => (
              <div key={idx} className="h-6 w-6 bg-light-green rounded-full ml-1 mr-1"></div>
            ))}
          </div>
          <p className="text-left text-gray-500 text-md mr-2">{stay.data.date}</p>
          </div>
        </div>
        }
        </div>
      )
    })
    return (
      <div className="flex flex-wrap mt-4 justify-center py-8 pb-16 items-center z-10 bg-white">
        {staysList}
      </div>
    )
  }
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
        <h2 className="absolute mt-8 ml-8 text-4xl text-gray-900 font-black">{event.name} stays</h2>
        {renderStays()}
      </div>
    </>
  )
}
