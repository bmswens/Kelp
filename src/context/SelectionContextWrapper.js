// React
import React from 'react'

// custom
import { LocationContext } from './LocationContextWrapper'
import DeleteMultipleDialog from '../dialogs/DeleteMultipleDialog'
import Filer from '../seaweed/filer'

// location context
const SelectionContext = React.createContext({
    selected: [],
    handle: () => {},
    clear: () => {}
})


function SelectionContextWrapper(props) {

    const [selected, setSelected] = React.useState([])

    function handle(path) {
        let tempSelected = [...selected]
        if (tempSelected.includes(path)) {
            let index = tempSelected.indexOf(path)
            tempSelected.splice(index, 1)
        }
        else {
            tempSelected.push(path)
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

    return (
        <SelectionContext.Provider
            value={{
                selected,
                handle,
                clear
            }}
        >
            {props.children}
            <DeleteMultipleDialog
                files={selected}
                del={del}
                close={() => setOpen(false)}
                open={open}
            />
        </SelectionContext.Provider>
    )
}

export default SelectionContextWrapper
export { SelectionContext }