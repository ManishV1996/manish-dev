"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'NEXT JS',
    readTime: '5 min read',
    image: null,
    author: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("summary", formData.summary);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("readTime", formData.readTime);
      data.append("author", formData.author);
      if (formData.image) data.append("image", formData.image);

      const response = await fetch("/api/blog", { method: "POST", body: data });
      if (response.ok) { router.push("/blog"); router.refresh(); }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="text-white pb-20">
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-[#111927] border border-slate-800 rounded-lg p-8 md:p-12">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
            <p className="text-gray-400">Share your technical insights.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Post Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Mastering Next.js 14"
                      className="w-full bg-[#0b1220] border border-slate-800 px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <select
                      className="w-full bg-[#0b1220] border border-slate-800 px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="NEXT JS">NEXT JS</option>
                      <option value="REACT JS">REACT JS</option>
                      <option value="FULL STACK">FULL STACK</option>
                      <option value="PYTHON">PYTHON</option>
                      <option value="ARCHITECTURE">ARCHITECTURE</option>
                      <option value="PERFORMANCE">PERFORMANCE</option>
                      <option value="AUTOMATION">AUTOMATION</option>
                      <option value="PROJECT SHOWCASE">PROJECT SHOWCASE</option>
                      <option value="API DEVELOPMENT">API DEVELOPMENT</option>
                      <option value="MOBILE DEVELOPMENT">MOBILE DEVELOPMENT</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Read Time</label>
                    <input
                      type="text"
                      placeholder="8 min read"
                      className="w-full bg-[#0b1220] border border-slate-800 px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Author</label>
                    <input
                      type="text"
                      placeholder="Enter author name"
                      className="w-full bg-[#0b1220] border border-slate-800 px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Image */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image</label>
                <label className="flex flex-col items-center justify-center bg-[#0b1220] border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden h-[168px]">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500 p-6 text-center">
                      <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs mt-1 text-gray-600">PNG, JPG, WebP (max 2MB recommended)</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setFormData({ ...formData, image: '' }); }}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 text-left"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Short Summary</label>
              <textarea
                rows="3"
                required
                placeholder="A brief overview for the blog card..."
                className="w-full bg-[#0b1220] border border-slate-800 px-4 py-3 rounded-lg focus:border-blue-500 outline-none resize-none"
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>

            {/* Rich Markdown Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Content
                <span className="ml-2 text-[11px] text-slate-600 font-normal">
                  Supports Markdown — headings, bold, italic, code blocks, lists
                </span>
              </label>

              {/* Toolbar hint pills */}
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  { label: "# Heading", hint: "H1" },
                  { label: "**Bold**", hint: "B" },
                  { label: "_Italic_", hint: "I" },
                  { label: "```code```", hint: "Code" },
                  { label: "- List", hint: "List" },
                  { label: "> Quote", hint: "Quote" },
                ].map(({ label, hint }) => (
                  <span key={hint} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-mono border border-slate-700">
                    {label}
                  </span>
                ))}
              </div>

              <div data-color-mode="dark">
                <MDEditor
                  value={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val || '' })}
                  height={420}
                  preview="live"
                  style={{
                    backgroundColor: '#0b1220',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <button type="button" onClick={() => router.back()} className="text-gray-400 px-6 hover:text-white transition">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold disabled:opacity-50 transition"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}