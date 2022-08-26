import Navbar from "../components/layout/Navbar";

export default function Profile() {
  return (
    <>
      <Navbar style="light"/>
      <div className="w-full h-80 bg-dimmedBackground bg-cover bg-bottom bg-no-repeat fixed top-0 z-0">
      </div>
      <div className="w-full flex justify-center">
        <div className="absolute top-44 rounded-xl shadow-[20px_20px_0_rgba(0,0,0,0)] border-8 border-gray-200 h-2/3 w-8/12 bg-white">
          <h2 className="text-4xl font-black mt-6 ml-8">Hello Piotr</h2>
          <div className="w-full flex justify-center h-full mt-8">
            <div className="w-11/12 h-3/4 bg-gray-200 mx-0-auto rounded-xl">
              <h3 className="mt-4 ml-4 text-xl text-gray-500">Here are your stays:</h3>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
