// React
import React from 'react'

// Material UI
import { Box } from '@mui/system'

// custom
import UploadFileDialog from '../dialogs/UploadFileDialog'


function DragAndDropHandler(props) {

    const [open, setOpen] = React.useState(false)
    const [files, setFiles] = React.useState([])

    function close() {
        setFiles([])
        setOpen(false)
    }

    function handleDrag(event) {
        event.stopPropagation()
        event.preventDefault()
    }

    function handleDrop(event) {
        event.stopPropagation()
        event.preventDefault()
        let tempFiles = []
        for (let item of event.dataTransfer.items) {
            if (item.kind === 'file') {
                let file = item.getAsFile()
                tempFiles.push(file)
            }
        }
        if (tempFiles.length) {
            setFiles(tempFiles)
            setOpen(true)
        }
    }

    return (
        <React.Fragment>
            <Box
                aria-label="full page file dropzone"
                sx={{
                    visbility: "hidden",
                    height: "100vh",
                    width: "100vw",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -99
                }}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            />
            <UploadFileDialog
                files={files}
                open={open}
                close={close}
            />
        </React.Fragment>
    )
}

export default DragAndDropHandler