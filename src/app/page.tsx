'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
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
import { INITIAL_OPPORTUNITIES, OpportunityItem } from '../data/opportunitiesData';

export default function HomePage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(INITIAL_OPPORTUNITIES);
  const [activeHeroTab, setActiveHeroTab] = useState<'project' | 'resource' | 'space' | 'partner'>('project');
  const [selectedOpportunityCategory, setSelectedOpportunityCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [activeDetailItem, setActiveDetailItem] = useState<OpportunityItem | null>(null);
  const [isPostDemandOpen, setIsPostDemandOpen] = useState<boolean>(false);
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
    if (tag.includes('kinh doanh') || tag.includes('cà phê')) {
      setSelectedOpportunityCategory('project');
    } else if (tag.includes('văn phòng') || tag.includes('không gian')) {
      setSelectedOpportunityCategory('space');
    } else if (tag.includes('nguồn lực') || tag.includes('sản xuất')) {
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
          showToast('Bạn đã đăng xuất tài khoản.');
        }}
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateSection={(id) => {
          if (id === 'about-us') scrollToSection('about-us');
          else scrollToSection(id);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
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
          onOpenPostDemand={() => setIsPostDemandOpen(true)}
        />

        {/* 2. Giá trị cốt lõi (4 Pillars Bar) */}
        <PillarsSection onSelectCategory={handleSelectPillar} />

        {/* 3. Cách hoạt động (4 Steps) */}
        <HowItWorksSection />

        {/* 4. Những cơ hội đang được chia sẻ (Opportunities) */}
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

        {/* 5. Câu chuyện thành công (Success Stories) */}
        <SuccessStoriesSection
          onViewAll={() => {
            scrollToSection('community-values');
          }}
        />

        {/* 6. Giá trị cộng đồng (Community Values) */}
        <CommunityValuesSection />

        {/* 6. CTA Banner */}
        <CtaSection
          onJoinCommunity={() => setAuthModalState({ isOpen: true, mode: 'register' })}
          onExploreOpportunities={() => scrollToSection('opportunities')}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={(id) => scrollToSection(id)}
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
      />

      {/* 2. Post Demand Modal */}
      <PostDemandModal
        isOpen={isPostDemandOpen}
        onClose={() => setIsPostDemandOpen(false)}
        onAddOpportunity={handleAddOpportunity}
      />

      {/* 3. Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ ...authModalState, isOpen: false })}
        onSuccess={(name) => {
          setLoggedInUser(name);
          showToast(`Chào mừng ${name} đến với Cùng Làm!`);
        }}
      />

      {/* 4. Community Principles & Support Modal */}
      <CommunityPrinciplesModal
        isOpen={principlesModalState.isOpen}
        defaultTab={principlesModalState.defaultTab}
        onClose={() => setPrinciplesModalState({ ...principlesModalState, isOpen: false })}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

    </div>
  );
}
