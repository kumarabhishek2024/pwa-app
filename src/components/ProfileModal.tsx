import { useState } from "react";
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
  // Profile se directly initial state
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState(profile.image);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSave({
      name: trimmedName,
      image,
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-9999
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your name and profile picture.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">

          {/* Profile Picture */}
          <div className="flex flex-col items-center">

            <div
              className="
                relative
                flex
                h-28
                w-28
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-4
                border-blue-50
                bg-slate-100
              "
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
                  className="text-slate-400"
                />
              )}

              {/* Camera */}
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
                  onChange={handleImageChange}
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

          {/* Name */}
          <div>
            <label
              htmlFor="profile-name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Your Name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-sm
                text-slate-700
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          {/* Buttons */}
          <div
            className="
              flex
              gap-3
              border-t
              border-slate-100
              pt-5
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!name.trim()}
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
}

export default ProfileModal;