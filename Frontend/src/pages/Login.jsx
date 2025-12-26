import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Preloader from "../components/landing/Preloader";
import { useAuth } from "../context/AuthContext";
import { setCredentials } from "../redux/Slices/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { login, user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  const submitHandler = async (data) => {
    setSubmitting(true);
    const result = await login(data.username, data.password);
    setSubmitting(false);
    
    if (result.success) {
      // Synchroniser avec Redux pour que Navbar et Sidebar voient l'utilisateur
      dispatch(setCredentials(result.data.user));
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

    if (loading) {
        return <Preloader />;
    }

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black">
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base dark:border-gray-700  border-gray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>EasyTasks</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white  px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credetials safe!
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='johndoe'
                type='text'
                name='username'
                label='Username'
                className='w-full rounded-full'
                register={register("username", {
                  required: "Username is required!",
                })}
                error={errors.username ? errors.username.message : ""}
              />
              <Textbox
                placeholder='password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />
              <span className='text-sm text-gray-600 hover:underline cursor-pointer'>
                Forget Password?
              </span>
            </div>
            
              <Button
                type='submit'
                label={submitting ? 'Connexion...' : 'Log in'}
                className='w-full h-10 bg-blue-700 text-white rounded-full disabled:opacity-50'
                disabled={submitting}
              />
            
          </form>
        </div>
      </div>
    </div>
  )
}   

export default Login