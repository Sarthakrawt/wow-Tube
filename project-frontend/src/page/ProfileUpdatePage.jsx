import React, { useRef } from "react";
import { authUser, changeAvatar, changeCoverImage, updateAccount } from "../lib/api";

function ProfileUpdatePage() {
  const [user, setUser] = React.useState({});
  const refAvatar = useRef();
  const refCoverImage = useRef();
  const [updatedUser, setUpdatedUser] = React.useState({});

  const updateUserInfo = async (userInfo) => {
    try {
      if (userInfo) {
        updateAccount(userInfo);
      }
      if (refAvatar?.current?.files[0]) {
        const avatarData = new FormData();
        avatarData.append("avatar", refAvatar.current.files[0]);
        changeAvatar(avatarData);
      }
      if (refCoverImage?.current?.files[0]) {
        const coverImageData = new FormData();
        coverImageData.append("coverImage", refCoverImage.current.files[0]);
        changeCoverImage(coverImageData);
      }
      refAvatar.current.value = "";
      refCoverImage.current.value = "";
      setUpdatedUser({});
      const res = await authUser();
      setUser(res.data);
    } catch (error) {
      console.log("error at updateUserInfo", error);
    }
  };

  React.useEffect(() => {
    async function fetchUser() {
      const res = await authUser();
      setUser(res.data);
    }
    fetchUser();
  }, []);

  React.useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUpdatedUser({
        username: user?.username || "",
        email: user?.email || "",
        fullname: user?.fullname || "",
      });
    }
  }, [user]);

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

      <div className="bg-white shadow-[10px_10px_0px_black] rounded-3xl p-10 w-full max-w-5xl flex flex-col gap-8 border-[6px] border-black">
        {/* Profile Preview */}
        <div className="relative flex flex-col items-center gap-4">
          <div
            className="w-full h-40 bg-cover bg-center border-[4px] border-black rounded-2xl shadow-[5px_5px_0px_black]"
            style={{ backgroundImage: `url(${user.coverImage})` }}
          ></div>
          <img
            src={user.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full border-[5px] border-black shadow-[4px_4px_0px_black] -mt-14 bg-white"
          />
          <p className="text-2xl font-heading text-pink-600 drop-shadow-[2px_2px_0px_black]">
            @{user.username}
          </p>
        </div>

        {/* Update Form */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left side */}
          <div className="flex flex-col gap-6 flex-1">
            <label className="font-bold text-gray-900">Username</label>
            <input
              type="text"
              value={updatedUser.username}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, username: e.target.value })
              }
              className="p-3 border-[4px] border-black rounded-xl shadow-[4px_4px_0px_black] focus:outline-none focus:ring-4 focus:ring-pink-400"
            />

            <label className="font-bold text-gray-900">Email</label>
            <input
              type="text"
              value={updatedUser.email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              className="p-3 border-[4px] border-black rounded-xl shadow-[4px_4px_0px_black] focus:outline-none focus:ring-4 focus:ring-yellow-400"
            />
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-6 flex-1">
            <label className="font-bold text-gray-900">Profile Avatar</label>
            <div className="relative">
              <input type="file" ref={refAvatar} className="hidden" />
              <button
                type="button"
                onClick={() => handleFileButtonClick(refAvatar)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl border-[4px] border-black shadow-[5px_5px_0px_black] transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 active:translate-y-1 active:shadow-[1px_1px_0px_black]"
              >
                🎭 Choose Avatar
              </button>
            </div>

            <label className="font-bold text-gray-900">Cover Image</label>
            <div className="relative">
              <input type="file" ref={refCoverImage} className="hidden" />
              <button
                type="button"
                onClick={() => handleFileButtonClick(refCoverImage)}
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-xl border-[4px] border-black shadow-[5px_5px_0px_black] transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 active:translate-y-1 active:shadow-[1px_1px_0px_black]"
              >
                🖼️ Choose Cover
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => updateUserInfo(updatedUser)}
          className="mt-6 bg-green-400 hover:bg-green-500 text-black font-bold py-4 rounded-xl border-[5px] border-black shadow-[6px_6px_0px_black] text-xl transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 active:translate-y-1 active:shadow-[1px_1px_0px_black]"
        >
          Save Changes ✨
        </button>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
