import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';

const TeamModal = ({ projectId, onClose }) => {
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`, 
          { withCredentials: true } // Ensure cookies are sent for authentication
        );
        console.log('Fetched team members:', response.data.teamMembers); 
        setTeam(response.data.teamMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, [projectId]);

  const handleInvite = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}/team/add`, { email },
        { withCredentials: true } // Ensure cookies are sent for authentication
      );
      setTeam(res.data.team);
      setEmail('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to invite');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm  bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[700px] h-[400px] flex relative overflow-hidden">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black z-10">
          <IoMdClose className="w-6 h-6" />
        </button>

        {/* Left Panel - Team List */}
        <div className="w-1/2 bg-gradient-to-br from-blue-100 to-white p-6 overflow-y-auto border-r">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">Team Members</h2>
          {team.length === 0 ? (
            <p className="text-gray-500">No members yet.</p>
          ) : (
            <ul className="space-y-3">
              {team.map((member, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm">
                  <FaUser className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{member.username || 'Unnamed'}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Panel - Invite */}
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Invite New Member</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleInvite}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
           Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
