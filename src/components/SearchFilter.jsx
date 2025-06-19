// import React from "react";

// const SearchFilter = ({
//   keyword,
//   setKeyword,
//   tagsFilter,
//   setTagsFilter,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   handleSearch,
// }) => (
//   <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
//     <h2 className="text-xl font-bold mb-4">Search Notes</h2>
//     <input
//       type="text"
//       placeholder="Keyword"
//       value={keyword}
//       onChange={(e) => setKeyword(e.target.value)}
//       className="w-full p-2 mb-4 border rounded"
//     />
//     <input
//       type="text"
//       placeholder="Tags (comma-separated)"
//       value={tagsFilter}
//       onChange={(e) => setTagsFilter(e.target.value)}
//       className="w-full p-2 mb-4 border rounded"
//     />
//     <input
//       type="date"
//       value={startDate}
//       onChange={(e) => setStartDate(e.target.value)}
//       className="w-full p-2 mb-4 border rounded"
//     />
//     <input
//       type="date"
//       value={endDate}
//       onChange={(e) => setEndDate(e.target.value)}
//       className="w-full p-2 mb-4 border rounded"
//     />
//     <button
//       type="submit"
//       className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//     >
//       Search
//     </button>
//   </form>
// );

// export default SearchFilter;

import React from "react";

const SearchFilter = ({
  title,
  setTitle,
  keywords,
  setKeywords,
  content,
  setContent,
  createdDate,
  setCreatedDate,
  handleSearch,
}) => (
  <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">Search Notes</h2>
    <input
      type="text"
      placeholder="Search by title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    />
    <input
      type="text"
      placeholder="Keywords (comma-separated)"
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    />
    <textarea
      placeholder="Search by content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    />
    <input
      type="date"
      value={createdDate}
      onChange={(e) => setCreatedDate(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    />
    <button
      type="submit"
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Search
    </button>
  </form>
);

export default SearchFilter;