// import React, { useState } from "react";

// const SearchFilter = ({ title, setTitle, createdDate, setCreatedDate, handleSearch }) => {
//   const [error, setError] = useState("");

//   const sanitizeTitle = (value) => {
//     // Replace multiple spaces with underscore, remove special characters, preserve case
//     return value.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!title && !createdDate) {
//       setError("Please provide either a title or a creation date.");
//       return;
//     }
//     setError("");
//     try {
//       await handleSearch(e);
//     } catch (err) {
//       setError("Search failed. Please try again or check the title format.");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <h2 className="text-xl font-bold mb-4">Search Notes</h2>
//       {error && (
//         <div className="mb-4 p-2 bg-red-50 border rounded text-red-800">
//           {error}
//         </div>
//       )}
//       <input
//         type="text"
//         id="title"
//         placeholder="Search by title..."
//         value={title}
//         onChange={(e) => setTitle(sanitizeTitle(e.target.value))}
//         className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <input
//         type="date"
//         id="createdDate"
//         value={createdDate}
//         onChange={(e) => setCreatedDate(e.target.value)}
//         className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="submit"
//         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//       >
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchFilter;

"use client"

import { useState } from "react"
import { Search, Calendar, AlertCircle, Filter } from "lucide-react"

const SearchFilter = ({ title, setTitle, createdDate, setCreatedDate, handleSearch }) => {
  const [error, setError] = useState("")

  const sanitizeTitle = (value) => {
    // Replace multiple spaces with underscore, remove special characters, preserve case
    return value
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!title && !createdDate) {
      setError("Please provide either a title or a creation date.")
      return
    }
    setError("")
    try {
      await handleSearch(e)
    } catch (err) {
      setError("Search failed. Please try again or check the title format.")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          Search & Filter Notes
        </h2>
        <p className="text-gray-600 mt-1">Find specific notes by title or creation date</p>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="search-title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Search className="h-4 w-4 text-green-600" />
              Search by Title
            </label>
            <input
              id="search-title"
              type="text"
              placeholder="Enter note title to search..."
              value={title}
              onChange={(e) => setTitle(sanitizeTitle(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            <p className="text-xs text-gray-500">Spaces will be converted to underscores</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="search-date" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="h-4 w-4 text-green-600" />
              Filter by Creation Date
            </label>
            <input
              id="search-date"
              type="date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            <p className="text-xs text-gray-500">Select a specific date to filter notes</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Search className="h-5 w-5" />
            Search Notes
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Provide at least one search criteria to find your notes</p>
        </div>
      </form>
    </div>
  )
}

export default SearchFilter
