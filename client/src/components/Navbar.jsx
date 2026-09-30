

import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/products"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl font-extrabold text-white shadow-sm">
                        S
                    </div>

                    <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Shop<span className="text-blue-600">Nest</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-2.5 text-sm font-bold transition sm:px-5 ${
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-2.5 text-sm font-bold transition sm:px-5 ${
                                isActive
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            }`
                        }
                    >
                        🛒 Cart
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 sm:px-5"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
