export interface AudienceStatsFile {
  name: string;
  size: number;
  progress: number;
  uploading: boolean;
  uri?: string;
  completed: boolean;
}
