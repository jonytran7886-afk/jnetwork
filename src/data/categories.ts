import { Coins, FileText, Home, Users, type LucideIcon } from 'lucide-react';
import type { OpportunityItem } from './opportunities';

/**
 * Single source of truth for the 4 opportunity categories used across the
 * hero tabs, pillars section, opportunity filters, footer links and the
 * "share opportunity" form. Previously each component declared its own
 * copy of this list, which had drifted out of sync (e.g. the opportunity
 * filter used the label "Hợp tác chuyên môn" while the data model and every
 * other section used "Cộng đồng chuyên môn").
 */
export type OpportunityCategory = OpportunityItem['category'];

export interface CategoryDefinition {
  key: OpportunityCategory;
  label: OpportunityItem['categoryLabel'];
  icon: LucideIcon;
  iconClassName: string;
  bgClassName: string;
  sampleImageUrl: string;
}

export const OPPORTUNITY_CATEGORIES: CategoryDefinition[] = [
  {
    key: 'project',
    label: 'Dự án & ý tưởng',
    icon: FileText,
    iconClassName: 'text-[#FF2D55]',
    bgClassName: 'bg-rose-50',
    sampleImageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
  },
  {
    key: 'resource',
    label: 'Nguồn lực hợp tác',
    icon: Coins,
    iconClassName: 'text-amber-600',
    bgClassName: 'bg-amber-50',
    sampleImageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    key: 'space',
    label: 'Không gian chia sẻ',
    icon: Home,
    iconClassName: 'text-sky-600',
    bgClassName: 'bg-sky-50',
    sampleImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    key: 'partner',
    label: 'Cộng đồng chuyên môn',
    icon: Users,
    iconClassName: 'text-indigo-600',
    bgClassName: 'bg-indigo-50',
    sampleImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
];

export const CATEGORY_BY_KEY: Record<OpportunityCategory, CategoryDefinition> =
  OPPORTUNITY_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.key] = category;
      return acc;
    },
    {} as Record<OpportunityCategory, CategoryDefinition>,
  );
