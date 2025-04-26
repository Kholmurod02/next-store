"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import logo from '@/images/logoFastCart.png'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { CircleUser, Heart, LogOut, Menu, Search, ShoppingCart, User, X, ChevronDown, LogIn } from 'lucide-react'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import LanguageSwitcher from './languageSwitcher'
import { useGetProductsFromCartQuery } from '@/store/api/cartApiSlice'

const Header = () => {
    const t = useTranslations("Header")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)

    const { data } = useGetProductsFromCartQuery("")

    // Handle scroll effect for glass morphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

     function handleLogOut (){
        localStorage.removeItem("access_token")
    }

    return (
        <>
            <header className={`flex justify-between items-center px-4 md:px-8 py-3 sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/85 backdrop-blur-md shadow-md'
                    : 'bg-white shadow-sm'
                }`}>
                <div className="flex items-center gap-6">
                    {/* Mobile menu button */}
                    <button className='md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors' onClick={toggleDrawer}>
                        <Menu className='text-gray-700' />
                    </button>

                    {/* Logo with slight animation on hover */}
                    <Link href="/" className="group">
                        <div className="overflow-hidden">
                            <Image
                                src={logo}
                                alt='Fast Cart Logo'
                                className='w-32 md:w-40 transition-transform duration-300 group-hover:scale-105'
                            />
                        </div>
                    </Link>
                </div>

                {/* Navigation - with animated underline effect */}
                <nav className='hidden md:flex gap-6 lg:gap-10'>
                    {['1', '2', '3', '4'].map((item, index) => (
                        <Link key={index} href={index === 0 ? "/" : index === 1 ? "/contact" : index === 2 ? "/about" : "/registration"}>
                            <div className="relative group">
                                <h1 className='text-lg lg:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors'>
                                    {t(item)}
                                </h1>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Search bar with expanding animation */}
                    <div className={`hidden md:flex bg-gray-50 rounded-full border border-gray-200 transition-all duration-300 ${searchFocused
                            ? 'w-72 lg:w-96 border-blue-400 shadow-sm'
                            : 'w-52 lg:w-64 hover:border-blue-300'
                        }`}>
                        <div className="flex items-center w-full px-4 py-2">
                            <Search className={`${searchFocused ? 'text-blue-600' : 'text-gray-400'} transition-colors`} size={18} />
                            <Input
                                type="text"
                                className='border-hidden bg-transparent text-sm ml-2 focus:outline-none focus-visible:ring-0'
                                placeholder={t("5")}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                            />
                        </div>
                    </div>

                    {/* Language selector with custom design */}
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>

                    {/* User actions with pulse animation for notifications */}
                    <div className='flex items-center gap-3 md:gap-2 lg:gap-3'>
                        <Link href={"/wishlist"} className='relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110'>
                            <Heart className='w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors' />
                            {/* Animated notification indicator */}
                            {/* <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse'>0</span> */}
                        </Link>

                        <Link href={"/cart"} className='relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110'>
                            <ShoppingCart className='w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors' />
                            {data?.data?.totalProducts > 0 && (
                                <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse'>
                                    {data?.data?.totalProducts}
                                </span>
                            )}
                        </Link>

                        {/* User menu with improved dropdown */}
                        <Popover>
                            <PopoverTrigger>
                                <div className='p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 flex items-center'>
                                    <User className='w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors' />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='w-56 p-0 shadow-lg border border-gray-200 rounded-xl overflow-hidden'>
                                {/* <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white'>
                                    <h3 className='font-medium'>Welcome!</h3>
                                    <p className='text-xs text-blue-100'>Manage your account</p>
                                </div> */}
                                <div className='flex flex-col p-1'>
                                    <Link href={"/account"}>
                                        <h1 className='flex items-center gap-3 hover:bg-gray-50 hover:text-blue-600 p-3 rounded-md transition-colors duration-200 text-sm'>
                                            <CircleUser size={16} />My Account
                                        </h1>
                                    </Link>
                                    <hr className='my-1' />
                                    <Link href={"/login"}>
                                        <h1 className='flex items-center gap-3 hover:bg-gray-50 hover:text-blue-600 p-3 rounded-md transition-colors duration-200 text-sm'>
                                            <LogIn size={16} />Log In
                                        </h1>
                                    </Link>
                                    <hr className='my-1' />
                                    <button
                                        onClick={handleLogOut}
                                        className='flex items-center gap-3 hover:bg-gray-50 hover:text-blue-600 p-3 rounded-md transition-colors duration-200 text-sm'>
                                        <LogOut size={16} />Log Out
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </header>

            {/* Mobile search bar - floating pill design */}
            <div className='md:hidden fixed bottom-4 left-4 right-4 bg-white shadow-lg rounded-full border border-gray-200 z-30 transition-all'>
                <div className='flex items-center p-2 px-4'>
                    <Search className='text-gray-400 flex-shrink-0' size={18} />
                    <Input
                        type="text"
                        className='border-hidden bg-transparent text-sm focus:outline-none focus-visible:ring-0 ml-2'
                        placeholder={t("5")}
                    />
                </div>
            </div>

            {/* Mobile Navigation Drawer - with animations and improved layout */}
            {isDrawerOpen && (
                <div className='md:hidden fixed inset-0 bg-white z-40 p-4 animate-in slide-in-from-left duration-300'>
                    <div className='flex justify-between items-center mb-6'>
                        <Image src={logo} alt='Fast Cart Logo' className='w-32' />
                        <button
                            onClick={toggleDrawer}
                            className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
                        >
                            <X className='text-gray-700' />
                        </button>
                    </div>

                    {/* Language selector with custom styling */}
                    <div className='mb-8'>
                        <h2 className='text-sm text-gray-500 mb-2 font-medium'>Select Language</h2>
                        <Select>
                            <SelectTrigger className="w-full text-sm border-gray-200 rounded-xl bg-gray-50">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ru">Russian</SelectItem>
                                <SelectItem value="tj">Tajik</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Mobile navigation with hover effects */}
                    <nav className='flex flex-col gap-1'>
                        {['1', '2', '3', '4'].map((item, index) => (
                            <Link
                                key={index}
                                href={index === 0 ? "/" : index === 1 ? "/contact" : index === 2 ? "/about" : "/registration"}
                                onClick={toggleDrawer}
                            >
                                <div className='flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-colors'>
                                    <h1 className='text-lg font-bold text-gray-800'>{t(item)}</h1>
                                    <ChevronDown size={18} className="text-gray-400" />
                                </div>
                            </Link>
                        ))}
                    </nav>

                    <div className='mt-8 flex flex-col gap-4'>
                        <Link href={"/account"} onClick={toggleDrawer}>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100'>
                                <CircleUser className="text-blue-600" />
                                <div>
                                    <h3 className="font-bold">My Account</h3>
                                    <p className="text-xs text-gray-500">View profile details</p>
                                </div>
                            </div>
                        </Link>

                        {/* Quick action buttons */}
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <Link href={"/wishlist"} onClick={toggleDrawer}>
                                <div className='flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all'>
                                    <div className='relative p-2 bg-white rounded-full shadow-sm'>
                                        <Heart className='text-blue-600' size={20} />
                                    </div>
                                    <span className='text-sm font-medium'>Wishlist</span>
                                </div>
                            </Link>
                            <Link href={"/cart"} onClick={toggleDrawer}>
                                <div className='flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all'>
                                    <div className='relative p-2 bg-white rounded-full shadow-sm'>
                                        <ShoppingCart className='text-blue-600' size={20} />
                                        {data?.data?.totalProducts > 0 && (
                                            <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>
                                                {data?.data?.totalProducts}
                                            </span>
                                        )}
                                    </div>
                                    <span className='text-sm font-medium'>Cart</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop with blur effect for mobile drawer */}
            {isDrawerOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                    onClick={toggleDrawer}
                />
            )}
        </>
    )
}

export default Header