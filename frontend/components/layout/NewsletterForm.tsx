import React, {useState} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";

const NewsletterForm = ({ onSubmitted }: any) => {

    const [email, setEmail] = useState('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    email &&
    email.indexOf("@") > -1 &&
    onSubmitted({
        EMAIL: email,
    });
}

    return (
      <div className='w-full flex justify-center lg:justify-start lg:ml-8'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input className="border-2 border-gray-300 px-4 h-12 w-64 rounded-xl outline-2 outline-indigo-600" placeholder='Email' onChange={(e) => setEmail(e.target.value)} type="email" value={email}/>
          <input className="text-white bg-indigo-600 w-48 h-12 rounded-xl mt-4 md:ml-10 mb-2 font-bold cursor-pointer" type="submit" value="Join waitlist!"/>
        </form>
      </div>
    );
};

export default NewsletterForm;