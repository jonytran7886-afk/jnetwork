'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Phone,
  MessageCircle,
  Mail,
  Download,
  Share2,
  Building2,
  MapPin,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  User as UserIcon,
  Copy,
  Check,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { db } from '@/src/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import QRCode from 'qrcode';

interface CardProfile {
  uid: string;
  fullName: string;
  position: string;
  company: string;
  phone: string;
  zaloPhone: string;
  email: string;
  industry: string;
  location: string;
  avatarUrl?: string;
  bio?: string;
  coreStrengths?: string;
  needs?: string;
  website?: string;
}

export default function PublicCardPage() {
  const params = useParams();
  const rawId = params?.id;
  const uid = Array.isArray(rawId) ? rawId[0] : (rawId as string) || '';

  const [profile, setProfile] = useState<CardProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!uid) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        // 1. Check local storage if visited on same browser
        const local = localStorage.getItem(`jnetwork_my_card_${uid}`);
        if (local) {
          try {
            setProfile(JSON.parse(local));
          } catch (e) {
            console.warn(e);
          }
        }

        // 2. Query Firestore doc
        const ref = doc(db, 'business_cards', uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as CardProfile;
          setProfile(data);
        } else if (!local) {
          // Fallback template for preview
          setProfile({
            uid,
            fullName: 'Thành Viên J-Network',
            position: 'Chủ Doanh Nghiệp / Đại Diện Hợp Tác',
            company: 'Doanh Nghiệp Thành Viên J-Network',
            phone: '0901 234 567',
            zaloPhone: '0901 234 567',
            email: 'contact@jnetwork.vn',
            industry: 'Thương mại & Dịch vụ B2B',
            location: 'Việt Nam',
            coreStrengths: 'Cung cấp nguồn lực, liên kết đối tác và mở rộng kênh phân phối thị trường.',
            needs: 'Tìm kiếm đối tác đồng hành, hợp tác kinh doanh chia sẻ doanh thu (BCC).',
          });
        }
      } catch (err) {
        console.warn('Error loading card profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [uid]);

  // Generate QR Code for sharing
  useEffect(() => {
    if (!uid) return;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://jnetwork.vn/card/${uid}`;
    QRCode.toDataURL(currentUrl, {
      width: 250,
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.warn('QR gen error:', err));
  }, [uid]);

  // Download standard vCard 3.0 (.vcf)
  const handleDownloadVCard = () => {
    if (!profile) return;
    const cleanPhone = (profile.phone || '').replace(/[^0-9+]/g, '');
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN;CHARSET=UTF-8:${profile.fullName}`,
      `N;CHARSET=UTF-8:${profile.fullName};;;;`,
      `ORG;CHARSET=UTF-8:${profile.company}`,
      `TITLE;CHARSET=UTF-8:${profile.position}`,
      `TEL;TYPE=CELL,VOICE:${cleanPhone}`,
      `EMAIL;TYPE=PREF,INTERNET:${profile.email || ''}`,
      `ADR;TYPE=WORK;CHARSET=UTF-8:;;;${profile.location || 'Việt Nam'};;;`,
      `NOTE;CHARSET=UTF-8:Thế mạnh: ${profile.coreStrengths || ''} | Nhu cầu: ${profile.needs || ''} (Lưu từ J-Network B2B Rolodex)`,
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.fullName.replace(/\s+/g, '_')}_contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Danh thiếp số: ${profile?.fullName || 'Thành viên J-Network'}`,
          text: `Liên hệ hợp tác với ${profile?.fullName} (${profile?.company}) trên J-Network:`,
          url,
        });
      } catch (e) {
        // Fallback to copy
        copyUrl(url);
      }
    } else {
      copyUrl(url);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#FF2D55] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-400">Đang tải danh thiếp số...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="text-xl font-bold">Không tìm thấy danh thiếp</h2>
          <p className="text-xs text-slate-400">Liên kết này có thể chưa được kích hoạt hoặc đã được thay đổi.</p>
          <a
            href="/"
            className="inline-block px-5 py-2.5 bg-[#FF2D55] text-white text-xs font-bold rounded-xl"
          >
            Về trang chủ J-Network
          </a>
        </div>
      </div>
    );
  }

  const cleanPhone = (profile.phone || '').replace(/[^0-9]/g, '');
  const cleanZalo = (profile.zaloPhone || profile.phone || '').replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Main Digital Card Card */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2D55]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="flex items-center justify-between gap-2 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FF2D55] flex items-center justify-center text-white font-black text-xs">
                J
              </div>
              <span className="text-xs font-black tracking-wider text-slate-200">J-NETWORK</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>Đối Tác Đã Xác Thực</span>
            </div>
          </div>

          {/* Profile Header */}
          <div className="pt-6 pb-4 flex items-center gap-4">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#FF2D55] to-amber-500 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shrink-0 overflow-hidden border border-white/20">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : (
                profile.fullName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-black text-white truncate tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-xs font-semibold text-rose-400 mt-0.5">
                {profile.position}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{profile.company}</span>
              </div>
              {profile.location && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Primary Action Button: LƯU VÀO DANH BẠ 1 CHẠM */}
          <div className="py-3">
            <button
              onClick={handleDownloadVCard}
              className="w-full py-3.5 bg-gradient-to-r from-[#FF2D55] to-[#E01E45] hover:from-[#E01E45] hover:to-[#C01538] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#FF2D55]/30 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>LƯU VÀO DANH BẠ ĐIỆN THOẠI (1 Chạm)</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-1.5">
              Hỗ trợ tự động thêm vào Danh bạ iPhone (iOS) &amp; Android
            </p>
          </div>

          {/* Quick Connect Action Buttons */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 pb-4">
            {cleanPhone ? (
              <a
                href={`tel:${cleanPhone}`}
                className="py-3 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-colors text-center"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold">Gọi Điện</span>
              </a>
            ) : null}

            {cleanZalo ? (
              <a
                href={`https://zalo.me/${cleanZalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-colors text-center"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold">Nhắn Zalo</span>
              </a>
            ) : null}

            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="py-3 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-colors text-center"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold">Gửi Email</span>
              </a>
            ) : null}
          </div>

          {/* Business Strengths & Needs */}
          <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
            {profile.coreStrengths && (
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-3.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Năng Lực &amp; Thế Mạnh Cốt Lõi:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {profile.coreStrengths}
                </p>
              </div>
            )}

            {profile.needs && (
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-3.5">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Nhu Cầu Tìm Kiếm Hợp Tác:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {profile.needs}
                </p>
              </div>
            )}
          </div>

          {/* QR Code Section */}
          {qrCodeDataUrl && (
            <div className="mt-5 pt-5 border-t border-slate-800 flex items-center gap-4 bg-white/5 rounded-2xl p-3.5">
              <div className="w-20 h-20 bg-white rounded-xl p-1.5 shrink-0 shadow-md">
                <img src={qrCodeDataUrl} alt="Mã QR Danh Thiếp" className="w-full h-full" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="text-xs font-bold text-white">Mã QR Danh Thiếp Số</div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Quét bằng camera điện thoại để mở danh thiếp và lưu liên hệ tức thì.
                </p>
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                  <span>{copied ? 'Đã sao chép link' : 'Chia sẻ danh thiếp'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer of Card */}
          <div className="mt-5 pt-4 text-center border-t border-slate-800/80">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <span>Kết nối &amp; Hợp tác trên J-Network</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF2D55]" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
