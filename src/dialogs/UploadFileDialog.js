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

// material-ui-dropzone
import { DropzoneArea } from 'react-mui-dropzone'

// custom
import { LocationContext } from '../context/LocationContextWrapper'
import Filer from '../seaweed/filer'
import { getFullPath } from '../seaweed/file'


function UploadFileDialog(props) {

    const {open, close} = props
    const context = React.useContext(LocationContext)
    const theme = useTheme()

    const [files, setFiles] = React.useState(props.files || [])
    const [folder, setFolder] = React.useState('')

    React.useEffect(() => {
        if ( props.files !== undefined) {
            setFiles(props.files)
        }
    }, [props.files])

    function handleClose() {
        setFolder('')
        setFiles([])
        close()
    }

    async function submit() {
        let fullPath = getFullPath(folder, context.currentLocation)
        if (!fullPath.endsWith('/')) {
            fullPath += '/'
        }
        for (let file of files) {
            await Filer.uploadFile(fullPath, file)
        }
        context.refresh()
        handleClose()
    }

    function isValid() {
        return files.length > 0
    }

    function handleNew(newFiles) {
        let tempFiles = [...files]
        for (let file of newFiles) {
            tempFiles.push(file)
        }
        setFiles(tempFiles)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                align="center"
            >
                Upload Files
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    sx={{
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1)
                    }}
                    label="Folder Name"
                    inputProps={{"aria-label": "folder name"}}
                    role="textbox"
                    value={folder}
                    onChange={(event) =>{
                        setFolder(event.target.value)
                    }}
                />
                <DropzoneArea
                    onAdd={handleNew}
                    onDrop={handleNew}
                    useChipsForPreview
                    filesLimit={20}
                    inputProps={{"aria-label": "upload input"}}
                    initialFiles={files}
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

export default UploadFileDialog