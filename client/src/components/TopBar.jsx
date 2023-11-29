import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiFillSmile } from "react-icons/ai";
import TextInput from './TextInput';
import CustomButton from './CustomButton';
import { useForm } from 'react-hook-form';
import { BsMoon, BsSun } from 'react-icons/bs';
import { IoMdNotificationsOutline } from "react-icons/io";
import { setTheme } from '../redux/theme';
import { logout } from '../redux/userSlice';

const TopBar = () => {
    const { theme } = useSelector(state => state.theme)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {
      register, 
      handleSubmit, 
      formState: {errors}
    } = useForm()

    const handleSearch = async(data) => {

    }

    const handleTheme = () => {
      const themeValue = theme === "light" ? "dark" : "light"
      dispatch(setTheme(themeValue))
    }

  return (
    <div className='topbar w-full flex items-center justify-center py-3 md:py-6 px-4 bg-primary'>
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2 bg-[#065ad8] rounded text-white'>
              <AiFillSmile />
            </div>
            <span className='text-xl md:text-2xl text-[#065ad8] font-semibold'>
              Sociify
            </span>
        </Link>

        <form
          className='hidden md:flex items-center justify-center mx-20'
          onSubmit={handleSubmit(handleSearch)}
        >
          <TextInput
            placeholder="Search..."
            styles='w-[18rem] lg:w-[38rem] rounded-l-full py-3'
            register={register("search")}
          />
          <CustomButton
            title='search'
            type='submit'
            containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
          />
        </form>

        {/* ICONS */}
        <div className='flex mx-3 gap-4 items-center text-ascent-1 text-md md:text-xl'>
          <button onClick={() => handleTheme()}>
            {theme === "dark" ? <BsMoon /> : <BsSun />}
          </button>
          <div className='hidden lg:flex'>
            <IoMdNotificationsOutline />
          </div>

          <div>
            <CustomButton
              onClick={() => dispatch(logout())}
              title='Log Out'
              containerStyles='text-xs text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'
            />
          </div>
        </div>
    </div>
  )
}

export default TopBar;