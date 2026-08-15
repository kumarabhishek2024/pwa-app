import { useEffect, useRef, useState } from "react";
import {
  Menu,
  UserRound,
  Pencil,
} from "lucide-react";

import type { ProfileData } from "./ProfileModal";

interface HeaderProps {
  profile: ProfileData;
  onProfileClick: () => void;
}

const Header = ({
  profile,
  onProfileClick,
}: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // CLOSE PROFILE CARD WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // PROFILE BUTTON
  // ==========================================

  const handleProfileToggle = () => {
    setIsProfileOpen(
      (previous) => !previous
    );
  };

  // ==========================================
  // EDIT PROFILE
  // ==========================================

  const handleEditProfile = () => {
    setIsProfileOpen(false);
    onProfileClick();
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        items-center
        justify-between
        border-b
        border-slate-100
        bg-white/95
        px-5
        py-4
        shadow-sm
        backdrop-blur-md
        lg:px-10
      "
    >

      {/* ================================= */}
      {/* MOBILE MENU */}
      {/* ================================= */}

      <button
        type="button"
        aria-label="Open menu"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          text-slate-700
          transition
          hover:bg-slate-100
          lg:hidden
        "
      >
        <Menu
          size={22}
          strokeWidth={2.2}
        />
      </button>

      {/* ================================= */}
      {/* TITLE */}
      {/* ================================= */}

      <div>

        <h1
          className="
            text-xl
            font-extrabold
            tracking-tight
            text-slate-900
            lg:text-2xl
          "
        >
          My Tasks
        </h1>

        <p
          className="
            mt-0.5
            hidden
            text-sm
            font-medium
            text-slate-500
            lg:block
          "
        >
          Manage your daily tasks
        </p>

      </div>

      {/* ================================= */}
      {/* PROFILE */}
      {/* ================================= */}

      <div
        ref={profileRef}
        className="relative"
      >

        {/* Profile Photo Button */}
        <button
          type="button"
          onClick={handleProfileToggle}
          aria-label="Open profile"
          aria-expanded={isProfileOpen}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border-2
            border-blue-100
            bg-blue-50
            shadow-sm
            transition
            hover:scale-105
            hover:border-blue-300
            hover:shadow-md
            active:scale-95
          "
        >

          {profile.image ? (
            <img
              src={profile.image}
              alt={
                profile.name || "Profile"
              }
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <UserRound
              size={22}
              className="text-blue-600"
            />
          )}

        </button>

        {/* ================================= */}
        {/* PROFILE CARD */}
        {/* ================================= */}

        {isProfileOpen && (
          <div
            className="
              absolute
              right-0
              top-14
              z-50
              w-64
              overflow-hidden
              rounded-2xl
              border
              border-slate-100
              bg-white
              shadow-xl
              ring-1
              ring-black/5
            "
          >

            {/* Profile Information */}
            <div
              className="
                flex
                items-center
                gap-3
                border-b
                border-slate-100
                px-4
                py-4
              "
            >

              {/* Large Profile Image */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-2
                  border-blue-100
                  bg-blue-50
                "
              >

                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={
                      profile.name ||
                      "Profile"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <UserRound
                    size={24}
                    className="text-blue-600"
                  />
                )}

              </div>

              {/* Name */}
              <div className="min-w-0">

                <p className="text-xs font-medium text-slate-400">
                  Welcome
                </p>

                <p
                  className="
                    truncate
                    text-base
                    font-extrabold
                    text-slate-900
                  "
                >
                  {profile.name ||
                    "User"}
                </p>

              </div>

            </div>

            {/* Edit Profile */}
            <div className="p-2">

              <button
                type="button"
                onClick={handleEditProfile}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-slate-100
                  "
                >
                  <Pencil size={16} />
                </span>

                Edit Profile

              </button>

            </div>

          </div>
        )}

      </div>

    </header>
  );
};

export default Header;