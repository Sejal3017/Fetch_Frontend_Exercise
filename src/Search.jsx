import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Nav2 = lazy(async () => import('/Users/sejalbhanushali/Desktop/Fetch_demo/fetch-fe/src/elements/nav_2.jsx'));
const Footer = lazy(async () => import('/Users/sejalbhanushali/Desktop/Fetch_demo/fetch-fe/src/elements/footer.jsx'));


const Search = () => {
    
  
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({ breed: '', ageMin: '', ageMax: '' });
  const [pagination, setPagination] = useState({ size: 12, from: 0 });
  const [sort, setSort] = useState({ field: 'breed', direction: 'asc' });
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchDogs = useCallback(async () => {
    const { breed, ageMin, ageMax } = filters;
    const { size, from } = pagination;
    const { field, direction } = sort;

    const params = {
      breeds: breed ? [breed] : undefined,
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      size,
      from,
      sort: `${field}:${direction}`
    };

    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', { params, withCredentials: true });
      const dogIds = response.data.resultIds;
      const dogDetails = await fetchDogDetails(dogIds);
      setDogs(dogDetails);
      setTotalResults(response.data.total);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  }, [filters, pagination, sort]);

  const fetchDogDetails = async (dogIds) => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error fetching dog details:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (option) => {
    let field;
    let direction = 'asc';

    switch (option) {
      case 'nameAsc':
        field = 'name';
        direction = 'asc';
        break;
      case 'nameDesc':
        field = 'name';
        direction = 'desc';
        break;
      case 'breedAsc':
        field = 'breed';
        direction = 'asc';
        break;
      case 'breedDesc':
        field = 'breed';
        direction = 'desc';
        break;
      case 'ageAsc':
        field = 'age';
        direction = 'asc';
        break;
      case 'ageDesc':
        field = 'age';
        direction = 'desc';
        break;
      default:
        field = 'breed';
        direction = 'asc';
    }

    setSort({ field, direction });
  };

  const handlePagination = (direction) => {
    setPagination({
      ...pagination,
      from: direction === 'next' ? pagination.from + pagination.size : pagination.from - pagination.size
    });
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };

  const generateMatch = async () => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, { withCredentials: true });
      const matchId = response.data.match;
      const dogDetailsResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs',[matchId] , { withCredentials: true });
      const matchedDog = dogDetailsResponse.data[0];
      navigate(`/matched-dog/${matchId}`, { state: { matchedDog } });
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Nav2 />
      </Suspense>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-10 mt-10" style={{ color: '#300d38' }}>Fetch your future furry friend <FontAwesomeIcon icon={faPaw} className="ml-2" /> </h1>
        <h2 className="text-xl font-semibold text-center mb-6" style={{ color: '#300d38' }}> Discover the joy of companionship by selecting your favorite dogs from our list. We'll take care of the rest and help you find the pawfect furry match tailored just for you!</h2>
        <div className="bg-transparent p-6 mb-6">
  <div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
      <select
        name="breed"
        value={filters.breed}
        onChange={handleFilterChange}
        className="outline-none font-medium w-full p-3 border bg-white shadow-lg rounded"
      >
        <option value="">Explore Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    </div>
    <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
      <input
        placeholder="Minimum Age"
        type="number"
        name="ageMin"
        value={filters.ageMin}
        onChange={handleFilterChange}
        className="outline-none w-full p-2.5 border bg-white shadow-lg rounded font-medium"
        min="0"
        max="15"
      />
    </div>
    <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
      <input
        placeholder="Maximum Age"
        type="number"
        name="ageMax"
        value={filters.ageMax}
        onChange={handleFilterChange}
        className="outline-none w-full p-2.5 border bg-white shadow-lg rounded font-medium"
        min="0"
        max="15"
      />
    </div>
  </div>

  <div className="flex justify-center flex-wrap -mx-3 mb-4">
            <div className="w-full mt-6 md:w-1/3 px-2 mb-4 md:mb-0">
              <div className="flex items-center justify-center">
                <label className="mr-2 font-bold ">Sort:</label>
                <select
                  name="sortBy"
                  value={`${sort.field}${sort.direction === 'desc' ? 'Desc' : 'Asc'}`}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="outline-none font-medium p-3 border bg-white shadow-lg rounded w-1/2"
                >
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                  <option value="breedAsc">Breed (A-Z)</option>
                  <option value="breedDesc">Breed (Z-A)</option>
                  <option value="ageAsc">Age (Low-High)</option>
                  <option value="ageDesc">Age (High-Low)</option>
                </select>
              </div>
            </div>
          </div>
</div>



<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {dogs.map((dog) => (
    <DogCard key={dog.id} dog={dog} favorites={favorites} toggleFavorite={toggleFavorite} />
  ))}
</div>

<div className="flex justify-center mt-6">
  <button
    onClick={() => handlePagination('prev')}
    className="bg-[#300d38] mt-10 mb-6 text-white w-12 h-12 rounded mx-1 hover:bg-[#4b124f] flex items-center justify-center"
    disabled={pagination.from === 0}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <button
    onClick={() => handlePagination('next')}
    className="bg-[#300d38] mt-10 mb-6 text-white w-12 h-12 rounded mx-1 hover:bg-[#4b124f] flex items-center justify-center"
    disabled={(pagination.from + pagination.size) >= totalResults}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>

<div className="flex justify-center mt-6">
      <button
        onClick={generateMatch}
        className="inline-flex rounded-lg border-2 bg-[#300d38] border-white px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-900/5 hover:text-purple-950 hover:border-purple-900 active:bg-purple-800/5 active:text-purple-950"
        disabled={favorites.length === 0}>
        Generate Match
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </button>
    </div>

     

      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

const DogCard = ({ dog, favorites, toggleFavorite }) => {
    return (
        <div className="bg-white rounded-sm shadow-md p-2 text-center hover:shadow-lg transition-shadow">
    <img src={dog.img} alt={dog.name} className="w-full h-80 object-cover mb-4" />
    <h3 className="ml-2 text-left text-xl font-bold mb-3">{dog.name}</h3>
    <p className=" ml-2 text-left font-medium text-gray-700">Zip Code: {dog.zip_code}</p>
    <p className=" ml-2 text-left font-medium text-gray-700 mt-2">Breed: {dog.breed}</p>
    <div className="flex justify-between items-center">
        <p className="ml-2 text-left font-medium text-gray-700">Age: {dog.age}</p>
        <label className="cursor-pointer ml-2">
            <input
                type="checkbox"
                checked={favorites.includes(dog.id)}
                onChange={() => toggleFavorite(dog.id)}
                className="sr-only peer"
            />
            <div className="mr-4 text-gray-400 peer-checked:text-red-500 transition-colors duration-200">
                <FontAwesomeIcon icon={favorites.includes(dog.id) ? faHeartFull : faHeartEmpty} className="h-8 w-8" />
            </div>
        </label>
    </div>
</div>

      
    );
  };


export default Search;


