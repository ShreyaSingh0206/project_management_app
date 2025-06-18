import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import productivityAnimation from '/src/assets/ani.json'; // your downloaded Lottie JSON
import SignIn from './SignIn';


const Home = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-pink-100 text-gray-800">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md border-b border-white/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
            <h1 className="text-3xl font-bold text-indigo-600">  <img className='w-50' src="/src/assets/logo.png" alt="error" srcset="" /></h1>
            <nav className="space-x-6">
              <a href="#features" className="hover:text-indigo-600">Features</a>
              <NavLink to="./SignIn" className="hover:text-indigo-600">Go to Dashboard</NavLink>
              <NavLink to="./SignIn"  className=" bg-[#1c8482] text-white px-4 py-2 rounded-full hover:bg-[#0c96d7] transition">Login</NavLink>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        
        <section className="relative pt-40 pb-24 px-6 bg-gradient-to-r from-indigo-100 to-pink-100">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            {/* Animation Left */}
            <div className="w-full md:w-1/2">
              <Lottie animationData={productivityAnimation} loop={true} />
            </div>

            {/* Hero Content Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left md:w-1/2"
            >
              <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Organize. Collaborate. Succeed.
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                Project Waever is your smart workspace to manage teams, track tasks, and boost productivity.
              </p>
              <NavLink to="./SignUp" className="bg-[#e65d31] bg-gradient-to-r from-red-500 to-[#e65d31] text-white px-8 py-3 rounded-full text-lg hover:bg-[#bc4d2a] transition">
          Get Started
        </NavLink>
              
              
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Team Collaboration",
                desc: "Invite team members and assign roles seamlessly.",
                icon: "👥",
              },
              {
                title: "Kanban Boards",
                desc: "Drag and drop tasks across Todo, In Progress, and Done.",
                icon: "📋",
              },
              {
                title: "Real-time Updates",
                desc: "Stay in sync with instant updates and notifications.",
                icon: "⚡",
              },
            ].map(({ title, desc, icon }, index) => (
              <motion.div
                key={index}
                className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-xl transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t mt-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Project Weaver. Built  by Shreya Kumari.
        </footer>
      </div>
    </div>
  )
}

export default Home
