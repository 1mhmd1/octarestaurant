import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
export const RestsContext = createContext(null);

export function RestsProvider({ children }) {
  const [rests, setRests] = useState([]);
  const [loadingRests, setLoadingRests] = useState(true);
  useEffect(() => {
    async function loadRests() {
      try {
        const response = await fetch("http://localhost/restaurant/restaurantAPIs/getRests.php");
        const data = await response.json();
        setRests(data.data || []);
      } catch (error) {
        console.error("Error loading rests:", error);
      } finally {
        setLoadingRests(false);
      }
    }
    loadRests();
  }, []);
  return (
    <RestsContext.Provider value={{ rests, setRests, loadingRests }}>
      {children}
    </RestsContext.Provider>
  );
}

function CatSkeleton() {
  return (
    <div className="flex gap-6">
      {Array(6).fill(null).map((_, i) => (
        <div key={i} className="h-10 w-24 rounded-full bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
function RestCardSkeleton() {
  return (
    <>
     {Array(6).fill(null).map((_, i) => (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="mt-3 h-4 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
    ))}
 </> );
}

function Rest() {
  const navigate = useNavigate();
  const { rests, setRests } = useContext(RestsContext);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [searchInput , setSearchInput] = useState("");
  const [loadingCats , setLoadingCats] = useState(true);
  const [loadingRests , setLoadingRests] = useState(true);
  useEffect(() => {
    async function getCat() {
      try {
        let response = await fetch(
          "http://localhost/restaurant/restaurantAPIs/restCat.php"
        );
        let data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      finally {
      setLoadingCats(false);
    }
    }
    getCat();
  }, []);
    async function fetchRests() {
      try {
        let url
        if(activeCat === "all"){
            url ="http://localhost/restaurant/restaurantAPIs/getRests.php";
    }
        else{
            url =`http://localhost/restaurant/restaurantAPIs/searchRest.php?category=${encodeURIComponent(activeCat)}`;
    }
            let response = await fetch(url);
            let data = await response.json();
            setRests(data.data)
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }  finally {
    setLoadingRests(false);
  }
    }
  useEffect(() => {
    fetchRests(activeCat);
  }, [activeCat]);
    function handleInputChange(e) {
        setSearchInput(e.target.value); 
    }
    useEffect(()=>{
        search();
    },[searchInput]);
    function search(){
        if(!searchInput){
           fetchRests()
            return;
        }
        const searched = rests.filter(rest =>
        rest.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setRests(searched)
}
  return (
    <>
        {/* search */}
    <div className="relative  top-6 w-11/12 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent to-primary/5  p-12">
        <h1 className="font-bold text-4xl   ">Hungry? We've got you covered</h1>
        <p className="relative text-lg text-muted-foreground top-2">Order from your favorite restaurants</p>
        <input type="text" value={searchInput} name="search" onChange={handleInputChange} className="relative top-6 w-[448px] h-12 pt-2 pl-12 pb-2 pr-3 rounded-xl" placeholder="Search restaurants or cuisines"/>
    </div>
        {/* categories */}
      <div className="relative top-4 flex flex-wrap gap-4 w-auto mt-6 mx-[64px] mb-0 pb-2">
        {loadingCats ? <CatSkeleton /> : <ul className="flex gap-6 ">
          <li>
            <button onClick={() => setActiveCat("all")} className={`px-4 py-2 rounded-full transition-colors duration-200 ${activeCat === "all" ? "bg-primary text-white" : "bg-secondary hover:bg-accent"}`}>All</button>
          </li>
          {categories.map((cat) => (
            <li key={cat.rest_cat_id}>
              <button onClick={() => setActiveCat(cat.cat_name)} className={`px-4 py-2 rounded-full transition-colors duration-200
                ${activeCat === cat.cat_name? "bg-primary text-white": "bg-secondary hover:bg-accent"}`}>{cat.cat_name} </button>
            </li>
          ))}
        </ul>}     
      </div>
      {/* restaraunts */}
      <div className="relative top-6 w-11/12 mx-auto pb-24">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {activeCat === "all" ? "All Restaurants" : `Category: ${activeCat}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingRests ?<RestCardSkeleton  /> : rests.map((rest) => (
            <div onClick={() => navigate(`/restMenu/${rest.rest_id}`)}className="group block cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img src={rest.image_url} className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-110"/>
                <div className="p-4">
                <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{rest.name}</h3>
                <button className="text-black text-lg hover:text-primary transition-colors"><i onClick={(e)=> e.stopPropagation()} className="fa-solid fa-heart"></i></button>
                </div>
                  <p className="text-gray-500">{rest.location}</p>
                </div>
              </div>
            </div>
          ))} 

          
        </div>
      </div>
    </>
  );
}
export default Rest;