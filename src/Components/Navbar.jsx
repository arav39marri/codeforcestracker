
import React, { useState, useEffect } from 'react';
import { SiPivotaltracker } from "react-icons/si";
import { Link, useLocation } from 'react-router-dom';
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { useNavigate  } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(v => !v);
    const currentLocation = useLocation();
   const navigate = useNavigate() ;
    
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);
    const handle = (()=>{
        navigate('/') ;
    })

    return (
        <div className='st flex text-white min-h-14 items-center gap-5 w-full relative z-20'>
            <div className='p-3 cursor-pointer flex items-center justify-start gap-6 w-[20%]' onClick={handle}>
                <div className='block'><SiPivotaltracker className='md:text-2xl text-5xl' /></div>
                <p className='font-bold text-xl' > Tracker</p>
            </div>

            <div className='p-1 md:w-[80%] w-[30%] absolute right-0'>
                <ul className='md:flex hidden items-center justify-start gap-10 text-lg font-semibold'>
                    <Link to="/"><li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/' ? 'active' : ''}`}>Home</li></Link>
                    <Link to="/show"><li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/show' ? 'active' : ''}`}>LeaderBoard</li></Link>
                    <Link to="/Createuser"><li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/Createuser' ? 'active' : ''}`}>Add user</li></Link>
                    <Link to="/Allusers"><li className={`hnd p-1 pr-1 ${currentLocation.pathname === '/Allusers' ? 'active' : ''}`}>All users</li></Link>
                </ul>

                {/* mobile menu button */}
                <div className='md:hidden relative top-0 p-3 flex justify-end'>
                    <IoMenuSharp className="text-3xl text-right cursor-pointer" onClick={() => setIsOpen(true)} />
                </div>
            </div>

            {/* backdrop */}
            <div
                aria-hidden={!isOpen}
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* sliding sidebar (mobile) */}
            <aside
                className={`md:hidden fixed right-0 top-0 h-screen w-[60%] sm:w-[45%] bg-[#0B091F] text-white p-4 transition-transform duration-500 ease transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-xl z-30`}
            >
                <div className='flex justify-end'>
                    <IoClose className="text-3xl cursor-pointer" onClick={() => setIsOpen(false)} />
                </div>
                <ul className="flex flex-col space-y-4 text-white text-lg w-full gap-6 p-4">
                     <Link to="/" className='text-center' onClick={() => setIsOpen(false)}><li className='hnd p-1 pr-1'>Home</li></Link>
                    <Link to="/show" className='text-center' onClick={() => setIsOpen(false)}><li className='hnd p-1 pr-1'>LeaderBoard</li></Link>
                    <Link to="/Createuser" className='text-center' onClick={() => setIsOpen(false)}><li className='hnd p-1 pr-1'>Add user</li></Link>
                    <Link to="/Allusers" className='text-center' onClick={() => setIsOpen(false)}><li className='hnd p-1 pr-1'>All users</li></Link>
                </ul>
            </aside>
        </div>
    );
};

export default Navbar;