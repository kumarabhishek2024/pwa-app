import {
  useEffect,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { useTheme } from "../context/useTheme";

import {
  Camera,
  Save,
  X,
  UserRound,
} from "lucide-react";

export interface ProfileData {
  name: string;
  image: string;
}

interface ProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (profile: ProfileData) => void;
}

function ProfileModal({
  profile,
  onClose,
  onSave,
}: ProfileModalProps) {
  const { theme } = useTheme();
  const [name, setName] = useState(
    profile.name
  );

  const [image, setImage] = useState(
    profile.image
  );

  const isDark =
    theme === "dark";

  // ==========================================
  // LOCK BACKGROUND SCROLL
  // ==========================================

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        setImage(
          reader.result
        );
      }
    };

    reader.readAsDataURL(file);
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleSave = () => {
    const trimmedName =
      name.trim();

    if (!trimmedName) {
      return;
    }

    onSave({
      name: trimmedName,
      image,
    });
  };

  // ==========================================
  // MODAL
  // ==========================================

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        min-h-screen
        items-stretch
        justify-center
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        bg-black/50
        p-3
        sm:p-4
      "
      onClick={onClose}
    >
      <div
        className={`
          my-auto
          w-full
          max-w-md
          max-h-[calc(100dvh-24px)]
          overflow-y-auto
          overscroll-contain
          rounded-2xl
          shadow-2xl
          sm:max-h-[calc(100dvh-48px)]

          ${
            isDark
              ? "bg-slate-900"
              : "bg-white"
          }
        `}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div
          className={`
            flex
            items-center
            justify-between
            border-b
            px-6
            py-5

            ${
              isDark
                ? "border-slate-700"
                : "border-slate-100"
            }
          `}
        >
          <div>
            <h2
              className={`
                text-2xl
                font-extrabold

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              Profile
            </h2>

            <p
              className={`
                mt-1
                text-sm

                ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              `}
            >
              Update your name and profile picture.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              transition

              ${
                isDark
                  ? `
                    text-slate-400
                    hover:bg-slate-800
                    hover:text-white
                  `
                  : `
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                  `
              }
            `}
          >
            <X size={20} />
          </button>
        </div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div className="space-y-6 p-6">

          {/* PROFILE IMAGE */}

          <div className="flex flex-col items-center">

            <div
              className={`
                relative
                flex
                h-28
                w-28
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-4

                ${
                  isDark
                    ? "border-slate-700 bg-slate-800"
                    : "border-blue-50 bg-slate-100"
                }
              `}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <UserRound
                  size={48}
                  className={
                    isDark
                      ? "text-slate-500"
                      : "text-slate-400"
                  }
                />
              )}

              {/* CAMERA */}

              <label
                htmlFor="profile-image"
                className="
                  absolute
                  bottom-1
                  right-1
                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-blue-600
                  text-white
                  shadow-md
                  transition
                  hover:bg-blue-700
                "
              >
                <Camera size={17} />

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                  className="hidden"
                />
              </label>
            </div>

            <label
              htmlFor="profile-image"
              className="
                mt-3
                cursor-pointer
                text-sm
                font-bold
                text-blue-600
                hover:text-blue-700
              "
            >
              Upload Photo
            </label>

          </div>

          {/* NAME */}

          <div>
            <label
              htmlFor="profile-name"
              className={`
                mb-2
                block
                text-sm
                font-semibold

                ${
                  isDark
                    ? "text-slate-200"
                    : "text-slate-700"
                }
              `}
            >
              Your Name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="Enter your name"
              className={`
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                outline-none
                transition

                focus:border-blue-500
                focus:ring-2

                ${
                  isDark
                    ? `
                      border-slate-700
                      bg-slate-800
                      text-white
                      placeholder:text-slate-500
                      focus:ring-blue-900/50
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      placeholder:text-slate-400
                      focus:ring-blue-100
                    `
                }
              `}
            />
          </div>

          {/* BUTTONS */}

          <div
            className={`
              flex
              gap-3
              border-t
              pt-5

              ${
                isDark
                  ? "border-slate-700"
                  : "border-slate-100"
              }
            `}
          >
            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-bold
                transition

                ${
                  isDark
                    ? `
                      border-slate-700
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                    `
                    : `
                      border-slate-200
                      text-slate-700
                      hover:bg-slate-50
                    `
                }
              `}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={
                !name.trim()
              }
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-3
                text-sm
                font-bold
                text-white
                shadow-md
                shadow-blue-200
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Save size={17} />
              Save Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );

  // ==========================================
  // RENDER DIRECTLY INTO BODY
  // ==========================================

  return createPortal(
    modal,
    document.body
  );
}

export default ProfileModal;