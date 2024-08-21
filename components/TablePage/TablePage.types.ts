import { MRT_SortingState, type MRT_ColumnDef } from 'material-react-table';

import { ViewService, type FetchService, type UpdateService } from '@/types/api';
import { BaseEntity, UpdateEntity } from '@/types/BaseEntity';

export interface TablePageProps<T extends BaseEntity> {
  actionConfig: any;
  columns: MRT_ColumnDef<Record<string, unknown>>[];
  defaultSorting?: MRT_SortingState;
  tableService: FetchService;
}
