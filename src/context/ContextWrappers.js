// React
import React from 'react'

// custom
import LocationContextWrapper from './LocationContextWrapper'
import SelectionContextWrapper from './SelectionContextWrapper'


function ContextWrappers(props) {
    return(
        <LocationContextWrapper>
            <SelectionContextWrapper>
                {props.children}
            </SelectionContextWrapper>
        </LocationContextWrapper>
    )
}

export default ContextWrappers