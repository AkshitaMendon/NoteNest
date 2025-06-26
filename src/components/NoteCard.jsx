// "use client"
// import { Edit3, Trash2, Calendar, Tag } from "lucide-react"

// const NoteCard = ({ note, handleDelete, handleEdit }) => (
//   <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 overflow-hidden">
//     <div className="p-6">
//       <div className="flex items-start justify-between mb-4">
//         <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
//           {note.title}
//         </h3>
//         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//           <button
//             onClick={() => handleEdit(note)}
//             className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
//             title="Edit note"
//           >
//             <Edit3 className="h-4 w-4" />
//           </button>
//           <button
//             onClick={() => handleDelete(note.noteId)}
//             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//             title="Delete note"
//           >
//             <Trash2 className="h-4 w-4" />
//           </button>
//         </div>
//       </div>

//       <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{note.content}</p>

//       {note.tags && note.tags.length > 0 && (
//         <div className="flex items-center gap-2 mb-4">
//           <Tag className="h-4 w-4 text-gray-400" />
//           <div className="flex flex-wrap gap-1">
//             {note.tags.slice(0, 3).map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100"
//               >
//                 {tag}
//               </span>
//             ))}
//             {note.tags.length > 3 && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 +{note.tags.length - 3}
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="flex items-center gap-2 text-sm text-gray-500">
//         <Calendar className="h-4 w-4" />
//         <span>
//           {new Date(note.createdAt).toLocaleString("en-CA", {
//             timeZone: "America/Halifax",
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//             hour: "numeric",
//             minute: "numeric",
//             hour12: true,
//           })}
//         </span>
//       </div>
//     </div>

//     <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
//       <div className="flex gap-3">
//         <button
//           onClick={() => handleEdit(note)}
//           className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 font-medium"
//         >
//           <Edit3 className="h-4 w-4" />
//           Edit
//         </button>
//         <button
//           onClick={() => handleDelete(note.noteId)}
//           className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200 font-medium"
//         >
//           <Trash2 className="h-4 w-4" />
//           Delete
//         </button>
//       </div>
//     </div>
//   </div>
// )

// export default NoteCard

"use client"
import { Edit3, Trash2, Calendar, Tag, Eye } from "lucide-react"

const NoteCard = ({ note, handleDelete, handleEdit, handleView }) => (
  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 overflow-hidden h-fit">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-[2.5rem]">
          {note.title}
        </h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
          <button
            onClick={() => handleView(note)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="View full note"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(note)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            title="Edit note"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(note.noteId)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4 min-h-[4.5rem]">
        <p className="text-gray-700 line-clamp-3 leading-relaxed">{note.content || "No content"}</p>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-4 min-h-[2rem]">
          <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Calendar className="h-4 w-4 flex-shrink-0" />
        <span>
          {new Date(note.createdAt).toLocaleString("en-CA", {
            timeZone: "America/Halifax",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>
    </div>

    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
      <div className="flex gap-2">
        <button
          onClick={() => handleView(note)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 font-medium text-sm"
        >
          <Eye className="h-4 w-4" />
          View
        </button>
        <button
          onClick={() => handleEdit(note)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 font-medium text-sm"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={() => handleDelete(note.noteId)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200 font-medium text-sm"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
)

export default NoteCard