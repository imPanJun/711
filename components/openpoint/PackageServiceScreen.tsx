import React from 'react';
import { ChevronLeft, Barcode, MoreHorizontal } from 'lucide-react';

export default function PackageServiceScreen({ setActiveScreen }: { setActiveScreen: any }) {
  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      
      {/* 🌟 頂部導覽列 🌟 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
        <button 
          onClick={() => setActiveScreen('home')}
          className="flex items-center text-teal-600 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-medium">回上頁</span>
        </button>
        <h1 className="text-xl font-bold text-slate-800">寄取包裹</h1>
        <div className="flex items-center gap-4 text-slate-700">
          <button className="flex flex-col items-center">
            <Barcode className="w-6 h-6" />
            <span className="text-[10px] mt-0.5 font-medium">待辦繳費</span>
          </button>
          <button className="flex flex-col items-center">
            <MoreHorizontal className="w-6 h-6" />
            <span className="text-[10px] mt-0.5 font-medium">更多</span>
          </button>
        </div>
      </div>

      {/* 🌟 跑馬燈警示列 🌟 */}
      <div className="bg-red-50 text-red-500 text-xs px-4 py-2 border-b border-red-100 truncate">
        【注意事項】我的包裹服務：因Coupang、MOMO、蝦皮...
      </div>

      {/* 🌟 主要內容區 (可滾動) 🌟 */}
      <div className="flex-1 overflow-y-auto pb-20">
        
        {/* 區塊 1：線上寄件 */}
        <div className="mt-6 px-4">
          <h2 className="text-lg font-bold text-slate-800 mb-3">線上寄件</h2>
          <div className="grid grid-cols-3 gap-3">
            <ActionButton title="代碼寄件" />
            <ActionButton title="常溫交貨便" />
            <ActionButton title="冷凍交貨便" />
            <ActionButton title="大材積寄件" />
            <ActionButton title="賣貨便" />
            <ActionButton title="黑貓宅急便" />
          </div>
        </div>

        {/* 區塊 2：包裹查詢 */}
        <div className="mt-8 px-4">
          <h2 className="text-lg font-bold text-slate-800 mb-3">包裹查詢</h2>
          <div className="grid grid-cols-3 gap-3">
            <ActionButton title="貨態查詢" />
            <ActionButton title="我的包裹" badge="HOT" badgeColor="bg-orange-500" />
            <ActionButton title={<>代收貨款匯款<br/>查詢</>} badge="NEW" badgeColor="bg-red-500" />
          </div>
        </div>

        {/* 區塊 3：到府收件 */}
        <div className="mt-8 px-4">
          <h2 className="text-lg font-bold text-slate-800 mb-3">到府收件</h2>
          <div className="grid grid-cols-3 gap-3">
            <ActionButton title="數網快收" />
          </div>
        </div>

        {/* 區塊 4：顧客服務 */}
        <div className="mt-8 px-4 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-3">顧客服務</h2>
          <div className="grid grid-cols-3 gap-3">
            <ActionButton title="客服中心" />
          </div>
        </div>

        {/* 🌟 底部廣告橫幅 🌟 */}
        <div className="px-4 pb-6">
          <div className="bg-[#2b6131] rounded-xl p-4 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <span className="bg-[#a3cc39] text-[#2b6131] font-black px-2 py-0.5 rounded-sm text-sm mr-2">博客來</span>
              <span className="text-lg font-black tracking-wide text-[#a3cc39]">0元取件免證件</span>
              <p className="mt-2 text-sm font-bold">貨態查詢好方便、零元取件超便利</p>
              <ul className="text-[10px] mt-1 text-white/80 space-y-0.5">
                <li>① APP首頁服務選取 寄取包裹 &gt; 我的包裹</li>
                <li>② 取件電話與uniopen會員帳號符合</li>
                <li>③ 點選0元取件認證碼</li>
              </ul>
            </div>
            {/* 裝飾圖形 */}
            <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

// 建立一個共用的按鈕小組件，讓上面的程式碼更乾淨
function ActionButton({ title, badge, badgeColor }: { title: React.ReactNode, badge?: string, badgeColor?: string }) {
  return (
    <button className="relative bg-[#8a9bb3] hover:bg-[#7a8ba3] transition-colors text-white rounded-xl h-16 flex items-center justify-center text-center text-sm font-medium shadow-sm leading-tight px-1 active:scale-95">
      {title}
      {/* 如果有傳入 badge (HOT/NEW)，就顯示右上角的小標籤 */}
      {badge && (
        <span className={`absolute -top-2 right-0 ${badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm z-10`}>
          {badge}
        </span>
      )}
    </button>
  );
}