import React, { createRef } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Typography,
} from '@mui/material';
import Form, { withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

const ThemeForm = withTheme(Theme);
const formRef = createRef<Form>();

interface BaseDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  formData: any;
  schema: any;
  uiSchema: any;
  isLoading: boolean;
  onSubmit: (formData: any) => void;
  submitLoading?: boolean;
}

const BaseDialog = React.memo(
  ({ open, handleClose, title, formData, schema, uiSchema, isLoading, onSubmit, submitLoading }: BaseDialogProps) => {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {isLoading && (
          <Box height={400} width="100%" display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {!isLoading && (
          <>
            <DialogTitle>
              <Typography variant="h6">{title}</Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <ThemeForm
                ref={formRef}
                schema={schema}
                uiSchema={uiSchema}
                validator={validator}
                formData={formData}
                onSubmit={({ formData }) => onSubmit(formData)}
                disabled={submitLoading}
                omitExtraData
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="button" color="primary" onClick={() => formRef.current?.submit()}>
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  }
);

export default BaseDialog;
