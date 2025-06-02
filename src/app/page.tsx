'use client'


// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
  // const [isConnected, setIsConnected] = useState(false);
  const [searchMethod, setSearchMethod] = useState<'search' | 'url'>('search');
  // const [searchQuery, setSearchQuery] = useState('');
  const [artistQuery, setArtistQuery] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null | {
    title: string;
    artist: string;
    albumCover: string;
    excerpts: Array<{
      original: string;
      translation: string;
    }>;
  }>(null);
  // const handleConnect = () => {
  //   // This would handle the Spotify authentication
  //   setIsConnected(true);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (searchMethod === 'search') {
      try {
        const response = await fetch(`/api/lyrics?title=${encodeURIComponent(songTitle)}&artist=${encodeURIComponent(artistQuery)}`);
        const data = await response.json();
        
        if (response.ok) {
          setResults({
            title: data.title,
            artist: artistQuery,
            albumCover: data.albumCover,
            excerpts: data.analysis.map((item: { part: string; decode: string }) => ({
              original: item.part,
              translation: item.decode
            }))
          });
        } else {
          // Handle error case
          console.error('Error fetching lyrics:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle URL search method
      // ... existing URL handling code ...
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2] font-sans">
      {isLoading && (
        <div className="fixed inset-0 bg-[#0D0D0D] bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A259FF] mx-auto mb-4"></div>
            <p className="text-xl text-[#F2F2F2]">Decoding your track...</p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold tracking-wider" style={{ fontFamily: 'Anton, sans-serif' }}>
            DECODE<span className="text-[#A259FF]">TRAP</span>
          </h1>
        </div>
        {/* <div>
          {isConnected ? (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#00FF99] mr-2"></div>
              <span className="text-sm">Connected to Spotify</span>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="bg-[#A259FF] hover:bg-[#8A4AD9] text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="fab fa-spotify mr-2"></i>
              Connect to Spotify
            </button>
          )}
        </div> */}
      </header>
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="relative mb-16 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=futuristic%20urban%20trap%20music%20studio%20with%20neon%20lights%2C%20dark%20atmosphere%2C%20sound%20equipment%2C%20music%20production%20setup%2C%20high%20quality%20digital%20art%20with%20purple%20and%20green%20accent%20lights%2C%20cinematic%20lighting&width=1200&height=400&seq=hero1&orientation=landscape"
            alt="Trap music studio"
            className="w-full h-[400px] object-cover object-top"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center z-20">
            <div className="max-w-2xl px-8 py-12">
              <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                DECODE THE <span className="text-[#00FF99]">LANGUAGE</span> OF TRAP
              </h2>
              <p className="text-xl mb-6">
                Understand the figures of speech and expressions from trap music with our AI-powered translator.
              </p>
              {/* <button className="bg-[#A259FF] hover:bg-[#8A4AD9] text-white py-3 px-8 rounded-button text-lg transition duration-300 whitespace-nowrap cursor-pointer">
                Get Started
              </button> */}
            </div>
          </div>
        </div>
        {/* Input Section */}
        <div className="bg-[#1F1F1F] rounded-xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            ANALYZE YOUR TRACK
          </h2>
          <div className="flex mb-6">
            <button
              onClick={() => setSearchMethod('search')}
              className={`flex-1 py-3 text-center rounded-l-button whitespace-nowrap cursor-pointer transition duration-300 ${searchMethod === 'search' ? 'bg-[#A259FF] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
            >
              <i className="fas fa-search mr-2"></i>
              Search Song
            </button>
            {/* <button
              onClick={() => setSearchMethod('url')}
              className={`flex-1 py-3 text-center rounded-r-button whitespace-nowrap cursor-pointer transition duration-300 ${searchMethod === 'url' ? 'bg-[#A259FF] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
            >
              <i className="fas fa-link mr-2"></i>
              Spotify URL
            </button> */}
          </div>
          <form onSubmit={handleSubmit}>
            {searchMethod === 'search' ? (
              <div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Type artist name..."
                    className="w-full bg-[#2D2D2D] border-none text-[#F2F2F2] py-4 px-5 pl-12 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                    value={artistQuery}
                    onChange={(e) => setArtistQuery(e.target.value)}
                  />
                  <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Type song title..."
                    className="w-full bg-[#2D2D2D] border-none text-[#F2F2F2] py-4 px-5 pl-12 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                  />
                  <i className="fas fa-music absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Paste Spotify URL here..."
                    className="w-full bg-[#2D2D2D] border-none text-[#F2F2F2] py-4 px-5 pl-12 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-[#A259FF]"
                    value={songUrl}
                    onChange={(e) => setSongUrl(e.target.value)}
                  />
                  <i className="fab fa-spotify absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <button
                  type="button"
                  className="text-sm text-[#A259FF] hover:text-[#8A4AD9] transition duration-300 flex items-center gap-2 mb-4 cursor-pointer"
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                    modal.innerHTML = `
    <div class="bg-[#1F1F1F] p-6 rounded-xl max-w-md w-full mx-4">
      <h3 class="text-xl font-bold mb-4">How to Copy Spotify Song URL</h3>
      <ol class="list-decimal list-inside space-y-2 mb-6">
        <li>Open Spotify and find your song</li>
        <li>Click the three dots (...) next to the song</li>
        <li>Select 'Share'</li>
        <li>Click 'Copy Song Link'</li>
      </ol>
      <button class="w-full bg-[#A259FF] hover:bg-[#8A4AD9] text-white py-2 px-4 rounded-button transition duration-300">
        Got it!
      </button>
    </div>
  `;
                    document.body.appendChild(modal);
                    const button = modal.querySelector('button');
                    if (button) {
                      button.onclick = () => modal.remove();
                    }
                    modal.onclick = (e) => {
                      if (e.target === modal) modal.remove();
                    };
                  }}
                >
                  <i className="fas fa-question-circle"></i>
                  How to get Spotify song URL?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#A259FF] hover:bg-[#8A4AD9] text-white py-4 rounded-button transition duration-300 font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-bolt mr-2"></i>
              Decode Song
            </button>
          </form>
        </div>
        {/* Results Section */}
        {results && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              ANALYSIS RESULTS
            </h2>
            <div className="bg-[#1F1F1F] rounded-xl p-8 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                  src={results.albumCover}
                  alt={`${results.title} album cover`}
                  className="w-48 h-48 rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {results.title}
                  </h3>
                  {/* <p className="text-xl text-gray-300 mb-4">
                    {results.artist}
                  </p> */}
                  {/* <div className="flex items-center gap-4">
                    <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer">
                      <i className="fab fa-spotify mr-2"></i>
                      Open in Spotify
                    </button>
                    <button className="bg-transparent border border-[#A259FF] text-[#A259FF] hover:bg-[#A259FF20] py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer">
                      <i className="fas fa-share-alt mr-2"></i>
                      Share
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="bg-[#1F1F1F] rounded-xl p-8 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                  src={results.albumCover}
                  alt={`${results.title} album cover`}
                  className="w-48 h-48 rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {results.title}
                  </h3>
                  <p className="text-xl text-gray-300 mb-4">
                    {results.artist}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer">
                      <i className="fab fa-spotify mr-2"></i>
                      Open in Spotify
                    </button>
                    <button className="bg-transparent border border-[#A259FF] text-[#A259FF] hover:bg-[#A259FF20] py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer">
                      <i className="fas fa-share-alt mr-2"></i>
                      Decode Lyrics
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              LYRICAL BREAKDOWN
            </h3>
            <div className="space-y-6">
              {results.excerpts.map((excerpt, index) => (
                <div key={index} className="bg-[#1F1F1F] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-[#A259FF]">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-[#00FF99]">
                      Original Phrase:
                    </h4>
                    <p className="text-xl italic">&ldquo;{excerpt.original}&rdquo;</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#3D3D3D] to-transparent my-4"></div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-[#A259FF]">
                      Translation:
                    </h4>
                    <p>{excerpt.translation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            FEATURES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1F1F1F] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-[#A259FF20] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-language text-2xl text-[#A259FF]"></i>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                SLANG TRANSLATION
              </h3>
              <p className="text-gray-300">
                Understand complex trap slang and regional expressions with our AI-powered translation system.
              </p>
            </div>
            {/* <div className="bg-[#1F1F1F] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-[#00FF9920] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-music text-2xl text-[#00FF99]"></i>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                SPOTIFY INTEGRATION
              </h3>
              <p className="text-gray-300">
                Seamlessly connect with your Spotify account to analyze any track in your library or discover new ones.
              </p>
            </div> */}
            <div className="bg-[#1F1F1F] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-[#A259FF20] rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-brain text-2xl text-[#A259FF]"></i>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                CULTURAL CONTEXT
              </h3>
              <p className="text-gray-300">
                Get deeper insights into the cultural references and historical context behind trap lyrics.
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-[#1F1F1F] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold tracking-wider mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                DECODE<span className="text-[#A259FF]">TRAP</span>
              </h2>
              <p className="text-gray-400">Decoding trap culture since 2025</p>
            </div>
            {/* <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#A259FF] transition duration-300 cursor-pointer">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#A259FF] transition duration-300 cursor-pointer">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#A259FF] transition duration-300 cursor-pointer">
                <i className="fab fa-spotify text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#A259FF] transition duration-300 cursor-pointer">
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div> */}
          </div>
          <div className="h-px bg-[#3D3D3D] mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              &copy; 2025 Traplator. All rights reserved.
            </div>
            {/* <div className="flex gap-6">
              <a href="#" className="hover:text-[#A259FF] transition duration-300 cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-[#A259FF] transition duration-300 cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-[#A259FF] transition duration-300 cursor-pointer">Contact Us</a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App