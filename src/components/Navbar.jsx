import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define navigation items
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/post-job", title: "Post A Job" },
  ];

  // Adjust paths for employer routes
  const employerNavItems = [
    { path: "/employer-dashboard", title: "My Jobs" },
    { path: "/employer-post-job", title: "Post A Job" },
  ];

  // Filter nav items based on the current location
  const filteredNavItems =
    location.pathname.startsWith('/applicant')
      ? navItems.filter(item => item.title !== "My Jobs" && item.title !== "Post A Job" && item.title !== "Start a search")
      : location.pathname.startsWith('/employer')
      ? employerNavItems
      : navItems;

  // Determine the link for the CampusGig logo
  const campusGigLink = location.pathname.startsWith("/applicant") ? "/applicant-dashboard" : "/";

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to={campusGigLink} className="flex items-center gap-2 text-2xl">
          <img src="../public/images/As.jpeg" alt="JobPortal Logo" className="w-16 h-16" />
          <span>CampusGig</span>
        </Link>

        {/* nav items */}
        <ul className="hidden md:flex gap-12">
          {filteredNavItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* sign up signout btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user ? (
            <div className="flex gap-4 items-center">
              <button onClick={handleLogout} className="py-2 px-5 border rounded hover:bg-blue hover:text-white">Log out</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="bg-blue py-2 px-5 text-white rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary/75" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary/75" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {filteredNavItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white first:text-white py-1">
              <NavLink onClick={handleMenuToggler} to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                {title}
              </NavLink>
            </li>
          ))}
          {!user && (
            <li className="text-white py-1">
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
