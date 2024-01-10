/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillSmile } from "react-icons/ai";
import { TextInput, Loading, CustomButton } from '../components';
//import { useDispatch } from 'react-redux';
import { BgImg } from '../assets';
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { apiRequest } from '../utils'

const Register = () => {
  const [ errMsg, setErrMsg ] = useState("");
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  //const dispatch = useDispatch();

  const {
    register, 
    handleSubmit, 
    getValues,
    formState: { errors }
  } = useForm({
    mode: "onChange"
  })

  const onSubmit = async(data) => {
    setIsSubmitting(true)

    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method : "POST",
      })

      if(res?.status === "failed"){
        setErrMsg(res)
      }else{
        setErrMsg(res);
        setTimeout(()=>{
          window.location.replace("/login");
        }, 5000)
      }

      console.log('register res', res);
      setIsSubmitting(false);

    } catch (error) {

      console.log(error)
      setIsSubmitting(false);
      
    }

  }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <AiFillSmile />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold' >
              Sociify
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold'>
            Create your account
          </p>

          <form 
            className='py-8 flex flex-col gap-5' 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput 
                name="firstName"
                placeholder="First Name"
                label="First Name"
                type="text"
                register={
                  register( "firstName", {
                      required: "First Name is required"
                    }
                  )
                }
                styles='w-full'
                error={ errors.firstName ? errors.firstName?.message : "" }
              />

              <TextInput 
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                type="text"
                register={
                  register( "lastName", {
                      required: "Last Name is required"
                    }
                  )
                }
                styles='w-full'
                error={ errors.lastName ? errors.lastName?.message : "" }
              />

            </div >
            
              <TextInput 
                name="email"
                placeholder="email@example.com"
                label="Email Address"
                type="email"
                register={
                  register( "email", {
                      required: "Email Address is required"
                    }
                  )
                }
                styles='w-full'
                error={ errors.email ? errors.email.message : "" }
              />

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput 
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                register={
                  register( "password", {
                      required: "password is required"
                    }
                  )
                }
                styles='w-full'
                error={ errors.password ? errors.password?.message : "" }
              />

              <TextInput 
                name="Confirm Password"
                placeholder="Password"
                label="Confirm Password"
                type="password"
                register={
                  register( "cPassword", {
                      validate: (value) => {
                        const { password } = getValues();
                      
                        if(password !== value) {
                          return "Passwords do not match"
                        }
                      }
                    }
                  )
                }
                styles='w-full'
                error={ errors.cPassword && errors.cPassword?.type === "validate" ? 
                  errors.cPassword?.message
                  : ""
                }
              />

            </div>
          
            {
              errMsg?.message && 
                <span className={`text-sm ${
                  errMsg?.status === "failed" ? 
                  "text-[#f64949fe]" :
                  "text-[#2ba150fe]"
                } mt-0.5`}>
                  {errMsg?.message}
                </span>
            }

            {
              isSubmitting ? 
              <Loading /> 
               : 
              <CustomButton 
                type="submit"
                containerStyles={"inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"}
                title='Create Account'
              />
            }
          </form>

          <p className='text-ascent-2 text-sm text-center'>
                Already has an account?{" "}
                <Link
                  to="/login"
                  className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
                >
                  Login
                </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
            <div className='relative w-full flex item-center justify-center'>
                <img
                  src={BgImg}
                  alt='Bg'
                  className='2xl: w-64 2xl: h-64 rounded-full object-cover' 
                />

                <div className='absolute flex gap-1 bg-white right-12 py-2 px-5 rounded-full'>
                  <BsShare size={14}/>
                  <span className='text-xs font-medium'>Share</span>
                </div>

                <div className='absolute flex items-center gap-1 bg-white left-6 top-7 py-2 px-5 rounded-full'>
                  <ImConnection />
                  <span className='text-xs font-medium'>Connect</span>
                </div>

                <div className='absolute flex items-center gap-1 bg-white left-14 bottom-6 py-2 px-5 rounded-full'>
                  <AiOutlineInteraction />
                  <span className='text-xs font-medium'>Interact</span>
                </div>

            </div>

            <div className='mt-16 text-center'>
                <p className='text-white text-base'>
                  Connect with friends & share for fun
                </p>
                <span className='text-sm text-white/80'>
                  Share memories with friends and the world
                </span>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Register;