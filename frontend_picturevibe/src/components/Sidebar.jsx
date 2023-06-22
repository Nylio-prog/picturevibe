import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/logo.png';
import { categoriesQuery } from '../utils/data';
import { client } from '../client';


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';
function sortCategories(categories) {
  const sortedCategories = [...categories];

  sortedCategories.sort((a, b) => {
    if (a.name === 'others') return 1; // 'others' should be placed last
    if (b.name === 'others') return -1; // 'others' should be placed last
    return a.name.localeCompare(b.name); // sort by name alphabetically
  });

  return sortedCategories;
}


const Sidebar = ({ closeToggle, user }) => {
  const [categories, setCategories] = useState();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  useEffect(() => {
    client.fetch(categoriesQuery).then((data) => {
      setCategories(sortCategories(data));
    });
  }, []);

  

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
          {categories?.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt={category.name} />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
