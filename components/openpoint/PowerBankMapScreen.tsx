import React, { useState } from 'react';
import { Search, ChevronLeft, MapPin, Zap, Navigation2, Crosshair, BatteryCharging } from 'lucide-react';

// 模擬的站點資料 (名稱對應你的截圖)
const stations = [
  { id: 1, name: '裕隆城門市', x: '50%', y: '55%', borrow: 5, return: 12, status: 'normal' },
  { id: 2, name: '大坪林門市', x: '30%', y: '30%', borrow: 0, return: 8, status: 'empty' },
  { id: 3, name: '新寶橋門市', x: '75%', y: '50%', borrow: 10, return: 0, status: 'full' },
  { id: 4, name: '雙鑫門市', x: '35%', y: '65%', borrow: 3, return: 5, status: 'normal' },
  { id: 5, name: '統客門市', x: '70%', y: '75%', borrow: 2, return: 15, status: 'normal' },
];

export default function PowerBankMapScreen({ setActiveScreen }: { setActiveScreen: any }) {
  const [filter, setFilter] = useState('all'); // all, borrow, return
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null);

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden font-sans">
      
      {/* 🌟 背景層：模擬地圖的視覺效果 (CSS 網格與假道路) 🌟 */}
      <div className="absolute inset-0 bg-[#f8f9fa] z-0">
        {/* 網格底紋 */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
        {/* 模擬河流/快速道路的 SVG 線條 */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <path d="M 0 200 Q 150 250 200 400 T 400 800" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"/>
          <path d="M -50 400 Q 200 350 300 600 T 500 900" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round"/>
        </svg>
      </div>

      {/* 🌟 頂部搜尋與控制層 🌟 */}
      <div className="relative z-20 pt-4 px-4 flex flex-col gap-3">
        {/* 返回與搜尋框 */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveScreen('home')}
            className="p-2 bg-white rounded-full shadow-md text-slate-700 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 bg-white rounded-full shadow-md flex items-center px-4 py-3">
            <input 
              type="text" 
              placeholder="搜尋地點或據點名稱..." 
              className="flex-1 bg-transparent outline-none text-sm text-slate-700"
            />
            <Search className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* 篩選按鈕列 */}
        <div className="flex gap-2 bg-white rounded-full p-1 shadow-sm w-max mx-auto border border-slate-100">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-teal-500 text-white' : 'text-slate-600'}`}
          >全部</button>
          <button 
            onClick={() => setFilter('borrow')}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'borrow' ? 'bg-teal-500 text-white' : 'text-slate-600'}`}
          >可借</button>
          <button 
            onClick={() => setFilter('return')}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'return' ? 'bg-teal-500 text-white' : 'text-slate-600'}`}
          >可還</button>
        </div>
      </div>

      {/* 🌟 地圖圖釘層 🌟 */}
      <div className="absolute inset-0 z-10" onClick={() => setSelectedStation(null)}>
        {stations.map((station) => {
          // 根據篩選條件隱藏站點
          if (filter === 'borrow' && station.borrow === 0) return null;
          if (filter === 'return' && station.return === 0) return null;

          const isSelected = selectedStation?.id === station.id;

          return (
            <div 
              key={station.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform"
              style={{ left: station.x, top: station.y }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStation(station);
              }}
            >
              {/* 地名標籤 */}
              <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 shadow-sm border border-slate-200 mb-1 whitespace-nowrap text-center absolute bottom-full left-1/2 -translate-x-1/2">
                7-11 {station.name}
              </div>
              
              {/* 綠色閃電圖釘 */}
              <div className={`relative flex items-center justify-center transition-all ${isSelected ? 'scale-125 -translate-y-2' : 'hover:scale-110'}`}>
                <MapPin className="w-10 h-10 text-green-500 fill-green-500 drop-shadow-md" />
                <div className="absolute top-1.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🌟 右下角定位按鈕 🌟 */}
      <button className="absolute bottom-32 right-4 z-20 p-3 bg-white rounded-full shadow-lg text-slate-700">
        <Crosshair className="w-6 h-6" />
      </button>

      {/* 🌟 底部站點資訊卡 (點擊圖釘後彈出) 🌟 */}
      <div className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 transition-transform duration-300 ease-out ${selectedStation ? 'translate-y-0' : 'translate-y-full'}`}>
        {selectedStation && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">7-ELEVEN {selectedStation.name}</h3>
                <p className="text-sm text-slate-500 mt-1">24小時營業 • 距離您 120m</p>
              </div>
              <button className="bg-blue-50 text-blue-600 p-2 rounded-full">
                <Navigation2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                <span className="text-slate-600 font-medium">可借電源</span>
                <span className={`text-xl font-black ${selectedStation.borrow > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                  {selectedStation.borrow}
                </span>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                <span className="text-slate-600 font-medium">可還空槽</span>
                <span className={`text-xl font-black ${selectedStation.return > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                  {selectedStation.return}
                </span>
              </div>
            </div>

            <button 
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-colors ${selectedStation.borrow > 0 ? 'bg-teal-500 hover:bg-teal-600' : 'bg-slate-300 cursor-not-allowed'}`}
            >
              {selectedStation.borrow > 0 ? '預約租借' : '目前無電源可借'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}