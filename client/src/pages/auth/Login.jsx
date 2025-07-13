import React, { useState } from 'react';
import TextInput from '../../components/inputs/TextInput';
import PasswordInput from '../../components/inputs/PasswordInput';
import TextButton from '../../components/buttons/TextButton';
import IconTextButton from '../../components/buttons/IconTextButton';
import SuccessMessage from '../../components/notificationalerts/Success';
import Error from '../../components/notificationalerts/Error';
import { loginUser } from '../../firebase/authFirebaseOperations';
import { signInWithGoogle } from '../../firebase/googleAuthOperations';
import { useAuth } from '../../context/AuthContext';
import GoogleLogo from '../../assets/GoogleLogo.png'

const Login = ({ onForgot, onSignUp, onClose }) => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    const result = await loginUser(credentials.identifier, credentials.password);

    if (result.success) {
      login(result.user);
      setSuccessMsg('Login successful!');
      setTimeout(() => {
        setSuccessMsg('');
        if (onClose) onClose();
      }, 5000);
    } else {
      setErrorMsg(result.error || 'Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    const result = await signInWithGoogle();

    if (result.success) {
      login(result.user);
      setSuccessMsg('Successfully signed in with Google!');
      setTimeout(() => {
        setSuccessMsg('');
        if (onClose) onClose();
      }, 1000);
    } else {
      setErrorMsg(result.error || 'Google sign-in failed.');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {successMsg && <SuccessMessage message={successMsg} />}
      {errorMsg && <Error message={errorMsg} />}

      <TextInput
        label="Username, Email, or Phone"
        type="text"
        name="identifier"
        value={credentials.identifier}
        onChange={handleChange}
        placeholder="Enter username, email, or phone"
      />

      <PasswordInput
        label="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Enter password"
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgot}
          className="text-sm text-violet-700 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <TextButton
        text="Login"
        onClick={handleLogin}
        bgColor="bg-violet-700"
        hoverColor="hover:bg-violet-800"
        textColor="text-white"
        className="w-full py-2"
      />

      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSignUp}
          className="text-violet-700 hover:underline font-medium"
        >
          Sign up
        </button>
      </p>

      <div className="flex items-center gap-2 my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-sm text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <IconTextButton
        icon={
          <img
              src={GoogleLogo}
            alt="G"
            className="w-5 h-5"
          />
        }
        text="Continue with Google"
        onClick={handleGoogleLogin}
        bgColor="bg-white"
        hoverColor="hover:bg-gray-100"
        textColor="text-gray-700"
        className="border border-gray-300 w-full justify-center py-2"
      />
    </div>
  );
};

export default Login;
