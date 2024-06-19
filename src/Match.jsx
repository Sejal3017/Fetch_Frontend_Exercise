import React, { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
const Nav2 = lazy(async () => import('./nav_2.jsx'));
const Footer = lazy(async () => import('./footer.jsx'));

const Match = () => {
    const location = useLocation();
    const matchedDog = location.state.matchedDog;

  return (
    <><><Suspense fallback={<div>Loading...</div>}>
          <Nav2 />
      </Suspense>
      
      <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-12 mt-12">Woof-tastic news! You and {matchedDog.name} are destined to be together</h1>
    <div className="max-w-sm mx-auto bg-white rounded-sm shadow-md p-2 text-center hover:shadow-lg transition-shadow mb-9 mt-20">
        <img src={matchedDog.img} alt={matchedDog.name} className="w-full h-64 object-cover mb-4 rounded-t-sm" />
        <h3 className="text-left text-xl font-bold mb-2">{matchedDog.name}</h3>
        <p className="text-left font-medium text-gray-700 mb-1">Zip Code: {matchedDog.zip_code}</p>
        <div className="flex justify-between items-center mb-2">
            <p className="text-left font-medium text-gray-700">Breed: {matchedDog.breed} / Age: {matchedDog.age}</p>
        </div>
    </div>
</div></><Suspense fallback={<div>Loading...</div>}>
              <Footer />
          </Suspense></>
  );
};

export default Match;