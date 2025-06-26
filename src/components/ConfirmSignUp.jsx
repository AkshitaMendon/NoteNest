// "use client";

// import { useState } from "react";
// import { Loader2, Mail, Shield } from "lucide-react";
// import { CognitoUser } from "amazon-cognito-identity-js";
// import userPool from "../cognito/userPool";
// import axios from "axios";

// export default function ConfirmSignUp({ email }) {
//   const [code, setCode] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const apiEndpoint = "https://nb9tevkex0.execute-api.us-east-1.amazonaws.com";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");

//     const user = new CognitoUser({
//       Username: email,
//       Pool: userPool,
//     });

//     try {
//       await new Promise((resolve, reject) => {
//         user.confirmRegistration(code, true, (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         });
//       });

//       try {
//         const response = await axios.post(
//           `${apiEndpoint}/notify`,
//           { userId: email, email: email },
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         console.log('POST /notify response:', response.data);
//         setMessage("✅ Account confirmed! Please check your email to subscribe to deletion notifications, then sign in.");
//       } catch (apiError) {
//         console.error('POST /notify error:', apiError.response?.data || apiError.message);
//         setMessage(`Account confirmed, but failed to send notification: ${apiError.response?.data?.message || apiError.message}`);
//       }
//     } catch (err) {
//       console.error('Confirmation error:', err);
//       setMessage(`Confirmation failed: ${err.message || JSON.stringify(err)}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <h2 className="text-2xl font-bold text-center text-gray-900">Confirm Your Account</h2>
//         <p className="text-center text-gray-600 mt-1">Enter the confirmation code sent to your email</p>
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
//                 value={email}
//                 readOnly
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
//               Confirmation Code
//             </label>
//             <div className="relative">
//               <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <input
//                 id="code"
//                 type="text"
//                 placeholder="Enter confirmation code"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Confirm Account
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
import { Loader2, Mail, Shield, CheckCircle } from "lucide-react"
import { CognitoUser } from "amazon-cognito-identity-js"
import userPool from "../cognito/userPool"
import axios from "axios"

export default function ConfirmSignUp({ email }) {
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const apiEndpoint = "https://nb9tevkex0.execute-api.us-east-1.amazonaws.com"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    try {
      await new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })

      try {
        const response = await axios.post(
          `${apiEndpoint}/notify`,
          { userId: email, email: email },
          { headers: { "Content-Type": "application/json" } },
        )
        console.log("POST /notify response:", response.data)
        setMessage(
          "✅ Account confirmed! Please check your email to subscribe to deletion notifications, then sign in.",
        )
      } catch (apiError) {
        console.error("POST /notify error:", apiError.response?.data || apiError.message)
        setMessage(
          `Account confirmed, but failed to send notification: ${apiError.response?.data?.message || apiError.message}`,
        )
      }
    } catch (err) {
      console.error("Confirmation error:", err)
      setMessage(`Confirmation failed: ${err.message || JSON.stringify(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-2xl w-fit mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">We've sent a confirmation code to your email address</p>
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
                value={email}
                readOnly
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="block text-sm font-semibold text-gray-700">
              Confirmation Code
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="code"
                type="text"
                placeholder="Enter the 6-digit confirmation code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 text-center text-lg font-mono tracking-widest"
                required
                maxLength="6"
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Check your email inbox and spam folder for the confirmation code
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl"
          >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isLoading ? "Confirming..." : "Confirm Account"}
          </button>
        </form>

        {message && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium text-center">{message}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Didn't receive the code? Check your spam folder or try signing up again
          </p>
        </div>
      </div>
    </div>
  )
}
