import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Image from "next/image";
import Loading from "../components/Loading";
import Link from "next/link";


export default function Success() {

  return (
    <>
      <Loading />
      <Navbar style="dark" showNav={true}/>
      <div className="w-full h-full lg:h-screen flex justify-center">
        <div className="w-11/12 lg:w-10/12 h-full lg:h-4/6 flex flex-wrap items-center pt-4 lg:pt-0 lg:pt-0 border-4 border-gray-200 mt-36 lg:mt-36 rounded-xl bg-gray-100 px-6 lg:px-12 justify-center">
            <div className="flex flex-wrap justify-center -mt-14">
                <div className="h-44 w-44 bg-staySuccess bg-contain bg-center bg-no-repeat"></div>
                <h1 className="w-full text-5xl text-center font-black text-gray-900 mt-4">Success!</h1>
                <div className="w-full flex justify-center">
                    <h2 className="w-1/2 mt-4 text-center text-xl text-gray-500">You have successfuly joined a stay! Once all funds are raised we will drop you an email and book it!</h2>
                </div>
                <Link href="/"><button className="px-28 py-6 mt-10 bg-indigo-600 text-white font-bold rounded-xl">Back to homepage</button></Link>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

