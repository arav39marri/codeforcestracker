import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { setData } from './redux/features/fetch'; 
import Createuser from './Components/Createuser';
import Show from './Components/Show';
import Navbar from './Components/Navbar';
import Allusers from './Components/Allusers';
import Home from './Components/Home';


function App() {

  const [info, setInfo] = useState([]);
  const databaseUrl = process.env.REACT_APP_URL;
  const dispatch = useDispatch(); 

   
  useEffect(() => {
    async function fetchFromDb() {
      try {
        const res = await axios.get(`${databaseUrl}/show`);
         setInfo(res.data); 
  
      } 
      catch (err) {
        console.log("Error in fetching data", err);
      }
    }
    fetchFromDb();
  }, [databaseUrl]); 

  useEffect(() => {
    async function fetchCodeforcesData() {
      if (info.length === 0) {
        return;
      }
  
      try {
        // simple 6 hour cache in localStorage to avoid frequent CF API calls
        const CACHE_KEY = 'cf_cache';
        const SIX_HOURS = 1000 * 60 * 60 * 6;
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < SIX_HOURS && Array.isArray(parsed.data)) {
              // use cached
              dispatch(setData(parsed.data));
              return;
            }
          }
        } catch (e) {
          // ignore parse errors and continue to fetch
        }

        const results = [];

        for (const ele of info) {
          const curr = ele.handle;
          try {
            const res = await axios.get(
              `https://codeforces.com/api/user.info?handles=${curr}&checkHistoricHandles=false`
            );
            const mergedData = {
              ...res.data.result[0],
              name: ele.name,
              createdAt: ele.createdAt,
            };
            results.push(mergedData);
            console.log(mergedData) ;
          } catch (error) {
            console.log("Error in fetching data from Codeforces API", error);
          }
        }

        // persist results as JSON along with timestamp for caching
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: results }));
          localStorage.setItem('alldata', JSON.stringify(results));
        } catch (e) {
          // storage might fail in some environments
          console.warn('Could not write to localStorage', e);
        }

        dispatch(setData(results)); 
      } catch (err) {
        console.log("Error in fetching Codeforces data", err);
      } finally {
 
      }
    }
  
    if (info.length > 0) {
      fetchCodeforcesData();
    }
  }, [info, dispatch]);

  return (
   <div className='h-screen st  w-[100%]  text-white '>
     <div className='pt-32 flex   flex-col justify-center items-center'>
       <h1 className='font-bold lg:text-6xl text-4xl' > Elevate Your </h1>
     
       <h1 className='m-5 text-[#60A5FA] font-bold lg:text-6xl md:text-5xl text-2xl'> Competetive Programming</h1>
     </div>
     <p className='text-[#b8c1cd] sm:pl-44 pl-10 font-medium text-xl subtext ' > 
      tracks your progress as well as your Competetive Programming companions progress on codeforces  </p>
   </div>

  );
}

export default App;
