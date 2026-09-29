'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Pillars } from '@/components/sections/Pillars';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { OpportunityList } from '@/components/sections/OpportunityList';
import { CommunityValues } from '@/components/sections/CommunityValues';
import { CtaSection } from '@/components/sections/CtaSection';
import { OpportunityDetailModal } from '@/components/modals/OpportunityDetailModal';
import { ShareOpportunityModal } from '@/components/modals/ShareOpportunityModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { CommunityPrinciplesModal } from '@/components/modals/CommunityPrinciplesModal';
import { INITIAL_OPPORTUNITIES, type OpportunityItem } from '@/data/opportunities';
import type { OpportunityCategory } from '@/data/categories';

export default function HomePage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(INITIAL_OPPORTUNITIES);
  const [activeHeroTab, setActiveHeroTab] = useState<OpportunityCategory>('project');
  const [selectedOpportunityCategory, setSelectedOpportunityCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeDetailItemId, setActiveDetailItemId] = useState<string | null>(null);
  const [isShareOpportunityOpen, setIsShareOpportunityOpen] = useState<boolean>(false);
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

  // Look up the active opportunity by id on every render instead of storing
  // a separate object reference, so a bookmark toggle from the list is
  // reflected immediately if the detail modal is (re)opened for that item.
  const activeDetailItem = opportunities.find((item) => item.id === activeDetailItemId) ?? null;

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

  // Hero pillar click handler
  const handleSelectPillar = (category: OpportunityCategory) => {
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
      }),
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
    setActiveDetailItemId(sampleId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#FF2D55] selection:text-white flex flex-col">
      {/* Header */}
      <Header
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onNavigateSection={(id) => {
          if (id === 'about-us') scrollToSection('about-us');
          else scrollToSection(id);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
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
          onOpenPostDemand={() => setIsShareOpportunityOpen(true)}
        />

        {/* 2. Giá trị cốt lõi (Pillars) */}
        <Pillars onSelectCategory={handleSelectPillar} />

        {/* 3. Cách hoạt động (4 Steps) */}
        <HowItWorks />

        {/* 4. Những cơ hội đang được chia sẻ */}
        <OpportunityList
          opportunities={opportunities}
          selectedCategory={selectedOpportunityCategory}
          onSelectCategory={(cat) => setSelectedOpportunityCategory(cat)}
          onBookmarkToggle={handleBookmarkToggle}
          onSelectOpportunity={(opp) => setActiveDetailItemId(opp.id)}
          onViewAll={() => {
            setSelectedOpportunityCategory('all');
            scrollToSection('opportunities');
          }}
        />

        {/* 5. Giá trị cộng đồng */}
        <CommunityValues />

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
        onClose={() => setActiveDetailItemId(null)}
        onBookmarkToggle={handleBookmarkToggle}
      />

      {/* 2. Share Opportunity Modal */}
      <ShareOpportunityModal
        isOpen={isShareOpportunityOpen}
        onClose={() => setIsShareOpportunityOpen(false)}
        onAddOpportunity={handleAddOpportunity}
      />

      {/* 3. Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ ...authModalState, isOpen: false })}
        onSuccess={(name) => showToast(`Chào mừng ${name} đến với Cùng Làm!`)}
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
