'use client';

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { InteractiveResourceMatchmaker } from '../components/InteractiveResourceMatchmaker';
import { RoleBasedPathsSection } from '../components/RoleBasedPathsSection';
import { CooperationCalculator } from '../components/CooperationCalculator';
import { PillarsSection } from '../components/PillarsSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { OpportunitiesSection } from '../components/OpportunitiesSection';
import { SuccessStoriesSection } from '../components/SuccessStoriesSection';
import { CommunityValuesSection } from '../components/CommunityValuesSection';
import { CtaSection } from '../components/CtaSection';
import { Footer } from '../components/Footer';
import { OpportunityDetailModal } from '../components/OpportunityDetailModal';
import { PostDemandModal } from '../components/PostDemandModal';
import { AuthModal } from '../components/AuthModal';
import { CommunityPrinciplesModal } from '../components/CommunityPrinciplesModal';
import { MemberHubModal } from '../components/MemberHubModal';
import { CommercialDealRoom } from '../components/CommercialDealRoom';
import { MarketPulseTicker } from '../components/MarketPulseTicker';
import { IndustryInsightsSection } from '../components/IndustryInsightsSection';
import { LegalTemplatesModal } from '../components/LegalTemplatesModal';
import { BusinessRolodexModal } from '../components/BusinessRolodexModal';
import { INITIAL_OPPORTUNITIES, OpportunityItem } from '../data/opportunitiesData';
import { INITIAL_INDUSTRY_INSIGHTS } from '../data/industryInsightsData';

