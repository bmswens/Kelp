// React
import React from 'react'

// Material UI
import { useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// custom
import Filer from '../seaweed/filer'
import {LocationContext} from '../nav/LocationContextWrapper'
import { getFullPath } from '../seaweed/file'

const blankForm = {
    name: '',
    content: ''
}

function TextFileDialog(props) {
    const {open, close} = props
    const context = React.useContext(LocationContext)
    const theme = useTheme()

    const [form, setForm] = React.useState({...blankForm})

    function handleClose() {
        setForm({...blankForm})
        close()
    }

    async function submit() {
        let fullPath = getFullPath(form.name, context.currentLocation)
        let file = new File([form.content], form.name, {type: "text/richtext"})
        await Filer.uploadFile(fullPath, file)
        context.refresh()
        handleClose()
    }

    function isValid() {
        return form.name !== '' && form.content !== ''
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                align="center"
            >
                Create File
            </DialogTitle>
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    sx={{marginTop: theme.spacing(1)}}
                    label="File Name"
                    inputProps={{"aria-label": "file name"}}
                    role="textbox"
                    value={form.name}
                    onChange={(event) =>{
                        setForm({
                            ...form,
                            name: event.target.value
                        })
                    }}
                />
                <TextField
                    fullWidth
                    sx={{marginTop: theme.spacing(1)}}
                    label="File Content"
                    inputProps={{"aria-label": "file content"}}
                    role="textbox"
                    multiline
                    maxRows={16}
                    value={form.content}
                    onChange={(event) =>{
                        setForm({
                            ...form,
                            content: event.target.value
                        })
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    aria-label="close"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    variant="contained"
                    aria-label="submit"
                    onClick={submit}
                    disabled={!isValid()}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TextFileDialog