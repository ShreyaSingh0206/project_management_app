import React from 'react'
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const { register, handleSubmit, watch, setError, formState: { errors }, } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    let r = await fetch("http://localhost:3000/SignUp", {
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

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className='px-120 py-30'>
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-2 border-gray-300 rounded-xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Create your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", { required: { value: true, message: "Email is required" } })}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password", { required: { value: true, message: "Password is required" } })}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>


              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmpassword" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("confirmpassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === watch("password") || "Passwords do not match"
                    })}
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.confirmpassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>
                  )}
                </div>
              </div>

              <div className='py-6'>
                <button
                  type="submit"
                  value="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>


              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?{' '}
                <a href="./SignIn" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SignUp
