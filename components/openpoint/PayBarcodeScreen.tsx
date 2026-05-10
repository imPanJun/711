import React, { useState } from 'react';

// 定義購物車商品的資料格式
type CartItem = {
  id: number;
  name: string;
  price: number;
};

// 準備一個模擬的 7-11 商品庫
const mockProducts = [
  { name: "鮪魚御飯糰", price: 30 },
  { name: "茶裏王 日式無糖綠茶", price: 25 },
  { name: "CITY CAFE 大杯拿鐵", price: 55 },
  { name: "統一麵包 菱格香菠蘿", price: 35 },
  { name: "奮起湖軟燒肉便當", price: 89 }
];

export default function PayBarcodeScreen({ setActiveScreen }: { setActiveScreen: any }) {
  // 控制是否顯示 QR Code (false = 掃描購物車, true = 結帳憑證)
  const [showQRCode, setShowQRCode] = useState(false);
  
  const [scannedItems, setScannedItems] = useState<CartItem[]>([]);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const totalPrice = scannedItems.reduce((sum, item) => sum + item.price, 0);

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      setScannedItems(prev => prev.filter(item => item.id !== itemToRemove));
      setItemToRemove(null);
    }
  };

  const simulateScan = () => {
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const newItem = {
      id: Date.now(), 
      name: randomProduct.name,
      price: randomProduct.price
    };
    setScannedItems(prev => [newItem, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden relative">
      
      {/* 頂部導覽列 */}
      <div className="p-4 flex justify-between items-center text-white z-20 shrink-0">
        <button 
          onClick={() => {
            if (showQRCode) {
              setShowQRCode(false); // 在結帳畫面按返回 -> 退回購物車
            } else {
              setActiveScreen('home'); // 在購物車按返回 -> 退出功能
            }
          }}
          className="flex items-center space-x-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md transition active:scale-95"
        >
          <span>&lt; 返回</span>
        </button>
        <span className="font-bold tracking-wider">
          {!showQRCode ? 'OP Fast-Pass 極速結帳' : '付款結帳碼'}
        </span>
        <div className="w-16"></div>
      </div>

      {/* =========================================
          階段一：上方掃描 + 下方購物車
          ========================================= */}
      {!showQRCode && (
        <div className="flex-1 flex flex-col relative animate-in fade-in duration-300">
          
          {/* 上半部：模擬相機掃描區 */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 opacity-80"></div>
             
             <div 
                onClick={simulateScan}
                className="relative z-10 w-56 h-56 border-2 border-white/20 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_0_4000px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 transition-transform group"
             >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-xl"></div>
                
                <div className="w-full h-0.5 bg-green-400 shadow-[0_0_12px_3px_rgba(74,222,128,0.6)] animate-pulse group-active:bg-white transition-colors"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
             </div>
             
             <p 
                onClick={simulateScan}
                className="relative z-10 mt-6 text-sm text-green-400 font-bold tracking-wide bg-black/60 px-5 py-2.5 rounded-full cursor-pointer hover:bg-black/80 active:scale-95 transition-all shadow-[0_0_15px_rgba(74,222,128,0.2)]"
             >
                點擊此處模擬掃描商品
             </p>
          </div>

          {/* 下半部：雲端購物車 */}
          <div className="h-1/2 bg-slate-50 rounded-t-[32px] flex flex-col relative z-20 shadow-[0_-10px_25px_rgba(0,0,0,0.3)] overflow-hidden shrink-0">
            <div className="flex flex-col h-full p-4 sm:p-6 relative">
              <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-3 shrink-0">
                <h2 className="text-xl font-bold text-slate-800">雲端購物車</h2>
                <span className="text-sm font-bold text-slate-500 bg-slate-200 px-3 py-1 rounded-full">共 {scannedItems.length} 件</span>
              </div>

              <div className="flex-1 overflow-y-auto mb-20 pr-2">
                <ul className="space-y-3">
                  {scannedItems.map(item => (
                    <li key={item.id} className="flex justify-between items-center bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-top-2 fade-in duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-bold text-sm shrink-0">OP</div>
                        <span className="font-medium text-slate-700">{item.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="font-bold text-lg text-slate-800">${item.price}</span>
                        <button 
                          onClick={() => setItemToRemove(item.id)}
                          className="w-7 h-7 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-full flex items-center justify-center transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </li>
                  ))}
                  
                  {scannedItems.length === 0 && (
                    <div className="text-center text-gray-400 mt-6 sm:mt-10 animate-in fade-in duration-500">
                      <p>購物車目前是空的</p>
                      <p className="text-sm mt-2">請輕點上方掃描框加入商品</p>
                    </div>
                  )}
                </ul>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 sm:p-5 pb-6 sm:pb-8 flex justify-between items-center rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.05)] shrink-0">
                 <div className="flex flex-col">
                   <span className="text-sm text-gray-500 font-medium">總金額</span>
                   <span className="text-3xl font-black text-orange-600">${totalPrice}</span>
                 </div>
                 
                 <button 
                    onClick={() => setShowQRCode(true)} 
                    disabled={scannedItems.length === 0}
                    className={`px-4 sm:px-6 py-3 rounded-2xl font-bold tracking-wide shadow-lg transition-all flex items-center space-x-2 
                      ${scannedItems.length > 0 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 text-white shadow-orange-500/30 active:scale-95' 
                        : 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed'}`}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                   </svg>
                   <span className="text-base sm:text-lg">一鍵生成結帳碼</span>
                 </button>
              </div>
              
              {/* 取消購買確認彈窗 */}
              {itemToRemove !== null && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
                  <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                    </div>
                    <h3 className="text-xl font-bold text-center text-slate-800 mb-2">確認要取消購買？</h3>
                    <p className="text-center text-slate-500 mb-6 text-sm">確定後，<span className="text-orange-500 font-bold">請將此貨物放回貨架</span>，謝謝您的配合。</p>
                    
                    <div className="flex space-x-3">
                      <button onClick={() => setItemToRemove(null)} className="flex-1 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                        保留
                      </button>
                      <button onClick={confirmRemove} className="flex-1 py-2.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
                        確定放回
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          階段二：全螢幕大條碼與總金額
          ========================================= */}
      {showQRCode && (
        <div className="flex-1 bg-slate-50 rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 overflow-y-auto animate-in slide-in-from-bottom-8 duration-500 z-10">
          
          <div className="w-full max-w-sm flex flex-col items-center pb-8 mt-4">
            <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-700 text-center">
              <h2 className="text-2xl font-black text-slate-800 mb-2">整合結帳碼已生成</h2>
              <p className="text-slate-500 font-medium">包含商品明細與 icash Pay 授權</p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-100 rounded-[32px] w-full py-8 mb-8 shadow-sm flex flex-col items-center justify-center animate-in zoom-in-95 duration-700">
               <span className="text-orange-600 font-bold tracking-widest text-sm block mb-2">本次付款總金額</span>
               <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-500 mr-1">$</span>
                  <span className="text-6xl font-black text-orange-600 leading-none">{totalPrice}</span>
               </div>
            </div>

            <div className="bg-white p-6 rounded-[40px] shadow-xl border border-gray-100 mb-8 animate-in fade-in zoom-in duration-1000 shrink-0">
               <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-slate-800">
                 <path fill="currentColor" d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z"/>
                 <path fill="currentColor" d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z"/>
                 <path fill="currentColor" d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z"/>
                 <path fill="currentColor" d="M40,0 h20 v10 h-20 z M40,20 h10 v20 h-10 z M60,10 h10 v10 h-10 z M50,40 h20 v20 h-20 z M80,40 h20 v10 h-20 z M70,60 h10 v20 h-10 z M40,70 h20 v10 h-20 z M40,90 h10 v10 h-10 z M80,80 h20 v20 h-20 z M85,85 h10 v10 h-10 z M20,40 h10 v20 h-10 z M0,40 h10 v10 h-10 z M0,55 h20 v10 h-20 z M35,35 h10 v10 h-10 z M65,75 h10 v10 h-10 z M15,60 h10 v10 h-10 z"/>
               </svg>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col items-center">
               <p className="text-orange-500 font-black text-2xl sm:text-3xl mb-3 animate-bounce">請至機台完成結帳</p>
               <div className="bg-slate-200/50 px-6 py-2 rounded-full inline-block">
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">將此條碼對準門市出口機台掃描器</p>
               </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}