// React
import React from 'react'

// Material UI
import { Box, IconButton, TablePagination, Typography, useTheme } from '@mui/material';

// Materail UI data grid
import { DataGrid, useGridApiContext, useGridState } from '@mui/x-data-grid';

// Material UI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import { Folder as FolderIcon } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'

// custom
import { LocationContext } from '../context/LocationContextWrapper';
import Filer, { connectionString } from '../seaweed/filer'
import DeleteMultipleDialog from '../dialogs/DeleteMultipleDialog';

function DetailsFooter(props) {

    const { files } = props
    const theme = useTheme()

    // context
    const locationContext = React.useContext(LocationContext)

    // pagination
    const apiRef = useGridApiContext();
    const [state] = useGridState(apiRef);

    const [ rowsPerPage, setRowsPerPage ] = React.useState(10)

    // stolen from MUI so skipping
    const handleChangeRowsPerPage = /* istanbul ignore next */ (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        apiRef.current.setPage(0)
      }

    // delete
    const [ deleteOpen, setDeleteOpen ] = React.useState(false)

    async function del() {
        for (let file of files) {
            let recursive = false
            if (!file.isFile) {
                recursive = true
            }
            await Filer.deleteItem(file.FullPath, recursive)
        }
        locationContext.refresh()
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    padding: theme.spacing(1)
                }}
            >
                <IconButton
                    onClick={() => setDeleteOpen(true)}
                    disabled={files.length === 0}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
                <Box sx={{flex: 1}} />
                <TablePagination
                    component="div"
                    count={state.pagination.rowCount}
                    page={state.pagination.page}
                    onPageChange={/* istanbul ignore next */ (event, value) => apiRef.current.setPage(value - 1)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            <DeleteMultipleDialog
                files={files.map(file => file.name)}
                del={del}
                close={() => setDeleteOpen(false)}
                open={deleteOpen}
            />
        </React.Fragment>
    )
}

function DetailsView(props) {

    const theme = useTheme()

    // selection stuff
    const [ selected, setSelected ] = React.useState([])

    function handleSelectionChange(selection) {
        setSelected(selection.map(index => files[index]))
    }

    // context
    const locationContext = React.useContext(LocationContext)

    const files = props.files.map((file, index) => {
        return {...file, id: index}
    })

    // column data
    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column",
            renderCell: (params) => {
                return (
                    <React.Fragment>
                        {params.row.isFile
                            ? <DescriptionIcon />
                            : <FolderIcon />
                        }
                        <Typography sx={{ marginLeft: theme.spacing(1), userSelect: "none" }}>
                            {params.row.name}
                        </Typography>
                    </React.Fragment>
                )
            }
        },
        {
            field: "Mtime",
            headerName: "Last Modified",
            flex: 1
        },
        {
            field: "Crtime",
            headerName: "Create Time",
            flex: 1
        },
        {
            field: "Mode",
            headerName: "Permissions",
            flex: 1
        },
        {
            field: "Uid",
            headerName: "UID",
            flex: 1
        },
        {
            field: "Gid",
            headerName: "GID",
            flex: 1
        },
        {
             field: "Mime",
             headerName: "MIME Type",
             flex: 1
        },
        {
            field: "Replication",
            name: "Replication",
            flex: 1
        },
        {
            field: "Collection",
            headerName: "Collection",
            flex: 1
        },
        {
            field: "DiskType",
            headerName: "Disk Type",
            flex: 1
        },
        {
            field: "GroupNames",
            headerName: "Group Names",
            flex: 1
        },
        {
            field: "SymlinkTarget",
            headerName: "Symlink Target",
            flex: 1
        },
        {
            field: "Md5",
            headerName: "MD5",
            flex: 1
        },
        {
            field: "FileSize",
            headerName: "Size",
            flex: 1
        },
        {
            field: "Extended",
            headerName: "Extended",
            flex: 1
        },
        {
            field: "HardLinkId",
            headerName: "Hard Link ID",
            flex: 1
        },
        {
            field: "HardLinkCounter",
            headerName: "Hard Link Counter",
            flex: 1,
        },
        {
            field: "Remote",
            headerName: "Remote",
            flex: 1
        }
    ]

    // click handlers
    function onNameDoubleClick(params, event) {
        if (params.row.isFile) {
            window.open(`${connectionString}${params.row.FullPath}`, '_blank')
        }
        else {
            locationContext.updateLocation(params.row.FullPath)
        }
    }
    function onCellDoubleClick(params, event) {
        if (params.field === "name") {
            event.preventDefault()
            onNameDoubleClick(params, event)
        }
    }

    return (
        <DataGrid
            disableSelectionOnClick
            autoPageSize
            checkboxSelection
            columns={columns}
            rows={files}
            onCellDoubleClick={onCellDoubleClick}
            onSelectionModelChange={handleSelectionChange}
            components={{
                Footer: DetailsFooter,
            }}
            componentsProps={{
                footer: { files: selected}
            }}
            {...props}
        />
    )

}

export default DetailsView