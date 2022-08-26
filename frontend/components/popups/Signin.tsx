import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
 
export default function Signin(props: {onClose: any}){

    const handleCloseClick = () => {
        props.onClose();
    };

  return(
    <div className='fixed z-50 w-full h-screen flex justify-center items-center  backdrop-blur-lg cursor-pointer' onClick={handleCloseClick}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-xl border-4 border-black shadow-[20px_20px_0_rgba(0,0,0,1)]">
          <div className="bg-white py-8 pb-16 px-4  shadow sm:rounded-lg sm:px-10 cursor-auto v" onClick={(e) => e.stopPropagation()}>
            <h1 className=' text-center font-bold text-3xl'>Who is booking?</h1>
            <div className='flex pb-8 w-full justify-center'>
                    <p className='text-center mt-8 text-gray-500'>Note: We need your email to add you to bookings and send details on your reservations.</p>
                </div>
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="current-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                >
                  Add stay
                </button>
              </div>
            </form>
          </div>
          </div>
    </div>
  )
};