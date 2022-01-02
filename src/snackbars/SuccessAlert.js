// React
import React from 'react'

// Material UI
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close'

function Action(props) {
    const { close } = props

    return (
        <IconButton
            aria-label="close alert"
            color="inherit"
            size="small"
            onClick={close}
        >
            <CloseIcon fontSize="inherit" />
        </IconButton>
    )
}


function SuccessAlert(props) {

    const { open, close, text } = props

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={close}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
        >
            <Alert
                variant="filled"
                severity="success"
                action={<Action close={close} />}
            >
                {text}
            </Alert>
        </Snackbar>
    )

}

export default SuccessAlert