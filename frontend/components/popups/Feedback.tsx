import React from 'react';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function Feedback(props: {close: any, type: string}){


  return(
    <div onClick={() => props.close()} className="h-full w-full fixed top-0 left-0 z-50">
    <div onClick={(e) => e.stopPropagation()} className={classNames(props.type == "success" ? 
    `w-11/12 md:w-3/12 rounded-xl bg-green-200 fixed grid grid-cols-3 items-center py-2 px-4 right-5 md:left-auto top-20 md:right-5 shadow-[5px_5px_40px_-5px_rgba(0,0,0,0.15)]` : 
    `w-11/12 md:w-3/12 rounded-xl bg-red-200 fixed grid grid-cols-3 items-center py-2 px-4 right-5 md:left-auto top-20 md:right-5 shadow-[5px_5px_40px_-5px_rgba(0,0,0,0.15)]`)}>
       {props.type == "success" ? 
            <h2 className='font-medium text-xl text-green-400 col-span-2'>Transaction successful</h2>
            :
            <h2 className='font-medium text-xl text-red-400 col-span-2'>Transaction failed</h2>
       } 
      <button type="button" onClick={() => props.close()} className="py-2 rounded-md inline-flex items-center justify-end text-gray-600">
         <span className="sr-only">Close menu</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  </div>
  </div>
  )
};