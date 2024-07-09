import { useState } from "react";
import { useBookStore } from "../store/bookStore";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [value, setValue] = useState("");
  const updateValue = useBookStore((state) => state.updateValue);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      console.log("press enter: ", value);
      updateValue(value);
      setValue("");
    }
  };

  const clearSearchValue = () => {
    setValue("");
  };

  return (
    <>
      <header className="h-auto w-full block sticky top-0 left-0 text-sm z-10 bg-white p-5 shadow-md mb-4">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Home">
              <svg
                width="32"
                height="32"
                className="w-6 h-6"
                viewBox="0 0 32 32"
                version="1.1"
                aria-labelledby="unsplash-home"
                aria-hidden="false"
              >
                <title id="unsplash-home">Unsplash Home</title>
                <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
              </svg>
            </a>
          </div>

          <div className="relative flex items-center justify-between bg-slate-100 rounded-sm p-1">
            <FiSearch />
            <input
              type="search"
              name="search"
              required
              placeholder="ej: nature"
              className="w-full border-none bg-transparent text-black text-base pl-2 leading-5 pb-0 outline-none focus:outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
            />
            {value && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={clearSearchValue}
              >
                X
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;