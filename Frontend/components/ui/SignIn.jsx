import React from 'react';
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setError, formState: { errors }, } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
    let r = await fetch(`${import.meta.env.VITE_BACKEND_URL}/SignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
    let res = await r.json();
    alert(res.message);

    if (r.ok) {
      navigate("/Dashboard");
    } else {
      alert("Signin failed: " + res);
    }

  }catch (err) {
    alert("Something went wrong.");
  } finally {
    setLoading(false); // Stop loader
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('/pexels-codioful-6985048.jpg')" }}>
      
      <div className="w-full max-w-md space-y-10  p-15      bg-white/10 backdrop-blur-md border border-white/30 text-white  rounded-xl shadow-2xl ">
        <div className='flex flex-col items-center'>
          <img  src="/only_logo.png" alt="image error" srcset="" width='75px'/>
          <h2 className="mt-6 text-center text-2xl font-bold ">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
                Email address
              </label>
              <input
                {...register("email", { required: { value: true, message: "This field is required" } })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 block w-full rounded-md bg-white/20 px-3 py-2 placeholder-gray-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
               
              </div>
              <input
                {...register("password", { required: { value: true, message: "This field is required" } })}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 block w-full rounded-md bg-white/20 px-3 py-2 placeholder-gray-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              value="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-semibold shadow-lg"
              disabled={loading} 
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        {/* SignUp Link */}
        <p className="mt-6 text-center text-sm ">
          Not a member?{' '}
          <Link to="/SignUp" className="font-medium text-yellow-500 hover:text-yellow-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
