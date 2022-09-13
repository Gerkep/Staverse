import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { doc, collection, addDoc} from "firebase/firestore"; 
import { db } from "../../firebase/clientApp";
import { FileUploader } from 'react-drag-drop-files';
import { HiOutlinePhotograph, HiOutlineCheckCircle } from 'react-icons/hi';
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import Link from 'next/link';
import UserDetails from "./UserDetails";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import Dropdown from '../layout/Dropdown';
import { ethers } from 'ethers';
import { useSigner } from "wagmi";
import { Booker as BookerType } from '../../typechain-types';
import Booker from '../../artifacts/contracts/Booker.sol/Booker.json';
import { useRouter } from 'next/router';
import Feedback from './Feedback';

const events = ["ETHBogota", "ETHSanFrancisco"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

    const [link, setLink] = useState("");
    const [price, setPrice] = useState("");
    const [eventName, setEventName] = useState("");
    const [spots, setSpots] = useState("");
    const [image, setImage] = useState<any>(null);
    const [dateRange, setDateRange] = useState({startDate: new Date(), endDate: new Date(), key: 'selection'});
    const [showCallendar, setShowCallendar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ failure, setFailure ] = useState(false);

    const { data: signer } = useSigner();
    const router = useRouter();

    const handleCloseClick = () => {
        props.onCloseModal();
    };

    const handleChange = (image: any) => {
      setImage(image);
    };

    const submitStay = async (e: React.FormEvent<HTMLFormElement>) => {
      setLoading(true);
      e.preventDefault();
      if(!signer) return;
      const contract = new ethers.Contract('0xb1339D62a1129c9aB146AdA1cEb9760feA24a811', Booker.abi, signer) as BookerType;
      const subdomain = 'https://staverse.infura-ipfs.io';
      let imageURL = "";
      let nftURL = "";
        try {
            const imageAdded = await client.add({ content: image });
            imageURL = `${subdomain}/ipfs/${imageAdded.path}`;
            const nftMetadata = {
              image: imageURL,
              name: eventName,
              description: `Stay token for ${eventName}`,
            }
            const nftAdded = await client.add({ content: JSON.stringify(nftMetadata)});
            nftURL = `${subdomain}/ipfs/${nftAdded.path}`;
        } catch (error) {
          console.log('Error uploading file to IPFS.');
        }
        const date = `${(dateRange.startDate).getDate()} ${months[(dateRange.startDate).getMonth()]}-${(dateRange.endDate).getDate()} ${months[(dateRange.endDate).getMonth()]}`
        await addDoc(collection(db, "Stays"), {
          link: link,
          price: price,
          eventName: eventName,
          spots: spots,
          fullNames: [],
          emails: [],
          image: imageURL,
          date: date
        }).then(async (docRef) => {
          const costPerPerson = parseInt(price)/parseInt(spots)*1000000;
          try{
            const addTx = await contract.addStay(docRef.id, costPerPerson, spots, nftURL);
            await addTx.wait();
            props.onCloseModal();
            router.push(`/stays/${docRef.id}`);
          }catch{
            setFailure(true);
            setTimeout(function(){
              setFailure(false);
          }, 2500);
            console.log("Smart contract tx error");
          }
          setLoading(false);
        });
    }

    const handleDateSelect = (ranges:any) => {
      setDateRange({startDate: ranges.selection.startDate, endDate: ranges.selection.endDate, key: 'selection'})
    }
    const displayCallendar = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setShowCallendar(true)
    }
    const addForm = () => {
        return (
          <div>
            {failure == true && <Feedback close={() => setFailure(false)} type="false"/>}
            <div onClick={(e) => e.stopPropagation()} className="mx-auto sm:rounded-lg border-4 border-black shadow-[20px_20px_0_rgba(0,0,0,1)] cursor-auto">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 " onClick={() => setShowCallendar(false)}>
                <h2 className="text-center text-3xl font-bold">Add new stay</h2>
                <form className="space-y-6 py-6" onSubmit={(e) => submitStay(e)} >
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
                        placeholder='https://...'
                        autoComplete="link"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-2">
                  <div>
                      <label htmlFor="dates" className="block text-sm font-medium text-gray-700">
                        Dates
                      </label>
                      <div className="mt-1" onClick={(e) => displayCallendar(e)}>
                        <div  className="appearance-none cursor-pointer block w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          {(dateRange.startDate).getDate() !== (dateRange.endDate).getDate() ?
                          <div>
                            {(dateRange.startDate).getDate()}/{(dateRange.startDate).getMonth() + 1}-
                            {(dateRange.endDate).getDate()}/{(dateRange.endDate).getMonth() + 1}
                          </div>
                          :
                          <div className="text-gray-400">
                            Choose
                          </div>
                          }
                        </div>
                        <div className="absolute z-50 w-5/6">
                          {showCallendar &&
                            <DateRange
                            rangeColors={["#4f45e4"]}
                            minDate={new Date}
                            ranges={[dateRange]}
                            onChange={handleDateSelect}
                            showMonthAndYearPickers={false}
                            showDateDisplay={false}
                            />                      
                          }
                        </div>
                      </div>
                    </div>
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
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-2">
                    <div>
                      <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                        Event
                      </label>
                      <div className="mt-1 w-5/6" >
                        <Dropdown values={events} onChange={setEventName}/>
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
                          min={1}
                          type="number"
                          autoComplete="spots"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <label htmlFor="spots" className="block text-sm font-medium text-gray-700">
                        Image <span className="text-gray-400 font-light">optional</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                    {image ? 
                    <div className=" w-full border-4 border-gray-200 border-dashed rounded-xl mt-2 pt-4 pb-6 cursor-pointer">
                      <div className="w-full text-center text-gray-500">{image.name} <br />Uploaded sccessfully ✅</div>
                    </div>   
                    :
                    <div className=" w-full border-4 border-gray-200 border-dashed rounded-xl mt-2 pt-4 pb-6 cursor-pointer">
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
                      {loading ? 
                      <div className='spinner-white'></div>
                      :
                      <p>
                        Add new
                      </p>
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>   
          </div>
        )
    }

  return(
    <div className='fixed z-50 w-full h-screen flex justify-center items-center backdrop-blur-lg cursor-pointer' onClick={handleCloseClick}>
          {addForm()}
    </div>
  )
};