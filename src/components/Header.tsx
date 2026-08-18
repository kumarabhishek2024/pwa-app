import { useEffect, useRef, useState } from "react";

import {
  Menu,
  UserRound,
  Pencil,
  Moon,
  Sun,
} from "lucide-react";

import type { ProfileData } from "./ProfileModal";
import { useTheme } from "../context/useTheme";

interface HeaderProps {
  profile: ProfileData;
  onProfileClick: () => void;
}

const Header = ({
  profile,
  onProfileClick,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

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
      className={`
        sticky
        top-0
        z-40
        flex
        items-center
        justify-between
        border-b
        px-4
        py-3
        backdrop-blur-xl
        transition-colors
        duration-300
        sm:px-5
        lg:px-10

        ${
          theme === "dark"
            ? `
              border-slate-800
              bg-slate-950/90
            `
            : `
              border-slate-100
              bg-white/90
              shadow-sm
            `
        }
      `}
    >

      {/* ================================= */}
      {/* LEFT SIDE */}
      {/* ================================= */}

      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}

        <button
          type="button"
          aria-label="Open menu"
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition
            lg:hidden

            ${
              theme === "dark"
                ? `
                  text-slate-300
                  hover:bg-slate-800
                  hover:text-white
                `
                : `
                  text-slate-700
                  hover:bg-slate-100
                `
            }
          `}
        >
          <Menu
            size={21}
            strokeWidth={2.2}
          />
        </button>

        {/* TITLE */}

        <div className="min-w-0">

          <h1
            className={`
              text-lg
              font-bold
              tracking-tight
              sm:text-xl
              lg:text-[22px]

              ${
                theme === "dark"
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            My Tasks
          </h1>

          <p
            className={`
              mt-0.5
              hidden
              text-[11px]
              font-medium
              sm:text-xs
              lg:block

              ${
                theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            Manage your daily tasks
          </p>

        </div>

      </div>

      {/* ================================= */}
      {/* RIGHT SIDE */}
      {/* ================================= */}

      <div className="flex items-center gap-2 sm:gap-3">

        {/* ================================= */}
        {/* THEME TOGGLE */}
        {/* ================================= */}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
          title={
            theme === "light"
              ? "Dark mode"
              : "Light mode"
          }
          className={`
            group
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            transition-all
            duration-200
            hover:scale-105
            active:scale-95
            sm:h-11
            sm:w-11

            ${
              theme === "dark"
                ? `
                  border-slate-700
                  bg-slate-800
                  text-amber-300
                  hover:border-slate-600
                  hover:bg-slate-700
                `
                : `
                  border-slate-200
                  bg-slate-50
                  text-slate-600
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                `
            }
          `}
        >
          {theme === "light" ? (
            <Moon
              size={18}
              strokeWidth={2.2}
              className="
                transition-transform
                duration-200
                group-hover:-rotate-12
              "
            />
          ) : (
            <Sun
              size={19}
              strokeWidth={2.2}
              className="
                transition-transform
                duration-200
                group-hover:rotate-45
              "
            />
          )}
        </button>

        {/* ================================= */}
        {/* PROFILE */}
        {/* ================================= */}

        <div
          ref={profileRef}
          className="relative"
        >

          {/* PROFILE PHOTO */}

          <button
            type="button"
            onClick={handleProfileToggle}
            aria-label="Open profile"
            aria-expanded={isProfileOpen}
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-2
              shadow-sm
              transition-all
              duration-200
              hover:scale-105
              active:scale-95
              sm:h-11
              sm:w-11

              ${
                theme === "dark"
                  ? `
                    border-slate-700
                    bg-slate-800
                    hover:border-blue-500
                  `
                  : `
                    border-blue-100
                    bg-blue-50
                    hover:border-blue-300
                    hover:shadow-md
                  `
              }
            `}
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
                size={21}
                className={
                  theme === "dark"
                    ? "text-blue-400"
                    : "text-blue-600"
                }
              />
            )}
          </button>

          {/* ================================= */}
          {/* PROFILE CARD */}
          {/* ================================= */}

          {isProfileOpen && (
            <div
              className={`
                absolute
                right-0
                top-12
                z-50
                w-[calc(100vw-32px)]
                max-w-72
                overflow-hidden
                rounded-2xl
                border
                shadow-2xl
                ring-1
                transition-colors
                duration-300
                sm:top-14
                sm:w-72

                ${
                  theme === "dark"
                    ? `
                      border-slate-700
                      bg-slate-900
                      ring-white/5
                    `
                    : `
                      border-slate-100
                      bg-white
                      ring-black/5
                    `
                }
              `}
            >

              {/* PROFILE INFORMATION */}

              <div
                className={`
                  flex
                  items-center
                  gap-3
                  border-b
                  px-4
                  py-4

                  ${
                    theme === "dark"
                      ? "border-slate-800"
                      : "border-slate-100"
                  }
                `}
              >

                {/* LARGE PROFILE IMAGE */}

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-2

                    ${
                      theme === "dark"
                        ? `
                          border-slate-700
                          bg-slate-800
                        `
                        : `
                          border-blue-100
                          bg-blue-50
                        `
                    }
                  `}
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
                      className={
                        theme === "dark"
                          ? "text-blue-400"
                          : "text-blue-600"
                      }
                    />
                  )}
                </div>

                {/* NAME */}

                <div className="min-w-0">

                  <p
                    className={`
                      text-[11px]
                      font-medium

                      ${
                        theme === "dark"
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  >
                    Welcome
                  </p>

                  <p
                    className={`
                      truncate
                      text-sm
                      font-bold

                      ${
                        theme === "dark"
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {profile.name ||
                      "User"}
                  </p>

                </div>

              </div>

              {/* EDIT PROFILE */}

              <div className="p-2">

                <button
                  type="button"
                  onClick={
                    handleEditProfile
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-[13px]
                    font-semibold
                    transition

                    ${
                      theme === "dark"
                        ? `
                          text-slate-300
                          hover:bg-slate-800
                          hover:text-blue-400
                        `
                        : `
                          text-slate-700
                          hover:bg-blue-50
                          hover:text-blue-600
                        `
                    }
                  `}
                >

                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg

                      ${
                        theme === "dark"
                          ? `
                            bg-slate-800
                            text-slate-300
                          `
                          : `
                            bg-slate-100
                            text-slate-600
                          `
                      }
                    `}
                  >
                    <Pencil size={16} />
                  </span>

                  Edit Profile

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default Header;