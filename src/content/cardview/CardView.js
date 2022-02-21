// React
import React from 'react'

// Material UI
import Grid from '@mui/material/Grid'

// custom
import FileCard from './FileCard'
import FolderCard from './FolderCard'
import ImageCard from './ImageCard'
import { useTheme } from '@mui/material'

function handleFileType(obj) {
    let output = null
    let supportedImageTypes = [
        ".png",
        ".jpg",
        ".jpeg",
        ".bmp",
        ".ico"
    ]
    let isImage = false
    for (let extension of supportedImageTypes) {
        if (obj.name.includes(extension)) {
            isImage = true
            break
        }
    }
    if (isImage) {
        output = <ImageCard data={obj} key={obj.name} />
    }
    else {
        output = <FileCard data={obj} key={obj.name} />
    }
    return output
}

function CardView(props) {

    const theme = useTheme()

    const { files } = props

    const children = []

    for (let obj of files) {
        if (obj.isFile) {
            let card = handleFileType(obj)
            children.push(card)
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