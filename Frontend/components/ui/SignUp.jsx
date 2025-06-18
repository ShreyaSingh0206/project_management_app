import React from 'react'
import { Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const { register, handleSubmit, watch, setError, formState: { errors }, } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
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

  }

  return (
    // <form onSubmit={handleSubmit(onSubmit)} >
    //   <div className='px-120 py-30'>
    //     <div>
    //       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-2 border-gray-300 rounded-xl">
    //         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
    //             Create your account
    //           </h2>
    //         </div>

    //         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

    //           <div>
    //             <div className="flex items-center justify-between">
    //               <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
    //                 Username
    //               </label>
    //             </div>
    //             <div className="mt-2">
    //               <input
    //               {...register("username", { required: "Username is required" })}
    //                 id="username"
    //                 name="username"
    //                 type="text"
    //                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div>

    //           <div>
    //             <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
    //               Email address
    //             </label>
    //             <div className="mt-2">
    //               <input
    //                 {...register("email", { required: { value: true, message: "Email is required" } })}
    //                 id="email"
    //                 name="email"
    //                 type="email"
    //                 required
    //                 autoComplete="email"
    //                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div>

    //           <div>
    //             <div className="flex items-center justify-between">
    //               <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
    //                 Password
    //               </label>
    //             </div>
    //             <div className="mt-2">
    //               <input
    //                 {...register("password", { required: { value: true, message: "Password is required" } })}
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 required
    //                 autoComplete="current-password"
    //                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //               />
    //             </div>
    //           </div>


    //           <div>
    //             <div className="flex items-center justify-between">
    //               <label htmlFor="confirmpassword" className="block text-sm/6 font-medium text-gray-900">
    //                 Confirm Password
    //               </label>
    //             </div>
    //             <div className="mt-2">
    //               <input
    //                 {...register("confirmpassword", {
    //                   required: "Please confirm your password",
    //                   validate: (value) => value === watch("password") || "Passwords do not match"
    //                 })}
    //                 id="confirmpassword"
    //                 name="confirmpassword"
    //                 type="password"
    //                 required
    //                 autoComplete="current-password"
    //                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //               />
    //               {errors.confirmpassword && (
    //                 <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>
    //               )}
    //             </div>
    //           </div>

    //           <div className='py-6'>
    //             <button
    //               type="submit"
    //               value="submit"
    //               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //             >
    //               Sign up
    //             </button>
    //           </div>


    //           <p className="mt-10 text-center text-sm/6 text-gray-500">
    //             Already have an account?{' '}
    //             <a href="./SignIn" className="font-semibold text-indigo-600 hover:text-indigo-500">
    //               Sign in
    //             </a>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </form>

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/src/assets/pexels-codioful-6985048.jpg')" }} // Replace with your image
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 text-white p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center flex flex-col items-center ">
          <img  src="/src/assets/only_logo.png" alt="image error" srcset="" width='75px'/>
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
            >
              Sign up
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/80">
            Already have an account?{" "}
            <a href="./SignIn" className="font-semibold text-indigo-200 hover:text-indigo-100">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
