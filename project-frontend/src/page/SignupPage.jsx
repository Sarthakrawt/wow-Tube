import React, { useRef, useState } from 'react';
import { signup } from '../lib/api';

function SignupPage() {
  const refFullname = useRef();
  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refAvatar = useRef();
  const refCoverImage = useRef();

  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (
      !refFullname.current.value ||
      !refUsername.current.value ||
      !refEmail.current.value ||
      !refPassword.current.value ||
      !refAvatar.current.files[0] ||
      !refCoverImage.current.files[0]
    ) {
      showMessage('Please fill in all fields! 😵', 'error');
      return;
    }

    formData.append('fullname', refFullname.current.value);
    formData.append('username', refUsername.current.value);
    formData.append('email', refEmail.current.value);
    formData.append('password', refPassword.current.value);
    formData.append('avatar', refAvatar.current.files[0]);
    formData.append('coverImage', refCoverImage.current.files[0]);

    try {
      await signup(formData);
      showMessage('Signup successful! 🎉', 'success');

      refFullname.current.value = '';
      refUsername.current.value = '';
      refEmail.current.value = '';
      refPassword.current.value = '';
      refAvatar.current.value = '';
      refCoverImage.current.value = '';
    } catch (err) {
      showMessage('Signup failed. Please try again. 🚨', 'error');
      console.error(err);
    }
  };

  const handleFileButtonClick = (fileInputRef) => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center p-8 bg-gradient-to-br from-pink-200 via-yellow-200 to-cyan-200 font-comic">
      <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

    .font-heading { font-family: 'Fredoka One', cursive; }
    .font-body { font-family: 'Quicksand', sans-serif; }
        `}
      </style>

      <div className="bg-white shadow-[8px_8px_0px_black] rounded-3xl p-10 w-full max-w-5xl flex flex-col md:flex-row gap-10 border-[6px] border-black">
        {/* Left Side - Text Inputs */}
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="text-4xl font-extrabold text-pink-600 drop-shadow-[3px_3px_0px_black] mb-4">
            Join the Fun! 🚀
          </h2>

          {message.text && (
            <div
              className={`p-4 rounded-xl font-bold text-center border-[4px] border-black shadow-[4px_4px_0px_black] ${
                message.type === 'success'
                  ? 'bg-green-400 text-white'
                  : 'bg-red-400 text-white'
              }`}
            >
              {message.text}
            </div>
          )}

          <label className="text-base font-bold text-gray-900">Full Name</label>
          <input
            type="text"
            ref={refFullname}
            className="p-3 border-[4px] border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-[4px_4px_0px_black]"
          />

          <label className="text-base font-bold text-gray-900">Username</label>
          <input
            type="text"
            ref={refUsername}
            className="p-3 border-[4px] border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-[4px_4px_0px_black]"
          />

          <label className="text-base font-bold text-gray-900">Email</label>
          <input
            type="email"
            ref={refEmail}
            className="p-3 border-[4px] border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-[4px_4px_0px_black]"
          />

          <label className="text-base font-bold text-gray-900">Password</label>
          <input
            type="password"
            ref={refPassword}
            className="p-3 border-[4px] border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-[4px_4px_0px_black]"
          />
        </div>

        {/* Right Side - File Inputs */}
        <div className="flex flex-col gap-6 flex-1">
          <label className="text-base font-bold text-gray-900">Avatar</label>
          <div className="relative">
            <input type="file" ref={refAvatar} className="hidden" />
            <button
              type="button"
              onClick={() => handleFileButtonClick(refAvatar)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl border-[4px] border-black shadow-[5px_5px_0px_black] transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 active:shadow-[1px_1px_0px_black]"
            >
              🎭 Choose Avatar
            </button>
          </div>

          <label className="text-base font-bold text-gray-900">Cover Image</label>
          <div className="relative">
            <input type="file" ref={refCoverImage} className="hidden" />
            <button
              type="button"
              onClick={() => handleFileButtonClick(refCoverImage)}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-xl border-[4px] border-black shadow-[5px_5px_0px_black] transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 active:shadow-[1px_1px_0px_black]"
            >
              🖼️ Choose Cover
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-auto bg-green-400 hover:bg-green-500 text-black font-bold py-4 rounded-xl border-[5px] border-black shadow-[6px_6px_0px_black] text-xl transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 active:shadow-[1px_1px_0px_black]"
          >
            Sign Up! 🥳
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
