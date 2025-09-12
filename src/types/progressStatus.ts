export type ProgressStatus = 'approved' | 'pending' | 'rejected' | 'completed';

export interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
}

export const STATUS_CONFIG: Record<ProgressStatus, StatusConfig> = {
  approved: {
    label: 'Aprobado',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  pending: {
    label: 'Pendiente de aprobación',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  },
  rejected: {
    label: 'Rechazado',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800'
  },
  completed: {
    label: 'Finalizado',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800'
  }
};
