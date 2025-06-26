// "use client";

// import { useState } from "react";
// import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
// import userPool from "../cognito/userPool";

// export default function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");

//     const user = new CognitoUser({ Username: email, Pool: userPool });
//     const authDetails = new AuthenticationDetails({
//       Username: email,
//       Password: password,
//     });

//     user.authenticateUser(authDetails, {
//       onSuccess: (data) => {
//         const idToken = data.getIdToken().getJwtToken();
//         const userId = email; // Assuming userId is email
//         localStorage.setItem("idToken", idToken);
//         localStorage.setItem("userId", userId);
//         setMessage("✅ Login successful!");
//         if (onLogin) onLogin(idToken, userId);
//       },
//       onFailure: (err) => {
//         let msg = err.message || JSON.stringify(err);
//         if (msg === "User is not confirmed.") {
//           msg = "Email not verified.";
//         }
//         setMessage(msg);
//         setIsLoading(false);
//       },
//     });
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
//         <p className="text-center text-gray-600 mt-1">Enter your email and password to access NoteNest</p>
//       </div>
//       <div className="px-6 py-6">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//           </div>
//           <div className="relative">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Sign In
//           </button>
//         </form>
//         {message && (
//           <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
//             <p className="text-sm text-blue-800">{message}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { Loader2, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import userPool from "../cognito/userPool"

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const user = new CognitoUser({ Username: email, Pool: userPool })
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        const idToken = data.getIdToken().getJwtToken()
        const userId = email // Assuming userId is email
        localStorage.setItem("idToken", idToken)
        localStorage.setItem("userId", userId)
        setMessage("✅ Login successful!")
        if (onLogin) onLogin(idToken, userId)
      },
      onFailure: (err) => {
        let msg = err.message || JSON.stringify(err)
        if (msg === "User is not confirmed.") {
          msg = "Email not verified."
        }
        setMessage(msg)
        setIsLoading(false)
      },
    })
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-100">
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl w-fit mx-auto mb-4">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to access your notes and continue organizing your thoughts</p>
        </div>
      </div>

      <div className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl"
          >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {message && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium text-center">{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
