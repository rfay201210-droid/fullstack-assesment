"use client";

import { useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  author: string;
  year: number;
}

interface PaginatedResponse {
  items: Item[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export default function Home() {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const LIMIT = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8000/items?page=${page}&limit=${LIMIT}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch items`);
        }
        const result: PaginatedResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Library Catalog</h1>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center text-gray-500 font-medium animate-pulse">
            Loading items...
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Data State */}
        {!loading && !error && data && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="p-3 text-sm font-semibold">ID</th>
                    <th className="p-3 text-sm font-semibold">Title</th>
                    <th className="p-3 text-sm font-semibold">Author</th>
                    <th className="p-3 text-sm font-semibold">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        No items found.
                      </td>
                    </tr>
                  ) : (
                    data.items.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{item.id}</td>
                        <td className="p-3 text-sm font-medium">{item.title}</td>
                        <td className="p-3 text-sm">{item.author}</td>
                        <td className="p-3 text-sm">
                          {item.year < 0 ? `${Math.abs(item.year)} BC` : item.year}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <span className="text-sm text-gray-600">
                Page <span className="font-semibold">{data.page}</span> of{" "}
                <span className="font-semibold">{data.total_pages}</span> ({data.total} total)
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, data.total_pages))}
                  disabled={page >= data.total_pages}
                  className="px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}