export default function HomePage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(INITIAL_OPPORTUNITIES);
  const [activeHeroTab, setActiveHeroTab] = useState<'project' | 'resource' | 'space' | 'partner'>('project');
  const [selectedOpportunityCategory, setSelectedOpportunityCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Deal Room Prompt State from Industry Insights or Cooperation Calculator
  const [dealRoomPrompt, setDealRoomPrompt] = useState<{
    partyAResources: string;
    partyBResources: string;
    dealType: string;
    targetGoal: string;
  } | null>(null);

  // Authentication & Hub state
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [memberHubState, setMemberHubState] = useState<{
    isOpen: boolean;
    tab: 'opportunities' | 'invitations' | 'messages';
  }>({
    isOpen: false,
    tab: 'opportunities',
  });

  // Modals state
  const [activeDetailItem, setActiveDetailItem] = useState<OpportunityItem | null>(null);
  const [isPostDemandOpen, setIsPostDemandOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [isRolodexOpen, setIsRolodexOpen] = useState<boolean>(false);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'register',
  });
  const [principlesModalState, setPrinciplesModalState] = useState<{
    isOpen: boolean;
    defaultTab: 'principles' | 'support' | 'terms' | 'privacy';
  }>({
    isOpen: false,
    defaultTab: 'principles',
  });

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user?.displayName) {
        setLoggedInUser(user.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time synchronization with Firestore opportunities
  useEffect(() => {
    try {
      const oppsRef = collection(db, 'opportunities');
      const q = query(oppsRef);
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const firestoreItems: OpportunityItem[] = snapshot.docs.map((docSnap) => {
              const d = docSnap.data();
              const cat = (['project', 'resource', 'space', 'partner'].includes(d.category)
                ? d.category
                : 'project') as OpportunityItem['category'];
              const categoryLabels: Record<OpportunityItem['category'], OpportunityItem['categoryLabel']> = {
                project: 'Dự án & ý tưởng',
                resource: 'Nguồn lực hợp tác',
                space: 'Không gian chia sẻ',
                partner: 'Cộng đồng chuyên môn',
              };
              return {
                id: docSnap.id,
                category: cat,
                categoryLabel: categoryLabels[cat] || 'Dự án & ý tưởng',
                title: d.title || 'Cơ hội hợp tác mới',
                location: d.location || 'Toàn quốc',
                resourceHighlight: d.reward || 'Nguồn lực sẵn có',
                cooperationType: d.scale || 'Hợp tác cùng phát triển',
                imageUrl:
                  d.imageUrl ||
                  (cat === 'space'
                    ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
                    : 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'),
                whatIHave: d.whatIHave || 'Có ý tưởng và nguồn lực ban đầu',
                whatINeed: d.whatINeed || 'Tìm cộng sự và đối tác cùng triển khai',
                detailedDescription: d.description || d.title,
                creatorName: d.ownerName || 'Thành viên Cùng Làm',
                creatorRole: 'Người khởi tạo',
                createdTime: 'Mới cập nhật',
                isBookmarked: false,
                ownerId: d.ownerId,
                status: d.status || 'active',
              };
            });

            // Merge firestore items with initial opportunities
            const existingIds = new Set(firestoreItems.map((item) => item.id));
            const filteredInitial = INITIAL_OPPORTUNITIES.filter((item) => !existingIds.has(item.id));
            setOpportunities([...firestoreItems, ...filteredInitial]);
          }
        },
        (error) => {
          console.warn('Lỗi lắng nghe opportunities từ Firestore:', error);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Khởi tạo Firestore listener thất bại:', err);
    }
  }, []);

  // User notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Search submission handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeHeroTab) {
      setSelectedOpportunityCategory(activeHeroTab);
    }
    scrollToSection('opportunities');
  };

  // Tag click shortcut handler
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    if (tag.includes('kinh doanh') || tag.includes('cà phê') || tag.includes('F&B')) {
      setSelectedOpportunityCategory('project');
    } else if (tag.includes('văn phòng') || tag.includes('mặt bằng') || tag.includes('kho')) {
      setSelectedOpportunityCategory('space');
    } else if (tag.includes('nguồn lực') || tag.includes('sản xuất') || tag.includes('vốn')) {
      setSelectedOpportunityCategory('resource');
    } else {
      setSelectedOpportunityCategory('partner');
    }
    scrollToSection('opportunities');
  };

  // Hero Pillar click handler
  const handleSelectPillar = (category: 'project' | 'resource' | 'space' | 'partner') => {
    setActiveHeroTab(category);
    setSelectedOpportunityCategory(category);
    scrollToSection('opportunities');
  };

  // Bookmark toggle
  const handleBookmarkToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpportunities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newState = !item.isBookmarked;
          showToast(newState ? 'Đã lưu cơ hội vào danh sách quan tâm' : 'Đã bỏ lưu cơ hội');
          return { ...item, isBookmarked: newState };
        }
        return item;
      })
    );
  };

  // Handler strictly enforcing mandatory authentication before opening PostDemand modal
  const handleOpenPostDemandSafe = () => {
    if (!firebaseUser && !loggedInUser) {
      showToast('Vui lòng đăng nhập tài khoản để chia sẻ cơ hội & đăng nguồn lực.');
      setAuthModalState({ isOpen: true, mode: 'login' });
      return;
    }
    setIsPostDemandOpen(true);
  };

  // Handler strictly enforcing mandatory authentication before opening Rolodex (tied to each user)
  const handleOpenRolodexSafe = () => {
    if (!firebaseUser && !loggedInUser) {
      showToast('Tính năng Sổ Danh Bạ & Danh Thiếp B2B bắt buộc đăng nhập vì quản lý theo từng người dùng.');
      setAuthModalState({ isOpen: true, mode: 'login' });
      return;
    }
    setIsRolodexOpen(true);
  };

  // Add new opportunity
  const handleAddOpportunity = (newItem: OpportunityItem) => {
    setOpportunities([newItem, ...opportunities]);
    setSelectedOpportunityCategory('all');
    showToast('Nguồn lực của bạn đã được chia sẻ thành công!');
    setTimeout(() => {
      scrollToSection('opportunities');
    }, 300);
  };

  // Select sample card from Hero
  const handleSelectHeroCard = (sampleId: string) => {
    const found = opportunities.find((o) => o.id === sampleId);
    if (found) {
      setActiveDetailItem(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#FF2D55] selection:text-white flex flex-col">
      
      {/* Header */}
      <Navbar
        userName={loggedInUser}
        onLogout={() => {
          setLoggedInUser(null);
          setFirebaseUser(null);
          showToast('Bạn đã đăng xuất tài khoản.');
        }}
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onOpenMemberHub={(tab) => setMemberHubState({ isOpen: true, tab: tab || 'opportunities' })}
        onOpenPostDemand={handleOpenPostDemandSafe}
        onOpenRolodex={handleOpenRolodexSafe}
        onNavigateSection={(id) => {
          if (id === 'about-us') scrollToSection('about-us');
          else if (id === 'legal') setIsLegalModalOpen(true);
          else if (id === 'matchmaker') scrollToSection('matchmaker');
          else if (id === 'calculator') scrollToSection('cooperation-calculator');
          else scrollToSection(id);
        }}
      />

      {/* Real-time Market Pulse Ticker */}
      <MarketPulseTicker
        insights={INITIAL_INDUSTRY_INSIGHTS}
        onSelectInsight={() => {
          scrollToSection('industry-insights');
        }}
        onExploreAll={() => scrollToSection('industry-insights')}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section with Sharper Value Prop & Quick Shortcuts */}
        <HeroSection
          activeHeroTab={activeHeroTab}
          setActiveHeroTab={(tab) => {
            setActiveHeroTab(tab);
            setSelectedOpportunityCategory(tab);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onTagClick={handleTagClick}
          onSelectCard={handleSelectHeroCard}
          onOpenPostDemand={handleOpenPostDemandSafe}
          onScrollToMatchmaker={() => scrollToSection('matchmaker')}
          onScrollToRoles={() => scrollToSection('role-paths')}
          onOpenLegalTemplates={() => setIsLegalModalOpen(true)}
          onOpenRolodex={handleOpenRolodexSafe}
        />

        {/* 2. Bản Tin & Xu Hướng Thị Trường B2B (Industry Insights & Market Intelligence) */}
        <IndustryInsightsSection
          onOpenDealRoomWithPrompt={(prompt) => {
            setDealRoomPrompt(prompt);
            scrollToSection('deal-room');
            showToast('Đã nạp dữ liệu thương vụ vào Phòng Giao Thương!');
          }}
          onOpenPostDemand={handleOpenPostDemandSafe}
          onExploreOpportunities={(cat) => {
            if (cat) setSelectedOpportunityCategory(cat);
            scrollToSection('opportunities');
          }}
        />

        {/* 3. Interactive Matchmaker 60s (Tôi Có Gì - Tôi Cần Gì) */}
        <section id="matchmaker" className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6">
          <InteractiveResourceMatchmaker
            opportunities={opportunities}
            onSelectOpportunity={(opp) => setActiveDetailItem(opp)}
            onPostDemand={handleOpenPostDemandSafe}
          />
        </section>

        {/* 4. 4 Lối Đi Thực Chiến Cho Người Mới (Role-Based Onboarding Paths) */}
        <RoleBasedPathsSection
          onSelectRolePath={(category) => {
            setSelectedOpportunityCategory(category);
            scrollToSection('opportunities');
            showToast(`Đã lọc các cơ hội theo nhóm: ${category}`);
          }}
          onOpenCalculator={() => scrollToSection('cooperation-calculator')}
        />

        {/* 5. Máy Tính Tỷ Lệ Chia Doanh Thu & Dòng Tiền (Cooperation ROI Calculator) */}
        <CooperationCalculator
          onTransferToDealRoom={(promptText) => {
            setDealRoomPrompt({
              partyAResources: 'Tài sản / Mặt bằng / Vốn góp của tôi',
              partyBResources: 'Thương hiệu, quy trình vận hành và hệ thống bán lẻ POS',
              dealType: 'Hợp tác kinh doanh (BCC) chia sẻ doanh thu',
              targetGoal: promptText,
            });
            scrollToSection('deal-room');
            showToast('Đã nạp số liệu tính toán vào Phòng Đàm Phán!');
          }}
        />

        {/* 6. Giá trị cốt lõi (4 Pillars Bar) */}
        <PillarsSection onSelectCategory={handleSelectPillar} />

        {/* 7. Cách hoạt động (4 Steps) */}
        <HowItWorksSection />

        {/* 8. Những cơ hội đang được chia sẻ (Opportunities Pool) */}
        <OpportunitiesSection
          opportunities={opportunities}
          selectedCategory={selectedOpportunityCategory}
          onSelectCategory={(cat) => setSelectedOpportunityCategory(cat)}
          onBookmarkToggle={handleBookmarkToggle}
          onSelectOpportunity={(opp) => setActiveDetailItem(opp)}
          onViewAll={() => {
            setSelectedOpportunityCategory('all');
            scrollToSection('opportunities');
          }}
        />

        {/* 9. Phòng Giao Thương B2B & Chốt Hợp Tác (Commercial Deal Room) */}
        <section id="deal-room">
          <CommercialDealRoom initialPrompt={dealRoomPrompt} />
        </section>

        {/* 10. Câu chuyện thành công (Success Stories) */}
        <SuccessStoriesSection
          onViewAll={() => {
            scrollToSection('community-values');
          }}
        />

        {/* 11. Giá trị cộng đồng (Community Values) */}
        <CommunityValuesSection />

        {/* 12. CTA Banner */}
        <CtaSection
          onJoinCommunity={() => setAuthModalState({ isOpen: true, mode: 'register' })}
          onExploreOpportunities={() => scrollToSection('opportunities')}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={(id) => {
          if (id === 'legal') setIsLegalModalOpen(true);
          else scrollToSection(id);
        }}
        onSelectCategory={(cat) => handleSelectPillar(cat)}
        onOpenPrinciples={() => setPrinciplesModalState({ isOpen: true, defaultTab: 'principles' })}
        onOpenSupport={(topic) => {
          const validTab = topic === 'terms' ? 'terms' : topic === 'privacy' ? 'privacy' : 'support';
          setPrinciplesModalState({ isOpen: true, defaultTab: validTab });
        }}
      />

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. Opportunity Detail Modal */}
      <OpportunityDetailModal
        opportunity={activeDetailItem}
        onClose={() => setActiveDetailItem(null)}
        onBookmarkToggle={handleBookmarkToggle}
        currentUser={
          firebaseUser
            ? {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName || 'Thành viên',
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || undefined,
              }
            : null
        }
        onRequireAuth={() => setAuthModalState({ isOpen: true, mode: 'login' })}
      />

      {/* 2. Post Demand Modal */}
      <PostDemandModal
        isOpen={isPostDemandOpen}
        onClose={() => setIsPostDemandOpen(false)}
        onAddOpportunity={handleAddOpportunity}
        currentUser={
          firebaseUser
            ? {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName || loggedInUser || 'Thành viên J-Network',
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || undefined,
              }
            : loggedInUser
            ? {
                uid: `user_${loggedInUser.replace(/\s+/g, '_')}`,
                displayName: loggedInUser,
                email: '',
              }
            : null
        }
        onRequireAuth={() => setAuthModalState({ isOpen: true, mode: 'login' })}
      />

      {/* 3. Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
        onSuccess={(name) => {
          setLoggedInUser(name);
          showToast(`Chào mừng bạn ${name} đã tham gia J-Network!`);
        }}
      />

      {/* 4. Community Principles & Support Modal */}
      <CommunityPrinciplesModal
        isOpen={principlesModalState.isOpen}
        defaultTab={principlesModalState.defaultTab}
        onClose={() => setPrinciplesModalState({ isOpen: false, defaultTab: 'principles' })}
      />

      {/* 5. Member Workspace Hub Modal */}
      <MemberHubModal
        isOpen={memberHubState.isOpen}
        onClose={() => setMemberHubState({ isOpen: false, tab: 'opportunities' })}
        currentUser={
          firebaseUser
            ? {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName || 'Thành viên',
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || undefined,
              }
            : null
        }
        onOpenPostDemand={() => {
          setMemberHubState({ isOpen: false, tab: 'opportunities' });
          handleOpenPostDemandSafe();
        }}
        onSelectOpportunity={(opp) => {
          setMemberHubState({ isOpen: false, tab: 'opportunities' });
          setActiveDetailItem(opp);
        }}
        onOpenRolodex={handleOpenRolodexSafe}
        initialTab={memberHubState.tab}
      />

      {/* 6. Legal & MOU Templates Starter Kit Modal */}
      <LegalTemplatesModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        onToast={showToast}
      />

      {/* 7. Business Rolodex & B2B Dynamic Digital Card Modal */}
      <BusinessRolodexModal
        isOpen={isRolodexOpen}
        onClose={() => setIsRolodexOpen(false)}
        currentUser={
          firebaseUser
            ? {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName || 'Thành viên',
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || undefined,
              }
            : loggedInUser
            ? {
                uid: `user_${loggedInUser.replace(/\s+/g, '_')}`,
                displayName: loggedInUser,
                email: '',
              }
            : null
        }
        onRequireAuth={() => {
          setIsRolodexOpen(false);
          setAuthModalState({ isOpen: true, mode: 'login' });
        }}
        onOpenDealRoomWithPrompt={(prompt) => {
          setDealRoomPrompt(prompt);
          scrollToSection('deal-room');
          showToast('Đã nạp thông tin đối tác vào Phòng Giao Thương!');
        }}
      />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
