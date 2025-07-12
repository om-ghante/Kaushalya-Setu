import React from 'react';
import howItWorksData from '../content/howItWorks';

const HowItWorksPopup = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-2">User Guide</h3>
        <p className="text-gray-600">
          Learn how to make the most of our analytics platform
        </p>
      </div>

      <div className="space-y-6">
        {howItWorksData.map((section) => (
          <div key={section.id} className="bg-gray-50 rounded-lg p-5">
            <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
            <p className="text-gray-700 mb-3">{section.description}</p>
            <ul className="space-y-2 ml-5">
              {section.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Need more help?</h4>
        <p className="text-blue-700">
          Contact our support team at support@analyticspro.com or visit our documentation portal.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksPopup;