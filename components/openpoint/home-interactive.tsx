"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Coffee, Bike, Salad, Clock, ChevronRight, Percent,
  Cloud, Zap, BatteryCharging, ShoppingBag, Box, Utensils, Ticket, MoreHorizontal,
  Settings, Search, Target, Gift, ArrowLeft, Check, Upload, QrCode, CreditCard, Copy,
  X, Barcode, Plus, Minus, Phone, CheckCircle, Map, MapPin, Fingerprint, Sun, ChevronDown, Crown,
  ShoppingCart, Receipt, TicketCheck, Heart, Star, History, Send, Loader2, ShieldCheck, Info, FileText,
  Store, Smartphone, Navigation, Users, User, CheckCircle2, UserPlus, LogIn, ExternalLink, UserMinus,
  Bell, ScanLine, CircleDollarSign, Menu, Home, Grid, LayoutGrid, AlertTriangle
} from "lucide-react"
import { Input } from "@/components/ui/input"

// ★ 擴充所有的畫面類型，確保每一個按鈕都有歸宿
type ScreenType = 'home' | 'print' | 'coupons' | 'referral' | 'campus_pay' | 'foodomo' | 'ifood_radar' | 
  'fast_pass_unlock' | 'fast_pass_scanner' | 'fast_pass_generated_qr' | 
  'nav_pay_unlock' | 'nav_pay_barcode' | 'mobile_pickup' | 'op_points' | 'seven_points' | 'powerbank_map' | 'package_service' |
  'all_features' | 'notifications' | 'my_barcode' | 'brand_points' | 'services' | 'profile'

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors">
      <ArrowLeft className="h-5 w-5" />
      <span className="text-sm">返回</span>
    </button>
  )
}

