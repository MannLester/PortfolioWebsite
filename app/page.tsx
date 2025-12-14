import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#212121] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <h1 className="text-lg font-semibold">ChatGPT</h1>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors">
            Upgrade to Go
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl font-medium text-center mb-8 text-white/90">
              What are you working on?
            </h2>
            
            {/* Input Area */}
            <div className="relative">
              <div className="flex items-center bg-[#2f2f2f] border border-white/20 rounded-full p-4 focus-within:border-white/40 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4 text-white/60">
                  <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Ask anything"
                  className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
                />
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1C14.76 1 17.02 2.47 18.12 4.5H21C21.55 4.5 22 4.95 22 5.5S21.55 6.5 21 6.5H19.71C19.89 7.31 20 8.15 20 9C20 13.42 16.42 17 12 17S4 13.42 4 9C4 8.15 4.11 7.31 4.29 6.5H3C2.45 6.5 2 4.95 2 4.5S2.45 4.5 3 4.5H5.88C6.98 2.47 9.24 1 12 1Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19.4 15A1.65 1.65 0 0 0 21 13.09A1.65 1.65 0 0 0 19.4 9M4.6 9A1.65 1.65 0 0 0 3 10.91A1.65 1.65 0 0 0 4.6 15" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
