"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Stats {
  totalPages: number
  totalUsers: number
  adminUsers: number
  viewerUsers: number
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalPages: 0,
    totalUsers: 0,
    adminUsers: 0,
    viewerUsers: 0,
  })

  useEffect(() => {
    // Load stats from localStorage
    const pages = JSON.parse(localStorage.getItem("adminPages") || "[]")
    const users = JSON.parse(localStorage.getItem("adminUsers") || "[]")

    setStats({
      totalPages: pages.length,
      totalUsers: users.length,
      adminUsers: users.filter((user: any) => user.role === "admin").length,
      viewerUsers: users.filter((user: any) => user.role === "viewer").length,
    })
  }, [])

  const statCards = [
    {
      title: "Total Pages",
      value: stats.totalPages,
      icon: "📄",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Admin Users",
      value: stats.adminUsers,
      icon: "👑",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Viewer Users",
      value: stats.viewerUsers,
      icon: "👁️",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-gray-400">Manage your Power BI reports and users from here</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glass-morphism rounded-2xl p-6 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}
            >
              <span className="text-2xl">{card.icon}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-morphism rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300"
          >
            Add New Page
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-neon-purple to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300"
          >
            Add New User
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
