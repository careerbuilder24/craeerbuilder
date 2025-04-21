import React from 'react';

export default function PendingTable() {
  const upcomingMovies = [
    {
      name: 'Avengers Black Widow',
      category: ['Action', 'Thriller'],
      watchlists: '389,234',
      owner: 'Sony Entertainment',
      premiere: '21th May, 2022',
      avatar: 'https://i.postimg.cc/Lsssc8Fs/intern-1.jpg',
    },
    {
      name: 'Moonlight',
      category: ['True Story', '+2 more'],
      watchlists: '5,893',
      owner: 'A24 and Plan B Entertainment',
      premiere: '15th August, 2022',
      avatar: 'https://i.postimg.cc/63k54V27/intern-2.jpg',
    },
    {
      name: 'Grimsby',
      category: ['Comedy', 'Crime'],
      watchlists: '200,901',
      owner: 'Sony Entertainment',
      premiere: '5th October, 2022',
      avatar: 'https://i.postimg.cc/0Qw9v6W9/Whats-App-Image-2025-03-10-at-04-49-39-e45725ba.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
   
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
    {
      name: 'Spider Man - No way home',
      category: ['Action', 'Thriller'],
      watchlists: '509,262',
      owner: 'Sony Entertainment',
      premiere: '25th December, 2022',
      avatar: 'https://i.postimg.cc/hPrcKRrQ/Whats-App-Image-2025-03-10-at-04-49-40-0e023afe.jpg',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Pending All Request</h2>
          <p className="text-sm text-gray-500">All data of students Request</p>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded-md text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-2">Name </th>
              <th className="p-2">Action</th>
              <th className="p-2">Pending Category</th>
              <th className="p-2">Students Email</th>
              <th className="p-2">Register Date</th>
              <th className="p-2">View Report</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMovies.map((movie, index) => (
              <tr
                key={index}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
              >
                <td className="flex items-center gap-3 p-2">
                  <img
                    src={movie.avatar}
                    alt={movie.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{movie.name}</span>
                </td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-1">
                    {movie.category.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-2">{movie.watchlists}</td>
                <td className="p-2">{movie.owner}</td>
                <td className="p-2">{movie.premiere}</td>
                <td className="p-2">
                  <button className="text-sm px-4 py-1 border rounded-full hover:bg-gray-200 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <button className="text-sm border px-4 py-2 rounded-full hover:bg-gray-100">
          View all upcoming premiers
        </button>
      </div>
    </div>
  );
}
