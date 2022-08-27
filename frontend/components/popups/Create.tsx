import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { doc, collection, addDoc} from "firebase/firestore"; 
import { db } from "../../firebase/clientApp";
import { FileUploader } from 'react-drag-drop-files';
import { HiOutlinePhotograph, HiOutlineCheckCircle } from 'react-icons/hi';
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import Link from 'next/link';
import AddStay from "./AddStay";

const fileTypes = ["JPG", "PNG"];
const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_API_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export default function Create(props: {onCloseModal: any}){

    const [step, setStep] = useState(1)
    const [link, setLink] = useState("");
    const [price, setPrice] = useState("");
    const [dates, setDates] = useState("");
    const [eventName, setEventName] = useState("");
    const [spots, setSpots] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [image, setImage] = useState<any>(null);
    const [IPFSImage, setIPFSImage] = React.useState<{ cid: CID; path: string }>();

    const handleCloseClick = () => {
        props.onCloseModal();
    };

    const handleChange = (image: any) => {
      setImage(image);
    };

    const goToStepTwo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(2);
    }
    const addForm = () => {
        return (
            <div className="mx-auto sm:rounded-lg border-4 border-black shadow-[20px_20px_0_rgba(0,0,0,1)] ">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 " onClick={(e) =>  e.stopPropagation()}>
            <h2 className="text-center text-3xl font-bold">Add new stay</h2>
            <form className="space-y-6 py-6" onSubmit={(e) => goToStepTwo(e)} >
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                  Offer link
                </label>
                <div className="mt-1">
                  <input
                    id="link"
                    name="link"
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    type="text"
                    autoComplete="link"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Total price $
                  </label>
                  <div className="mt-1">
                    <input
                      id="price"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type="number"
                      autoComplete="price"
                      required
                      className="appearance-none block w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dates" className="block text-sm font-medium text-gray-700">
                    Dates
                  </label>
                  <div className="mt-1">
                    <input
                      id="dates"
                      name="dates"
                      type="number"
                      autoComplete="dates"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div>
                  <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                    Event name
                  </label>
                  <div className="mt-1">
                    <input
                      id="event"
                      name="event"
                      onChange={(e) => setEventName(e.target.value)}
                      value={eventName}
                      type="text"
                      autoComplete="event"
                      required
                      className="appearance-none block w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="spots" className="block text-sm font-medium text-gray-700">
                    Spots
                  </label>
                  <div className="mt-1">
                    <input
                      id="spots"
                      name="spots"
                      onChange={(e) => setSpots(e.target.value)}
                      value={spots}
                      type="number"
                      autoComplete="spots"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <label htmlFor="spots" className="block text-sm font-medium text-gray-700">
                    Image <span className="text-gray-400">optional</span>
              </label>
              <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                {image ? 
                <div className=" w-full bg-gray-200 rounded-xl mt-2 pt-4 pb-6">
                  <div className="w-full text-center text-gray-500">{image.name} <br />Uploaded sccessfully✅</div>
                </div>   
                :
                <div className=" w-full bg-gray-200 rounded-xl mt-2 pt-4 pb-6">
                  <div className="w-full flex justify-center">
                    <HiOutlinePhotograph className="w-10 h-10 text-gray-300"/>
                  </div>
                  <div className="w-full text-center text-gray-500">Drop an image</div>
                </div>             
                }
              </FileUploader>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                >
                  Add new
                </button>
              </div>
            </form>
          </div>
          </div>
        )
    }

  return(
    <div className='fixed z-50 w-full h-screen flex justify-center items-center backdrop-blur-lg cursor-pointer' onClick={handleCloseClick}>
          {step === 1 && addForm()}
          {step === 2 && <AddStay onCloseModal={() => props.onCloseModal(false)} link={link} price={price} eventName={eventName} spots={spots} image={image}/>}
    </div>
  )
};