"use client"
import PackageServiceScreen from './PackageServiceScreen';
import PowerBankMapScreen from './PowerBankMapScreen';
import PayBarcodeScreen from '@/components/openpoint/PayBarcodeScreen';
import { useState, useEffect } from "react"
import { AppHeader } from "@/components/openpoint/app-header"
import { BottomNav } from "@/components/openpoint/bottom-nav"
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
  Store, Smartphone, Navigation, Users, User, CheckCircle2, UserPlus, LogIn, ExternalLink, UserMinus
} from "lucide-react"
import { Input } from "@/components/ui/input"

type ScreenType = 'home' | 'print' | 'coupons' | 'referral' | 'campus_pay' | 'foodomo' | 'ifood_radar' | 'fast_pass_unlock' | 'fast_pass_barcode' | 'nav_pay_unlock' | 'nav_pay_barcode' | 'mobile_pickup' | 'op_points' | 'seven_points' | 'powerbank_map' | 'package_service'

const shortcuts = [
  { icon: Cloud, label: "雲端列印", color: "bg-blue-50 text-blue-600", action: "print" },
  { icon: Zap, label: "OP Fast-Pass", color: "bg-amber-50 text-amber-500", action: "fast_pass", special: true },
  { icon: BatteryCharging, label: "行動電源", color: "bg-green-50 text-green-600", action: "powerbank" },
  { icon: ShoppingBag, label: "行動隨時取", color: "bg-purple-50 text-purple-600", action: "mobile_pickup" },
  { icon: ShoppingBag, label: "foodomo", color: "bg-teal-50 text-teal-600", action: "foodomo" },
  { icon: Utensils, label: "學餐支付", color: "bg-emerald-50 text-emerald-600", action: "campus_pay" },
  { icon: Ticket, label: "兌換券", color: "bg-amber-50 text-amber-600", action: "coupons" },
  { icon: MoreHorizontal, label: "更多", color: "bg-gray-100 text-gray-600", action: null },
]

const heroCards = [
  {
    id: "morning",
    title: "早八打卡挑戰",
    subtitle: "8 AM Check-in",
    icon: Coffee,
    gradient: "from-amber-400 via-orange-400 to-rose-400",
    buttonText: "Claim",
    badge: "Morning",
    hasCountdown: true,
    action: "claim_coupon",
  },
  {
    id: "foodomo",
    title: "外送揪團神器",
    subtitle: "無痛分帳賺點數",
    icon: ShoppingBag,
    gradient: "from-emerald-400 via-teal-400 to-cyan-400", // 👉 就是改這行！
    buttonText: "Order",
    badge: "foodomo",
    hasCountdown: false,
    action: "foodomo",
  },
  {
    id: "night",
    title: "i珍食雷達",
    subtitle: "i-Food Radar",
    icon: Salad,
    gradient: "from-violet-400 via-purple-400 to-fuchsia-400",
    buttonText: "View",
    badge: "65% OFF",
    hasCountdown: false,
    action: "ifood_radar",
  },
]

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
      <ArrowLeft className="h-5 w-5" />
      <span className="text-sm">返回</span>
    </button>
  )
}

function CouponModal({ onClose, onGoToCoupons }: { onClose: () => void, onGoToCoupons: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-[320px] rounded-2xl bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--op-green)]/10">
            <Check className="h-8 w-8 text-[var(--op-green)]" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">打卡成功！</h2>
          <p className="mb-6 text-sm text-muted-foreground">恭喜獲得 波霸珍珠奶茶嘗鮮價 9 折券</p>
          <Button onClick={onGoToCoupons} className="w-full bg-[var(--op-orange)] hover:bg-[var(--op-orange)]/90 text-white shadow-md active:scale-95 transition-all">
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
    <div className="h-screen w-full bg-background overflow-hidden">
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
      <div className="p-4 border-b flex items-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-muted transition-colors"><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <h1 className="w-full text-lg font-bold text-center text-foreground">雲端無感列印</h1>
      </div>
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div onClick={onNext} className="w-full border-2 border-dashed border-muted-foreground/30 bg-muted/10 rounded-3xl p-10 flex flex-col items-center gap-4 hover:border-[var(--op-orange)]/50 hover:bg-[var(--op-orange)]/5 transition-all cursor-pointer active:scale-95 group">
          <div className="h-16 w-16 rounded-full bg-[var(--op-orange)]/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
            <Upload className="h-8 w-8 text-[var(--op-orange)]" />
          </div>
          <div className="text-center">
            <p className="font-bold text-foreground text-lg">點擊選擇檔案上傳</p>
            <p className="text-sm text-muted-foreground mt-1">支援 PDF / Word 格式</p>
          </div>
        </div>
        <div className="mt-6 w-full p-4 bg-muted/50 rounded-2xl flex flex-col items-center text-center border border-muted">
          <p className="text-sm font-medium text-foreground">檔案上傳後將暫存於統一雲端</p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1 text-[var(--op-orange)]" /> 傳輸過程採用 AES-256 高階加密，請於 24 小時內列印
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
      <div className="p-4 border-b flex items-center relative shrink-0 bg-background z-10">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-muted transition-colors"><ArrowLeft className="h-5 w-5 text-foreground" /></button>
        <h1 className="w-full text-lg font-bold text-center text-foreground">設定與付款</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="p-4 rounded-2xl border border-muted bg-muted/20 flex items-center mb-6">
          <div className="h-10 w-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center mr-4 shrink-0"><FileText className="h-5 w-5" /></div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm text-foreground truncate">企業管理_期末報告_Final.pdf</p>
            <p className="text-xs text-muted-foreground mt-0.5">共 {totalFilePages} 頁 • A4 尺寸</p>
          </div>
        </div>
        <h2 className="text-sm font-bold text-foreground mb-3 px-1">列印範圍</h2>
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setRangeType('all')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${rangeType === 'all' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/10 text-[var(--op-orange)]' : 'border-muted text-muted-foreground hover:border-muted-foreground/30'}`}>全部 ({totalFilePages}頁)</button>
            <button onClick={() => setRangeType('custom')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${rangeType === 'custom' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/10 text-[var(--op-orange)]' : 'border-muted text-muted-foreground hover:border-muted-foreground/30'}`}>自訂範圍</button>
          </div>
          {rangeType === 'custom' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200 bg-muted/20 p-3 rounded-xl border border-muted flex items-center gap-3">
              <Input value={customRange} onChange={(e) => setCustomRange(e.target.value)} placeholder="例: 1-3 或 2,4,5" className="bg-white border-muted h-10" />
              <div className="whitespace-nowrap shrink-0">
                <span className="text-xs text-muted-foreground">共包含 </span><span className="text-sm font-bold text-[var(--op-orange)]">{actualPages}</span><span className="text-xs text-muted-foreground"> 頁</span>
              </div>
            </div>
          )}
        </div>
        <h2 className="text-sm font-bold text-foreground mb-3 px-1">列印規格</h2>
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setColorMode('bw')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${colorMode === 'bw' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/10 text-[var(--op-orange)]' : 'border-muted text-muted-foreground hover:border-muted-foreground/30'}`}>黑白</button>
            <button onClick={() => setColorMode('color')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${colorMode === 'color' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/10 text-[var(--op-orange)]' : 'border-muted text-muted-foreground hover:border-muted-foreground/30'}`}>彩色</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPrintMode('single')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${printMode === 'single' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/10 text-[var(--op-orange)]' : 'border-muted text-muted-foreground hover:border-muted-foreground/30'}`}>單面列印</button>
            <button onClick={() => setPrintMode('double')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${printMode === 'double' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/10 text-[var(--op-orange)]' : 'border-muted text-muted-foreground hover:border-muted-foreground/30'}`}>雙面列印</button>
          </div>
        </div>
        <h2 className="text-sm font-bold text-foreground mb-3 px-1">選擇付款方式</h2>
        <div className="space-y-3">
          <button onClick={() => setSelectedPay('op')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'op' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/5' : 'border-muted hover:border-muted-foreground/30'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'op' ? 'bg-[var(--op-orange)]' : 'bg-muted'}`}><CreditCard className={`h-5 w-5 ${selectedPay === 'op' ? 'text-white' : 'text-muted-foreground'}`} /></div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground">OP 點數全額扣抵</p><p className="text-xs text-muted-foreground mt-0.5">可用點數：1,250 點</p>
            </div>
            {selectedPay === 'op' && <div className="h-6 w-6 rounded-full bg-[var(--op-orange)] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
          </button>
          <button onClick={() => setSelectedPay('icash')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'icash' ? 'border-[var(--op-orange)] bg-[var(--op-orange)]/5' : 'border-muted hover:border-muted-foreground/30'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'icash' ? 'bg-[#1CA2D8]' : 'bg-muted'}`}><CreditCard className={`h-5 w-5 ${selectedPay === 'icash' ? 'text-white' : 'text-muted-foreground'}`} /></div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground">icash Pay</p><p className="text-xs text-muted-foreground mt-0.5">餘額 $840</p>
            </div>
            {selectedPay === 'icash' && <div className="h-6 w-6 rounded-full bg-[#1CA2D8] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-background shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-sm font-medium text-muted-foreground">預估費用 ({actualPages} 頁)</span>
          <span className="text-2xl font-black text-[var(--op-orange)]">{actualPages === 0 ? '--' : (selectedPay === 'op' ? `${totalPrice} 點` : `NT$ ${totalPrice}`)}</span>
        </div>
        <button onClick={onNext} disabled={actualPages === 0} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center transition-all ${actualPages > 0 ? 'bg-[var(--op-orange)] hover:bg-[var(--op-orange)]/90 text-white shadow-lg shadow-orange-500/30 active:scale-95' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
          確認付款並產出條碼<ChevronRight className="ml-1 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function PrintProcessingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-background animate-in fade-in duration-300">
      <Loader2 className="h-12 w-12 text-[var(--op-orange)] animate-spin mb-4" />
      <h2 className="text-xl font-bold text-foreground mb-2">安全連線中</h2>
      <p className="text-sm text-muted-foreground">系統正在進行列印資金預先圈存...</p>
    </div>
  );
}

function PrintQRCodeScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-bottom-8 fade-in duration-500 overflow-y-auto">
      <div className="p-4 flex items-center relative shrink-0">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-muted transition-colors"><ArrowLeft className="h-5 w-5 text-slate-800" /></button>
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
            <h2 className="text-xl font-bold text-[var(--op-orange)] mb-1">請至 ibon 掃描出紙</h2>
            <p className="text-xs font-medium text-slate-500">免經店員解鎖，免排隊結帳</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 w-full max-w-[280px] border border-slate-200 shadow-sm">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-slate-400 mr-2.5 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-1.5">自動退款防呆機制</h4>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-3 leading-relaxed">
                <li>取件條碼有效期限為 <span className="font-bold text-[var(--op-orange)]">72 小時</span>。</li>
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
// 兌換券與預約取貨 (更新品項)
// ==========================================
function CouponsScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'list' | 'options' | 'qr' | 'location' | 'store' | 'time' | 'success'>('list');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const coupons = [
    { id: 1, title: "美式咖啡 8 折券", subtitle: "限時優惠 (學餐消費回饋)", expiry: "今天 20:00 前有效", color: "bg-orange-500", highlight: true },
    { id: 2, title: "波霸珍珠奶茶", subtitle: "嘗鮮價 9 折 (早八打卡獎勵)", expiry: "2026/05/15", color: "bg-amber-500" },
    { id: 3, title: "拿鐵咖啡 9 折券", subtitle: "全品項適用", expiry: "2026/05/01", color: "bg-[var(--op-green)]" },
  ];

  const nearbyStores = [
    { id: 's1', name: '台科大一餐門市', distance: '100m' },
    { id: 's2', name: '台科大第三宿舍門市', distance: '250m' },
    { id: 's3', name: '公館基隆路門市', distance: '400m' },
  ];

  const timeSlots = ["現在 (立即準備)", "14:30", "15:00", "15:30", "16:00", "16:30"];

  const handleUseCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    setView('options');
  };

  const internalBack = () => {
    if (view === 'options') setView('list');
    else if (view === 'qr' || view === 'location') setView('options');
    else if (view === 'store') setView('options'); 
    else if (view === 'time') setView('store');
    else if (view === 'success') { setView('list'); onBack(); } 
    else onBack();
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="p-4 bg-card border-b flex items-center shrink-0">
        <BackButton onClick={view === 'list' ? onBack : internalBack} />
        <h1 className="w-full text-lg font-bold text-center pr-8">
          {view === 'list' ? '我的兌換券' : view === 'options' ? '選擇兌換方式' : view === 'qr' ? '櫃台兌換條碼' : view === 'success' ? '預約成功' : '預約自取'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'list' && (
          <div className="p-4 space-y-4 animate-in fade-in duration-300">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="border-0 shadow-sm overflow-hidden relative">
                {coupon.highlight && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg z-10 animate-pulse">限時派發</div>
                )}
                <CardContent className="p-0 flex bg-white">
                  <div className={`w-2.5 ${coupon.color}`} />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-foreground mb-0.5">{coupon.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{coupon.subtitle}</p>
                    <div className="flex items-center text-xs text-muted-foreground bg-muted/50 w-fit px-2 py-1 rounded">
                      <Clock className="h-3 w-3 mr-1" />有效期限：{coupon.expiry}
                    </div>
                  </div>
                  <div className="flex items-center pr-4">
                    <Button onClick={() => handleUseCoupon(coupon)} size="sm" className={`${coupon.color} hover:opacity-90 text-white shadow-sm`}>使用</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {view === 'options' && (
          <div className="p-6 flex flex-col gap-5 animate-in slide-in-from-right-4 fade-in duration-300 h-full justify-center pb-20">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedCoupon?.title}</h2>
              <p className="text-sm text-slate-500">請選擇您偏好的兌換方式</p>
            </div>
            <button onClick={() => setView('qr')} className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col items-center gap-4 hover:border-orange-400 hover:bg-orange-50 transition-all active:scale-95 group shadow-sm">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <QrCode className="h-8 w-8 text-slate-600 group-hover:text-orange-600" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-700">臨櫃出示條碼兌換</h3>
                <p className="text-sm text-slate-500 mt-1">適合剛好在門市的您，請由店員刷讀</p>
              </div>
            </button>
            <button onClick={() => setView('location')} className="w-full bg-white border-2 border-orange-400 rounded-3xl p-6 flex flex-col items-center gap-4 bg-gradient-to-b from-orange-50 to-white hover:from-orange-100 hover:to-orange-50 transition-all active:scale-95 group shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">推薦</div>
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-700">預約門市自取 (免排隊)</h3>
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
            <p className="text-sm font-bold text-orange-600 animate-bounce">請出示此畫面由店員掃描</p>
          </div>
        )}

        {view === 'location' && (
          <div className="p-6 flex flex-col items-center justify-center h-full animate-in fade-in duration-300 pb-20">
            <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-6">
              <Navigation className="h-12 w-12" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">允許存取您的位置</h2>
            <p className="text-center text-slate-500 text-sm mb-8 px-4">
              為了幫您尋找離您最近的門市進行預約自取，我們需要取得您的位置資訊。
            </p>
            <Button onClick={() => setView('store')} className="w-full max-w-[250px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 rounded-2xl shadow-md text-lg">允許存取</Button>
            <button onClick={() => setView('options')} className="mt-4 text-sm text-slate-400 font-medium p-2">稍後再說</button>
          </div>
        )}

        {view === 'store' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">請選擇預約取貨門市</h2>
            <div className="space-y-3">
              {nearbyStores.map(store => (
                <button key={store.id} onClick={() => { setSelectedStore(store.name); setView('time'); }} className="w-full bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-orange-400 hover:shadow-md transition-all active:scale-95">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2.5 rounded-full mr-3 text-orange-600"><Store className="h-5 w-5" /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-800">{store.name}</h3>
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
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-5 flex items-center">
              <Store className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
              <p className="text-sm text-orange-800 font-medium">已選擇：{selectedStore}</p>
            </div>
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">請選擇預計取貨時間</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {timeSlots.map(time => (
                <button key={time} onClick={() => setSelectedTime(time)} className={`py-3.5 rounded-xl border-2 font-bold text-sm transition-all ${selectedTime === time ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300'}`}>
                  {time}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-4 pb-2">
              <Button onClick={() => setView('success')} disabled={!selectedTime} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg disabled:opacity-50 disabled:active:scale-100">
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
            <p className="text-slate-500 text-center mb-8">門市已收到您的訂單<br/>請於 <span className="font-bold text-orange-600">{selectedTime}</span> 前往 <span className="font-bold text-orange-600">{selectedStore}</span> 領取。</p>
            <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-8">
              <h3 className="font-bold text-slate-800 mb-1">{selectedCoupon?.title}</h3>
              <p className="text-xs text-slate-500 mb-4">預約編號：#OP883921</p>
              
              <div className="w-full bg-slate-100 rounded-lg p-3 text-center border border-slate-200">
                <p className="text-lg font-mono font-bold text-slate-700 tracking-widest">AB98-7654-3210</p>
              </div>
              <p className="text-xs text-center mt-3 text-slate-400">到店時請向店員出示此兌換序號</p>
            </div>
            <Button onClick={internalBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              回首頁
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
    <div className="flex flex-col h-full bg-muted/30">
      <div className="p-4 bg-card border-b flex items-center justify-between shrink-0">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-foreground">學餐支付</h1>
        <div className="w-16"></div>
      </div>

      {payState === 'paying' && (
        <div className="flex-1 p-4 flex flex-col items-center overflow-auto pb-24 animate-in fade-in duration-300">
          <div className="w-full bg-emerald-100/80 text-emerald-700 px-4 py-3 rounded-xl font-bold text-sm mb-6 flex items-center justify-center border border-emerald-200 shadow-sm">
            <Utensils className="h-4 w-4 mr-2" />現在買學餐，筆筆送 7-11 折價券！
          </div>
          <div className="w-full bg-white p-4 rounded-2xl shadow-sm mb-6 border border-slate-100">
            <p className="text-xs text-muted-foreground text-center mb-2">付款碼（一維條碼）</p>
            <div className="h-16 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-y-2 left-2 right-2 flex gap-[2px]">
                {Array.from({ length: 40 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
              </div>
              <Barcode className="h-6 w-6 text-white/20 absolute" />
            </div>
            <p className="text-xs text-center mt-2 font-mono text-muted-foreground">4711 8823 0987 6543</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full flex flex-col items-center">
            <p className="text-xs text-muted-foreground text-center mb-2">掃描碼（QR Code）</p>
            <div className="w-40 h-40 bg-slate-800 rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-4 grid grid-cols-7 gap-1">
                {Array.from({ length: 49 }).map((_, i) => <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />)}
              </div>
              <QrCode className="h-10 w-10 text-white/20 absolute" />
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground text-center">請出示此畫面給店家掃描</p>
          <div className="mt-8 w-full">
            <Button onClick={handleSimulatePay} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-95 transition-all text-lg">
              模擬購買學餐 ($85)
            </Button>
          </div>
        </div>
      )}

      {payState === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">處理付款中</h2>
          <p className="text-sm text-muted-foreground">正在與學餐系統連線...</p>
        </div>
      )}

      {payState === 'success' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 pb-20">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 shadow-inner">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-1">付款成功！</h2>
          <p className="text-slate-500 mb-8 font-medium">已扣款 $85</p>

          <div className="w-full bg-white rounded-3xl p-1.5 shadow-xl border border-orange-100 relative overflow-hidden mb-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">限時發送</div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[26px] p-5 border border-dashed border-orange-200">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Coffee className="h-7 w-7 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-600 text-lg mb-0.5">美式咖啡 8 折券</h3>
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
          <Button onClick={onBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg">
            返回首頁查看票券
          </Button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Foodomo 外送揪團 (★ 獨立菜單與複製回饋升級)
// ==========================================
function FoodomoGroupScreen({ setActiveScreen }: { setActiveScreen: (screen: ScreenType) => void }) {
  const [view, setView] = useState<'init' | 'host_select_store' | 'host_room_created' | 'member_enter_code' | 'menu' | 'payment' | 'status' | 'success'>('init');
  const [role, setRole] = useState<'host' | 'member'>('host');
  const [roomCode, setRoomCode] = useState('');
  
  // ★ 1. 真實餐廳資料結構
  const restaurants = [
    { 
      id: 'starbucks', name: "星巴克 (台科大店)", min: 200, fee: 45, 
      items: [{ id: "sb1", name: "大杯美式咖啡", price: 110 }, { id: "sb2", name: "大杯那堤", price: 135 }, { id: "sb3", name: "焦糖瑪奇朵", price: 155 }] 
    },
    { 
      id: 'formosa', name: "鬍鬚張 (台北公館店)", min: 150, fee: 39, 
      items: [{ id: "fm1", name: "招牌魯肉飯", price: 65 }, { id: "fm2", name: "雞肉飯", price: 65 }, { id: "fm3", name: "苦瓜排骨湯", price: 85 }] 
    },
    { 
      id: 'fatdaddy', name: "胖老爹 (公館店)", min: 300, fee: 60, 
      items: [{ id: "fd1", name: "5號全家餐", price: 329 }, { id: "fd2", name: "無骨雞腿排", price: 75 }, { id: "fd3", name: "波霸薯條", price: 40 }] 
    }
  ];

  const [selectedStoreId, setSelectedStoreId] = useState('starbucks');
  const currentStore = restaurants.find(r => r.id === selectedStoreId) || restaurants[0];
  const [copied, setCopied] = useState(false);

  // 購物車與計價 (與目前餐廳連動)
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
  const deliveryFee = currentStore.fee; // ★ 自動抓取該餐廳外送費
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
      <div className="p-4 border-b bg-teal-500 flex items-center shrink-0 shadow-sm z-10">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-teal-600 transition-colors">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="w-full text-lg font-bold text-center text-white pr-8">Foodomo 校園外送揪團</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'init' && (
          <div className="p-6 flex flex-col items-center justify-center h-full animate-in fade-in duration-300 pb-20">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <ShoppingBag className="h-12 w-12 text-teal-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">無痛分帳揪團</h2>
            <p className="text-slate-500 text-sm mb-10 text-center px-4">主揪免代墊免催款，團員各自用 icash Pay 結帳，自動拆分外送費！</p>
            
            <div className="w-full space-y-4">
              <button onClick={() => { setRole('host'); setView('host_select_store'); setCart({}); }} className="w-full bg-white border-2 border-teal-500 rounded-2xl p-5 flex items-center justify-between hover:bg-teal-50 transition-all active:scale-95 shadow-sm group">
                <div className="flex items-center">
                  <div className="bg-teal-100 p-3 rounded-full mr-4 group-hover:bg-teal-200 transition-colors"><UserPlus className="h-6 w-6 text-teal-600" /></div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">發起揪團 (主揪)</h3><p className="text-xs text-slate-500 mt-1">選擇餐廳並建立房間代碼</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-teal-500" />
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
                <Card key={store.id} onClick={() => { setSelectedStoreId(store.id); setView('host_room_created'); }} className="border-0 shadow-sm cursor-pointer hover:ring-2 hover:ring-teal-500 transition-all active:scale-95">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{store.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-teal-100 text-[10px]">滿 ${store.min} 外送</Badge>
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
            <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center mb-6">
              <h2 className="text-slate-500 text-sm font-bold mb-4">房間建立成功！請邀請團員進房</h2>
              <div className="bg-teal-50 text-teal-700 text-4xl font-black tracking-widest py-5 rounded-xl border-2 border-dashed border-teal-200 mb-6 font-mono">
                FD-9527
              </div>
              {/* ★ 加入複製成功彈窗機制 */}
              <Button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} variant="outline" className={`w-full font-bold mb-3 transition-colors ${copied ? 'bg-teal-500 text-white border-teal-500 hover:bg-teal-600' : 'border-teal-500 text-teal-600 hover:bg-teal-50'}`}>
                {copied ? <><Check className="mr-2 h-4 w-4" /> 連結已複製！</> : <><Copy className="mr-2 h-4 w-4" /> 複製邀請代碼</>}
              </Button>
              <Button variant="outline" className="w-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                <ExternalLink className="mr-2 h-4 w-4" /> 分享至 LINE
              </Button>
            </div>
            <div className="mt-auto pt-4 w-full pb-6">
              <Button onClick={() => setView('menu')} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-teal-500/30">
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
                className="text-center text-2xl font-black tracking-widest uppercase h-16 border-2 border-slate-200 focus-visible:ring-teal-500 bg-white shadow-sm rounded-xl"
                maxLength={7}
              />
            </div>
            <Button onClick={() => setView('menu')} disabled={roomCode.length < 5} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50">
              確認並加入房間
            </Button>
          </div>
        )}

        {/* ★ 改為動態載入該餐廳菜單 */}
        {view === 'menu' && (
          <div className="animate-in fade-in duration-300 pb-28">
            <div className="bg-white p-4 mb-3 shadow-sm border-b border-slate-100 flex justify-between items-center">
              <div>
                <div className="flex items-center text-xs text-slate-500 mb-1"><Store className="h-3 w-3 mr-1" /> 台科大周邊餐廳</div>
                <h2 className="text-lg font-black text-slate-800">{currentStore.name}</h2>
              </div>
              <div className="text-right">
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-0 mb-1">房號 FD-9527</Badge>
                <div className="text-xs text-slate-500 flex items-center justify-end"><Users className="h-3 w-3 mr-1"/> 已有 3 人在房內</div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {currentStore.items.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{item.name}</h3><p className="text-sm text-teal-600 font-bold mt-0.5">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {cart[item.id] ? (
                        <>
                          <button onClick={() => removeItem(item.id)} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"><Minus className="h-4 w-4 text-slate-600" /></button>
                          <span className="w-4 text-center font-bold text-slate-700">{cart[item.id]}</span>
                          <button onClick={() => addItem(item.id)} className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center hover:bg-teal-600"><Plus className="h-4 w-4 text-white" /></button>
                        </>
                      ) : (
                        <button onClick={() => addItem(item.id)} className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center hover:bg-teal-600"><Plus className="h-4 w-4 text-white" /></button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              <Button onClick={() => setView('payment')} disabled={totalItems === 0} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50">
                選好餐點，結帳 ({totalItems}項 / ${totalFoodPrice})
              </Button>
            </div>
          </div>
        )}

        {/* View: 個人付款畫面 */}
        {view === 'payment' && (
          <div className="p-4 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
            <h2 className="font-bold text-slate-800 mb-3 px-1">您的餐點明細</h2>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
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

            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 mb-6 flex items-start">
              <Info className="h-5 w-5 mr-2 shrink-0 text-teal-600" />
              <p className="text-xs text-teal-800 leading-relaxed">外送費將於所有人結帳完畢後，由系統自動均分。<br/>請先完成授權圈存，<strong className="text-teal-600">目前暫不扣款</strong>。</p>
            </div>

            <h2 className="font-bold text-slate-800 mb-3 px-1">選擇付款方式</h2>
            <button className="w-full p-4 rounded-xl border-2 border-teal-500 bg-teal-50 flex items-center gap-3 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">限時活動</div>
              <div className="h-10 w-10 rounded-full bg-[#1CA2D8] flex items-center justify-center shrink-0"><CreditCard className="h-5 w-5 text-white" /></div>
              <div className="text-left flex-1"><p className="font-bold text-slate-800">icash Pay (授權圈存)</p><p className="text-xs text-slate-500 mt-0.5">餘額 $840</p></div>
              <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>
            </button>

            <div className="mt-auto pt-4">
              <Button onClick={handlePayment} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-7 rounded-xl text-xl shadow-lg shadow-teal-500/30 active:scale-95 transition-transform">
                確認授權圈存 (${totalFoodPrice})
              </Button>
            </div>
          </div>
        )}

        {/* View: 房間付款狀態追蹤與控制 */}
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
              <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-md">目前外送費: ${feePerPerson} / 人</span>
            </div>

            <div className="space-y-3 mb-8">
              {members.map(m => (
                <div key={m.id} className={`bg-white p-4 rounded-2xl shadow-sm border transition-all duration-300 ${m.isPaid ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200"><User className="h-5 w-5 text-slate-500" /></div>
                        <div className={`absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${m.isPaid ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-sm flex items-center">{m.name} {m.isHost && <Crown className="h-3 w-3 text-amber-500 ml-1" />}</span>
                        <span className={`text-xs font-bold ${m.isPaid ? 'text-emerald-600' : 'text-red-500'}`}>{m.statusText}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800">${m.amount + feePerPerson}</p><p className="text-[10px] text-slate-400">含外送費 ${feePerPerson}</p>
                    </div>
                  </div>
                  {role === 'host' && !m.isPaid && !m.isHost && (
                    <div className="flex gap-2 border-t border-red-100 pt-3 mt-1">
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
                  {!allPaid && <Button onClick={handleSimulateAllPaid} variant="outline" className="w-full mb-3 border-teal-500 text-teal-600 font-bold hover:bg-teal-50">展示按鈕：模擬所有人已付款</Button>}
                  <Button onClick={() => setView('success')} disabled={!allPaid} className={`w-full font-bold py-6 rounded-xl text-lg transition-all ${!allPaid ? 'bg-slate-200 text-slate-400' : 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/30'}`}>全員確認完畢，送出訂單</Button>
                </>
              ) : (
                <Button onClick={() => setView('success')} variant="outline" className="w-full border-slate-300 text-slate-600 font-bold hover:bg-slate-50">展示按鈕：模擬主揪送出訂單</Button>
              )}
            </div>
          </div>
        )}

        {view === 'success' && (
          <div className="p-6 flex flex-col items-center justify-start h-full animate-in zoom-in-95 duration-500 overflow-y-auto pb-20">
            <div className="mb-6 mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 shadow-inner"><CheckCircle2 className="h-12 w-12 text-teal-600" /></div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">揪團訂單已送出！</h2>
            <p className="text-slate-500 text-center mb-8 font-medium">預計於 <span className="text-teal-600 font-bold">12:30</span> 送達台科大</p>

            <div className="w-full bg-white rounded-3xl p-5 shadow-xl border border-red-100 relative overflow-hidden mb-8">
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

function ReferralScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <BackButton onClick={onBack} />
        <h1 className="mt-3 text-lg font-bold text-center">老拉新送泡麵</h1>
      </div>
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <p className="text-center text-foreground font-medium mb-6">邀請同學掃碼，雙方各得一碗來一客！</p>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="w-48 h-48 bg-foreground rounded-lg flex items-center justify-center relative">
            <div className="absolute inset-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`} />
              ))}
            </div>
            <QrCode className="h-12 w-12 text-white/20 absolute" />
          </div>
        </div>
        <div className="mt-6 p-3 bg-[var(--op-orange)]/10 rounded-xl w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">進度</span>
            <span className="text-sm font-medium text-[var(--op-orange)]">1/3 已邀請</span>
          </div>
          <Progress value={33} className="h-2 mt-2" />
        </div>
      </div>
      <div className="p-4 border-t">
        <Button onClick={handleCopy} className="w-full bg-[var(--op-orange)] hover:bg-[var(--op-orange)]/90 text-white">
          {copied ? <><Check className="mr-2 h-4 w-4" />已複製！</> : <><Copy className="mr-2 h-4 w-4" />複製專屬邀請連結</>}
        </Button>
      </div>
    </div>
  )
}

function NavPayUnlockScreen({ onUnlock, onBack }: { onUnlock: () => void; onBack: () => void }) {
  return (
    <div className="relative flex flex-col h-full bg-gray-900">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
            <X className="h-5 w-5" />
            <span className="text-sm">關閉</span>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative mb-8">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[var(--op-orange)]/20 to-orange-500/20 flex items-center justify-center animate-pulse">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[var(--op-orange)]/30 to-orange-500/30 flex items-center justify-center">
                <Fingerprint className="h-16 w-16 text-[var(--op-orange)]" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-[var(--op-orange)]/10 blur-2xl -z-10" />
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-2">開啟付款碼前</h2>
          <p className="text-white/60 text-center text-sm mb-8">請進行生物辨識驗證</p>
          <Button onClick={onUnlock} className="bg-gradient-to-r from-[var(--op-orange)] to-orange-500 hover:from-[var(--op-orange)]/90 hover:to-orange-600 text-white font-semibold px-8 py-6 text-base rounded-2xl shadow-lg shadow-orange-500/25">
            <Fingerprint className="mr-2 h-5 w-5" />
            點擊模擬解鎖成功
          </Button>
        </div>
        <div className="p-6 text-center">
          <p className="text-white/40 text-xs">支援 Face ID / Touch ID / 指紋辨識</p>
        </div>
      </div>
    </div>
  )
}

function NavPayBarcodeScreen({ onBack }: { onBack: () => void }) {
  const [pointsToUse, setPointsToUse] = useState("")
  const maxPoints = 1250
  return (
    <div className="flex flex-col h-full bg-muted/50">
      <div className="p-4 bg-card border-b flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-lg font-bold text-foreground">付款</h1>
        <div className="flex items-center gap-1 text-amber-500">
          <Sun className="h-4 w-4" />
          <span className="text-xs">亮度提升</span>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">手機條碼載具</h2>
            <div className="bg-white rounded-xl p-3">
              <div className="h-14 bg-foreground rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-y-2 left-3 right-3 flex gap-[2px]">
                  {Array.from({ length: 35 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
                </div>
                <Barcode className="h-5 w-5 text-white/10 absolute" />
              </div>
              <p className="text-xs text-center mt-2 font-mono text-muted-foreground">/AB12345</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">icash Pay 付款碼</h2>
            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-center mb-4">
                <div className="w-44 h-44 bg-foreground rounded-xl flex items-center justify-center relative">
                  <div className="absolute inset-4 grid grid-cols-9 gap-[2px]">
                    {Array.from({ length: 81 }).map((_, i) => <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.45 ? 'bg-white' : 'bg-transparent'}`} />)}
                  </div>
                  <QrCode className="h-10 w-10 text-white/10 absolute" />
                </div>
              </div>
              <div className="h-16 bg-foreground rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-y-3 left-4 right-4 flex gap-[2px]">
                  {Array.from({ length: 45 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
                </div>
                <Barcode className="h-6 w-6 text-white/10 absolute" />
              </div>
              <p className="text-xs text-center mt-2 font-mono text-muted-foreground">9876 5432 1098 7654 3210</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-foreground mb-1">使用 OPENPOINT 折抵</h2>
            <p className="text-xs text-muted-foreground mb-3">目前餘額: {maxPoints.toLocaleString()} 點</p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--op-orange)] font-bold text-sm">P</span>
                <Input type="number" placeholder="請輸入折抵點數" value={pointsToUse} onChange={(e) => {
                  const val = e.target.value
                  if (val === "" || (Number(val) >= 0 && Number(val) <= maxPoints)) setPointsToUse(val)
                }} className="pl-8" />
              </div>
              <Button variant="outline" size="sm" onClick={() => setPointsToUse(maxPoints.toString())} className="whitespace-nowrap text-[var(--op-orange)] border-[var(--op-orange)] hover:bg-[var(--op-orange)]/10">全額折抵</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">1 點 = 1 元，最高可折抵該筆消費 100%</p>
            {pointsToUse && Number(pointsToUse) > 0 && (
              <div className="mt-3 p-2 bg-[var(--op-orange)]/10 rounded-lg">
                <p className="text-xs text-[var(--op-orange)]">本次將折抵 ${Number(pointsToUse).toLocaleString()} 元</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="p-4 bg-card border-t text-center">
        <p className="text-sm text-muted-foreground">請出示此畫面給店員掃描</p>
      </div>
    </div>
  )
}

function FastPassUnlockScreen({ onUnlock, onBack }: { onUnlock: () => void; onBack: () => void }) {
  return (
    <div className="relative flex flex-col h-full bg-gray-900">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">返回</span>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative mb-8">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center animate-pulse">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30 flex items-center justify-center">
                <Fingerprint className="h-16 w-16 text-amber-400" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl -z-10" />
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-2">為保護您的資產</h2>
          <p className="text-white/60 text-center text-sm mb-8">請進行生物辨識驗證</p>
          <Button onClick={onUnlock} className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold px-8 py-6 text-base rounded-2xl shadow-lg shadow-orange-500/25">
            <Fingerprint className="mr-2 h-5 w-5" />
            點擊模擬解鎖成功
          </Button>
        </div>
        <div className="p-6 text-center">
          <p className="text-white/40 text-xs">支援 Face ID / Touch ID / 指紋辨識</p>
        </div>
      </div>
    </div>
  )
}

function FastPassBarcodeScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">返回</span>
        </button>
        <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
          <Sun className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs text-white/80">螢幕已調至最亮</span>
        </div>
      </div>
      <div className="text-center py-2">
        <h1 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          OP Fast-Pass
        </h1>
      </div>
      <div className="flex-1 px-4 py-4 overflow-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-2xl shadow-amber-500/10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-500/10 blur-2xl" />
          <div className="relative p-5">
            <div className="flex justify-center mb-4">
              <Badge className="bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30 text-amber-300 px-4 py-1">
                <Crown className="mr-1.5 h-3.5 w-3.5" />
                台科大校園會員專屬
              </Badge>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4">
              <div className="mb-4">
                <div className="h-20 bg-foreground rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-y-3 left-3 right-3 flex gap-[2px]">
                    {Array.from({ length: 50 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
                  </div>
                  <Barcode className="h-8 w-8 text-white/10 absolute" />
                </div>
                <p className="text-xs text-center mt-2 font-mono text-gray-600">4711 8823 0987 6543 2109</p>
              </div>
              <div className="flex justify-center">
                <div className="w-36 h-36 bg-foreground rounded-xl flex items-center justify-center relative">
                  <div className="absolute inset-3 grid grid-cols-8 gap-[2px]">
                    {Array.from({ length: 64 }).map((_, i) => <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.45 ? 'bg-white' : 'bg-transparent'}`} />)}
                  </div>
                  <QrCode className="h-10 w-10 text-white/10 absolute" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl p-3 mb-4">
              <div className="flex items-center justify-center gap-2 text-emerald-400">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">會員累點 / 發票載具 / icash Pay 已整合</span>
              </div>
              <p className="text-center text-xs text-emerald-300/70 mt-1">一碼支付，三重功能</p>
            </div>
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-3 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-white" />
              <span className="text-white font-bold">專用道特權：本次結帳享 85 折優惠</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <div className="flex flex-col items-center gap-2 text-white/50">
          <p className="text-sm">請將螢幕靠近 X-Store 自助機台掃描口</p>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </div>
  )
}

function SevenPointsScreen({ onBack }: { onBack: () => void }) {
  const campaigns = [
    { id: 1, title: "哈利波特 25 周年集點活動", period: "2026/02/25 ~ 2026/05/04", points: 1, hasPoints: true },
    { id: 2, title: "瑜你星動集點GO", period: "2026/03/18 ~ 2026/04/28", hasPoints: false },
    { id: 3, title: "安心取件帳單繳費集點GO", period: "2026/03/18 ~ 2026/05/26", hasPoints: false },
  ]
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="p-4 bg-card border-b flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-foreground">小7集點卡</h1>
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors"><History className="h-5 w-5" /></button>
          <button className="text-muted-foreground hover:text-foreground transition-colors"><Ticket className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-auto pb-32">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-semibold text-foreground text-sm">{campaign.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{campaign.period}</p>
              </div>
              {campaign.hasPoints ? (
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[var(--op-orange)]" />
                  <Badge className="bg-[var(--op-orange)] text-white border-0 font-bold">點 x {campaign.points}</Badge>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="text-xs">開始集點</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-4 bg-card border-t">
        <div className="rounded-xl bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 p-4 text-center">
          <p className="text-white font-bold text-sm">J&apos;code 真愛密碼 門市快閃購</p>
          <p className="text-white/80 text-xs mt-1">限時特惠中</p>
        </div>
      </div>
    </div>
  )
}

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
    <div className="flex flex-col h-full bg-muted/30">
      <div className="p-4 bg-card border-b flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-foreground">我的 OPENPOINT</h1>
        <div className="w-10" />
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        <Card className="border-0 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-white/80 text-sm mb-1">可用點數</p>
            <p className="text-5xl font-bold text-white mb-2">1,250</p>
            <p className="text-white/70 text-xs">年底將到期：50 點</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button key={index} className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
                <div className="h-12 w-12 rounded-full bg-[var(--op-orange)]/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[var(--op-orange)]" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            )
          })}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">校園熱門兌換</h2>
          <div className="space-y-2">
            {exchangeItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <Button size="sm" className="bg-[var(--op-orange)] hover:bg-[var(--op-orange)]/90 text-white text-xs">
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
    { id: 3, name: "黑糖珍珠撞奶 6 杯", price: 320, originalPrice: 480, discount: "67折", image: "boba" },
    { id: 4, name: "茶葉蛋 10 顆優惠組", price: 80, originalPrice: 100, discount: "8折", image: "egg" },
  ]
  const addToCart = () => setCartCount(prev => prev + 1)
  
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="p-4 bg-card border-b flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-foreground">行動隨時取</h1>
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors"><Receipt className="h-5 w-5" /></button>
          <button className="text-muted-foreground hover:text-foreground transition-colors"><TicketCheck className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="px-4 py-3 bg-card border-b">
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-purple-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto pb-24">
        <div className="p-4">
          <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <Badge className="bg-white/20 text-white border-0 mb-2">期中考神隊友</Badge>
              <h2 className="text-white font-bold text-lg">CITY CAFE 大杯美式</h2>
              <p className="text-white/90 text-sm">買 10 送 10</p>
            </div>
          </div>
        </div>
        <div className="px-4 grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 text-xs">{product.discount}</Badge>
                  <Coffee className="h-12 w-12 text-purple-400" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-500 font-bold">${product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                    </div>
                    <button onClick={addToCart} className="h-7 w-7 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-colors">
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
        <button className="relative flex items-center justify-center h-14 w-14 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-all hover:scale-105 active:scale-95">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
    </div>
  )
}

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
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-gradient-to-r from-violet-500 to-purple-500">
        <BackButton onClick={onBack} />
        <h1 className="mt-3 text-lg font-bold text-center text-white">校園 i珍食雷達</h1>
      </div>
      <div className="mx-4 mt-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">65% OFF 珍食時段進行中</span>
        <div className="animate-pulse"><Clock className="h-5 w-5 text-white" /></div>
      </div>
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filters.map((filter) => (
            <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === filter.id ? "bg-purple-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"}`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-4 pb-24 space-y-4 overflow-auto">
        {stores.map((store) => (
          <Card key={store.id} className="border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{store.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>距離 {store.distance}</span>
                </div>
              </div>
              <div className="divide-y">
                {store.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-purple-600 font-bold">${item.price}</span>
                        <span className="text-xs text-muted-foreground line-through">${item.originalPrice}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${item.stock <= 2 ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>剩 {item.stock} 份</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-24 right-4 max-w-[400px]">
        <button className="flex flex-col items-center gap-1 bg-purple-500 text-white rounded-full p-3 shadow-lg hover:bg-purple-600 transition-all hover:scale-105 active:scale-95">
          <Map className="h-6 w-6" />
        </button>
        <span className="block text-center text-[10px] text-muted-foreground mt-1">地圖模式</span>
      </div>
    </div>
  )
}

const screensWithoutBottomNav: ScreenType[] = [
  'print',
  'foodomo', 
  'fast_pass_unlock', 'fast_pass_barcode',
  'nav_pay_unlock', 'nav_pay_barcode'
]

export function HomeInteractive() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home')
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [countdown, setCountdown] = useState("00:58:12")

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const [h, m, s] = prev.split(":").map(Number)
        let totalSeconds = h * 3600 + m * 60 + s - 1
        if (totalSeconds < 0) totalSeconds = 3492
        const newH = Math.floor(totalSeconds / 3600)
        const newM = Math.floor((totalSeconds % 3600) / 60)
        const newS = totalSeconds % 60
        return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}:${String(newS).padStart(2, "0")}`
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleShortcutClick = (action: string | null) => {
    if (action === 'print') setActiveScreen('print')
    else if (action === 'coupons') setActiveScreen('coupons')
    else if (action === 'campus_pay') setActiveScreen('campus_pay')
    else if (action === 'fast_pass') setActiveScreen('nav_pay_unlock')
    else if (action === 'mobile_pickup') setActiveScreen('mobile_pickup')
    else if (action === 'powerbank') setActiveScreen('powerbank_map')
    else if (action === 'foodomo') setActiveScreen('foodomo') 
  }

  const handleHeroButtonClick = (action: string | null) => {
    if (action === 'claim_coupon') setShowCouponModal(true)
    else if (action === 'foodomo') setActiveScreen('foodomo')
    else if (action === 'ifood_radar') setActiveScreen('ifood_radar')
  }

  const goHome = () => setActiveScreen('home')
  const showBottomNav = !screensWithoutBottomNav.includes(activeScreen)

  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'print': return <OPPrintScreen setActiveScreen={setActiveScreen} />
      case 'coupons': return <CouponsScreen onBack={goHome} />
      case 'referral': return <ReferralScreen onBack={goHome} />
      case 'campus_pay': return <CampusPayScreen onBack={goHome} />
      case 'foodomo': return <FoodomoGroupScreen setActiveScreen={setActiveScreen} />
      case 'ifood_radar': return <IFoodRadarScreen onBack={goHome} />
      case 'fast_pass_unlock': return <FastPassUnlockScreen onUnlock={() => setActiveScreen('fast_pass_barcode')} onBack={goHome} />
      case 'fast_pass_barcode': return <FastPassBarcodeScreen onBack={goHome} />
      case 'nav_pay_unlock': return <NavPayUnlockScreen onUnlock={() => setActiveScreen('nav_pay_barcode')} onBack={goHome} />
      case 'nav_pay_barcode': return <PayBarcodeScreen setActiveScreen={setActiveScreen} />
      case 'mobile_pickup': return <MobilePickupScreen onBack={goHome} />
      case 'op_points': return <OPPointsScreen onBack={goHome} />
      case 'seven_points': return <SevenPointsScreen onBack={goHome} />
      case 'powerbank_map': return <PowerBankMapScreen setActiveScreen={setActiveScreen} />
      case 'package_service': return <PackageServiceScreen setActiveScreen={setActiveScreen} />
      case 'home':
      default:
        return (
          <>
            <AppHeader 
              onOPPointsClick={() => setActiveScreen('op_points')}
              onSevenPointsClick={() => setActiveScreen('seven_points')}
              onMobilePickupClick={() => setActiveScreen('mobile_pickup')}
            />
            <main className="pb-24">
              <section className="px-4 py-3">
                <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {heroCards.map((card) => {
                    const Icon = card.icon
                    return (
                      <Card key={card.id} className={`min-w-[240px] flex-shrink-0 cursor-pointer border-0 bg-gradient-to-br ${card.gradient} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}>
                        <CardContent className="p-4 text-white h-32 flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge className="bg-white/25 text-white backdrop-blur-sm border-0 text-xs mb-1">
                                {card.id === "night" && <Percent className="mr-1 h-3 w-3" />}
                                {card.badge}
                              </Badge>
                              <h3 className="text-lg font-bold leading-tight">{card.title}</h3>
                              <p className="text-xs opacity-90">{card.subtitle}</p>
                            </div>
                            <div className="rounded-full bg-white/25 p-2 backdrop-blur-sm"><Icon className="h-5 w-5" /></div>
                          </div>
                          <div className="flex items-center justify-between">
                            {card.hasCountdown ? (
                              <div className="flex items-center gap-1.5 rounded-md bg-white/20 px-2 py-1 backdrop-blur-sm">
                                <Clock className="h-3 w-3" />
                                <span className="font-mono text-sm font-bold">{countdown}</span>
                              </div>
                            ) : <div />}
                            <Button className="h-7 bg-white text-gray-800 hover:bg-white/90 font-semibold text-xs px-3" size="sm" onClick={() => handleHeroButtonClick(card.action)}>
                              {card.buttonText}
                              <ChevronRight className="ml-0.5 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              <section className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-foreground">我的常用功能</h2>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Settings className="h-3.5 w-3.5" /><span>/</span><Search className="h-3.5 w-3.5" /><span>設定</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {shortcuts.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <button key={index} onClick={() => handleShortcutClick(item.action)} className="group flex flex-col items-center gap-1.5 rounded-xl bg-card p-2.5 transition-all hover:bg-muted hover:shadow-sm active:scale-95">
                        <div className={`rounded-xl ${item.color} p-2.5 transition-transform group-hover:scale-110`}><Icon className="h-5 w-5" /></div>
                        <span className="text-[11px] font-medium text-foreground leading-tight text-center">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="px-4 py-3">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-[var(--op-orange)]" />
                  <h2 className="text-sm font-semibold text-foreground">校園任務與獎勵</h2>
                </div>
                <Card className="border-0 bg-gradient-to-r from-[var(--op-orange)]/5 to-[var(--op-orange)]/10 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer" onClick={() => setActiveScreen('referral')}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[var(--op-orange)] p-2.5 text-white shadow-md flex-shrink-0"><Gift className="h-5 w-5" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-foreground text-sm">老拉新送泡麵</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">Referral Noodle Challenge</p>
                        <div className="space-y-1.5">
                          <Progress value={33} className="h-1.5 bg-gray-200" />
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground">1/3 Friends Invited</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[var(--op-orange)]/10 text-[var(--op-orange)]">+1 Free Noodle Pack</Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </section>
            </main>
            {showCouponModal && (
              <CouponModal 
                onClose={() => setShowCouponModal(false)} 
                onGoToCoupons={() => { 
                  setShowCouponModal(false); 
                  setActiveScreen('coupons'); 
                }} 
              />
            )}
          </>
        )
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-background">
      <div className="relative min-h-screen overflow-hidden bg-muted/30 shadow-2xl">
        {renderScreenContent()}
        {showBottomNav && (
          <BottomNav 
            activeTab="home" 
            onPayClick={() => setActiveScreen('nav_pay_unlock')}
          />
        )}
      </div>
    </div>
  )
}