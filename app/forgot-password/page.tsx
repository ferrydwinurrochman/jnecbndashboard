
"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Toast from "../../components/toast"

interface User {
  id: string
  name: string
  email: string
  password: string
  phoneNumber?: string
  role: "admin" | "viewer"
  assignedPages?: string[]
  createdAt: string
}

interface PendingRegistration {
  id: string
  username: string
  phoneNumber: string
  password: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    userId: "",
    phoneNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [recoveredUser, setRecoveredUser] = useState<User | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setRecoveredUser(null)
    setIsLoading(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Check in approved users
      const users: User[] = JSON.parse(localStorage.getItem("adminUsers") || "[]")
      const pendingRegistrations: PendingRegistration[] = JSON.parse(
        localStorage.getItem("pendingRegistrations") || "[]",
      )

      // Find user by username/email and phone number
      const foundUser = users.find(
        (user) =>
          (user.name.toLowerCase() === formData.userId.toLowerCase() ||
            user.email.toLowerCase() === formData.userId.toLowerCase()) &&
          user.phoneNumber === formData.phoneNumber,
      )

      // If not found in approved users, check pending registrations
      if (!foundUser) {
        const pendingUser = pendingRegistrations.find(
          (reg) =>
            reg.username.toLowerCase() === formData.userId.toLowerCase() && reg.phoneNumber === formData.phoneNumber,
        )

        if (pendingUser) {
          if (pendingUser.status === "pending") {
            setError("Your registration is still pending approval. Please contact the administrator.")
          } else if (pendingUser.status === "rejected") {
            setError("Your registration was rejected. Please contact the administrator.")
          }
          setIsLoading(false)
          return
        }
      }

      if (foundUser) {
        setRecoveredUser(foundUser)
        setToastType("success")
        setToastMessage("Credentials recovered successfully!")
        setShowToast(true)
      } else {
        setError("User not found or phone number doesn't match our records.")
      }
    } catch (err) {
      console.error("Password recovery error:", err)
      setError("An error occurred during password recovery")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  const handleReset = () => {
    setFormData({ userId: "", phoneNumber: "" })
    setRecoveredUser(null)
    setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Animated particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-16 mx-auto mb-4 relative">
              <Image src="/images/jne-main-logo.png" alt="JNE Express Logo" fill className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password Recovery</h2>
            <p className="text-gray-300 text-sm">
              {recoveredUser ? "Your credentials have been recovered" : "Enter your details to recover your password"}
            </p>
          </motion.div>

          {!recoveredUser ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <label className="block text-sm font-medium text-gray-200 mb-2">User ID (Username or Email)</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your username or email"
                  required
                />
              </motion.div>

              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your registered phone number"
                  required
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/50 rounded-lg p-3"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 font-bold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Recovering Password...
                      </div>
                    ) : (
                      "Recover Password"
                    )}
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToLogin}
                  className="w-full py-3 font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-xl transition-all duration-300"
                >
                  Back to Login
                </motion.button>
              </motion.div>
            </form>
          ) : (
            /* Recovery Success Display */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Credentials Recovered!</h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                  <div className="text-white font-medium">{recoveredUser.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <div className="text-white font-medium">{recoveredUser.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                  <div className="text-white font-medium font-mono bg-white/10 px-3 py-2 rounded">
                    {recoveredUser.password}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToLogin}
                  className="w-full py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl transition-all duration-300"
                >
                  Go to Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-full py-3 font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-xl transition-all duration-300"
                >
                  Recover Another Account
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} duration={3000} />
      )}
    </div>
  )
}
