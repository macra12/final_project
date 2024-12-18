export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          {/* Skeleton Logo */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse mb-4" />
            <div className="w-48 h-6 bg-gray-200 rounded-lg animate-pulse" />
          </div>
  
          {/* Skeleton Form */}
          <div className="space-y-4 mt-8">
            {/* Toggle Buttons */}
            <div className="flex gap-2">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>
  
            {/* Input Fields */}
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
  
            {/* Button */}
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mt-6" />
  
            {/* Divider */}
            <div className="relative my-6">
              <div className="h-px bg-gray-200" />
              <div className="w-24 h-4 bg-gray-200 rounded mx-auto -mt-2" />
            </div>
  
            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
  
            {/* Bottom Text */}
            <div className="flex justify-center mt-6">
              <div className="w-52 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }