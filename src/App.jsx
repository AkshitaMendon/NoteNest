"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import axios from "axios"
import { LogOut, Notebook, X, Plus, Filter, SortAsc, SortDesc } from "lucide-react"
import NoteCard from "./components/NoteCard"
import NoteForm from "./components/NoteForm"
import SearchFilter from "./components/SearchFilter"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import ConfirmSignUp from "./components/ConfirmSignUp"
import NoteViewModal from "./components/NoteViewModal"
import { apiEndpoint } from "./config"

function App() {
  const [notes, setNotes] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null)
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken") || null)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [form, setForm] = useState({ title: "", content: "", tags: "", noteId: "" })
  const [title, setTitle] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [authStep, setAuthStep] = useState("login")
  const [pendingEmail, setPendingEmail] = useState("")
  const [message, setMessage] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showSearchFilter, setShowSearchFilter] = useState(false)
  const [viewingNote, setViewingNote] = useState(null)

  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const tagsRef = useRef(null)

  // Clear confirmation message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Load saved token and userId
  useEffect(() => {
    const savedToken = localStorage.getItem("idToken")
    const savedUserId = localStorage.getItem("userId")
    if (savedToken && savedUserId) {
      setIdToken(savedToken)
      setUserId(savedUserId)
    }
  }, [])

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    if (!userId || !idToken) return
    try {
      const response = await axios.get(`${apiEndpoint}/notes`, {
        params: { userId, sortBy, sortOrder },
        headers: { Authorization: `Bearer ${idToken}` },
      })
      const sortedNotes = response.data.notes || []
      if (sortedNotes.length > 0) {
        sortedNotes.sort((a, b) => {
          if (sortBy === "title")
            return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
          return sortOrder === "asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt)
        })
      }
      setNotes(sortedNotes)
      console.log("Fetched all notes:", sortedNotes)
    } catch (error) {
      console.error("Failed to fetch notes:", error)
      setMessage("❌ Failed to fetch notes")
    }
  }, [sortBy, sortOrder, userId, idToken])

  // Initial fetch when user logs in
  useEffect(() => {
    if (userId && idToken) {
      fetchNotes()
    }
  }, [userId, idToken, fetchNotes])

  // Search notes
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!userId || !idToken) return
    try {
      const response = await axios.get(`${apiEndpoint}/notes/search`, {
        params: {
          userId,
          title: title || undefined,
          createdDate: createdDate || undefined,
        },
        headers: { Authorization: `Bearer ${idToken}` },
      })
      const searchedNotes = response.data.notes || []
      setNotes(searchedNotes)
      console.log("Search results:", searchedNotes)
      setMessage(searchedNotes.length > 0 ? "✅ Search completed" : "⚠️ No notes found")
    } catch (error) {
      console.error("Failed to search notes:", error)
      throw error // Propagate to SearchFilter.jsx
    }
  }

  const handleDelete = async (noteId) => {
    if (
      !userId ||
      !idToken ||
      !window.confirm(`Are you sure you want to delete "${notes.find((n) => n.noteId === noteId)?.title}"?`)
    ) {
      return
    }
    try {
      await axios.delete(`${apiEndpoint}/notes/${noteId}`, {
        data: { userId, email: userId },
        headers: { Authorization: `Bearer ${idToken}` },
      })
      setNotes(notes.filter((note) => note.noteId !== noteId))
      setMessage("✅ Note deleted successfully")
      fetchNotes()
    } catch (error) {
      console.error("Failed to delete note:", error)
      setMessage("❌ Failed to delete note")
    }
  }

  const handleEdit = (note) => {
    setForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      noteId: note.noteId,
    })
    setIsEditMode(true)
    setShowCreateForm(true)
    titleRef.current?.focus()
  }

  const handleView = (note) => {
    setViewingNote(note)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId || !idToken) return
    try {
      const payload = {
        userId,
        title: form.title,
        content: form.content,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        email: userId,
      }
      if (isEditMode && form.noteId) {
        await axios.put(`${apiEndpoint}/notes/${form.noteId}`, payload, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        setIsEditMode(false)
        setMessage("✅ Note updated successfully")
      } else {
        const response = await axios.post(`${apiEndpoint}/notes`, payload, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        if (response.status === 201) {
          setMessage("✅ Note created successfully")
        }
      }
      // Reset form after successful submission
      setForm({ title: "", content: "", tags: "", noteId: "" })
      setShowCreateForm(false)
      fetchNotes()
    } catch (error) {
      console.error("Failed to save note:", error)
      setMessage("❌ Failed to save note")
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    setIdToken(null)
    setUserId(null)
    setAuthStep("login")
  }

  const handleCancelEdit = () => {
    setForm({ title: "", content: "", tags: "", noteId: "" })
    setIsEditMode(false)
    setShowCreateForm(false)
  }

  const handleCreateNote = () => {
    // Reset form to blank when creating new note
    setForm({ title: "", content: "", tags: "", noteId: "" })
    setIsEditMode(false)
    setShowCreateForm(!showCreateForm)
  }

  // Authentication screens
  if (!idToken || !userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Notebook className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NoteNest
            </h1>
            {/* <p className="text-gray-600 mt-3 text-lg">Organize your thoughts beautifully</p> */}
          </div>

          {authStep === "signup" && (
            <>
              <SignUpForm
                onSignUp={(email) => {
                  setPendingEmail(email)
                  setAuthStep("confirm")
                }}
              />
              <p className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                  onClick={() => setAuthStep("login")}
                >
                  Sign In
                </button>
              </p>
            </>
          )}

          {authStep === "login" && (
            <>
              <LoginForm
                onLogin={(jwt, userId) => {
                  setIdToken(jwt)
                  setUserId(userId)
                }}
              />
              <p className="text-center mt-6 text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                  onClick={() => setAuthStep("signup")}
                >
                  Sign Up
                </button>
              </p>
            </>
          )}

          {authStep === "confirm" && (
            <>
              <ConfirmSignUp email={pendingEmail} />
              <p className="text-center mt-6 text-sm text-gray-600">
                Back to{" "}
                <button
                  className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                  onClick={() => setAuthStep("login")}
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <Notebook className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NoteNest
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden sm:block">Welcome, {userId.split("@")[0]}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Alert */}
        {message && (
          <div className="mb-6 p-4 rounded-xl flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
            <p className="text-sm text-blue-800 font-medium">{message}</p>
            <button
              onClick={() => setMessage("")}
              className="text-blue-800 hover:bg-blue-200 p-1 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleCreateNote}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            {showCreateForm ? "Hide Form" : "Create Note"}
          </button>

          <button
            onClick={() => setShowSearchFilter(!showSearchFilter)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
          >
            <Filter className="h-5 w-5" />
            {showSearchFilter ? "Hide Search" : "Search & Filter"}
          </button>

          <div className="flex gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
            >
              {sortOrder === "asc" ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Note Form */}
          {showCreateForm && (
            <NoteForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              titleRef={titleRef}
              contentRef={contentRef}
              tagsRef={tagsRef}
              isEditMode={isEditMode}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Search Filter */}
          {showSearchFilter && (
            <SearchFilter
              title={title}
              setTitle={setTitle}
              createdDate={createdDate}
              setCreatedDate={setCreatedDate}
              handleSearch={handleSearch}
            />
          )}

          {/* Notes Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Notes{" "}
                {notes.length > 0 && <span className="text-lg font-normal text-gray-500">({notes.length})</span>}
              </h2>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Notebook className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
                <p className="text-gray-600 mb-6">Create your first note to get started organizing your thoughts</p>
                <button
                  onClick={handleCreateNote}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Create Your First Note
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard
                    key={note.noteId}
                    note={note}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleView={handleView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Note View Modal */}
      {viewingNote && (
        <NoteViewModal
          note={viewingNote}
          onClose={() => setViewingNote(null)}
          onEdit={() => {
            handleEdit(viewingNote)
            setViewingNote(null)
          }}
          onDelete={() => {
            handleDelete(viewingNote.noteId)
            setViewingNote(null)
          }}
        />
      )}
    </div>
  )
}

export default App
