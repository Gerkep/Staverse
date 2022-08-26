import Navbar from "../components/layout/Navbar";
import Link from "next/link"
import Signin from "../components/popups/Signin";
import { useState } from "react";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const addStay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  }
  return (
    <>
      <Navbar style="dark"/>
      <div style={{marginTop: "25vh"}} className="w-1/2 fixed ">
          <h1 className="text-7xl ml-8 font-black"><span className="text-indigo-600">Book a stay</span> for <br/> your next hack.</h1>
          <p className=" ml-8 mt-10 text-xl font-black ">
          Because all hackers deserve a great place to hack!!</p>
          <a href="#upcoming"><button className="border-4 border-black text-black shadow-[12px_12px_0_rgba(0,0,0,1)] font-black rounded-xl 
          px-28 py-6 text-black text-2xl ml-8 mt-20 hover:scale-105 transition ease-in duration-240 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180">
            Upcoming Events
          </button></a>
        </div>
      {showModal ? <Signin onCloseModal={() => setShowModal(false)}/> : '' }
      <div style={{clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)"}} className="h-screen w-8/12 bg-background bg-cover bg-right z-0 shadow-[0px_20px_0_rgba(0,0,0,1)] fixed right-0 top-0 flex items-center">
      <div className="mt-8 absolute right-20  shadow-[20px_20px_0_rgba(0,0,0,1)] border-4 border-black rounded-2xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
            <h2 className="text-center text-3xl font-bold">Add <span className="text-indigo-600">new stay</span></h2>
            <form className="space-y-6 py-6" onSubmit={(e) => addStay(e)} method="POST">
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                  Offer link
                </label>
                <div className="mt-1">
                  <input
                    id="link"
                    name="link"
                    type="text"
                    autoComplete="link"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-2">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Total price $
                  </label>
                  <div className="mt-1">
                    <input
                      id="price"
                      name="price"
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
              <div className="grid w-full grid-cols-2">
                <div>
                  <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                    Event name
                  </label>
                  <div className="mt-1">
                    <input
                      id="event"
                      name="event"
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
                      type="number"
                      autoComplete="spots"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1 h-24 w-full bg-gray-200 rounded-lg"></div>
              </div>

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
      </div>
      <div style={{marginTop: "100vh"}} className="z-20 bg-white w-full absolute border-t-8 border-black ">
      <div className="pt-12 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
            Trusted by devs from 5 continents
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            First ever crypto booking service designed to book accommodation for your next web3 event.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white sm:pb-24 ">
        <div className="relative">
          <div className="absolute inset-0 h-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 border-4 border-black sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Refund Guarantee</dt>
                  <dd className="order-1 text-5xl tracking-tight font-bold text-indigo-600 ">100%</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Response Time</dt>
                  <dd className="order-1 text-5xl tracking-tight font-bold text-indigo-600">5 min</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Support</dt>
                  <dd className="order-1 text-5xl tracking-tight font-bold text-indigo-600">24/7</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{backgroundColor: "#F0EEFA"}} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
           How can I do it?
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Find accommodation on your favorite booking service and book with us for crypto.
          </p>
        </div>
      </div>
      <div className="flex mt-8 justify-center py-12 items-center">
        <div className="w-72 h-96 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 border-black rounded-xl flex flex-wrap justify-center ml-10 mr-10 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180">
          <div className="w-full h-40 bg-backblur bg-center bg-cover rounded-md"></div>
          <div className="w-20 h-20 bg-createIcon bg-center bg-contain bg-no-repeat absolute mt-8"></div>
          <h3 className="text-center font-black text-3xl ">Add stay</h3>
          <p className="text-center font-medium text-l w-5/6">Find a stay on service like Airbnb, copy the link and add new offer to our platform.</p>
        </div>
        <div className="w-20 h-10 bg-arrow bg-center bg-contain bg-no-repeat ml-6">
        </div>
        <div className="w-72 h-96 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 border-black rounded-xl flex flex-wrap justify-center ml-10 mr-10 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 ">
          <div className="w-full h-40 bg-backblur bg-center bg-cover rounded-md"></div>
          <div className="w-20 h-20 bg-sendIcon bg-center bg-contain bg-no-repeat absolute mt-8"></div>
          <h3 className="text-center font-black text-3xl">Fund it</h3>
          <p className="text-center font-medium text-l w-5/6">You can book alone or with frens. All funds will be safely stored on a smart contract.</p>
        </div>
        <div className="w-20 h-10 bg-arrow bg-center bg-contain bg-no-repeat ml-6">
        </div>
        <div className="w-72 h-96 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 border-black rounded-xl flex flex-wrap justify-center ml-10 mr-10 hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180" >
          <div className="w-full h-40 bg-backblur bg-center bg-cover rounded-md"></div>
          <div className="w-20 h-20 bg-checkIcon bg-center bg-contain bg-no-repeat absolute mt-8"></div>
          <h3 className="text-center font-black text-3xl">Book it</h3>
          <p className="text-center font-medium text-l w-5/6">Once the price target is met you confirm booking and receive details within 24h.</p>
        </div>
      </div>
    </div>
  
    <div className="py-24 pb-36" id="upcoming">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
           Upcoming web3 events
          </h2>
          <p className="mt-4 font-bold text-indigo-500 text-lg">YOU DO NOT WANT TO MISS</p>
        </div>
      </div>
      <div className="w-full justify-center flex">
        <Link href="/events/1">
        <div className="w-4/12 h-64 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mr-12 mt-16 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
            <div className="w-full h-40 bg-ETHBogota bg-center bg-cover rounded-md"></div>
            <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
              <h3 className="text-2xl ml-2 mt-2 font-bold text-gray-900">ETHBogota</h3>
              <p className="text-right mt-2 text-lg leading-6 font-medium text-gray-500 mr-2 mt-2">7-9 Oct</p>
              <p className="ml-2 text-lg leading-6 font-medium text-gray-500">ETHGlobal</p>
              <p> </p>
            </div>
          </div>
          </Link>
          <Link href="/events/1">
          <div className="w-4/12 h-64 bg-white shadow-[12px_15px_0_rgba(0,0,0,1)] border-4 ml-12 mr-12 mt-16 border-black rounded-xl hover:scale-105 hover:shadow-[20px_20px_0_rgba(0,0,0,1)] transition ease-in duration-180 cursor-pointer">
            <div className="w-full h-40 bg-ETHSanFrancisco bg-center bg-cover rounded-md"></div>
            <div className="w-full grid grid-cols-2 grid-rows-2 items-center">
              <h3 className="text-2xl ml-2 mt-2 font-bold text-gray-900">ETHSanFrancisco</h3>
              <p className="text-right mt-2 text-lg leading-6 font-medium text-gray-500 mr-2 mt-2">4-6 Nov</p>
              <p className="ml-2 text-lg leading-6 font-medium text-gray-500">ETHGlobal</p>
              <p> </p>
            </div>
          </div>
          </Link>
        </div>
      </div>
      <Footer />
      </div>
    </>
  )
}
