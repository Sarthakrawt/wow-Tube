import { useRef, useState } from "react";
import { changePassword } from "../lib/api.js";
import Profile from "./Profile.jsx"
function ChangePassword() {
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const [message, setMessage] = useState("");

  const changed = async () => {
    setMessage("");
    if(  oldPasswordRef.current.value === "" ||
         newPasswordRef.current.value === ""){
            setMessage("You need to fill both of them")
            return;
         }
    try {
       await changePassword({
        oldPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      });

      
      setMessage("🎉 Password changed successfully!");
      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
    } catch (err) {
      setMessage("⚠️ Failed to change password.");
    } 
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
    <div className="w-100 mx-auto p-6 rounded-2xl border-[3px] border-black bg-yellow-200 shadow-[5px_5px_0px_black]">
      <h2 className="text-2xl font-extrabold mb-4 text-pink-600 drop-shadow-md">
        🔑 Change Password
      </h2>

      <div className="flex flex-col gap-4">
        <label className="font-semibold text-gray-800">
          Old Password
          <input
            type="password"
            ref={oldPasswordRef}
            className="mt-1 w-full px-3 py-2 rounded-xl border-[2px] border-black bg-white shadow-[3px_3px_0px_black] focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter old password"
          />
        </label>

        <label className="font-semibold text-gray-800">
          New Password
          <input
            type="password"
            ref={newPasswordRef}
            className="mt-1 w-full px-3 py-2 rounded-xl border-[2px] border-black bg-white shadow-[3px_3px_0px_black] focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter new password"
          />
        </label>

        <button
          onClick={changed}
          className="mt-2 w-full py-2 rounded-xl font-bold text-white bg-pink-500 border-[2px] border-black shadow-[3px_3px_0px_black] hover:bg-pink-600 active:translate-y-[2px] transition disabled:bg-gray-400"
        >
          submit
        </button>

        {message && (
          <p
            className={`text-base font-bold mt-3 ${
              message.includes("🎉") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
    <div className="fixed bottom-3 right-0"><Profile/></div>
    
    </div>
  );
}

export default ChangePassword;
