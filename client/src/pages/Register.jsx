
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setIsError(false);
        setLoading(true);

        try {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }
    );

            const data = await response.json();

            if (!response.ok) {
                setIsError(true);
                setMessage(data.message || "Registration failed");
                return;
            }

            setMessage(
                "Account created successfully! You can now log in."
            );

            setName("");
            setEmail("");
            setPassword("");

        } 
catch (error) {
    setIsError(true);
    setMessage("Server error. Please try again.");
}
         finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6">
            <div className="w-full max-w-md">

                {/* Registration Card */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-10">

                    {/* Logo and Heading */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-extrabold text-white shadow-md">
                            S
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Create Account
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Join ShopNest and start shopping today!
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                minLength={8}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                required
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Password must be at least 8 characters long.
                            </p>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Create Account →"}
                        </button>

                        {/* Status Message */}
                        {message && (
                            <p
                                role="status"
                                aria-live="polite"
                                className={`rounded-xl p-3 text-center text-sm font-medium ${
                                    isError
                                        ? "border border-red-200 bg-red-50 text-red-600"
                                        : "border border-green-200 bg-green-50 text-green-600"
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-blue-600 transition hover:text-blue-800"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    ShopNest — Your shopping destination
                </p>
            </div>
        </div>
    );
}

export default Register;