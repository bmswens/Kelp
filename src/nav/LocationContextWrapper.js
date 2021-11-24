// React
import React from 'react'

// location context
const LocationContext = React.createContext({
    currentLocation: '/',
    history: [],
})


function LocationContextWrapper(props) {
    // state and modification
    const [locationState, setLocationState] = React.useState({
        currentLocation: '/',
        history: [],
    })

    function updateLocation(newLocation) {
        let newHistory = [...locationState.history]
        newHistory.push(locationState.currentLocation)
        setLocationState({
            history: newHistory,
            currentLocation: newLocation
        })
    }

    function goBack() {
        let newHistory = [...locationState.history]
        let newLocation = newHistory.pop()
        setLocationState({
            history: newHistory,
            currentLocation: newLocation
        })
    }

    return (
        <LocationContext.Provider
            value={{
                ...locationState,
                updateLocation,
                goBack
            }}
        >
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationContextWrapper
export {
    LocationContext
}