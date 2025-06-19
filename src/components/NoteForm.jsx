import React from "react";

const NoteForm = ({
  form,
  setForm,
  handleSubmit,
  titleRef,
  contentRef,
  tagsRef,
  isEditMode,
}) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-md mb-6"
  >
    <h2 className="text-xl font-bold mb-4">
      {isEditMode ? "Edit Note" : "Create Note"}
    </h2>
    <input
      ref={titleRef}
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
      className="w-full p-2 mb-4 border rounded"
      required
    />
    <textarea
      ref={contentRef}
      placeholder="Content"
      value={form.content}
      onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
      className="w-full p-2 mb-4 border rounded"
      required
    />
    <input
      ref={tagsRef}
      type="text"
      placeholder="Tags (comma-separated)"
      value={form.tags}
      onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
      className="w-full p-2 mb-4 border rounded"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {isEditMode ? "Update" : "Create"}
    </button>
    {isEditMode && (
      <button
        type="button"
        onClick={() => setForm({ title: "", content: "", tags: "", noteId: "" })}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
      >
        Cancel
      </button>
    )}
  </form>
);

export default NoteForm;