import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Createuser = () => {
    const [name,setName] = useState("");
        const [handle, setHandle] = useState("");
        const databaseUrl = process.env.REACT_APP_URL;
        const navigate = useNavigate();
    const submit =  async  (e)  => {
        e.preventDefault();

        try{
          await axios.get(`${databaseUrl}/create`,
                {
                    name,
                    handle,
                } 
    
            ).then(
              alert("user created successfully")
              
            )
            .then(
              navigate("/")
            )
        }
        catch(err){
          alert("user creation not  successfully")
            console.error(err);
        }
        
       console.log(name,handle);
        console.log('submitting');
        
    }
  return (
    <div className='text-blue-600 h-screen bg-slate-100'>
  <div className='flex flex-col pt-10 items-center justify-center px-4 md:px-8 lg:px-16'>
    <p className='text-2xl md:text-3xl font-bold mb-4'>Add User</p>
    <form onSubmit={submit} className='flex flex-col font-semibold bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
      <div className='flex flex-col gap-4'>
        <label htmlFor="name" className='text-sm md:text-base'>Name</label>
        <input
          type="text"
          id='name'
          placeholder='Enter name'
          onChange={(e) => setName(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 text-sm md:text-base'
        />
        <label htmlFor="handle" className='text-sm md:text-base'>Handle</label>
        <input
          type="text"
          id='handle'
          placeholder='Enter the handle'
          onChange={(e) => setHandle(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 text-sm md:text-base'
        />
        <button
          type='submit'
          className='bg-[#263eda] w-full text-center text-white py-2 rounded-lg text-sm md:text-base hover:bg-[#1a3b7a]'
        >
          Create User
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Createuser

