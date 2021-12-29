// React
import React from 'react'

// Material UI
import Grid from '@mui/material/Grid'

// custom
import FileCard from './FileCard'
import FolderCard from './FolderCard'
import { useTheme } from '@mui/material'

function CardView(props) {

    const theme = useTheme()

    const { files } = props

    const children = []

    for (let obj of files) {
        if (obj.isFile) {
            children.push(<FileCard data={obj} key={obj.name} />)
        }
        else {
            children.push(<FolderCard data={obj} key={obj.name} />)
        }
    }

    return (
        <Grid
            container
            spacing={2}
            sx={{ 
                marginLeft: "240px", 
                width: "calc(100vw - 240px)", 
                paddingTop: "7px",
                paddingRight: theme.spacing(1)
            }} 
        >
            {children}
        </Grid>
    )
}

export default CardView