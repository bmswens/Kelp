// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// help
import { response as files } from './FileExplorer.test'
import Box from '@mui/material/Box'

// context
import { LocationContext } from '../context/LocationContextWrapper'

// to test
import DetailsView from './DetailsView'

describe('<DetailsView> with no files', function() {

    beforeEach(() => {
        render(
            <Box sx={{ height: "100vh", width: "1080px"}}>
                <DetailsView
                    disableVirtualization
                    files={[]}
                />
            </Box>
        )
    })
    it('should render the column titles', function() {
        let columns = [
            "Name",
            "Last Modified",
            "Create Time",
            "Permissions",
            "UID",
            "GID",
            "MIME Type",
            "Replication",
            "Collection",
            "Disk Type",
            "Group Names",
            "Symlink Target",
            "MD5",
            "Size",
            "Extended",
            "Hard Link ID",
            "Hard Link Counter",
            "Remote"
        ]
        for (let column of columns) {
            let columnText = screen.getByText(column)
            expect(columnText).not.toBeNull()
        }
    })
})

describe('<DetailsView> with files', function() {
    let locationState 
    beforeEach(() => {
        locationState = {
            currentLocation: '/',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn(),
            refresh: jest.fn()
        }
        render(
            <LocationContext.Provider value={locationState}>
                <Box sx={{ height: "100vh", width: "1080px"}}>
                    <DetailsView
                        disableVirtualization
                        disableSelectionOnClick={false}
                        autoPageSize={false}
                        files={files}
                    />
                </Box>
            </LocationContext.Provider>
        )
    })
    it('should display the rows', function() {
        for (let file of files) {
            let fileTitle = screen.getByText(file.name)
            expect(fileTitle).not.toBeNull()
        }
    })
    it('should enter folders when "name" column is double clicked', function() {
        let folder = screen.getByText('.topics')
        userEvent.dblClick(folder)
        expect(locationState.updateLocation).toHaveBeenCalledWith('/topics')
    })
    it('should download files when "name" column is double clicked', function() {
        window.open = jest.fn()
        let file = screen.getByText('example.log')
        userEvent.dblClick(file)
        expect(window.open).toHaveBeenCalled()
    })
    it('should be able to delete selected files', async function() {
        global.fetch = jest.fn().mockResolvedValue({ok: true})
        let checkBoxes = screen.getAllByRole("cell", { name: "Select Row checkbox"})
        for (let checkbox of checkBoxes) {
            userEvent.click(checkbox, { bubbles: true })
        }
        let deleteButton = screen.getByRole('button', { name: "delete" })
        await waitFor(() => {
            expect(deleteButton.disabled).not.toBeTruthy()
        })
        userEvent.click(deleteButton)
        let confirmButton = screen.getByRole('button', { name: "confirm" })
        userEvent.click(confirmButton)
    })
    it('should do nothing if a non-name column is double clicked', function() {
        window.open = jest.fn()
        let fileType = screen.getByText("text/x-log")
        userEvent.dblClick(fileType)
        expect(window.open).not.toHaveBeenCalled()
    })
})

describe('<DetailsView> with dotfiles hidden', function() {
    beforeEach(() => {
        localStorage.setItem("settings", JSON.stringify({ showDotFiles: false }))
        render(
            <Box sx={{ height: "100vh", width: "1080px"}}>
                <DetailsView
                    disableVirtualization
                    files={files}
                />
            </Box>
        )
    })
    afterEach(() => {
        localStorage.removeItem("settings")
    })
    it('should not show the dotfiles', function() {
        let topicText = screen.queryByText('.topics')
        expect(topicText).toBeNull()
    })
})