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

    const [selected, setSelected] = React.useState([])

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
    
    function clear() {
        setSelected([])
    }

    const locationContext = React.useContext(LocationContext)

    React.useEffect(() => {
        clear()
    }, [locationContext.currentLocation])

    // deletion of multiple
    const [open, setOpen] = React.useState(false)

    async function del() {
        for (let item of selected) {
            await Filer.deleteItem(item)
        }
        setSelected([])
        locationContext.refresh()
    }

    function handleKeydown(event) {
        if (event.code === "Delete" && selected.length) {
            setOpen(true)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    // clipboard emulation
    const [clipboard, setClipboard] = React.useState(defaultClipboard)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertText, setAlertText] = React.useState('')

    function closeAlert() {
        setAlertOpen(false)
    }

    function copy() {
        setClipboard({
            content: selected,
            method: "copy"
        })
        setAlertText(`Copied ${selected.length} items!`)
        setAlertOpen(true)
        setSelected([])
    }

    function cut() {
        setClipboard({
            content: selected,
            method: "cut"
        })
        setAlertText(`Cut ${selected.length} items!`)
        setAlertOpen(true)
        setSelected([])
    }

    function paste() {
        let files = []
        for (let obj of clipboard.content) {
            if (!obj.isFile) {
                continue
            }
            let rawContent = Filer.getRawContent(obj.path)
            let name = getName(obj.path)
            let file = new File([rawContent], name)
            let newPath = getFullPath(name, locationContext.currentLocation)
            Filer.uploadFile(newPath, file)
            if (clipboard.method === "cut") {
                Filer.deleteItem(obj.path)
            }
        }
        setClipboard(defaultClipboard)
    }

    return (
        <SelectionContext.Provider
            value={{
                selected,
                handle,
                clear,
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
                alrt={alertOpen}
                close={closeAlert}
                text={alertText}
            />
        </SelectionContext.Provider>
    )
}

export default SelectionContextWrapper
export { SelectionContext }