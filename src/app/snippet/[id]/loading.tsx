import React from 'react'

const loading = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Loading indicator */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 text-blue-400">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">Loading snippet...</span>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-8 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded w-64 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-48 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded w-20 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
              <div className="h-10 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded w-20 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-900/80 rounded-lg border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 border-b border-gray-700">
              <div className="h-4 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded w-24 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500/50 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500/50 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-green-500/50 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse bg-[length:200%_100%] animate-shimmer`}
                    style={{ 
                      width: `${Math.random() * 40 + 40}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading
