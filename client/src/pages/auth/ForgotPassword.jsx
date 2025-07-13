import React from 'react';
import TextInput from '../../components/inputs/TextInput';
import Error from '../../components/notificationalerts/Error';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset password logic (disabled for now)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">

      {/* ⚠️ Error Notice */}
      <Error message="Forgot password is currently disabled. Please contact the admin to reset your password." />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <TextInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-violet-700 text-white rounded-md hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-700"
      >
        Reset Password
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="text-sm text-violet-700 hover:underline text-center"
      >
        Back to Login
      </button>
    </form>
  );
};

export default ForgotPassword;
