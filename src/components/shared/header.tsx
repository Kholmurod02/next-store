"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/images/logoFastCart.png'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { CircleUser, Heart, LogOut, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const Header = () => {
    const t = useTranslations("Header")

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <header className='flex justify-around items-center p-4 bg-white shadow-sm sticky top-0 z-50'>
                {/* Mobile menu button - moved to the left */}
                <button className='md:hidden flex items-center' onClick={toggleDrawer}>
                    <Menu className='text-gray-700' />
                </button>
                
                {/* Logo centered on mobile, left-aligned on desktop */}
                <div className="flex-1 flex justify-center md:justify-start">
                    <Image src={logo} alt='Fast Cart Logo' className='w-32 md:w-40' />
                </div>
                
                {/* Navigation - hidden on mobile, visible on larger screens */}
                <nav className='hidden md:flex gap-6 lg:gap-10'>
                    <Link href={"/"}>
                        <h1 className='text-lg lg:text-xl font-bold hover:text-blue-600 transition-colors'>{t("1")}</h1>
                    </Link>
                    <Link href={"/contact"}>
                        <h1 className='text-lg lg:text-xl font-bold hover:text-blue-600 transition-colors'>{t("2")}</h1>
                    </Link>
                    <Link href={"/about"}>
                        <h1 className='text-lg lg:text-xl font-bold hover:text-blue-600 transition-colors'>{t("3")}</h1>
                    </Link>
                    <Link href={"/registration"}>
                        <h1 className='text-lg lg:text-xl font-bold hover:text-blue-600 transition-colors'>{t("4")}</h1>
                    </Link>
                </nav>
                
                {/* Search bar - adaptive width */}
                <div className='hidden md:flex bg-gray-100 w-52 lg:w-72 p-2 items-center rounded-full gap-2 border border-gray-200 hover:border-blue-300 transition-all'>
                    <Input 
                        type="text" 
                        className='border-hidden bg-transparent text-sm focus:outline-none focus-visible:ring-0' 
                        placeholder={t("5")} 
                    />
                    <Search className='text-gray-500 hover:text-blue-600 cursor-pointer' size={18} />
                </div>

                {/* Language selector - moved to drawer on mobile, visible on desktop */}
                <div className="hidden md:block">
                    <Select>
                        <SelectTrigger className="w-20 md:w-24 text-sm border-gray-200">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="ru">RU</SelectItem>
                            <SelectItem value="tj">TJ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* User actions */}
                <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
                    <Link href={"/wishlist"} className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'> 
                        <Heart className='w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors' /> 
                        <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>0</span>
                    </Link>
                    
                    <Link href={"/cart"} className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <ShoppingCart className='w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors' />
                        <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>0</span>
                    </Link>
                    
                    <Popover>
                        <PopoverTrigger>
                            <div className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                                <User className='w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors' />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-48 p-2 shadow-lg border border-gray-200'>
                            <div className='flex flex-col gap-1'>
                                <Link href={"/account"}>
                                    <h1 className='flex items-center gap-3 hover:bg-gray-100 hover:text-blue-600 p-2 rounded-md transition-colors duration-200 text-sm'> 
                                        <CircleUser size={16} />My Account
                                    </h1>
                                </Link>
                                <hr className='my-1' />
                                <button className='flex items-center gap-3 hover:bg-gray-100 hover:text-blue-600 p-2 rounded-md transition-colors duration-200 text-sm'>
                                    <LogOut size={16} />Log Out 
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                
                {/* Mobile search - only visible on small screens */}
                <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-gray-200'>
                    <div className='flex bg-gray-100 p-2 rounded-full gap-2 border border-gray-200'>
                        <Input 
                            type="text" 
                            className='border-hidden bg-transparent text-sm focus:outline-none focus-visible:ring-0' 
                            placeholder={t("5")} 
                        />
                        <Search className='text-gray-500' size={18} />
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer - Shows only on mobile when menu button is clicked */}
            {isDrawerOpen && (
                <div className='md:hidden fixed inset-0 bg-white z-40 p-4 animate-in slide-in-from-left duration-300'>
                    <div className='flex justify-between items-center mb-6'>
                        <Image src={logo} alt='Fast Cart Logo' className='w-32' />
                        <button onClick={toggleDrawer}>
                            <X className='text-gray-700' />
                        </button>
                    </div>
                    
                    {/* Language selector moved to drawer */}
                    <div className='mb-6'>
                        <h2 className='text-sm text-gray-500 mb-2'>Select Language</h2>
                        <Select>
                            <SelectTrigger className="w-full text-sm border-gray-200">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">EN</SelectItem>
                                <SelectItem value="ru">RU</SelectItem>
                                <SelectItem value="tj">TJ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <nav className='flex flex-col gap-4'>
                        <Link href={"/"} onClick={toggleDrawer}>
                            <h1 className='text-xl font-bold py-2 border-b border-gray-100'>{t("1")}</h1>
                        </Link>
                        <Link href={"/contact"} onClick={toggleDrawer}>
                            <h1 className='text-xl font-bold py-2 border-b border-gray-100'>{t("2")}</h1>
                        </Link>
                        <Link href={"/about"} onClick={toggleDrawer}>
                            <h1 className='text-xl font-bold py-2 border-b border-gray-100'>{t("3")}</h1>
                        </Link>
                        <Link href={"/signup"} onClick={toggleDrawer}>
                            <h1 className='text-xl font-bold py-2 border-b border-gray-100'>{t("4")}</h1>
                        </Link>
                    </nav>

                    <div className='mt-8 flex flex-col gap-4'>
                        <Link href={"/account"} onClick={toggleDrawer}>
                            <h1 className='flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md'> 
                                <CircleUser />My Account
                            </h1>
                        </Link>
                        <div className='flex justify-around mt-4'>
                            <Link href={"/wishlist"} onClick={toggleDrawer} className='flex flex-col items-center gap-1'> 
                                <div className='relative p-3 bg-gray-100 rounded-full'>
                                    <Heart className='text-gray-700' />
                                    <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>0</span>
                                </div>
                                <span className='text-sm'>Wishlist</span>
                            </Link>
                            <Link href={"/cart"} onClick={toggleDrawer} className='flex flex-col items-center gap-1'>
                                <div className='relative p-3 bg-gray-100 rounded-full'>
                                    <ShoppingCart className='text-gray-700' />
                                    <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>0</span>
                                </div>
                                <span className='text-sm'>Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop for mobile drawer */}
            {isDrawerOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleDrawer}
                />
            )}
        </>
    )
}

export default Header