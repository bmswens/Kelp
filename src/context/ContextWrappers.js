// React
import React from 'react'

// custom
import LocationContextWrapper from './LocationContextWrapper'
import SelectionContextWrapper from './SelectionContextWrapper'
import ThemeWrapper from './ThemeWrapper'
import ProfileContextWrapper from './ProfileContextWrapper'


function ContextWrappers(props) {
    return(
        <LocationContextWrapper>
            <ProfileContextWrapper>
                <SelectionContextWrapper>
                    <ThemeWrapper>
                        {props.children}

                    </ThemeWrapper>
                </SelectionContextWrapper>
            </ProfileContextWrapper>
        </LocationContextWrapper>
    )
}

export default ContextWrappers