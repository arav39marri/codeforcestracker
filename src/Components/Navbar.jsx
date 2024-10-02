import React, { useState } from 'react';
import { SiPivotaltracker } from "react-icons/si";
import { Link, useLocation } from 'react-router-dom';
import { IoMenuSharp, IoClose } from "react-icons/io5";
import './Navbar.css'
const Navbar = () => {
    const [icon, setIcon] = useState(true);
    const handleToggle = () => {
        setIcon(!icon);
    };
    const currentLocation = useLocation();
   
   

    return (
        <div className='bg-slate-800 flex text-white min-h-14 items-center gap-5  w-full '>
            <div className='p-3 flex items-center justify-start gap-6 w-[20%]  '   >
            <SiPivotaltracker className='text-2xl' />
            <p className='font-bold text-xl '> Tracker</p>
            </div>
            <div className='p-1 w-[80%] '  >
            <ul className='md:flex hidden items-center   justify-start gap-10 text-lg font-semibold '>
                    <Link to="/show">
                        <li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/show' ? 'active' : ''}`}>
                        LeaderBoard
                        </li>
                    </Link>
                    <Link to="/Createuser">
                        <li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/Createuser' ? 'active' : ''}`}>
                        Add user
                        </li>
                    </Link>
                    <Link to="/Allusers">
                        <li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/Allusers' ? 'active' : ''}`}>
                        All users
                        </li>
                    </Link>
            </ul>
               { 
                 icon ? 
                 (<div  className=' md:hidden relative   right-0 bg-slate-800   top-0 p-3    ' >
                    <div className=' flex justify-end '>
                    <IoMenuSharp className="text-3xl text-right " onClick={handleToggle} />
                        </div>
                 </div> ) :
                 ( <div className='md:hidden  fixed  right-0  w-[40%] bg-slate-800   transition-transform rounded-xl h-screen   top-0 p-3 '   >
                        <div className=' flex justify-end '>
                        <IoClose className="text-3xl text-white text-right cursor-pointer" onClick={handleToggle} />
                        </div>
                     <ul className="flex flex-col space-y-4 text-white text-lg bg-slate-800 w-full gap-6 p-4 ">
                       <Link to="/show"  className='text-center' onClick={handleToggle}  ><li className=' hnd p-1 pr-1' >LeaderBoard</li> </Link>
                         <Link to="/Createuser " className='text-center' onClick={handleToggle}   ><li className=' hnd p-1 pr-1' >Add user</li></Link>
                        <Link to="/Allusers" className='text-center' onClick={handleToggle}  ><li className='  hnd p-1 pr-1' >All users</li></Link>
                    </ul>
                 </div> 
                   
                
                )
              }
            </div>
        </div>
        
    );
};

export default Navbar;
