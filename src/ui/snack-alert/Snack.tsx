import { Snackbar, Alert } from '@mui/material'

type SnackPropsType = { open: boolean, text: string, severity: 'success' | 'error', handleClose: any }

export const SnackAlert = (props: SnackPropsType ) => (
  <Snackbar open={props.open} autoHideDuration={4500} onClose={props.handleClose}>
    <Alert
      severity={props.severity}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {props.text}
    </Alert>
  </Snackbar>
)