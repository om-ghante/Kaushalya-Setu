import React, { useState } from 'react';
import TextInput from '../../components/inputs/TextInput';
import PasswordInput from '../../components/inputs/PasswordInput';
import TextButton from '../../components/buttons/TextButton';
import SuccessMessage from '../../components/notificationalerts/Success';
import Error from '../../components/notificationalerts/Error';
import { registerUser } from '../../firebase/authFirebaseOperations';
import { signInWithGoogle } from '../../firebase/googleAuthOperations';
import { useAuth } from '../../context/AuthContext';
import GoogleLogo from '../../assets/GoogleLogo.png'

const Register = ({ onLogin, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }

    const result = await registerUser(formData);

    if (result.success) {
      login(result.user);
      setSuccessMsg('Registration successful!');
      setErrorMsg('');

      setTimeout(() => {
        setSuccessMsg('');
        if (onClose) onClose();
      }, 1000);
    } else {
      setErrorMsg(result.error || 'Registration failed.');
    }
  };

  const handleGoogleLogin = async () => {
    setSuccessMsg('');
    setErrorMsg('');

    const result = await signInWithGoogle();

    if (result.success) {
      login(result.user);
      setSuccessMsg('Successfully signed in with Google!');
      setTimeout(() => {
        setSuccessMsg('');
        if (onClose) onClose();
      }, 3000);
    } else {
      setErrorMsg(result.error || 'Google sign-in failed.');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {successMsg && <SuccessMessage message={successMsg} />}
      {errorMsg && <Error message={errorMsg} />}

      {step === 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <TextInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Last Name</label>
          <TextInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <TextInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Phone</label>
          <TextInput
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <TextInput
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
          />
        </div>
      )}

      {step === 4 && (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Create a password"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Re-enter Password</label>
          <PasswordInput
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Re-enter password"
          />
        </>
      )}

      <div className="flex justify-between mt-4">
        {step > 1 ? (
          <TextButton text="Back" onClick={prevStep} />
        ) : (
          <div />
        )}
        {step < 4 ? (
          <TextButton
            text="Next"
            onClick={nextStep}
            bgColor="bg-violet-700"
            hoverColor="hover:bg-violet-800"
            textColor="text-white"
          />
        ) : (
          <TextButton
            text="Register"
            onClick={handleSubmit}
            bgColor="bg-violet-700"
            hoverColor="hover:bg-violet-800"
            textColor="text-white"
          />
        )}
      </div>

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <button type="button" onClick={onLogin} className="text-violet-700 hover:underline font-medium">
          Login
        </button>
      </p>

      <div className="flex items-center gap-2 my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-sm text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition text-sm font-medium"
      >
        <img
          src={GoogleLogo}
          alt="G"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default Register;