function CouponModal({ onClose, onGoToCoupons }: { onClose: () => void, onGoToCoupons: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-[320px] rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-800">打卡成功！</h2>
          <p className="mb-6 text-sm text-slate-500">恭喜獲得 波霸珍珠奶茶嘗鮮價 9 折券</p>
          <Button onClick={onGoToCoupons} className="w-full bg-[#F26722] hover:bg-orange-600 text-white shadow-md active:scale-95 transition-all">
            收下優惠並查看
          </Button>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 雲端無感列印
// ==========================================
function OPPrintScreen({ setActiveScreen }: { setActiveScreen: (screen: ScreenType) => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const handleBack = () => {
    if (step > 1 && step < 4) setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    else setActiveScreen('home');
  };
  return (
    <div className="h-screen w-full bg-slate-50 overflow-hidden">
      {step === 1 && <PrintUploadScreen onNext={() => setStep(2)} onBack={handleBack} />}
      {step === 2 && <PrintPaymentScreen onNext={() => { setStep(3); setTimeout(() => setStep(4), 1500); }} onBack={handleBack} />}
      {step === 3 && <PrintProcessingScreen />}
      {step === 4 && <PrintQRCodeScreen onBack={() => setActiveScreen('home')} />}
    </div>
  );
}

function PrintUploadScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="p-4 border-b bg-white flex items-center relative shadow-sm">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ArrowLeft className="h-5 w-5 text-slate-700" /></button>
        <h1 className="w-full text-lg font-bold text-center text-slate-800">雲端無感列印</h1>
      </div>
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div onClick={onNext} className="w-full border-2 border-dashed border-slate-300 bg-white rounded-3xl p-10 flex flex-col items-center gap-4 hover:border-[#F26722]/50 hover:bg-orange-50 transition-all cursor-pointer active:scale-95 group shadow-sm">
          <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
            <Upload className="h-8 w-8 text-[#F26722]" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800 text-lg">點擊選擇檔案上傳</p>
            <p className="text-sm text-slate-500 mt-1">支援 PDF / Word 格式</p>
          </div>
        </div>
        <div className="mt-6 w-full p-4 bg-white rounded-2xl flex flex-col items-center text-center border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-700">檔案上傳後將暫存於統一雲端</p>
          <p className="text-xs text-slate-500 mt-1 flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1 text-green-500" /> 傳輸過程採用 AES-256 高階加密，請於 24 小時內列印
          </p>
        </div>
      </div>
    </div>
  );
}

function PrintPaymentScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selectedPay, setSelectedPay] = useState<'op' | 'icash'>('op');
  const [colorMode, setColorMode] = useState<'bw' | 'color'>('bw');
  const [printMode, setPrintMode] = useState<'single' | 'double'>('single');
  const [rangeType, setRangeType] = useState<'all' | 'custom'>('all');
  const [customRange, setCustomRange] = useState('1-3');
  const totalFilePages = 8; 

  const getActualPages = () => {
    if (rangeType === 'all') return totalFilePages;
    if (!customRange.trim()) return 0;
    let count = 0;
    if (customRange.includes('-')) {
      const nums = customRange.split('-').map(n => parseInt(n.trim()));
      if (!isNaN(nums[0]) && !isNaN(nums[1]) && nums[1] >= nums[0]) count = nums[1] - nums[0] + 1;
      else if (!isNaN(nums[0])) count = 1;
    } else count = customRange.split(',').filter(x => x.trim() !== '').length;
    return Math.max(0, Math.min(count, totalFilePages));
  };
  const actualPages = getActualPages();
  const pricePerPage = colorMode === 'bw' ? (selectedPay === 'op' ? 1 : 3) : (selectedPay === 'op' ? 10 : 10);
  const totalPrice = actualPages * pricePerPage;

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="p-4 border-b bg-white flex items-center relative shrink-0 z-10 shadow-sm">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ArrowLeft className="h-5 w-5 text-slate-700" /></button>
        <h1 className="w-full text-lg font-bold text-center text-slate-800">設定與付款</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center mb-6">
          <div className="h-10 w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mr-4 shrink-0"><FileText className="h-5 w-5" /></div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm text-slate-800 truncate">企業管理_期末報告_Final.pdf</p>
            <p className="text-xs text-slate-500 mt-0.5">共 {totalFilePages} 頁 • A4 尺寸</p>
          </div>
        </div>
        <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">列印範圍</h2>
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setRangeType('all')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${rangeType === 'all' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>全部 ({totalFilePages}頁)</button>
            <button onClick={() => setRangeType('custom')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${rangeType === 'custom' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>自訂範圍</button>
          </div>
          {rangeType === 'custom' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200 bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <Input value={customRange} onChange={(e) => setCustomRange(e.target.value)} placeholder="例: 1-3 或 2,4,5" className="bg-slate-50 border-slate-200 h-10" />
              <div className="whitespace-nowrap shrink-0">
                <span className="text-xs text-slate-500">共包含 </span><span className="text-sm font-bold text-[#F26722]">{actualPages}</span><span className="text-xs text-slate-500"> 頁</span>
              </div>
            </div>
          )}
        </div>
        <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">列印規格</h2>
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setColorMode('bw')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${colorMode === 'bw' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>黑白</button>
            <button onClick={() => setColorMode('color')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${colorMode === 'color' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>彩色</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPrintMode('single')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${printMode === 'single' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>單面列印</button>
            <button onClick={() => setPrintMode('double')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${printMode === 'double' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>雙面列印</button>
          </div>
        </div>
        <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">選擇付款方式</h2>
        <div className="space-y-3">
          <button onClick={() => setSelectedPay('op')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'op' ? 'border-[#F26722] bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'op' ? 'bg-[#F26722]' : 'bg-slate-200'}`}><CreditCard className={`h-5 w-5 ${selectedPay === 'op' ? 'text-white' : 'text-slate-500'}`} /></div>
            <div className="text-left flex-1">
              <p className="font-medium text-slate-800">OP 點數全額扣抵</p><p className="text-xs text-slate-500 mt-0.5">可用點數：1,250 點</p>
            </div>
            {selectedPay === 'op' && <div className="h-6 w-6 rounded-full bg-[#F26722] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
          </button>
          <button onClick={() => setSelectedPay('icash')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'icash' ? 'border-[#F26722] bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'icash' ? 'bg-[#1CA2D8]' : 'bg-slate-200'}`}><CreditCard className={`h-5 w-5 ${selectedPay === 'icash' ? 'text-white' : 'text-slate-500'}`} /></div>
            <div className="text-left flex-1">
              <p className="font-medium text-slate-800">icash Pay</p><p className="text-xs text-slate-500 mt-0.5">餘額 $840</p>
            </div>
            {selectedPay === 'icash' && <div className="h-6 w-6 rounded-full bg-[#1CA2D8] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-sm font-medium text-slate-500">預估費用 ({actualPages} 頁)</span>
          <span className="text-2xl font-black text-[#F26722]">{actualPages === 0 ? '--' : (selectedPay === 'op' ? `${totalPrice} 點` : `NT$ ${totalPrice}`)}</span>
        </div>
        <button onClick={onNext} disabled={actualPages === 0} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center transition-all ${actualPages > 0 ? 'bg-[#F26722] hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
          確認付款並產出條碼<ChevronRight className="ml-1 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function PrintProcessingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 animate-in fade-in duration-300">
      <Loader2 className="h-12 w-12 text-[#F26722] animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-800 mb-2">安全連線中</h2>
      <p className="text-sm text-slate-500">系統正在進行列印資金預先圈存...</p>
    </div>
  );
}

function PrintQRCodeScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-bottom-8 fade-in duration-500 overflow-y-auto">
      <div className="p-4 flex items-center relative shrink-0">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors"><ArrowLeft className="h-5 w-5 text-slate-800" /></button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start p-6 pb-12">
        <div className="bg-green-100/50 border border-green-200 text-green-700 px-4 py-2 rounded-full font-bold text-xs mb-6 flex items-center">
          <ShieldCheck className="h-4 w-4 mr-1.5" /> 已完成預先授權圈存
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-8 w-full max-w-[280px] flex flex-col items-center relative">
          <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-slate-900 mb-5">
            <path fill="currentColor" d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z"/><path fill="currentColor" d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z"/><path fill="currentColor" d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z"/><path fill="currentColor" d="M40,0 h20 v10 h-20 z M40,20 h10 v20 h-10 z M60,10 h10 v10 h-10 z M50,40 h20 v20 h-20 z M80,40 h20 v10 h-20 z M70,60 h10 v20 h-10 z M40,70 h20 v10 h-20 z M40,90 h10 v10 h-10 z M80,80 h20 v20 h-20 z M85,85 h10 v10 h-10 z M20,40 h10 v20 h-10 z M0,40 h10 v10 h-10 z M0,55 h20 v10 h-20 z M35,35 h10 v10 h-10 z M65,75 h10 v10 h-10 z M15,60 h10 v10 h-10 z"/>
          </svg>
          <div className="text-center w-full pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-[#F26722] mb-1">請至 ibon 掃描出紙</h2>
            <p className="text-xs font-medium text-slate-500">免經店員解鎖，免排隊結帳</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 w-full max-w-[280px] border border-slate-200 shadow-sm">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-slate-400 mr-2.5 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-1.5">自動退款防呆機制</h4>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-3 leading-relaxed">
                <li>取件條碼有效期限為 <span className="font-bold text-[#F26722]">72 小時</span>。</li>
                <li>若逾時未印，或遇機台卡紙、斷網等異常，系統將自動取消圈存並全額退還款項。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 兌換券與預約取貨 (★ 雙選擇介面)
// ==========================================
function CouponsScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'list' | 'options' | 'qr' | 'store' | 'time' | 'success'>('list');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const coupons = [
    { id: 1, title: "美式咖啡 8 折券", subtitle: "限時優惠 (學餐消費回饋)", expiry: "今天 20:00 前有效", color: "bg-[#F26722]", highlight: true },
    { id: 2, title: "波霸珍珠奶茶", subtitle: "嘗鮮價 9 折 (早八打卡獎勵)", expiry: "2026/05/15", color: "bg-orange-400" },
    { id: 3, title: "拿鐵咖啡 9 折券", subtitle: "全品項適用", expiry: "2026/05/01", color: "bg-green-600" },
  ];

  const nearbyStores = [
    { id: 's1', name: '台科大一餐門市', distance: '100m' },
    { id: 's2', name: '台科大第三宿舍門市', distance: '250m' },
    { id: 's3', name: '公館基隆路門市', distance: '400m' },
  ];

  const timeSlots = ["現在 (立即準備)", "14:30", "15:00", "15:30", "16:00", "16:30"];

  const handleUseCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    setView('options'); // ★ 點擊使用後，跳出「選擇兌換方式」畫面
  };

  const internalBack = () => {
    if (view === 'options') setView('list');
    else if (view === 'qr') setView('options');
    else if (view === 'store') setView('options'); 
    else if (view === 'time') setView('store'); 
    else if (view === 'success') { setView('list'); onBack(); } 
    else onBack();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center shrink-0 relative shadow-sm">
        <div className="absolute left-4 z-10">
          <BackButton onClick={view === 'list' ? onBack : internalBack} />
        </div>
        <h1 className="w-full text-lg font-bold text-center pr-8 text-slate-800">
          {view === 'list' ? '我的兌換券' : view === 'options' ? '選擇兌換方式' : view === 'qr' ? '櫃台兌換條碼' : view === 'success' ? '預約成功' : '預約自取'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'list' && (
          <div className="p-4 space-y-4 animate-in fade-in duration-300">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="border-0 shadow-sm overflow-hidden relative bg-white">
                {coupon.highlight && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg z-10 animate-pulse">限時派發</div>
                )}
                <CardContent className="p-0 flex bg-white">
                  <div className={`w-2.5 ${coupon.color}`} />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-slate-800 mb-0.5">{coupon.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{coupon.subtitle}</p>
                    <div className="flex items-center text-xs text-slate-500 bg-slate-100 w-fit px-2 py-1 rounded">
                      <Clock className="h-3 w-3 mr-1" />有效期限：{coupon.expiry}
                    </div>
                  </div>
                  <div className="flex items-center pr-4">
                    <Button onClick={() => handleUseCoupon(coupon)} size="sm" className={`${coupon.color} hover:opacity-90 text-white shadow-sm active:scale-95`}>
                      使用
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 雙軌選擇畫面 */}
        {view === 'options' && (
          <div className="p-6 flex flex-col gap-5 animate-in slide-in-from-right-4 fade-in duration-300 h-full justify-center pb-20">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedCoupon?.title}</h2>
              <p className="text-sm text-slate-500">請選擇您偏好的兌換方式</p>
            </div>
            {/* 選項 1：出示 QR Code */}
            <button onClick={() => setView('qr')} className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col items-center gap-4 hover:border-[#F26722] hover:bg-orange-50 transition-all active:scale-95 group shadow-sm">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <QrCode className="h-8 w-8 text-slate-600 group-hover:text-[#F26722]" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-700">臨櫃出示條碼兌換</h3>
                <p className="text-sm text-slate-500 mt-1">適合剛好在門市的您，請由店員刷讀</p>
              </div>
            </button>
            {/* 選項 2：預約領取咖啡 (跳過地圖權限，直接到門市清單) */}
            <button onClick={() => setView('store')} className="w-full bg-white border-2 border-[#F26722] rounded-3xl p-6 flex flex-col items-center gap-4 bg-gradient-to-b from-orange-50 to-white hover:from-orange-100 hover:to-orange-50 transition-all active:scale-95 group shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F26722] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">免排隊</div>
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Smartphone className="h-8 w-8 text-[#F26722]" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-700">預約門市自取</h3>
                <p className="text-sm text-slate-500 mt-1">選好時間與門市，到店直接拿走超省時</p>
              </div>
            </button>
          </div>
        )}

        {view === 'qr' && (
          <div className="p-6 flex flex-col items-center h-full animate-in zoom-in-95 duration-300">
            <h2 className="text-lg font-bold text-slate-800 mb-6 mt-4">{selectedCoupon?.title}</h2>
            <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-8 w-full max-w-[280px] flex flex-col items-center">
              <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-slate-900 mb-4">
                <path fill="currentColor" d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z M40,0 h20 v10 h-20 z M40,20 h10 v20 h-10 z M60,10 h10 v10 h-10 z M50,40 h20 v20 h-20 z M80,40 h20 v10 h-20 z M70,60 h10 v20 h-10 z M40,70 h20 v10 h-20 z M40,90 h10 v10 h-10 z M80,80 h20 v20 h-20 z M85,85 h10 v10 h-10 z M20,40 h10 v20 h-10 z M0,40 h10 v10 h-10 z M0,55 h20 v10 h-20 z M35,35 h10 v10 h-10 z M65,75 h10 v10 h-10 z M15,60 h10 v10 h-10 z"/>
              </svg>
              <div className="w-full h-16 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden mb-2">
                <div className="absolute inset-y-2 left-3 right-3 flex gap-[2px]">
                  {Array.from({ length: 40 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
                </div>
              </div>
              <p className="text-xs font-mono text-slate-400">AA123456789</p>
            </div>
            <p className="text-sm font-bold text-[#F26722] animate-bounce">請出示此畫面由店員掃描</p>
          </div>
        )}

        {view === 'store' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">請選擇預約取貨門市</h2>
            <div className="space-y-3">
              {nearbyStores.map(store => (
                <button key={store.id} onClick={() => { setSelectedStore(store.name); setView('time'); }} className="w-full bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-[#F26722] hover:shadow-md transition-all active:scale-95 shadow-sm">
                  <div className="flex items-center">
                    <div className="bg-orange-50 p-2.5 rounded-full mr-3 text-[#F26722]"><Store className="h-5 w-5" /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-800 text-sm">{store.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center mt-1"><MapPin className="h-3 w-3 mr-0.5" /> 距離您約 {store.distance}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'time' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-5 flex items-center shrink-0">
              <Store className="h-5 w-5 text-[#F26722] mr-2 shrink-0" />
              <p className="text-sm text-orange-800 font-medium">已選擇：{selectedStore}</p>
            </div>
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1 shrink-0">請選擇預計取貨時間</h2>
            <div className="grid grid-cols-2 gap-3 mb-8 flex-1 overflow-y-auto">
              {timeSlots.map(time => (
                <button key={time} onClick={() => setSelectedTime(time)} className={`py-3.5 h-16 rounded-xl border-2 font-bold text-sm transition-all ${selectedTime === time ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300'}`}>
                  {time}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-4 pb-2 shrink-0">
              <Button onClick={() => setView('success')} disabled={!selectedTime} className="w-full bg-[#F26722] hover:bg-orange-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg disabled:opacity-50 disabled:active:scale-100">
                確認預約
              </Button>
            </div>
          </div>
        )}

        {view === 'success' && (
          <div className="p-6 flex flex-col items-center justify-center h-full animate-in zoom-in-95 duration-500 pb-20">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">預約成功！</h2>
            <p className="text-slate-500 text-center mb-8">門市已收到您的訂單<br/>請於 <span className="font-bold text-[#F26722]">{selectedTime}</span> 前往 <span className="font-bold text-[#F26722]">{selectedStore}</span> 領取。</p>
            <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{selectedCoupon?.title}</h3>
              <p className="text-xs text-slate-500 mb-4">預約編號：#OP883921</p>
              
              <div className="w-full bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
                <p className="text-lg font-mono font-bold text-slate-700 tracking-widest">AB98-7654-3210</p>
              </div>
              <p className="text-xs text-center mt-3 text-slate-400">到店時請向店員出示此兌換序號</p>
            </div>
            <Button onClick={internalBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              回列表
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// 學餐支付 Screen
// ==========================================
function CampusPayScreen({ onBack }: { onBack: () => void }) {
  const [payState, setPayState] = useState<'paying' | 'processing' | 'success'>('paying');

  const handleSimulatePay = () => {
    setPayState('processing');
    setTimeout(() => setPayState('success'), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shrink-0 shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">學餐支付</h1>
        <div className="w-16"></div>
      </div>

      {payState === 'paying' && (
        <div className="flex-1 p-4 flex flex-col items-center overflow-auto pb-24 animate-in fade-in duration-300">
          <div className="w-full bg-green-50 text-green-700 px-4 py-3 rounded-xl font-bold text-sm mb-6 flex items-center justify-center border border-green-200 shadow-sm">
            <Utensils className="h-4 w-4 mr-2" />現在買學餐，筆筆送 OP 折價券！
          </div>
          <div className="w-full bg-white p-4 rounded-2xl shadow-sm mb-6 border border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-2">付款碼（一維條碼）</p>
            <div className="h-16 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-y-2 left-2 right-2 flex gap-[2px]">
                {Array.from({ length: 40 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
              </div>
              <Barcode className="h-6 w-6 text-white/20 absolute" />
            </div>
            <p className="text-xs text-center mt-2 font-mono text-slate-500">4711 8823 0987 6543</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full flex flex-col items-center">
            <p className="text-xs text-slate-500 text-center mb-2">掃描碼（QR Code）</p>
            <div className="w-40 h-40 bg-slate-800 rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-4 grid grid-cols-7 gap-1">
                {Array.from({ length: 49 }).map((_, i) => <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />)}
              </div>
              <QrCode className="h-10 w-10 text-white/20 absolute" />
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 text-center">請出示此畫面給店家掃描</p>
          <div className="mt-8 w-full">
            <Button onClick={handleSimulatePay} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg">
              模擬購買學餐 ($85)
            </Button>
          </div>
        </div>
      )}

      {payState === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <Loader2 className="h-12 w-12 text-[#4CAF50] animate-spin mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">處理付款中</h2>
          <p className="text-sm text-slate-500">正在與學餐系統連線...</p>
        </div>
      )}

      {payState === 'success' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 pb-20">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-inner">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-1">付款成功！</h2>
          <p className="text-slate-500 mb-8 font-medium">已扣款 $85</p>

          <div className="w-full bg-white rounded-3xl p-1.5 shadow-lg border border-orange-100 relative overflow-hidden mb-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">限時發送</div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[26px] p-5 border border-dashed border-orange-200">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Coffee className="h-7 w-7 text-[#F26722]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#F26722] text-lg mb-0.5">美式咖啡 8 折券</h3>
                  <p className="text-xs text-slate-500 font-medium">指定 CITY CAFE 品項適用</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-orange-200 flex justify-between items-center">
                <div className="flex items-center text-xs text-red-500 font-bold bg-red-50 px-2.5 py-1.5 rounded-md">
                  <Clock className="h-3.5 w-3.5 mr-1" />限 8 小時內至門市使用完畢
                </div>
              </div>
            </div>
          </div>
          <Button onClick={onBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
            返回首頁查看票券
          </Button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Foodomo 外送揪團
// ==========================================
function FoodomoGroupScreen({ setActiveScreen }: { setActiveScreen: (screen: ScreenType) => void }) {
  const [view, setView] = useState<'init' | 'host_select_store' | 'host_room_created' | 'member_enter_code' | 'menu' | 'payment' | 'status' | 'success'>('init');
  const [role, setRole] = useState<'host' | 'member'>('host');
  const [roomCode, setRoomCode] = useState('');
  
  const restaurants = [
    { id: 'starbucks', name: "星巴克 (台科大店)", min: 200, fee: 45, items: [{ id: "sb1", name: "大杯美式咖啡", price: 110 }, { id: "sb2", name: "大杯那堤", price: 135 }, { id: "sb3", name: "焦糖瑪奇朵", price: 155 }] },
    { id: 'formosa', name: "鬍鬚張 (台北公館店)", min: 150, fee: 39, items: [{ id: "fm1", name: "招牌魯肉飯", price: 65 }, { id: "fm2", name: "雞肉飯", price: 65 }, { id: "fm3", name: "苦瓜排骨湯", price: 85 }] },
    { id: 'fatdaddy', name: "胖老爹 (公館店)", min: 300, fee: 60, items: [{ id: "fd1", name: "5號全家餐", price: 329 }, { id: "fd2", name: "無骨雞腿排", price: 75 }, { id: "fd3", name: "波霸薯條", price: 40 }] }
  ];

  const [selectedStoreId, setSelectedStoreId] = useState('starbucks');
  const currentStore = restaurants.find(r => r.id === selectedStoreId) || restaurants[0];
  const [copied, setCopied] = useState(false);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  
  const addItem = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id: string) => setCart(prev => {
    const newCart = { ...prev };
    if (newCart[id] > 1) newCart[id] -= 1;
    else delete newCart[id];
    return newCart;
  });
  
  const totalFoodPrice = currentStore.items.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const [members, setMembers] = useState<any[]>([]);
  const deliveryFee = currentStore.fee; 
  const feePerPerson = members.length > 0 ? Math.round(deliveryFee / members.length) : 0;

  const handleKick = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));
  const handleCover = (id: number) => setMembers(prev => prev.map(m => m.id === id ? { ...m, isPaid: true, statusText: '主揪已代墊' } : m));
  const handleSimulateAllPaid = () => setMembers(prev => prev.map(m => ({ ...m, isPaid: true, statusText: '已付款' })));

  const handlePayment = () => {
    if (role === 'host') {
      setMembers([
        { id: 1, name: "我 (主揪)", amount: totalFoodPrice, isPaid: true, isHost: true, statusText: '已付款' },
        { id: 2, name: "小智", amount: 120, isPaid: false, isHost: false, statusText: '未付款' },
        { id: 3, name: "大頭", amount: 85, isPaid: false, isHost: false, statusText: '未付款' },
      ]);
    } else {
      setMembers([
        { id: 1, name: "伯恩 (主揪)", amount: 150, isPaid: true, isHost: true, statusText: '已付款' },
        { id: 2, name: "我", amount: totalFoodPrice, isPaid: true, isHost: false, statusText: '已付款' },
        { id: 3, name: "大頭", amount: 85, isPaid: false, isHost: false, statusText: '未付款' },
      ]);
    }
    setView('status');
  };

  const handleBack = () => {
    if (view === 'host_select_store' || view === 'member_enter_code') setView('init');
    else if (view === 'host_room_created') setView('host_select_store');
    else if (view === 'menu') {
      if (role === 'host') setView('host_room_created');
      else setView('member_enter_code');
    }
    else if (view === 'payment') setView('menu');
    else setActiveScreen('home'); 
  };

  const allPaid = members.length > 0 && members.every(m => m.isPaid);

  return (
    <div className="h-screen w-full bg-slate-50 overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-[#4CAF50] flex items-center shrink-0 shadow-sm z-10">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-green-600 transition-colors">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="w-full text-lg font-bold text-center text-white pr-8">Foodomo 校園揪團</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'init' && (
          <div className="p-6 flex flex-col items-center justify-center h-full animate-in fade-in duration-300 pb-20">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <ShoppingBag className="h-12 w-12 text-[#4CAF50]" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">無痛分帳揪團</h2>
            <p className="text-slate-500 text-sm mb-10 text-center px-4">主揪免代墊免催款，團員各自用 icash Pay 結帳，自動拆分外送費！</p>
            
            <div className="w-full space-y-4">
              <button onClick={() => { setRole('host'); setView('host_select_store'); setCart({}); }} className="w-full bg-white border-2 border-[#4CAF50] rounded-2xl p-5 flex items-center justify-between hover:bg-green-50 transition-all active:scale-95 shadow-sm group">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 transition-colors"><UserPlus className="h-6 w-6 text-[#4CAF50]" /></div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">發起揪團 (主揪)</h3><p className="text-xs text-slate-500 mt-1">選擇餐廳並建立房間代碼</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-[#4CAF50]" />
              </button>
              <button onClick={() => { setRole('member'); setView('member_enter_code'); setCart({}); setSelectedStoreId('starbucks'); }} className="w-full bg-white border-2 border-slate-200 rounded-2xl p-5 flex items-center justify-between hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 group shadow-sm">
                <div className="flex items-center">
                  <div className="bg-slate-100 p-3 rounded-full mr-4 group-hover:bg-slate-200 transition-colors"><LogIn className="h-6 w-6 text-slate-600" /></div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">加入揪團 (團員)</h3><p className="text-xs text-slate-500 mt-1">輸入房號一起點餐</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            </div>
          </div>
        )}

        {view === 'host_select_store' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">請選擇附近可外送餐廳</h2>
            <div className="space-y-3">
              {restaurants.map((store) => (
                <Card key={store.id} onClick={() => { setSelectedStoreId(store.id); setView('host_room_created'); }} className="border-0 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#4CAF50] transition-all active:scale-95 bg-white">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{store.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 text-[10px]">滿 ${store.min} 外送</Badge>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px]">外送費 ${store.fee}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === 'host_room_created' && (
          <div className="p-6 flex flex-col items-center h-full animate-in zoom-in-95 duration-300">
            <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center mb-6">
              <h2 className="text-slate-500 text-sm font-bold mb-4">房間建立成功！請邀請團員進房</h2>
              <div className="bg-green-50 text-green-700 text-4xl font-black tracking-widest py-5 rounded-xl border-2 border-dashed border-green-200 mb-6 font-mono">
                FD-9527
              </div>
              <Button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} variant="outline" className={`w-full font-bold mb-3 transition-colors ${copied ? 'bg-[#4CAF50] text-white border-[#4CAF50] hover:bg-green-600' : 'border-[#4CAF50] text-[#4CAF50] hover:bg-green-50'}`}>
                {copied ? <><Check className="mr-2 h-4 w-4" /> 連結已複製！</> : <><Copy className="mr-2 h-4 w-4" /> 複製邀請代碼</>}
              </Button>
              <Button variant="outline" className="w-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                <ExternalLink className="mr-2 h-4 w-4" /> 分享至 LINE
              </Button>
            </div>
            <div className="mt-auto pt-4 w-full pb-6">
              <Button onClick={() => setView('menu')} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg">
                下一步：主揪開始點餐
              </Button>
            </div>
          </div>
        )}

        {view === 'member_enter_code' && (
          <div className="p-6 flex flex-col items-center h-full animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 mb-2 mt-4">加入揪團</h2>
            <p className="text-sm text-slate-500 mb-8 text-center">請輸入主揪提供的 6 碼房間代號<br/>或貼上邀請連結</p>
            <div className="w-full mb-8">
              <Input 
                value={roomCode} 
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="例如: FD-9527" 
                className="text-center text-2xl font-black tracking-widest uppercase h-16 border-2 border-slate-200 focus-visible:ring-[#4CAF50] bg-white shadow-sm rounded-xl"
                maxLength={7}
              />
            </div>
            <Button onClick={() => setView('menu')} disabled={roomCode.length < 5} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50">
              確認並加入房間
            </Button>
          </div>
        )}

        {view === 'menu' && (
          <div className="animate-in fade-in duration-300 pb-28">
            <div className="bg-white p-4 mb-3 shadow-sm border-b border-slate-200 flex justify-between items-center">
              <div>
                <div className="flex items-center text-xs text-slate-500 mb-1"><Store className="h-3 w-3 mr-1" /> 台科大周邊餐廳</div>
                <h2 className="text-lg font-black text-slate-800">{currentStore.name}</h2>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 mb-1">房號 FD-9527</Badge>
                <div className="text-xs text-slate-500 flex items-center justify-end"><Users className="h-3 w-3 mr-1"/> 已有 3 人在房內</div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {currentStore.items.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{item.name}</h3><p className="text-sm text-[#F26722] font-bold mt-0.5">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {cart[item.id] ? (
                        <>
                          <button onClick={() => removeItem(item.id)} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"><Minus className="h-4 w-4 text-slate-600" /></button>
                          <span className="w-4 text-center font-bold text-slate-700">{cart[item.id]}</span>
                          <button onClick={() => addItem(item.id)} className="h-8 w-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-green-600"><Plus className="h-4 w-4 text-white" /></button>
                        </>
                      ) : (
                        <button onClick={() => addItem(item.id)} className="h-8 w-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-green-600"><Plus className="h-4 w-4 text-white" /></button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              <Button onClick={() => setView('payment')} disabled={totalItems === 0} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50">
                選好餐點，結帳 ({totalItems}項 / ${totalFoodPrice})
              </Button>
            </div>
          </div>
        )}

        {view === 'payment' && (
          <div className="p-4 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
            <h2 className="font-bold text-slate-800 mb-3 px-1">您的餐點明細</h2>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
              <div className="space-y-3 text-sm text-slate-600 mb-4 border-b border-slate-100 pb-4">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = currentStore.items.find(m => m.id === id);
                  return (
                    <div key={id} className="flex justify-between items-center">
                      <span>{item?.name} x{qty}</span><span>${(item?.price || 0) * qty}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-slate-800">您的餐點小計</span><span className="text-xl font-black text-slate-800">${totalFoodPrice}</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 flex items-start">
              <Info className="h-5 w-5 mr-2 shrink-0 text-green-600" />
              <p className="text-xs text-green-800 leading-relaxed">外送費將於所有人結帳完畢後，由系統自動均分。<br/>請先完成授權圈存，<strong className="text-[#4CAF50]">目前暫不扣款</strong>。</p>
            </div>

            <h2 className="font-bold text-slate-800 mb-3 px-1">選擇付款方式</h2>
            <button className="w-full p-4 rounded-xl border-2 border-[#4CAF50] bg-green-50 flex items-center gap-3 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4CAF50] text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">限時活動</div>
              <div className="h-10 w-10 rounded-full bg-[#1CA2D8] flex items-center justify-center shrink-0"><CreditCard className="h-5 w-5 text-white" /></div>
              <div className="text-left flex-1"><p className="font-bold text-slate-800">icash Pay (授權圈存)</p><p className="text-xs text-slate-500 mt-0.5">餘額 $840</p></div>
              <div className="h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>
            </button>

            <div className="mt-auto pt-4">
              <Button onClick={handlePayment} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-7 rounded-xl text-xl shadow-lg active:scale-95 transition-transform">
                確認授權圈存 (${totalFoodPrice})
              </Button>
            </div>
          </div>
        )}

        {view === 'status' && (
          <div className="p-4 pb-32 animate-in fade-in duration-500">
            {role === 'host' ? (
              <div className="text-center mb-6 mt-2">
                <h2 className="text-xl font-black text-slate-800">等待團員付款中...</h2><p className="text-sm text-slate-500 mt-1">若有人未付款，您可踢除或幫他代墊</p>
              </div>
            ) : (
              <div className="text-center mb-6 mt-2">
                <h2 className="text-xl font-black text-slate-800">您已完成付款！</h2><p className="text-sm text-slate-500 mt-1">請等待主揪送出訂單</p>
              </div>
            )}

            <div className="flex justify-between items-end mb-3 px-1">
              <h3 className="font-bold text-slate-800">團員付款狀態 ({members.filter(m=>m.isPaid).length}/{members.length})</h3>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-md">目前外送費: ${feePerPerson} / 人</span>
            </div>

            <div className="space-y-3 mb-8">
              {members.map(m => (
                <div key={m.id} className={`bg-white p-4 rounded-2xl shadow-sm border transition-all duration-300 ${m.isPaid ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200"><User className="h-5 w-5 text-slate-500" /></div>
                        <div className={`absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${m.isPaid ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-sm flex items-center">{m.name} {m.isHost && <Crown className="h-3 w-3 text-[#F26722] ml-1" />}</span>
                        <span className={`text-xs font-bold ${m.isPaid ? 'text-green-600' : 'text-red-500'}`}>{m.statusText}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800">${m.amount + feePerPerson}</p><p className="text-[10px] text-slate-400">含外送費 ${feePerPerson}</p>
                    </div>
                  </div>
                  {role === 'host' && !m.isPaid && !m.isHost && (
                    <div className="flex gap-2 border-t border-slate-100 pt-3 mt-1">
                      <Button size="sm" variant="outline" onClick={() => handleKick(m.id)} className="flex-1 h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"><UserMinus className="h-3 w-3 mr-1" /> 踢除</Button>
                      <Button size="sm" onClick={() => handleCover(m.id)} className="flex-1 h-8 text-xs bg-slate-800 text-white hover:bg-slate-700 font-bold">幫他代墊</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              {role === 'host' ? (
                <>
                  {!allPaid && <Button onClick={handleSimulateAllPaid} variant="outline" className="w-full mb-3 border-[#4CAF50] text-[#4CAF50] font-bold hover:bg-green-50">展示按鈕：模擬所有人已付款</Button>}
                  <Button onClick={() => setView('success')} disabled={!allPaid} className={`w-full font-bold py-6 rounded-xl text-lg transition-all ${!allPaid ? 'bg-slate-200 text-slate-400' : 'bg-[#4CAF50] hover:bg-green-600 text-white shadow-lg shadow-green-500/30'}`}>全員確認完畢，送出訂單</Button>
                </>
              ) : (
                <Button onClick={() => setView('success')} variant="outline" className="w-full border-slate-300 text-slate-600 font-bold hover:bg-slate-50">展示按鈕：模擬主揪送出訂單</Button>
              )}
            </div>
          </div>
        )}

        {view === 'success' && (
          <div className="p-6 flex flex-col items-center justify-start h-full animate-in zoom-in-95 duration-500 overflow-y-auto pb-20">
            <div className="mb-6 mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner"><CheckCircle2 className="h-12 w-12 text-[#4CAF50]" /></div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">揪團訂單已送出！</h2>
            <p className="text-slate-500 text-center mb-8 font-medium">預計於 <span className="text-green-600 font-bold">12:30</span> 送達台科大</p>

            <div className="w-full bg-white rounded-3xl p-5 shadow-xl border border-slate-100 relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">商業防禦機制</div>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-red-500" /><h3 className="font-bold text-slate-800">意外防堵與退款</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-red-600 mb-1 flex items-center"><X className="h-3 w-3 mr-1"/> 餐廳拒單</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-100">若 foodomo 回報訂單失效，系統將呼叫 icash Pay API <strong className="text-slate-700">自動解除全員資金圈存</strong>，並發送 APP 通知。</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-orange-600 mb-1 flex items-center"><Clock className="h-3 w-3 mr-1"/> 逾時未送出</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-100">若房間超過 20 分鐘未送出訂單，背景排程將<strong className="text-slate-700">強制關閉房間</strong>並自動退還所有已付款團員之款項。</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setActiveScreen('home')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              回首頁
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// OP Fast-Pass (★ 完美動態復刻三步驟：解鎖 ➔ 掃描(可加減商品) ➔ 結帳碼)
// ==========================================
function FastPassUnlockScreen({ onUnlock, onBack }: { onUnlock: () => void; onBack: () => void }) {
  return (
    <div className="relative flex flex-col h-full bg-slate-950">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4"><button onClick={onBack} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"><X className="h-6 w-6" /></button></div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative mb-8">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#F26722]/20 to-orange-500/20 flex items-center justify-center animate-pulse"><div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#F26722]/30 to-orange-500/30 flex items-center justify-center"><Fingerprint className="h-16 w-16 text-[#F26722]" /></div></div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">開啟 Fast-Pass 前</h2><p className="text-white/60 text-center text-sm mb-10">請進行生物辨識驗證</p>
          <Button onClick={onUnlock} className="bg-gradient-to-r from-[#F26722] to-orange-500 hover:from-[#F26722]/90 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95"><Fingerprint className="mr-2 h-6 w-6" /> 點擊模擬解鎖成功</Button>
        </div>
        <div className="p-6 text-center"><p className="text-white/40 text-xs">支援 Face ID / Touch ID / 指紋辨識</p></div>
      </div>
    </div>
  )
}

function FastPassScannerScreen({ onNext, onBack }: { onNext: (amount: number) => void; onBack: () => void }) {
  const [cart, setCart] = useState([
    { id: '1', name: "鮪魚御飯糰", price: 30, tag: "OP" },
    { id: '2', name: "奮起湖軟燒肉便當", price: 89, tag: "OP" }
  ]);
  const [showAlert, setShowAlert] = useState(false);

  const mockItems = [
    { name: "CITY CAFE 大杯拿鐵", price: 55, tag: "OP" },
    { name: "所長茶葉蛋", price: 18, tag: "OP" },
    { name: "純喫茶 無糖綠茶", price: 25, tag: "OP" },
    { name: "科學麵", price: 10, tag: "OP" }
  ];

  const handleScanItem = () => {
    const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
    const newItem = { ...randomItem, id: `item-${Date.now()}-${Math.random()}` };
    setCart(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-full bg-[#0B1015] relative">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-white bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"><ArrowLeft className="h-4 w-4 mr-1" /><span className="text-xs font-bold">返回</span></button>
        <h1 className="text-base font-bold text-white">OP Fast-Pass 極速結帳</h1>
        <div className="w-16"></div>
      </div>
      
      {/* 警告彈窗 (放回貨架通知) */}
      {showAlert && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300 w-[90%] max-w-[320px]">
          <div className="bg-red-500/95 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold border border-red-400">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            提醒：請記得將取消購買的商品放回原貨架！
          </div>
        </div>
      )}

      {/* 掃描區塊 */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-6">
        <div className="w-64 h-64 border-[3px] border-slate-700/50 rounded-3xl relative mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-3xl"></div>
          {/* 掃描線動畫 */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.5)] animate-pulse"></div>
        </div>
        <Button onClick={handleScanItem} variant="outline" className="bg-transparent border border-green-900/50 text-green-400 font-bold rounded-full px-6 hover:bg-green-950/30 active:scale-95 transition-transform">
          點擊此處模擬掃描商品
        </Button>
      </div>

      {/* 雲端購物車區塊 */}
      <div className="bg-slate-50 rounded-t-[32px] p-6 pb-8 shadow-[0_-10px_25px_rgba(0,0,0,0.2)] flex flex-col max-h-[45vh]">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h2 className="text-lg font-bold text-slate-800">雲端購物車</h2>
          <Badge className="bg-slate-200 text-slate-600 border-0">共 {cart.length} 件</Badge>
        </div>
        <div className="space-y-3 mb-6 overflow-y-auto flex-1 pr-1">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100 animate-in slide-in-from-right-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 text-[#F26722] flex items-center justify-center font-bold text-xs">{item.tag}</div>
                <span className="font-medium text-slate-700 text-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">${item.price}</span>
                <button onClick={() => handleRemoveItem(item.id)} className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-sm">購物車目前是空的<br/>請掃描商品</div>
          )}
        </div>
        <div className="flex items-end justify-between shrink-0 pt-2">
          <div><p className="text-xs text-slate-500 font-medium mb-1">總金額</p><p className="text-3xl font-black text-[#F26722]">${totalPrice}</p></div>
          <Button onClick={() => onNext(totalPrice)} disabled={cart.length === 0} className="bg-[#F26722] hover:bg-orange-600 text-white font-bold py-6 px-6 rounded-2xl shadow-lg active:scale-95 text-base disabled:opacity-50">
            <QrCode className="mr-2 h-5 w-5" /> 一鍵生成結帳碼
          </Button>
        </div>
      </div>
    </div>
  )
}

function FastPassGeneratedQRScreen({ amount, onBack }: { amount: number; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#0B1015]">
      <div className="p-4 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="flex items-center text-white bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"><ArrowLeft className="h-4 w-4 mr-1" /><span className="text-xs font-bold">返回</span></button>
        <h1 className="text-base font-bold text-white">付款結帳碼</h1>
        <div className="w-16"></div>
      </div>
      <div className="flex-1 bg-slate-50 rounded-t-[32px] p-6 flex flex-col items-center mt-2 overflow-y-auto pb-12">
        <div className="text-center mt-6 mb-8">
          <h2 className="text-2xl font-black text-slate-800 mb-2">整合結帳碼已生成</h2>
          <p className="text-sm text-slate-500">包含商品明細與 icash Pay 授權</p>
        </div>
        <div className="w-full bg-orange-50 border border-orange-100 rounded-3xl p-6 text-center mb-8 shadow-sm">
          <p className="text-sm font-bold text-[#F26722] mb-2">本次付款總金額</p>
          <p className="text-5xl font-black text-[#F26722]"><span className="text-2xl mr-1">$</span>{amount}</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-6 flex items-center justify-center">
          <QrCode className="h-48 w-48 text-slate-800" />
        </div>
        <h3 className="text-2xl font-black text-[#F26722] tracking-wide mb-4">請至機台完成結帳</h3>
        <div className="bg-slate-100 px-6 py-2.5 rounded-full"><p className="text-xs text-slate-500 font-medium">將此條碼對準門市出口機台掃描器</p></div>
      </div>
    </div>
  )
}

// ==========================================
// 6. 行動隨時取
// ==========================================
function MobilePickupScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("cafe")
  const [cartCount, setCartCount] = useState(2)
  const tabs = [
    { id: "all", label: "全部" },
    { id: "cafe", label: "CITY CAFE" },
    { id: "tea", label: "現萃茶" },
    { id: "snack", label: "零食泡麵" },
  ]
  const products = [
    { id: 1, name: "CITY CAFE 大杯冰美式 10 杯", price: 450, originalPrice: 600, discount: "半價", image: "coffee" },
    { id: 2, name: "抹茶拿鐵 5 杯組合", price: 275, originalPrice: 400, discount: "67折", image: "matcha" },
    { id: 3, name: "茶葉蛋 10 顆優惠組", price: 80, originalPrice: 100, discount: "8折", image: "egg" },
  ]
  const addToCart = () => setCartCount(prev => prev + 1)
  
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">行動隨時取</h1>
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><Receipt className="h-5 w-5" /></button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><TicketCheck className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-[#4CAF50] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto pb-24 px-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="border-0 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-slate-100 flex items-center justify-center">
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 text-xs">{product.discount}</Badge>
                  <Coffee className="h-12 w-12 text-slate-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-500 font-bold">${product.price}</span>
                      <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                    </div>
                    <button onClick={addToCart} className="h-7 w-7 rounded-full bg-[#F26722] flex items-center justify-center hover:bg-orange-600 transition-colors">
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="fixed bottom-24 right-6 max-w-[400px]">
        <button className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#4CAF50] text-white shadow-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">{cartCount}</span>}
        </button>
      </div>
    </div>
  )
}

// ==========================================
// 7. 小7集點卡
// ==========================================
function SevenPointsScreen({ onBack }: { onBack: () => void }) {
  const campaigns = [
    { id: 1, title: "哈利波特 25 周年集點活動", period: "2026/02/25 ~ 2026/05/04", points: 5, hasPoints: true },
    { id: 2, title: "安心取件帳單繳費集點GO", period: "2026/03/18 ~ 2026/05/26", hasPoints: false },
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">小7集點卡</h1>
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><History className="h-5 w-5" /></button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><Ticket className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-auto pb-32">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-semibold text-slate-800 text-sm">{campaign.title}</h3>
                </div>
                <p className="text-xs text-slate-500">{campaign.period}</p>
              </div>
              {campaign.hasPoints ? (
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-red-500" />
                  <Badge className="bg-red-50 text-red-600 border border-red-200 font-bold px-2 py-1">點 x {campaign.points}</Badge>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="text-xs text-slate-500 border-slate-200 hover:bg-slate-50">開始集點</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 8. i珍食雷達
// ==========================================
function IFoodRadarScreen({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const filters = [
    { id: "all", label: "全部" },
    { id: "bento", label: "便當麵食" },
    { id: "onigiri", label: "飯糰手卷" },
    { id: "dessert", label: "甜點飲料" },
  ]
  const stores = [
    { id: 1, name: "台科大一餐門市", distance: "50m", items: [{ name: "奮起湖軟排便當", stock: 2, price: 58, originalPrice: 89 }, { name: "鮪魚明太子飯糰", stock: 5, price: 25, originalPrice: 39 }] },
    { id: 2, name: "台科大第三宿舍門市", distance: "200m", items: [{ name: "北海道生乳捲", stock: 3, price: 45, originalPrice: 69 }, { name: "真飽涼麵", stock: 4, price: 35, originalPrice: 55 }] }
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 border-b bg-gradient-to-r from-[#4CAF50] to-green-600 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" /><span className="text-sm">返回</span>
        </button>
        <h1 className="mt-2 text-lg font-bold text-center text-white">校園 i珍食雷達</h1>
      </div>
      <div className="mx-4 mt-3 rounded-xl bg-green-100 p-3 flex items-center justify-between border border-green-200">
        <span className="text-green-800 font-bold text-sm">65% OFF 珍食時段進行中</span>
        <div className="animate-pulse"><Clock className="h-5 w-5 text-green-600" /></div>
      </div>
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filters.map((filter) => (
            <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeFilter === filter.id ? "bg-[#4CAF50] text-white" : "bg-white text-slate-500 border border-slate-200"}`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-4 pb-24 space-y-4 overflow-auto">
        {stores.map((store) => (
          <Card key={store.id} className="border-0 shadow-sm overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">{store.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-[#F26722]" />
                  <span>距離 {store.distance}</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {store.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-slate-700 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-green-600 font-black">${item.price}</span>
                        <span className="text-xs text-slate-400 line-through">${item.originalPrice}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`text-xs border-0 ${item.stock <= 2 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>剩 {item.stock} 份</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 9. 我的 OPENPOINT (點數頁面)
// ==========================================
function OPPointsScreen({ onBack }: { onBack: () => void }) {
  const quickActions = [
    { icon: Send, label: "點數轉贈" },
    { icon: History, label: "點數紀錄" },
    { icon: Heart, label: "愛心捐點" },
  ]
  const exchangeItems = [
    { id: 1, name: "所長茶葉蛋 1 顆", points: 10 },
    { id: 2, name: "統一布丁 (小)", points: 15 },
    { id: 3, name: "CITY CAFE 中杯美式", points: 35 },
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">我的 OPENPOINT</h1>
        <div className="w-10" />
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-auto pb-24">
        <Card className="border-0 bg-gradient-to-br from-amber-400 via-orange-500 to-[#F26722] shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-white/90 text-sm mb-1 font-medium">可用點數</p>
            <p className="text-5xl font-black text-white mb-2 tracking-tight">1,250</p>
            <p className="text-white/80 text-xs">年底將到期：50 點</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button key={index} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition-all active:scale-95">
                <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[#F26722]" />
                </div>
                <span className="text-xs font-bold text-slate-700">{action.label}</span>
              </button>
            )
          })}
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 mt-2">校園熱門兌換</h2>
          <div className="space-y-2">
            {exchangeItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-sm">{item.name}</span>
                  <Button size="sm" className="bg-[#F26722] hover:bg-orange-600 text-white text-xs font-bold shadow-sm">
                    {item.points} 點兌換
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 10. 老拉新送泡麵 (Referral)
// ==========================================
function ReferralScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 border-b bg-white shadow-sm flex items-center">
        <BackButton onClick={onBack} />
        <h1 className="w-full pr-8 text-lg font-bold text-center text-slate-800">老拉新送泡麵</h1>
      </div>
      <div className="flex-1 p-4 flex flex-col items-center justify-center overflow-auto pb-20">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mb-8">
          <QrCode className="h-40 w-40 text-slate-800" />
        </div>
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-600">目前進度</span>
            <span className="text-sm font-black text-[#F26722]">1 / 3 已邀請</span>
          </div>
          <Progress value={33} className="h-2.5 bg-slate-200 [&>div]:bg-[#F26722]" />
        </div>
        <Button onClick={handleCopy} className={`w-full mt-8 font-bold py-6 rounded-2xl text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-[#F26722] text-white'}`}>
          {copied ? "已複製連結！" : "複製專屬邀請連結"}
        </Button>
      </div>
    </div>
  )
}

// ==========================================
// 11. 全部功能 (All Features Menu)
// ==========================================
function AllFeaturesScreen({ setActiveScreen, onBack }: { setActiveScreen: (s: ScreenType) => void, onBack: () => void }) {
  const features = [
    { icon: ShoppingBag, label: "foodomo", action: "foodomo", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: Utensils, label: "學餐支付", action: "campus_pay", color: "text-green-600", bg: "bg-green-50" },
    { icon: Zap, label: "Fast-Pass", action: "fast_pass_unlock", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Cloud, label: "雲端列印", action: "print", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Ticket, label: "兌換券", action: "coupons", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Salad, label: "i珍食雷達", action: "ifood_radar", color: "text-green-500", bg: "bg-green-50" },
    { icon: Receipt, label: "行動隨時取", action: "mobile_pickup", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: BatteryCharging, label: "行動電源", action: "home", color: "text-emerald-500", bg: "bg-emerald-50" },
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">全部功能</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start overflow-auto">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <button key={i} onClick={() => setActiveScreen(f.action as ScreenType)} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center shadow-sm active:scale-95 transition-transform`}><Icon className={`h-7 w-7 ${f.color}`} /></div>
              <span className="text-[11px] font-bold text-slate-700 text-center">{f.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// 12. 通知中心 (Notifications)
// ==========================================
function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">通知中心</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-auto">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-red-500 shrink-0"></div>
          <div>
            <h3 className="font-bold text-slate-800 mb-1">您有一筆學餐回饋券已入帳！</h3>
            <p className="text-xs text-slate-500">2026/05/11 15:30</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 13. 我的條碼 (My Barcode)
// ==========================================
function MyBarcodeScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">我的條碼</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <p className="text-sm font-bold text-slate-600 mb-6">請出示此條碼供店員掃描</p>
        <div className="w-full h-32 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-200">
          <div className="absolute inset-y-4 left-6 right-6 flex gap-[2px]">
            {Array.from({ length: 45 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1.5' : 'w-[3px]'} bg-slate-800`} />)}
          </div>
        </div>
        <p className="text-lg font-mono tracking-widest text-slate-700 mt-4">AA123-456-789</p>
      </div>
    </div>
  )
}

// ==========================================
// 14. 品牌專用點 / 服務 / 個人頁面 
// ==========================================
function BrandPointsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">品牌專用點</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Star className="h-16 w-16 text-slate-300 mb-4" />
        <p className="text-slate-500 font-bold">目前無可用的品牌專用點</p>
      </div>
    </div>
  )
}

function ServicesScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">服務中心</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 p-4 grid grid-cols-3 gap-4 content-start">
        {['繳費中心', '交貨便', '寄件/收件', '保險服務', '遊戲點數', '交通票券'].map((t, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-slate-100">
            <Box className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-600">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">會員中心</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 p-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-8 w-8 text-slate-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">披薩</h2>
            <p className="text-sm text-slate-500">學生認證會員</p>
          </div>
        </div>
      </div>
    </div>
  )
}


// ==========================================
// 主畫面 HomeInteractive
// ==========================================
export function HomeInteractive() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home')
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [fastPassAmount, setFastPassAmount] = useState(119) // 記錄 Fast-Pass 結帳的總金額

  const goHome = () => setActiveScreen('home')
  
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'print': return <OPPrintScreen setActiveScreen={setActiveScreen} />
      case 'coupons': return <CouponsScreen onBack={goHome} />
      case 'campus_pay': return <CampusPayScreen onBack={goHome} />
      case 'foodomo': return <FoodomoGroupScreen setActiveScreen={setActiveScreen} />
      
      // ★ 完整接回的 Fast-Pass 三步驟 (修好囉)
      case 'fast_pass_unlock': return <FastPassUnlockScreen onUnlock={() => setActiveScreen('fast_pass_scanner')} onBack={goHome} />
      case 'fast_pass_scanner': return <FastPassScannerScreen onNext={(amount) => { setFastPassAmount(amount); setActiveScreen('fast_pass_generated_qr'); }} onBack={goHome} />
      case 'fast_pass_generated_qr': return <FastPassGeneratedQRScreen amount={fastPassAmount} onBack={goHome} />
      
      // 原有功能
      case 'seven_points': return <SevenPointsScreen onBack={goHome} />
      case 'mobile_pickup': return <MobilePickupScreen onBack={goHome} />
      case 'ifood_radar': return <IFoodRadarScreen onBack={goHome} />
      case 'op_points': return <OPPointsScreen onBack={goHome} />
      case 'referral': return <ReferralScreen onBack={goHome} />
      
      // 新補上的全功能路徑
      case 'all_features': return <AllFeaturesScreen setActiveScreen={setActiveScreen} onBack={goHome} />
      case 'notifications': return <NotificationsScreen onBack={goHome} />
      case 'my_barcode': return <MyBarcodeScreen onBack={goHome} />
      case 'brand_points': return <BrandPointsScreen onBack={goHome} />
      case 'services': return <ServicesScreen onBack={goHome} />
      case 'profile': return <ProfileScreen onBack={goHome} />

      case 'home':
      default:
        return (
          <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
            {/* 頂部經典 Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
              <button onClick={() => setActiveScreen('notifications')} className="relative p-2 rounded-full hover:bg-slate-50">
                <Bell className="h-6 w-6 text-slate-700" />
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
              </button>
              
              <div className="flex-1 mx-3 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full py-2 px-4 text-center cursor-pointer">
                <span className="text-sm font-bold text-slate-700">Hi, 披薩！學生專屬優惠</span>
              </div>
              
              <button onClick={() => setActiveScreen('my_barcode')} className="flex flex-col items-center justify-center p-1 hover:opacity-80">
                <Barcode className="h-6 w-6 text-slate-700" />
                <span className="text-[10px] font-bold text-slate-600 mt-0.5">我的條碼</span>
              </button>
            </div>

            <main className="flex-1">
              {/* 經典點數看板 */}
              <div className="px-3 pt-3">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <span className="font-black text-xl tracking-wider text-slate-800">OPEN<span className="text-green-600">POINT</span></span>
                      <span className="text-slate-500 text-sm ml-2 font-medium">價值</span>
                    </div>
                    <div className="flex items-baseline cursor-pointer hover:opacity-80" onClick={() => setActiveScreen('op_points')}>
                      <span className="text-[#F26722] text-3xl font-black mr-1">1,250</span>
                      <span className="text-slate-500 text-sm font-medium">元</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-100 w-full mb-3"></div>
                  
                  <div className="grid grid-cols-3 divide-x divide-slate-100">
                    <div onClick={() => setActiveScreen('seven_points')} className="text-center px-2 cursor-pointer hover:bg-slate-50 rounded-lg py-1">
                      <p className="text-xs text-slate-600 mb-1 font-bold">小7集點卡</p>
                      <p className="text-red-500 font-bold text-lg">5 <span className="text-xs text-slate-500 font-normal">點</span></p>
                    </div>
                    <div onClick={() => setActiveScreen('brand_points')} className="text-center px-2 cursor-pointer hover:bg-slate-50 rounded-lg py-1">
                      <p className="text-xs text-slate-600 mb-1 font-bold">品牌專用點</p>
                      <p className="text-red-500 font-bold text-lg">0 <span className="text-xs text-slate-500 font-normal">點</span></p>
                    </div>
                    <div onClick={() => setActiveScreen('mobile_pickup')} className="text-center px-2 cursor-pointer hover:bg-slate-50 rounded-lg py-1">
                      <p className="text-xs text-slate-600 mb-1 font-bold">行動隨時取</p>
                      <p className="text-slate-800 font-bold text-lg">12 <span className="text-xs text-slate-500 font-normal">張</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 我的常用功能 */}
              <div className="mt-5 px-3">
                <div className="flex justify-between items-end mb-2 px-1">
                  <h2 className="text-base font-black text-slate-800">我的常用功能</h2>
                  <span className="text-xs text-slate-400 font-medium">設定/搜尋</span>
                </div>
                
                <div className="flex gap-2 h-[88px]">
                  <div className="w-[38%] bg-gradient-to-br from-green-500 to-[#4CAF50] rounded-2xl p-1.5 flex gap-1.5 shadow-sm">
                    <button onClick={() => setActiveScreen('foodomo')} className="flex-1 flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                      <ShoppingBag className="h-7 w-7 text-white mb-1" />
                      <span className="text-white text-[11px] font-bold">foodomo</span>
                    </button>
                    <button onClick={() => setActiveScreen('campus_pay')} className="flex-1 flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                      <Utensils className="h-7 w-7 text-white mb-1" />
                      <span className="text-white text-[11px] font-bold">學餐支付</span>
                    </button>
                  </div>
                  
                  <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden px-1">
                    <div className="flex min-w-max px-1">
                      <button onClick={() => setActiveScreen('print')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Cloud className="h-7 w-7 text-blue-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">雲端列印</span>
                      </button>
                      <button onClick={() => setActiveScreen('coupons')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Ticket className="h-7 w-7 text-amber-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">兌換券</span>
                      </button>
                      <button onClick={() => setActiveScreen('fast_pass_unlock')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Zap className="h-7 w-7 text-amber-400 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">Fast-Pass</span>
                      </button>
                      <button onClick={() => setActiveScreen('ifood_radar')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Salad className="h-7 w-7 text-green-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">i珍食雷達</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 校園任務與獎勵 */}
              <div className="mt-5 px-3">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Target className="h-4 w-4 text-[#F26722]" />
                  <h2 className="text-sm font-bold text-slate-800">校園任務與獎勵</h2>
                </div>
                <Card className="border border-orange-100 bg-gradient-to-r from-orange-50 to-white transition-all hover:shadow-md active:scale-[0.99] cursor-pointer shadow-sm" onClick={() => setActiveScreen('referral')}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[#F26722] p-2.5 text-white shadow-md flex-shrink-0"><Gift className="h-5 w-5" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-slate-800 text-sm">老拉新送泡麵</h3>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Referral Noodle Challenge</p>
                        <div className="space-y-1.5">
                          <Progress value={33} className="h-1.5 bg-slate-200 [&>div]:bg-[#F26722]" />
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-500">1/3 已邀請</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-orange-100 text-[#F26722] border-0">+1 碗來一客</Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 早八打卡挑戰 */}
              <div className="mt-4 px-3">
                <div className="w-full aspect-[21/9] bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 rounded-2xl shadow-sm relative overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setShowCouponModal(true)}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="text-center z-10">
                    <Badge className="bg-white text-rose-500 hover:bg-white border-0 mb-2 shadow-sm font-black">早八打卡挑戰</Badge>
                    <h3 className="text-white font-black text-xl tracking-wide drop-shadow-md">點擊完成今日報到</h3>
                  </div>
                </div>
              </div>
            </main>

            {/* 經典底部導航 */}
            <div className="fixed bottom-0 w-full max-w-[400px] bg-white border-t border-slate-100 flex items-end justify-between px-2 pb-5 pt-2 z-50">
              <button onClick={() => setActiveScreen('home')} className="flex flex-col items-center w-1/5 pt-1">
                <Home className="h-6 w-6 text-[#F26722] mb-1" />
                <span className="text-[10px] font-bold text-[#F26722]">首頁</span>
              </button>
              
              <button onClick={() => setActiveScreen('all_features')} className="flex flex-col items-center w-1/5 pt-1">
                <LayoutGrid className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-500">全部功能</span>
              </button>
              
              {/* 正中間大按鈕 ➔ Fast-Pass */}
              <div className="w-1/5 flex flex-col items-center relative h-full justify-end">
                <button 
                  onClick={() => setActiveScreen('fast_pass_unlock')} 
                  className="absolute -top-10 w-16 h-16 bg-gradient-to-tr from-orange-500 to-[#F26722] rounded-full flex items-center justify-center border-4 border-white shadow-lg active:scale-95 transition-transform"
                >
                  <ScanLine className="h-8 w-8 text-white" />
                </button>
                <span className="text-[10px] font-bold text-slate-600 mt-1">極速結帳</span>
              </div>
              
              <button onClick={() => setActiveScreen('services')} className="flex flex-col items-center w-1/5 pt-1">
                <Grid className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-500">服務</span>
              </button>
              <button onClick={() => setActiveScreen('profile')} className="flex flex-col items-center w-1/5 pt-1">
                <User className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-500">會員中心</span>
              </button>
            </div>

            {showCouponModal && (
              <CouponModal onClose={() => setShowCouponModal(false)} onGoToCoupons={() => { setShowCouponModal(false); setActiveScreen('coupons'); }} />
            )}
          </div>
        )
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-slate-50 relative shadow-2xl">
      {renderScreenContent()}
    </div>
  )
}