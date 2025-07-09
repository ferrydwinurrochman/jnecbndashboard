
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainPage, SubPage } from "../types/page-types"
import { EnhancedButton } from "./ui/enhanced-button"
import { BentoCard } from "./ui/bento-card"

interface EnhancedPageRendererProps {
  pageData?: MainPage
  currentSubPage?: SubPage | null
  onSubPageSelect?: (subPage: SubPage) => void
  showEditButton?: boolean
  onEditPage?: () => void
}

export default function EnhancedPageRenderer({
  pageData,
  currentSubPage,
  onSubPageSelect,
  showEditButton = false,
  onEditPage
}: EnhancedPageRendererProps) {
  // Set dynamic page title
  useEffect(() => {
    if (pageData?.name) {
      if (currentSubPage) {
        const prefix = currentSubPage.type === 'powerbi' ? 'Power BI' : 'Excel'
        document.title = `${prefix} ${pageData.name} - Dashboard Shipment JNE`
      } else {
        document.title = `${pageData.name} - Dashboard Shipment JNE`
      }
    } else {
      document.title = 'Dashboard Shipment JNE'
    }
  }, [pageData?.name, currentSubPage])

  // Validation: Return null if no pageData
  if (!pageData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1A2D38 0%, #1B3657 46%, #1B3E70 100%)'
        }}
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-center p-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">No Page Data Available</h2>
          <p className="text-gray-400">The requested page could not be found.</p>
          <EnhancedButton 
            onClick={() => window.location.href = '/admin'} 
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Back to Dashboard
          </EnhancedButton>
        </div>
      </motion.div>
    )
  }

  // If showing a specific subpage
  if (currentSubPage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #1A2D38 0%, #1B3657 46%, #1B3E70 100%)'
        }}
      >
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentSubPage.name}
              </h1>
              <p className="text-gray-300 mt-1">
                {pageData.name} - {currentSubPage.type === 'powerbi' ? 'Power BI Analytics' : 'Spreadsheet Data'}
              </p>
            </div>
            {showEditButton && onEditPage && (
              <EnhancedButton
                onClick={onEditPage}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Edit This Page
              </EnhancedButton>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-0 overflow-hidden">
            {currentSubPage.embedUrl ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse" />
                <iframe
                  src={currentSubPage.embedUrl}
                  className="w-full h-[calc(100vh-200px)] border-0"
                  title={`${currentSubPage.type} Content`}
                  allowFullScreen
                />
              </div>
            ) : currentSubPage.customHtml ? (
              <div 
                className="w-full h-[calc(100vh-200px)] p-6 text-white"
                dangerouslySetInnerHTML={{ __html: currentSubPage.customHtml }}
              />
            ) : (
              <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    No Content Available
                  </h3>
                  <p className="text-gray-400">
                    This {currentSubPage.type} page hasn't been configured yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Main page view with subpage cards
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #1A2D38 0%, #1B3657 46%, #1B3E70 100%)'
      }}
    >
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {pageData.name}
            </h1>
            {pageData.description && (
              <p className="text-gray-300 mt-2">
                {pageData.description}
              </p>
            )}
            {pageData.classification && (
              <span className="inline-block px-3 py-1 mt-3 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                {pageData.classification}
              </span>
            )}
          </div>
          {showEditButton && onEditPage && (
            <EnhancedButton
              onClick={onEditPage}
              variant="outline"
              size="md"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Edit This Page
            </EnhancedButton>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {pageData.customHtml && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl mb-6 p-6">
            <div className="text-white" dangerouslySetInnerHTML={{ __html: pageData.customHtml }} />
          </div>
        )}

        {/* Subpages Grid */}
        {pageData.subPages && pageData.subPages.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {pageData.subPages.map((subPage, index) => (
              <motion.div
                key={subPage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        subPage.type === 'powerbi' 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                          : 'bg-gradient-to-br from-green-500 to-blue-600'
                      }`}>
                        {subPage.type === 'powerbi' ? (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">
                          {subPage.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {subPage.type === 'powerbi' ? 'Power BI Analytics' : 'Spreadsheet Data'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mb-4">
                    {subPage.embedUrl || subPage.customHtml ? (
                      <div className={`h-32 rounded-lg flex items-center justify-center ${
                        subPage.type === 'powerbi' 
                          ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                          : 'bg-gradient-to-br from-green-500/20 to-blue-500/20'
                      }`}>
                        <span className={`text-sm ${
                          subPage.type === 'powerbi' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                          {subPage.type === 'powerbi' ? 'Power BI Report' : 'Spreadsheet Data'} Preview
                        </span>
                      </div>
                    ) : (
                      <div className="h-32 bg-gray-700/50 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No content available</span>
                      </div>
                    )}
                  </div>

                  <EnhancedButton
                    onClick={() => onSubPageSelect?.(subPage)}
                    variant="primary"
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    View {subPage.type === 'powerbi' ? 'Analytics' : 'Data'}
                  </EnhancedButton>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-center p-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              No Subpages Available
            </h3>
            <p className="text-gray-400">
              Create subpages to display Power BI reports and spreadsheet data.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
