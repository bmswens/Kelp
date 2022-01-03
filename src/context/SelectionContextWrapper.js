// React
import React from 'react'

// custom
import { LocationContext } from './LocationContextWrapper'
import DeleteMultipleDialog from '../dialogs/DeleteMultipleDialog'
import Filer from '../seaweed/filer'
import { getName, getFullPath } from '../seaweed/file'
import SuccessAlert from '../snackbars/SuccessAlert'

// location context
const SelectionContext = React.createContext({
    selected: [],
    handle: /* istanbul ignore next */ () => {},
    clear: /* istanbul ignore next */ () => {}
})

const defaultClipboard = {
    content: [],
    method: "copy",
    cut: /* istanbul ignore next */ () => {},
    copy: /* istanbul ignore next */ () => {},
    paste: /* istanbul ignore next */ () => {}
}


function SelectionContextWrapper(props) {

    const [selected, _setSelected] = React.useState([])

    function handle(path, isFile) {
        let tempSelected = [...selected]
        let tempPaths = tempSelected.map(obj => obj.path)
        if (tempPaths.includes(path)) {
            let index = tempPaths.indexOf(path)
            tempSelected.splice(index, 1)
        }
        else {
            tempSelected.push({path, isFile})
        }
        setSelected(tempSelected)
    }

    const locationContext = React.useContext(LocationContext)
    const locationContextRef = React.useRef(locationContext)
    locationContextRef.current = locationContext

    React.useEffect(() => {
        setSelected([])
    }, [locationContext.currentLocation])

    // deletion of multiple
    const [open, setOpen] = React.useState(false)

    async function del() {
        for (let item of selected) {
            await Filer.deleteItem(item.path)
        }
        setSelected([])
        locationContext.refresh()
    }

    // clipboard emulation
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertText, setAlertText] = React.useState('')
    const [clipboard, _setClipboard] = React.useState(defaultClipboard)

    // refs have to be used for event listeners
    const clipboardRef = React.useRef(clipboard)

    function setClipboard(obj) {
        clipboardRef.current = obj
        _setClipboard(obj)
    }

    const selectedRef = React.useRef(selected)

    function setSelected(selectedList) {
        selectedRef.current = selectedList
        _setSelected(selectedList)
    }
    
    function closeAlert() {
        setAlertOpen(false)
        locationContext.refresh()
    }
    
    function copy(obj=null) {
        if (obj) {
            setClipboard({
                content: [obj],
                method: "copy"
            })
        }
        else {
            setClipboard({
                content: selectedRef.current,
                method: "copy"
            })
        }
        setAlertText(`Copied ${selectedRef.current.length || 1} items!`)
        setAlertOpen(true)
        setSelected([])
    }
    
    function cut(obj=null) {
        if (obj) {
            setClipboard({
                content: [obj],
                method: "cut"
            })
        }
        else {
            setClipboard({
                content: selectedRef.current,
                method: "cut"
            })
        }
        setAlertText(`Cut ${selectedRef.current.length || 1} items!`)
        setAlertOpen(true)
        setSelected([])
    }
    
    async function paste() {
        for (let obj of clipboardRef.current.content) {
            if (!obj.isFile) {
                continue
            }
            let rawContent = await Filer.getRawContent(obj.path)
            let name = getName(obj.path)
            let file = new File([rawContent], name)
            let newPath = getFullPath(name, locationContextRef.current.currentLocation)
            await Filer.uploadFile(newPath, file)
            if (clipboardRef.current.method === "cut") {
                Filer.deleteItem(obj.path)
            }
        }
        setAlertText(`Pasted ${clipboardRef.current.content.length} items!`)
        setAlertOpen(true)
        locationContextRef.current.refresh()
        setClipboard(defaultClipboard)
    }

    function handleCutCopyPaste(event) {
        if (event.key === "c") {
            copy()
        }
        else if (event.key === "x") {
            cut()
        }
        else if (event.key === "v") {
            paste()
        }
    }

    const handleCutCopyPasteRef = React.useRef(handleCutCopyPaste)
    handleCutCopyPasteRef.current = handleCutCopyPaste

    // hotkeys
    React.useEffect(() => {
        function handleKeydown(event) {
            if (event.repeat) {
                return
            }
            if (event.code === "Delete" && selectedRef.current.length) {
                setOpen(true)
            }
            else if (event.ctrlKey) {
                handleCutCopyPasteRef.current(event)
            }
        }
        document.addEventListener('keydown', handleKeydown)
    }, [])

    return (
        <SelectionContext.Provider
            value={{
                selected,
                handle,
                clipboard,
                cut,
                copy,
                paste
            }}
        >
            {props.children}
            <DeleteMultipleDialog
                files={selected.map(obj => obj.path)}
                del={del}
                close={() => setOpen(false)}
                open={open}
            />
            <SuccessAlert
                open={alertOpen}
                close={closeAlert}
                text={alertText}
            />
        </SelectionContext.Provider>
    )
}

export default SelectionContextWrapper
export { SelectionContext }