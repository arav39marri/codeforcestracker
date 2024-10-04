import React, { useState, useEffect } from "react";
import "./Show.css";
import { FaSort } from "react-icons/fa";
import animation from "../animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSelector } from 'react-redux';

const Show = () => {

  const dat = useSelector((state) => state.mySlice.items);

  const [data,setData] = useState(dat);
  const [Namet, toggleName] = useState(false);
  const [ratingt, toggleRating] = useState(false);

  const [loading, setLoading] = useState(true);
  const SortName = () => {
    const sortedData = [...data].sort((a, b) => {
      if (Namet) return b.name.localeCompare(a.name);
        return a.name.localeCompare(b.name);
    });
    setData(sortedData);
    toggleName((Namet) => !Namet);
  };
  const SortRating = () => {
    const sortedData = [...data].sort((a, b) => {
      if (ratingt) return b.rating - a.rating;
       return a.rating - b.rating;
    });
    setData(sortedData);
    toggleRating((ratingt) => !ratingt);
  };

useEffect(()=>{
    if (dat.length > 0 && data.length===0) {
        setLoading(false);
        setData(dat); 
      } 
    if( data.length>0 && !ratingt){
        const sortedData = [...data].sort((a, b) => {
             return b.rating - a.rating;
          });
          setData(sortedData);
          toggleRating(true);
          setLoading(false);
    }

},[dat,data,ratingt]);

  return (
    <div className="pl-16  flex flex-col gap-8 md:mr-[0%] mr-[6%] ">
     
     <div className="flex text-4xl pt-5    justify-center font-bold ">
        <p>Leader Board</p>
      </div>

      {
       loading ? (
        <Player
          src={animation}
          loop
          className="player"
          autoplay
          style={{ height: "300px", width: "300px" }}
        />
      ) :
       (
         <div className="overflow-auto ">
         <table className=" border border-black sm:text-lg bg-slate-500 text-sm w-[80%] ">
          <thead className="bg-slate-600 text-white">
            <tr>
              <th
                onClick={() => SortName()}
                className="sticky left-0 bg-slate-600  border-r border-black"
              >
                SNo
              </th>
              <th
                onClick={() => SortName()}
                className="sticky left-12 bg-slate-600  border-r border-black"
              >
                Name
              </th>
              <th className="border-r border-black">Handle</th>
              <th className="border-r border-black">Rank</th>
              <th 
              onClick={() => SortRating()} 
              >
                <div className="flex justify-center">Rating <FaSort /></div>
              </th>
              <th>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele, index) => (
                
              <tr
                key={index}
                className={`${index % 2 ? 'bg-slate-50' : 'bg-slate-200'} border-black`}
              >
                <td className="text-center sticky left-0 bg-slate-300 border-r border-black  ">
                  {index + 1}
                </td>
                <td className="text-center sticky left-12 bg-slate-200 border-r border-black ">
                  {ele.name}
                </td>
                <td className="text-center border-r border-black">{ele.handle   }</td>
                <td className="text-center border-r border-black">{ele.rank}</td>
                <td className="text-center border-r border-black">{ele.rating}</td>
                <td className="text-center">
                  {Math.floor((Date.now() - ele.lastOnlineTimeSeconds * 1000) / (1000 * 60 * 60)) === 0
                    ? 'online'
                    : Math.floor((Date.now() - ele.lastOnlineTimeSeconds * 1000) / (1000 * 60 * 60)) < 23
                    ? Math.floor((Date.now() - ele.lastOnlineTimeSeconds * 1000) / (1000 * 60 * 60)) + ' hours ago'
                    : Math.floor((Date.now() - ele.lastOnlineTimeSeconds * 1000) / (1000 * 60 * 60 * 24 * 365)) === 0
                    ? Math.floor((Date.now() - ele.lastOnlineTimeSeconds * 1000) / (1000 * 60 * 60 * 24)) + ' days ago'
                    : Math.floor((Date.now() - ele.lastOnlineTimeSeconds * 1000) / (1000 * 60 * 60 * 24 * 365)) + ' years ago'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          
     )
   
     }
      </div>
   )
}

export default Show;
