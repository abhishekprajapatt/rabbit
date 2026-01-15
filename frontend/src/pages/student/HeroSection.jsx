import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import SliderPager from "./SliderPage"
const HeroSection = () => {
  const { user } = useSelector((store) => store.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery('');
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-white sm:text-4xl text-3xl font-bold mb-4">
          Welcome back, {user?.name}
        </h2>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn and with Our wide range of courses.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Seach Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">
            Search
          </Button>
        </form>
        <Button
          onClick={() => navigate(`/course/search?query=${''}`)}
          type="submit"
          className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
        >
          Explore Courses
        </Button>
      </div>
      <div className="w-full flex items-center justify-center">
        {/* <SliderPager/> */}
      </div>
    </div>
  );
};

export default HeroSection;
