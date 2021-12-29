// React
import React from 'react'

// custom
import LocationContextWrapper from './LocationContextWrapper'
import SelectionContextWrapper from './SelectionContextWrapper'
import ThemeWrapper from './ThemeWrapper'


function ContextWrappers(props) {
    return(
        <LocationContextWrapper>
            <SelectionContextWrapper>
                <ThemeWrapper>
                    {props.children}

                </ThemeWrapper>
            </SelectionContextWrapper>
        </LocationContextWrapper>
    )
}

export default ContextWrappers