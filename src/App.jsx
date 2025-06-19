"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { LogOut, Notebook, X } from "lucide-react";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import SearchFilter from "./components/SearchFilter";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ConfirmSignUp from "./components/ConfirmSignUp";
import { apiEndpoint } from "./config"

function App() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken") || null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [form, setForm] = useState({ title: "", content: "", tags: "", noteId: "" });
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [authStep, setAuthStep] = useState("login");
  const [pendingEmail, setPendingEmail] = useState("");
  const [message, setMessage] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);

  // const apiEndpoint = "https://nb9tevkex0.execute-api.us-east-1.amazonaws.com";

  // Clear confirmation message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Load saved token and userId
  useEffect(() => {
    const savedToken = localStorage.getItem("idToken");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken && savedUserId) {
      setIdToken(savedToken);
      setUserId(savedUserId);
    }
  }, []);

  // Fetch all notes (only on initial load or after create/update/delete)
  const fetchNotes = useCallback(async () => {
    if (!userId || !idToken) return;
    try {
      const response = await axios.get(`${apiEndpoint}/notes`, {
        params: { userId, sortBy, sortOrder },
        headers: { Authorization: `Bearer ${idToken}` },
      });
      let sortedNotes = response.data.notes || [];
      if (sortedNotes.length > 0) {
        sortedNotes.sort((a, b) => {
          if (sortBy === "title")
            return sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          return sortOrder === "asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
      setNotes(sortedNotes);
      console.log("Fetched all notes:", sortedNotes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setMessage("❌ Failed to fetch notes");
    }
  }, [sortBy, sortOrder, userId, idToken]);

  // Initial fetch when user logs in
  useEffect(() => {
    if (userId && idToken) {
      fetchNotes();
    }
  }, [userId, idToken, fetchNotes]);

  // Search notes
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userId || !idToken) return;
    try {
      const response = await axios.get(`${apiEndpoint}/notes/search`, {
        params: {
          userId,
          title: title || undefined,
          keywords: keywords || undefined,
          content: content || undefined,
          createdDate: createdDate || undefined,
        },
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const searchedNotes = response.data.notes || [];
      setNotes(searchedNotes);
      console.log("Search results:", searchedNotes);
      setMessage(searchedNotes.length > 0 ? "✅ Search completed" : "⚠️ No notes found");
    } catch (error) {
      console.error("Failed to search notes:", error);
      setMessage("❌ Failed to search notes");
      setNotes([]);
    }
  };

  const handleDelete = async (noteId) => {
    if (
      !userId ||
      !idToken ||
      !window.confirm(
        `Are you sure you want to delete "${notes.find((n) => n.noteId === noteId)?.title}"?`
      )
    ) {
      return;
    }
    try {
      await axios.delete(`${apiEndpoint}/notes/${noteId}`, {
        data: { userId, email: userId },
        headers: { Authorization: `Bearer ${idToken}` },
      });
      setNotes(notes.filter((note) => note.noteId !== noteId));
      setMessage("✅ Note deleted successfully");
      fetchNotes(); // Refresh all notes after deletion
    } catch (error) {
      console.error("Failed to delete note:", error);
      setMessage("❌ Failed to delete note");
    }
  };

  const handleEdit = (note) => {
    setForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      noteId: note.noteId,
    });
    setIsEditMode(true);
    titleRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !idToken) return;
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
      };
      if (isEditMode && form.noteId) {
        await axios.put(`${apiEndpoint}/notes/${form.noteId}`, payload, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setIsEditMode(false);
        setMessage("✅ Note updated successfully");
      } else {
        const response = await axios.post(`${apiEndpoint}/notes`, payload, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (response.status === 201) {
          setForm({ title: "", content: "", tags: "", noteId: "" });
          setMessage("✅ Note created successfully");
        }
      }
      fetchNotes(); // Refresh all notes after create/update
    } catch (error) {
      console.error("Failed to save note:", error);
      setMessage("❌ Failed to save note");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIdToken(null);
    setUserId(null);
    setAuthStep("login");
  };

  // Authentication screens
  if (!idToken || !userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Notebook className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">NoteNest</h1>
            <p className="text-gray-600 mt-2">Manage your notes with ease</p>
          </div>

          {authStep === "signup" && (
            <>
              <SignUpForm
                onSignUp={(email) => {
                  setPendingEmail(email);
                  setAuthStep("confirm");
                }}
              />
              <p className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
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
                  setIdToken(jwt);
                  setUserId(userId);
                }}
              />
              <p className="text-center mt-6 text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
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
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setAuthStep("login")}
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Notebook className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">NoteNest</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mt-4 p-3 rounded-md flex items-center justify-between bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-800">{message}</p>
            <button
              onClick={() => setMessage("")}
              className="text-blue-800 hover:bg-blue-200 p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="space-y-6">
          <NoteForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            titleRef={titleRef}
            contentRef={contentRef}
            tagsRef={tagsRef}
            isEditMode={isEditMode}
          />
          <SearchFilter
            title={title}
            setTitle={setTitle}
            keywords={keywords}
            setKeywords={setKeywords}
            content={content}
            setContent={setContent}
            createdDate={createdDate}
            setCreatedDate={setCreatedDate}
            handleSearch={handleSearch}
          />
          <div className="flex justify-between mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.length === 0 && message.includes("No notes found") ? (
              <p className="text-gray-600">No notes match your search criteria.</p>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note.noteId}
                  note={note}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;