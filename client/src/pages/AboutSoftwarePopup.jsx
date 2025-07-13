import React from 'react';
import { FaReact, FaJsSquare, FaGithub, FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { SiVercel, SiFirebase, SiTailwindcss } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import aboutThisSoftware from '../content/aboutThisSoftware';

const AboutSoftwarePopup = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-blue-800">
          Kaushalya Setu ( कौशल्य सेतु ) - Bridge of Skills
        </h3>
        <p className="text-gray-600 mt-1">
          Version 0.0.1 | Released 14 July, 2025
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-5">
        <h4 className="text-lg font-semibold mb-3 text-blue-800">About</h4>
        <p className="text-gray-700">{aboutThisSoftware.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-indigo-50 rounded-lg p-5">
          <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Features</h4>
          <ul className="space-y-2">
            {aboutThisSoftware.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 rounded-lg p-5">
          <h4 className="text-lg font-semibold mb-3 text-purple-700">Technical Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tech Stack :</span>
              <span className="flex flex-col items-center gap-2 font-medium">
                <span className='flex gap-2 items-center'>
                  <FaReact className="text-sky-500" /> React.js + Vite,
                  <FaJsSquare className="text-yellow-400" /> javascript   
                </span>
                <span className='flex gap-2 items-center'>
                  <SiTailwindcss className="text-cyan-500" /> Tailwindcss
                </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database :</span>
              <span className="flex items-center gap-2 font-medium">
                <SiFirebase className="text-orange-500" /> Firebase
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Authentication :</span>
              <span className="flex items-center gap-2 font-medium">
               Google Auth
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Matching Algorithm :</span>
              <span className="flex items-center gap-2 font-medium">
               Gemini AI Based
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hosting :</span>
              <span className="flex items-center gap-2 font-medium">
                <SiVercel className="text-black" /> Vercel
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Code Avaliable on :</span>
              <span className="flex items-center gap-2 font-medium">
                <FaGithub className="text-gray-800" /> 
                <a 
                  href="https://github.com/om-ghante/Kaushalya-Setu" 
                  target='_blank'               
                  rel="noopener noreferrer"
                  className="text-blue-600 underline">
                GitHub
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-100 rounded-lg p-5">
        <h4 className="text-lg font-semibold mb-3 text-green-700">Documentation</h4>
        <p className="text-gray-700 mb-4">
          If you want to see the full detailed working as a point of view of a developer then click on the button below.
        </p>
        <div className="text-center">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Docs
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-5">
        <h4 className="text-lg font-semibold mb-3 text-yellow-700">Developer</h4>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed"></div>
          <div className="text-center sm:text-left">
            <h5 className="font-bold text-lg text-gray-800">Om Deepak Ghante</h5>
            <p className="text-gray-600 text-sm">Full Stack Developer | AI Enthusiast</p>
            <p className="text-gray-600 text-sm mb-2">Passionate about building innovative web solutions using modern tech.</p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> mr.omghante1@gmail.com &nbsp;&nbsp;
              <strong>Phone:</strong> +91 7071472143
            </p>
            <a
              href="https://om-ghante.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-600 underline"
            >
              https://om-ghante.vercel.app
            </a>
            <div className="flex gap-4 justify-center sm:justify-start mt-3">
              <a href="https://www.facebook.com/Om-Deepak-Ghante/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-700 text-xl hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/_om_ghante_/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 text-xl hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/om-ghante" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-800 text-xl hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/om-ghante/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-600 text-xl hover:scale-110 transition-transform" />
              </a>
              <a href="https://x.com/OmGhante/" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-600 text-xl hover:scale-110 transition-transform" />
              </a>           
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-md text-gray-500">
          Made By Om Ghante with Passion
        </p>
        <p className="text-sm text-gray-500">
          Kaushalya Setu © 2025
        </p>
      </div>
    </div>
  );
};

export default AboutSoftwarePopup;