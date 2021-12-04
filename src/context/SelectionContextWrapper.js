// React
import React from 'react'

// custom
import { LocationContext } from './LocationContextWrapper'

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

    return (
        <SelectionContext.Provider
            value={{
                selected,
                handle,
                clear
            }}
        >
                {props.children}
        </SelectionContext.Provider>
    )
}

export default SelectionContextWrapper
export { SelectionContext }