import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;
  const activeClass = 'text-blue-600 border-blue-600';
  const baseClass =
    'px-3 py-2 border-b-2 hover:text-blue-500 transition-all font-medium';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-4 flex justify-between items-center h-14">
        <div className="text-xl font-bold text-blue-700">🏏 IPL Dashboard</div>

        <div className="flex gap-4 text-sm sm:text-base">
          <Link
            href="/"
            className={`${baseClass} ${isActive('/') ? activeClass : 'text-gray-600 border-transparent'}`}
          >
            Home
          </Link>
          <Link
            href="/points-table"
            className={`${baseClass} ${isActive('/points-table') ? activeClass : 'text-gray-600 border-transparent'}`}
          >
            Points Table
          </Link>
          <Link
            href="/schedule"
            className={`${baseClass} ${isActive('/schedule') ? activeClass : 'text-gray-600 border-transparent'}`}
          >
            Schedule
          </Link>
        </div>
      </div>
    </nav>
  );
}

