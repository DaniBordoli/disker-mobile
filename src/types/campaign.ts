export interface DeliverableItem {
  emoji: string;
  text: string;
}

export interface PlatformDeliverable {
  platform: 'instagram' | 'tiktok';
  icon: any;
  backgroundColor: string;
  totalCount: number;
  items: DeliverableItem[];
}

export interface CampaignData {
  id: string;
  title: string;
  brandLogo: any;
  startDate: string;
  campaignType: string;
  location: string;
  aboutProject: {
    summary: string;
    fullDescription: string;
  };
  deliverables: PlatformDeliverable[];
  requirements: string[];
  termsAndConditions: string;
  categories: string[];
  price: string;
  currency: string;
  warningMessage?: string;
  platforms: ('instagram' | 'tiktok')[];
}

export interface CampaignDetailScreenProps {
  campaignData?: CampaignData;
  onGoBack?: () => void;
  onApply?: () => void;
}


