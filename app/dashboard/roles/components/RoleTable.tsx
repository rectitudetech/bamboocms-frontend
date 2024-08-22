'use client';

import React, { useMemo } from 'react';
import { formatDate } from '@/utils/dateUtils';
import { Box, Card } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';

import TablePage from '@/components/TablePage';

import * as services from '../services';
import { Role } from '../types';

const RoleTable = () => {
  const columns = useMemo<MRT_ColumnDef<Record<string, unknown>>[]>(
    () => [
      {
        accessorFn: (row) => `${row.id}`,
        id: 'id',
        header: 'ID',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>ID: {renderedCellValue}--</span>
          </Box>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Role Name',
        enableClickToCopy: true,
        enableSorting: false,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableSorting: false,
      },
      {
        // accessorFn: (row) => new Date(row.created_at),
        // id: 'created_at',
        accessorKey: 'created_at',
        header: 'Created At',
        filterFn: 'between',
        filterVariant: 'date',
        sortingFn: 'datetime',
        Cell: ({ cell }) => formatDate(cell.getValue() as string, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    []
  );

  const defaultSorting = [
    {
      id: 'id',
      desc: true,
    },
  ];

  const schema = {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        maxLength: 255,
      },
      description: {
        type: 'string',
        maxLength: 255,
      },
    },
  };

  const uiSchema = {
    name: {
      'ui:title': 'Name',
    },
    description: {
      'ui:title': 'Description',
      'ui:widget': 'textarea',
    },
    'ui:submitButtonOptions': {
      norender: true,
    },
  };

  const tableActionConfig = {
    add: {
      title: 'Add Role',
      initService: null,
      submitService: services.create,
      formType: 'dialog',
      schema,
      uiSchema,
    },
    // edit: {
    //   formType: 'page',
    //   url: '/dashboard/roles/edit',
    //   params: ['id'],
    // },
    edit: {
      title: 'Update Role',
      initService: services.view,
      submitService: services.update,
      formType: 'dialog',
      schema,
      uiSchema,
    },
  };

  return (
    <Card>
      <TablePage<Role>
        actionConfig={tableActionConfig}
        tableService={services.fetch}
        columns={columns}
        defaultSorting={defaultSorting}
      />
    </Card>
  );
};

export default RoleTable;
