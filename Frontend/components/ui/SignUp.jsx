import React from 'react'
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setError, formState: { errors }, } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setLoading(true);
    try {
    let r = await fetch(`${import.meta.env.VITE_BACKEND_URL}/SignUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
    // let res = await r.text()
    //  console.log(data, res)
    let res = await r.json();
    alert(res.message);

    if (r.ok) {
      navigate("/SignIn");
    } else {
      alert("Signup failed: " + res);
    }

  }catch (err) {
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/pexels-codioful-6985048.jpg')" }} // Replace with your image
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 text-white p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center flex flex-col items-center ">
          <img  src="/only_logo.png" alt="image error" srcset="" width='75px'/>
          <h2 className="text-3xl font-bold mb-8">Create your account</h2>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              id="username"
              type="text"
              className="mt-1 block w-full rounded-md bg-white/20 px-3 py-2 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {errors.username && (
              <p className="text-red-300 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              id="email"
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md bg-white/20 px-3 py-2 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              id="password"
              type="password"
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md bg-white/20 px-3 py-2 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmpassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              {...register("confirmpassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match"
              })}
              id="confirmpassword"
              type="password"
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md bg-white/20 px-3 py-2 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {errors.confirmpassword && (
              <p className="text-red-300 text-sm mt-1">{errors.confirmpassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-semibold shadow-lg"
              disabled={loading}
            >
               {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/80">
            Already have an account?{" "}
            <Link to="/SignIn" className="font-semibold text-indigo-200 hover:text-indigo-100">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
