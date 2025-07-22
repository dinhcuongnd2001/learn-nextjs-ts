import { Statistical } from '@prisma/client';

export interface IStatisticalUpdate extends Partial<Pick<Statistical, 'revenue' | 'refund' | 'investment' | 'total'>> {}
