// React
import React from 'react'

// custom
import UploadFileDialog from '../dialogs/UploadFileDialog'


function DragAndDropHandler(props) {

    const [open, setOpen] = React.useState(false)
    const [files, setFiles] = React.useState([])

    React.useEffect(() => {
        document.addEventListener('drop', handleDrop)
        document.addEventListener('dragover', handleDrag)
    }, [])

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
            <UploadFileDialog
                files={files}
                open={open}
                close={close}
            />
        </React.Fragment>
    )
}

export default DragAndDropHandler