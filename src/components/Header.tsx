const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-md lg:px-10">

      {/* Mobile Menu */}
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-slate-700 transition hover:bg-slate-100 lg:hidden"
      >
        ☰
      </button>

      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 lg:text-2xl">
          My Tasks
        </h1>

        <p className="mt-0.5 hidden text-sm font-medium text-slate-500 lg:block">
          Manage your daily tasks
        </p>
      </div>

      {/* Profile */}
      <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 shadow-sm transition hover:scale-105">

        <img
          src="/profile.jpg"
          alt="Profile"
          className="h-full w-full object-cover"
        />

      </div>

    </header>
  );
};

export default Header;