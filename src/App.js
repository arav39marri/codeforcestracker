import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { setData } from './redux/features/fetch'; 
import Createuser from './Components/Createuser';
import Show from './Components/Show';
import Navbar from './Components/Navbar';
import Allusers from './Components/Allusers';
import { Route, Routes } from 'react-router-dom';

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
            console.log(mergedData);
            results.push(mergedData);
          } catch (error) {
            console.log("Error in fetching data from Codeforces API", error);
          }
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
   <>
   <Navbar/>
     <Routes>
     <Route path='/' element={<Show/>}/>
      <Route path='/Createuser' element={<Createuser/>}/>
      <Route path='/Show' element={<Show/>}/>
      <Route path='/Allusers' element={<Allusers/>}/>
     </Routes>
   </>
  );
}

export default App;
