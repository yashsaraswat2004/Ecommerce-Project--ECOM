"use client";
import { Fragment, useEffect, useState } from "react";
import { CiSearch, CiHeart } from "react-icons/ci";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { navigation } from "./navigationdata";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOut } from "../../state/Auth/Action";
import { CgProfile } from "react-icons/cg";
import { useCart } from "../context/CartContext";
function classNames(...classes) {
  return classes.filter(Boolean).join("");
}

export default function Navigation() {
  // const cartItems = useSelector((state) => state.cart.cartItems || []); // Default to empty array if cartItems is undefined
  // const cartCount = cartItems.length;
  const { count } = useCart();

  const [openPopover, setOpenPopover] = useState(null);
  const handleMouseEnter = (categoryName) => {
    setOpenPopover(categoryName); // Open the popover for the hovered category
  };
  const handleMouseLeave = () => {
    setOpenPopover(null); // Close the popover when not hovering
  };

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setanchorEl] = useState(null);
  const openuserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleUserClick = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setanchorEl(null);
  };
  // const [searchItem, setSearchItem] = useState("");
  // const handleInputChange = (e) => {
  //   const searchTerm = e.target.value;
  //   setSearchItem(searchTerm);
  // };

  const [close, setClose] = useState(false);

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpenPopover(null);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {}, [auth.user]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="bg-white pb-0">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <TabGroup as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <TabList className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </TabList>
                  </div>
                  <TabPanels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <TabPanel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <p className="-m-2 block p-2 text-gray-500">
                                    {"item.name"}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </TabGroup>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="/"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 fixed top-0 left-0 w-full z-50 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹1000
        </p>

        <nav aria-label="Top" className="mx-auto pt-10">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <NavLink to="/">
                  {/* <span className="sr-only">Your Company</span> */}
                  <h1 className="text-2xl font-bold cursor-pointer">ECOM</h1>
                  {/* <img
                    alt=""
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  /> */}
                </NavLink>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch z-10 cursor-pointer">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <NavLink
                      key={page.name}
                      to="/"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      {page.name}
                    </NavLink>
                  ))}

                  {navigation.categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex"
                      onMouseEnter={() => handleMouseEnter(category.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative flex">
                        <div
                          className={`${
                            openPopover === category.name
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-700 hover:text-gray-800"
                          } relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out`}
                        >
                          {category.name}
                        </div>
                      </div>

                      <Transition
                        show={openPopover === category.name} // This controls the visibility of the transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute inset-x-0 top-full text-sm text-gray-500">
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />
                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <img
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          className="object-cover object-center"
                                        />
                                      </div>
                                      <a
                                        href={item.href}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        <span
                                          className="absolute inset-0 z-10"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p
                                        id={`${section.name}-heading`}
                                        className="font-medium text-gray-900"
                                      >
                                        {section.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${section.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flex">
                                            <p
                                              onClick={() =>
                                                handleCategoryClick(
                                                  category,
                                                  section,
                                                  item,
                                                  close
                                                )
                                              }
                                              className="cursor-pointer hover:text-gray-800"
                                            >
                                              {item.name}
                                            </p>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  ))}
                </div>
              </PopoverGroup>

              {/* Search */}
              <div className="relative hidden md:block ml-32">
                <input
                  type="search"
                  // value={searchItem}
                  // onChange={handleInputChange}
                  placeholder="Search Products..."
                  className="pl-10 pr-4 py-2 w-[500px] rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <CiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              <div className="ml-auto flex items-center">
                {/* signin  */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user.firstName[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openuserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={() => navigate("/account/order/user")}
                        >
                          {" "}
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      <CgProfile size={"1.7rem"} />
                    </NavLink>
                  )}
                </div>
                {/* wishlist */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavLink
                    to="/wishlist"
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                  >
                    <CiHeart size={30} />
                  </NavLink>
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavLink
                    to="/cart"
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {" "}
                      {count}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
