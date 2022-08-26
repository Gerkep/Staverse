import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
  
export default function Create(props: {onClose: any}){

    const [loggedIn, setLoggedIn] = useState(false)

    const handleCloseClick = () => {
        props.onClose();
    };
    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoggedIn(true)
    }

    const signIn = () => {
        return (
            <div className="sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg border-4 rounded-xl border-black shadow-[20px_20px_0_rgba(0,0,0,1)]">
            <div className="bg-white py-8 pb-16 px-4 shadow sm:rounded-lg sm:px-10 cursor-auto " onClick={(e) => e.stopPropagation()}>
              <h1 className=' text-center font-bold text-3xl'>Sign in</h1>
              <div className='flex pb-8 w-full justify-center'>
                      <p className='text-center mt-8 text-gray-500'>Note: We need your email to add you to bookings and send details on your reservations.</p>
                  </div>
              <form className="space-y-6" onSubmit={(e) => logIn(e)}>
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
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            </div>
        )
    }
    const addForm = () => {
        return (
            <div className="mx-auto sm:rounded-lg border-4 border-black shadow-[20px_20px_0_rgba(0,0,0,1)]">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
            <h2 className="text-center text-3xl font-bold">Add new stay</h2>
            <form className="space-y-6 py-6" action="#" method="POST">
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
              <div className="flex w-full">
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
              <div className="flex w-full">
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
        )
    }

  return(
    <div className='fixed z-50 w-full h-screen flex justify-center items-center backdrop-blur-lg cursor-pointer' onClick={handleCloseClick}>
          {loggedIn ? addForm() : signIn()}
    </div>
  )
};