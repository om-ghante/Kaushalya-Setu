import React from 'react';

const PersonalInformation = () => {
  return (
    <div className="mt-8 p-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Name</h3>
          <p>Om Ghante</p>
        </div>
        <div>
          <h3 className="font-medium">Email</h3>
          <p>om@example.com</p>
        </div>
        <div>
          <h3 className="font-medium">Phone</h3>
          <p>+91 9876543210</p>
        </div>
        <div>
          <h3 className="font-medium">Date of Birth</h3>
          <p>January 1, 1990</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;