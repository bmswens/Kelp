// React
import React from 'react'

// Material UI
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'

// custom
import { LocationContext } from '../context/LocationContextWrapper'
import Filer from '../seaweed/filer'
import DetailsView from './DetailsView'
import CardView from './cardview/CardView'
import { ProfileContext } from '../context/ProfileContextWrapper'


function FileExplorer(props) {

    const context = React.useContext(LocationContext)
    const [ files, setFiles ] = React.useState(props.files || [])

    const profile = React.useContext(ProfileContext)

    React.useEffect(function() {
        async function loadFiles() {
            let tempFiles = await Filer.getFiles(context.currentLocation)
            let output = []
            for (let f of tempFiles) {
                if (!profile.settings.showDotFiles && f.name.startsWith('.')) {
                    continue
                }
                output.push(f)
            }
            setFiles(output)
        }
        loadFiles()
    }, [context.currentLocation, profile.settings.showDotFiles, context.refreshCount])


    return (
        <React.Fragment>
            <Toolbar />
            <CssBaseline />
            {profile.settings.useDetailsView
                ? <DetailsView files={files} />
                : <CardView files={files} />
            }
        </React.Fragment>
    )


}

export default FileExplorer