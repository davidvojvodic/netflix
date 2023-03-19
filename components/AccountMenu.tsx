import React from "react";
import { signOut } from "next-auth/react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  // If visible props is false, return null.
  if (!visible) {
    return null;
  }

  // Otherwise, render the account menu.
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col flex border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-red.png"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline">
            UserName
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()} // Sign out of NextAuth
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
