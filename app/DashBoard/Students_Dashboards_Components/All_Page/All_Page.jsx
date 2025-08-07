import React from 'react'

const pages = [
  { id: 1, title: 'Home', slug: '/', status: 'Published' },
  { id: 2, title: 'About Us', slug: '/about', status: 'Draft' },
  { id: 3, title: 'Services', slug: '/services', status: 'Published' },
  { id: 4, title: 'Contact', slug: '/contact', status: 'Archived' },
]

export default function All_Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Pages</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Title</th>
              <th className="py-3 px-4 border-b">Slug</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{page.title}</td>
                <td className="py-2 px-4 border-b text-blue-600">{page.slug}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      page.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : page.status === 'Draft'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
