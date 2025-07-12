import React from 'react';
import aboutThisSoftware from '../content/aboutThisSoftware';

const AboutSoftwarePopup = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{aboutThisSoftware.title}</h3>
        <p className="text-gray-600 mt-1">
          Version {aboutThisSoftware.version} | Released {aboutThisSoftware.releaseDate}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-5">
        <h4 className="text-lg font-semibold mb-3">About</h4>
        <p className="text-gray-700">{aboutThisSoftware.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gray-50 rounded-lg p-5">
          <h4 className="text-lg font-semibold mb-3">Key Features</h4>
          <ul className="space-y-2">
            {aboutThisSoftware.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-5">
          <h4 className="text-lg font-semibold mb-3">Technical Information</h4>
          <div className="space-y-2">
            {Object.entries(aboutThisSoftware.technicalInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 capitalize">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-5">
        <h4 className="text-lg font-semibold mb-3">Development Team</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {aboutThisSoftware.team.map((member, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
              <h5 className="font-medium">{member.name}</h5>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSoftwarePopup;