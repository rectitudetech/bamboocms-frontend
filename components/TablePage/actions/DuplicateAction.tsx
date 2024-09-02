import React from 'react';
import { Delete, FileCopy } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { type MRT_Row } from 'material-react-table';

import { BaseEntity } from '@/types/BaseEntity';

import { TableActionConfig } from '../TablePage.types';

interface DuplicateActionProps<T extends BaseEntity> {
  row: MRT_Row<T>;
  actionConfig: { [key: string]: TableActionConfig };
  handleAction: any;
}

const DuplicateAction = <T extends BaseEntity>({ row, actionConfig, handleAction }: DuplicateActionProps<T>) => {
  if (!row?.original?.id || !actionConfig?.duplicate) return;

  const duplicateConfig = actionConfig?.duplicate;
  return (
    <>
      <MenuItem
        onClick={() => {
          handleAction(duplicateConfig, row.original);
        }}
      >
        <FileCopy />
        Duplicate
      </MenuItem>
    </>
  );
};

export default React.memo(DuplicateAction);
