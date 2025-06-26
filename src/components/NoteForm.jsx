// import React from "react";

// const NoteForm = ({
//   form,
//   setForm,
//   handleSubmit,
//   titleRef,
//   contentRef,
//   tagsRef,
//   isEditMode,
// }) => (
//   <form
//     onSubmit={handleSubmit}
//     className="bg-white p-6 rounded-lg shadow-md mb-6"
//   >
//     <h2 className="text-xl font-bold mb-4">
//       {isEditMode ? "Edit Note" : "Create Note"}
//     </h2>
//     <input
//       ref={titleRef}
//       type="text"
//       placeholder="Title"
//       value={form.title}
//       onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
//       className="w-full p-2 mb-4 border rounded"
//       required
//     />
//     <textarea
//       ref={contentRef}
//       placeholder="Content"
//       value={form.content}
//       onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
//       className="w-full p-2 mb-4 border rounded"
//       required
//     />
//     <input
//       ref={tagsRef}
//       type="text"
//       placeholder="Tags (comma-separated)"
//       value={form.tags}
//       onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
//       className="w-full p-2 mb-4 border rounded"
//     />
//     <button
//       type="submit"
//       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//     >
//       {isEditMode ? "Update" : "Create"}
//     </button>
//     {isEditMode && (
//       <button
//         type="button"
//         onClick={() => setForm({ title: "", content: "", tags: "", noteId: "" })}
//         className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
//       >
//         Cancel
//       </button>
//     )}
//   </form>
// );

// export default NoteForm;

"use client"
import { Save, X, FileText, Type, Tags } from "lucide-react"

const NoteForm = ({ form, setForm, handleSubmit, titleRef, contentRef, tagsRef, isEditMode, onCancel }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
          <FileText className="h-5 w-5 text-white" />
        </div>
        {isEditMode ? "Edit Note" : "Create New Note"}
      </h2>
      <p className="text-gray-600 mt-1">
        {isEditMode ? "Update your note with new information" : "Capture your thoughts and ideas"}
      </p>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Type className="h-4 w-4 text-indigo-600" />
          Title
        </label>
        <input
          id="title"
          ref={titleRef}
          type="text"
          placeholder="Enter a descriptive title for your note..."
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg font-medium placeholder-gray-400"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FileText className="h-4 w-4 text-indigo-600" />
          Content
        </label>
        <textarea
          id="content"
          ref={contentRef}
          placeholder="Write your note content here... Share your thoughts, ideas, or important information."
          value={form.content}
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
          rows="6"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Tags className="h-4 w-4 text-indigo-600" />
          Tags
        </label>
        <input
          id="tags"
          ref={tagsRef}
          type="text"
          placeholder="Add tags separated by commas (e.g., work, personal, ideas)"
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        />
        {/* <p className="text-xs text-gray-500">Tags help you organize and find your notes easily</p> */}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Save className="h-5 w-5" />
          {isEditMode ? "Update Note" : "Create Note"}
        </button>

        {(isEditMode || onCancel) && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            <X className="h-5 w-5" />
            Cancel
          </button>
        )}
      </div>
    </form>
  </div>
)

export default NoteForm
