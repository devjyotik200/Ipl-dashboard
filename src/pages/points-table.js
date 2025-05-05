// pages/points-table.js

import { useEffect, useState } from "react";
import PointsTable from "../components/PointsTable";
import Navbar from "../components/Navbar";
import { useQuery } from '@tanstack/react-query';

export default function PointsTablePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ipl-points-table"],
    queryFn: async () => {
      const res = await fetch("/api/getPointsTable");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 60 * 1000, // Don't refetch for 1 min
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen text-black bg-gray-100">
         <Navbar/>
        <h1 className="text-2xl font-bold text-center my-6 ">
          IPL Points Table
        </h1>
        {isLoading && (
          <div className="text-center text-blue-600 animate-pulse">
            Loading...
          </div>
        )}

        {isError && (
          <div className="text-center text-red-600">Error fetching data</div>
        )}

        {data && <PointsTable points={data?.pointsTable} />}
      </div>
    </>
  );
}
