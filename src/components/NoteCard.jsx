// import React from "react";

// const NoteCard = ({ note, handleDelete, handleEdit }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//     <h2 className="text-xl font-bold mb-2">{note.title}</h2>
//     <p className="text-gray-700 mb-2">{note.content}</p>
//     <div className="text-sm text-gray-500 mb-2">
//       <span>Tags: {note.tags.join(", ")}</span>
//     </div>
//     <div className="text-sm text-gray-500 mb-2">
//       Created: {new Date(note.createdAt).toLocaleString()}
//     </div>
//     <div className="flex space-x-2">
//       <button
//         onClick={() => handleEdit(note)}
//         className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//       >
//         Edit
//       </button>
//       <button
//         onClick={() => handleDelete(note.noteId)}
//         className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//       >
//         Delete
//       </button>
//     </div>
//   </div>
// );

// export default NoteCard;

import React from "react";

const NoteCard = ({ note, handleDelete, handleEdit }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <h2 className="text-xl font-bold mb-2">{note.title}</h2>
    <p className="text-gray-700 mb-2">{note.content}</p>
    <div className="text-sm text-gray-500 mb-2">
      <span>Tags: {note.tags.join(", ")}</span>
    </div>
    <div className="text-sm text-gray-500 mb-2">
      Created: {new Date(note.createdAt).toLocaleString('en-CA', { 
        timeZone: 'America/Halifax',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => handleEdit(note)}
        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(note.noteId)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

export default NoteCard;