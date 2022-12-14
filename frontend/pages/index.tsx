import Navbar from "../components/layout/Navbar";
import Link from "next/link"
import UserDetails from "../components/popups/UserDetails";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Footer from "../components/layout/Footer";
import { FileUploader } from "react-drag-drop-files";
import { HiOutlinePhotograph } from "react-icons/hi";
import Dropdown from "../components/layout/Dropdown";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import Image from "next/image";
import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { db } from "../firebase/clientApp";
import Loading from "../components/Loading";
import { IoDesktop, IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe"
import NewsletterForm from "../components/layout/NewsletterForm";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { Booker as BookerType } from '../typechain-types';
import Booker from '../artifacts/contracts/Booker.sol/Booker.json';
import Feedback from "../components/popups/Feedback";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ScalingElement from "../components/animation/ScalingElement";
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

const eventsList = ["ETHBogota", "ETHSanFrancisco"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

type EventDetails = {
  organizer: string,
  name: string,
  dateRange: string, 
  imageURL: string
}
type Event = {
  id: string,
  data: EventDetails
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let events: object[] = []
  const querySnapshot = await getDocs(query(collection(db, "Events")));
  querySnapshot.forEach((doc) => {
    events.push({id: doc.id, data: doc.data()})
  });
  return {
    props: {
      events
    }
  }
}

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [eventName, setEventName] = useState();
  const [spots, setSpots] = useState("");
  const [image, setImage] = useState<any>(null);
  const [dateRange, setDateRange] = useState({startDate: new Date(), endDate: new Date(), key: 'selection'})
  const [ dateError, setDateError ] = useState(false);
  const [ eventError, setEventError ] = useState(false);
  const [showCallendar, setShowCallendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [displayGuaranteeInfo, setDisplayGuaranteeInfo ] = useState(false);
  const [ failure, setFailure ] = useState(false);


  const { data: signer } = useSigner();
  const router = useRouter();

  useEffect(() => {
    if(dateRange.startDate.getTime() == dateRange.endDate.getTime()){
      setDateError(false);
    }
    if(eventName){
      setEventError(false);
    }
  }, [eventName, dateRange])

  const handleChange = (image: File) => {
    setImage(image);
  };

  const submitStay = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if(dateRange.startDate.getTime() == dateRange.endDate.getTime()){
      setDateError(true);
      setLoading(false);
      return;
    }
    if(!eventName){
      setLoading(false);
      setEventError(true);
      return;
    }
    setDateError(false);
    setEventError(false);
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
          router.push(`/stays/${docRef.id}`);
        }catch{
          console.log("Smart contract tx error");
          setFailure(true);
          setTimeout(function(){
            setFailure(false);
        }, 2500);
        }
        setLoading(false);
      });
  }


  const handleDateSelect = (ranges:any) => {
    console.log(ranges);
    setDateRange({startDate: ranges.selection.startDate, endDate: ranges.selection.endDate, key: 'selection'})
  }
  const displayCallendar = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowCallendar(true)
  }

  const renderEvents = () => {
    const eventList = events.map((event: Event) => {
      return (
        <Link key={event.data.name} href={`/events/${event.id}`}>
          <div className="w-11/12 lg:w-4/12 lg:h-64 bg-gray-100 lg:bg-white lg:shadow-[12px_15px_0_rgba(0,0,0,1)]
           pb-4 lg:pb-2 shadow-[5px_5px_30px_rgba(0,0,0,0.20)] border-4 lg:ml-12 lg:mr-12 mt-16 border-gray-200 lg:border-black rounded-2xl hover:scale-105 lg:hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
              <div className={`w-full h-20 lg:h-40 rounded-xl overflow-hidden relative`}>
                <Image alt="stayImage" layout='fill' objectFit='cover'  src={event.data.imageURL}></Image>
              </div>
              <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
                <h3 className="text-2xl ml-2 mt-6 lg:mt-2 font-bold text-gray-900">{event.data.name}</h3>
                <p className="text-right mt-2 text-lg leading-6 font-medium text-gray-500 mr-2 mt-6 lg:mt-2">{event.data.dateRange}</p>
                <p className="ml-2 text-lg leading-6 font-medium text-gray-500 mt-2 lg:mt-0">{event.data.organizer}</p>
                <p> </p>
              </div>
          </div>
          </Link>
      )
    })
    return (
      <div className="w-full justify-center flex flex-wrap">
        {eventList}
      </div>
    )
  }

  return (
    <div onClick={() => setShowCallendar(false)}>
      <Loading />
      <Navbar style="dark" showNav={false} />
      {failure == true && <Feedback close={() => setFailure(false)} type="false"/>}
      <div className="lg:w-1/2 lg:h-full fixed mt-28 lg:mt-0 lg:pr-28 w-full flex lg:flex-wrap lg:items-center">
        <div>
            <ScalingElement><h1 className="px-8 lg:px-0 mt-4 text-5xl xl:text-7xl text-center lg:text-left lg:ml-8 font-black"><span className="text-indigo-600">Book a stay</span> for your next hack.</h1></ScalingElement>
            <ScalingElement>
              <div className="w-full flex justify-center lg:justify-start">
                <div onMouseOver={() => setDisplayGuaranteeInfo(true)} onMouseLeave={() => setDisplayGuaranteeInfo(false)} className="w-10/12 lg:w-5/6 h-44 bg-center cursor-pointer lg:bg-left bg-guarantee bg-contain bg-no-repeat mt-10 lg:ml-8 lg:mt-12"></div>
              </div>
            </ScalingElement>
            {displayGuaranteeInfo ? <div className="absolute w-10/12 lg:w-4/6 z-40 ml-8 text-gray-400 py-4 px-8 lg:px-0 lg:py-0 lg:bg-white bg-subtle-gray rounded-xl">100% refund is granted only when the stay is no longer available or not enough money was raised to book it.</div> : ''}
            <div className="w-full lg:w-auto flex lg:block justify-center">
            <ScalingElement>
              <Link href="/events/avUJdtt1DBsbRb23kYWL"><button className="lg:border-4 border-black text-white lg:text-black shadow-[2px_2px_30px_rgba(0,0,0,0.25)] lg:shadow-[12px_12px_0_rgba(0,0,0,1)] font-bold rounded-xl bg-indigo-600 lg:bg-white
              px-16 xl:px-20 py-6 text-xl lg:text-2xl lg:ml-8 mt-6 lg:mt-16 hover:scale-105 transition ease-in duration-240 hover:scale-105 lg:hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180">
                Book for Bogota!
              </button></Link>
            </ScalingElement>
            </div>
        </div>
      </div>
      <div className="polygon h-full w-8/12 hidden lg:block bg-stay2 bg-cover bg-right z-0 shadow-[0px_20px_0_rgba(0,0,0,1)] fixed right-0 top-0 flex items-center">
      <div className="mt-28 absolute right-20 shadow-[20px_20px_0_rgba(0,0,0,1)] border-4 border-black rounded-2xl overflow-hidden">
          <div  className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
            <h2 className="text-center text-3xl font-bold">Add <span className="text-indigo-600">new stay</span></h2>
            <form className="space-y-6 py-6" onSubmit={(e) => submitStay(e)}>
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
                    <div  className={dateError ? "appearance-none cursor-pointer block w-5/6 px-3 py-2 border border-red-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" : 
                    "appearance-none cursor-pointer block w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}>
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
                      placeholder="$$$"
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
                  <div className="mt-1 w-5/6">
                    <Dropdown values={eventsList} onChange={setEventName} error={eventError}/>
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
                      placeholder="How many?"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <label htmlFor="spots" className="block text-sm font-medium text-gray-700">
                    Image <span className="text-gray-400 font-light"></span>
              </label>
              <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                {image ? 
                <div className=" w-full border-4 border-gray-200 border-dashed rounded-xl mt-2 pt-4 pb-6 cursor-pointer">
                  <div className="w-full text-center text-gray-500">{image.name} <br />Uploaded sccessfully ???</div>
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

              <div className="w-full flex justify-center">
              {signer ?
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                >
                {loading ? 
                <div className='spinner-white'></div>
                :
                <p>
                  Add
                </p>
                }
                </button>
                :
                <div className="mt-4">
                  <ConnectButton/>
                </div>
                }
              </div>
            </form>
          </div>
          </div>
      </div>
      <div style={{marginTop: "100vh"}} className="z-40 bg-white w-full absolute border-t-4 shadow-[0_-2px_35px_rgba(0,0,0,0.2)] border-gray-200 lg:border-t-8 lg:border-black ">
      <div className="py-24 lg:pt-36 lg:pb-36" id="upcoming">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto text-center">
          <ScalingElement>
          <h2 className="text-4xl lg:text-7xl tracking-tight font-black text-gray-900 sm:tracking-tight">
           Upcoming web3 events
          </h2>
          </ScalingElement>
          <ScalingElement>
            <p className="mt-4 font-bold text-indigo-500 text-lg lg:text-2xl">YOU DO NOT WANT TO MISS</p>
          </ScalingElement>
        </div>
      </div>
        {renderEvents()}
    </div>
    <div className="py-24 lg:py-24 lg:mt-24 lg:bg-subtle-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScalingElement>
            <h2 className="text-4xl lg:text-7xl tracking-tight font-black text-gray-900 sm:tracking-tight">
            How do I book?
            </h2>
          </ScalingElement>
          <ScalingElement>
            <p className="mt-3 text-xl lg:text-2xl text-gray-500 sm:mt-4">
              Find accommodation on your favorite booking service and book with us for crypto.
            </p>
          </ScalingElement>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap lg:mt-8 justify-center py-12 items-center">
        <div className="w-72 py-10 mt-2 lg:mt-8 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 border-black rounded-xl flex flex-wrap justify-center ml-10 mr-10 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180">
          <div className="w-full h-28 rounded-md"></div>
          <div className="w-20 h-20 ml-6 bg-createIcon bg-center bg-contain bg-no-repeat absolute"></div>
          <h3 className="text-center mt-4 font-black text-3xl ">Add stay</h3>
          <p className="text-center mt-4 text-gray-500 lg:text-gray-900 font-bold lg:font-medium text-l w-5/6">Find a stay on service like Airbnb, copy the link and add new offer to our platform.</p>
        </div>
        <div className="w-14 h-10 hidden lg:block bg-arrow bg-center bg-contain bg-no-repeat ml-6">
        </div>
        <div className="w-72 py-10 mt-20 lg:mt-8 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 border-black rounded-xl flex flex-wrap justify-center ml-10 mr-10 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 ">
          <div className="w-full h-28 rounded-md"></div>
          <div className="w-20 h-20 bg-sendIcon bg-center bg-contain bg-no-repeat absolute"></div>
          <h3 className="text-center mt-4 font-black text-3xl">Fund it</h3>
          <p className="text-center mt-4 text-gray-500 lg:text-gray-900 font-bold lg:font-medium text-l w-5/6">You can book alone or with frens. All funds will be safely stored on a smart contract.</p>
        </div>
        <div className="w-14 h-10 hidden lg:block bg-arrow bg-center bg-contain bg-no-repeat ml-6">
        </div>
        <div className="w-72 py-10 mt-20 lg:mt-8 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 border-black rounded-xl flex flex-wrap justify-center ml-10 mr-10 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180" >
          <div className="w-full h-28 rounded-md"></div>
          <div className="w-20 h-20 bg-checkIcon bg-center bg-contain bg-no-repeat absolute"></div>
          <h3 className="text-center mt-4 font-black text-3xl">Book it</h3>
          <p className="text-center mt-4 text-gray-500 lg:text-gray-900 font-bold lg:font-medium text-l w-5/6">Once the price target is met you confirm booking and receive details within 24h.</p>
        </div>
      </div>
    </div>

      <div className="w-full flex flex-wrap text-center py:24 lg:pt-36 pb-12 justify-center " id="newsletter">
        <div className="w-full">
        <ScalingElement>
          <h2 className="text-4xl lg:text-7xl tracking-tight font-black text-gray-900 sm:tracking-tight w-full">
              Behind the scenes
          </h2>
        </ScalingElement>
        </div>
        <div className="mt-12 w-11/12 lg:w-8/12 pb-12 shadow-[5px_5px_40px_rgba(0,0,0,0.20)] border-4 border-gray-200 rounded-2xl">
          <div className="grid lg:grid-cols-2">
          <div className="w-full flex py-6 px-6">
            <div className="w-24 h-24 lg:w-36 lg:h-36 bg-NYCProfile bg-cover bg-center rounded-full overflow-hidden relative"></div>
            <div className="grid grid-rows-2 pl-6 text-left h-20">
              <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mt-2">Piotr Gerke</h2>
              <p className="text-gray-400 text-sm lg:text-lg mt-1 lg:mt-4 font-medium">1X ETHAmsterdam???? <br></br> 1X ETHWarsaw????</p>
            </div>
          </div>
          <div className="justify-end w-full mt-6 hidden lg:flex">
              <IoLogoTwitter className="text-indigo-600 h-8 w-8 mr-8 lg:mr-12 mt-8 ml-8 lg:ml-0 mb-6 lg:mt-0 cursor-pointer hover:text-gray-900 transition ease-in duration-180"></IoLogoTwitter>
              <IoLogoDiscord className="text-indigo-600 h-8 w-8 mr-8 lg:mr-12 mt-8 mb-6 lg:mt-0 cursor-pointer hover:text-gray-900 transition ease-in duration-180"></IoLogoDiscord>
              <IoDesktop className="text-indigo-600 h-8 w-8 mr-8 lg:mr-12 mt-8 mb-6 lg:mt-0 cursor-pointer hover:text-gray-900 transition ease-in duration-180"></IoDesktop>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="border-t-4 border-gray-200 w-11/12"></div>
          </div>
          <p className="px-6 lg:px-8 mt-10 font-bold text-gray-900 lg:text-left lg:text-xl lg:w-4/6">Gm! I???m glad to see you there!<br /> I???m here to help you book the best accommodation, so that you can make the most out of your next hackathon!</p>
          <p className="mt-10 mb-6 font-bold text-gray-400 lg:text-left lg:ml-8 lg:text-xl lg:text-gray-900">I will onboard you ASAP!????????</p>
          <MailchimpSubscribe
                url={process.env.NEXT_PUBLIC_MAILCHIMP_URL!}
                render={({ subscribe, status }) => (
                <div className='mt-6 md:mt-2'>
                  <NewsletterForm onSubmitted={(formData: EmailFormFields) => subscribe(formData)} />
                  {(status == "success" && success == true) && 
                  <div onClick={() => setSuccess(false)} className="h-full w-full fixed top-0 left-0">
                  <div onClick={(e) => e.stopPropagation()} className='w-11/12 md:w-3/12 h-36 bg-gray-100 fixed right-5 md:left-auto top-5 md:right-5 border-gray-200 border-4 rounded-md shadow-[10px_10px_40px_-5px_rgba(0,0,0,0.25)]'>
                    <button type="button" onClick={() => setSuccess(false)} className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 fixed top-7 right-7">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className='mt-5 font-bold text-3xl text-emerald-300'>Success!</h2>
                    <p className='font-medium mt-4 text-xl'>I will reach you out soon????????</p>
                    </div>
                    </div>}
                </div>
                )}
        />
        </div>
      </div>
      <Footer />
      </div>
    </div>
  )
}
