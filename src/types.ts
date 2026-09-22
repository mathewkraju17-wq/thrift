export type QualityGrade = 'excellent' | 'good' | 'bad' | 'horrible';

export type Category = 
  | 'all'
  | 'apparel'
  | 'electronics'
  | 'textbooks'
  | 'arts_club'
  | 'dorm_furniture';

export interface MarketplaceItem {
  id: string;
  ticketId: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: Category;
  categoryLabel: string;
  condition: QualityGrade;
  conditionLabel: string;
  sellerName: string;
  sellerHandle: string;
  sellerDorm: string;
  sellerAvatar?: string;
  sellerRating: number;
  sellerVerified: boolean;
  pickupZone: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  description: string;
  flawsNote?: string;
  isArtsClub: boolean;
  status: 'active' | 'in_review' | 'reserved' | 'sold';
  likesCount: number;
  viewsCount: number;
  offersCount: number;
  createdAt: string;
}

export interface ModerationItem {
  id: string;
  ticketId: string;
  title: string;
  price: number;
  categoryLabel: string;
  sellerName: string;
  sellerHandle: string;
  sellerDorm: string;
  sellerAvatarText: string;
  sellerAvatarColor: string;
  sellerVerified: boolean;
  isFirstPost?: boolean;
  imageUrl: string;
  extraPhotosCount: number;
  userDescription: string;
  pickupLocation: string;
  suggestedGrade: QualityGrade;
  selectedGrade: QualityGrade;
  isArtsClubChecked: boolean;
  status: 'pending' | 'flagged' | 'approved' | 'rejected';
  healthFlag?: {
    ruleNumber: string;
    warningTitle: string;
    warningDesc: string;
    isStrictHealthViolation: boolean;
  };
  rejectionReason?: string;
  rejectionNote?: string;
  verifiedStudentSeller?: string;
}

export interface CampusSafeZone {
  id: string;
  name: string;
  emoji: string;
  description: string;
  distance: string;
  isMonitored: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller' | 'system';
  senderName: string;
  text: string;
  time: string;
  isDelivered?: boolean;
  hasProposalCard?: boolean;
  hasTicketPreview?: boolean;
}

export type AppTab = 'feed' | 'arts_club' | 'sell' | 'admin' | 'profile';
export type ScreenView = 
  | 'tab_view'
  | 'product_detail'
  | 'chat'
  | 'submission_success';
