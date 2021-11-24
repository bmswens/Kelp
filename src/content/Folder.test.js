// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import Folder from './Folder'
import { LocationContext } from '../nav/LocationContextWrapper'

const folder = {
    "FullPath":"/topics",
    "Mtime":"2021-11-22T01:29:37Z",
    "Crtime":"2021-11-22T01:29:37Z",
    "Mode":2147484141,"Uid":0,
    "Gid":0,
    "Mime":"",
    "Replication":"",
    "Collection":"",
    "TtlSec":0,
    "DiskType":"",
    "UserName":"",
    "GroupNames":null,
    "SymlinkTarget":"",
    "Md5":null,
    "FileSize":0,
    "Extended":null,
    "HardLinkId":null,
    "HardLinkCounter":0,
    "Content":null,
    "Remote":null,
    "name": "topics"
}

describe('<Folder>', function() {
    let locationState 
    beforeEach(function() {
        locationState = {
            currentLocation: '/',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn()
        }
        render(
            <LocationContext.Provider value={locationState}>
                <Folder
                    data={folder}
                />
            </LocationContext.Provider>
        )
    })
    it('should display the name of the file', function() {
        let title = screen.getByText('topics')
        expect(title).not.toBeNull()
    })
    it('should become selected when single clicked', async function() {
        let button = screen.getByRole('button', { name: folder.name })
        userEvent.click(button)
        await waitFor(() => {
            let selectedButton = screen.getByRole('button', { name: `selected ${folder.name}` })
            expect(selectedButton).not.toBeNull()
        })
    })
    it('should change the location when double clicked', async function() {
        let button = screen.getByRole('button', { name: folder.name })
        userEvent.dblClick(button)
        await waitFor(() => {
            expect(locationState.updateLocation).toHaveBeenCalled()
        })
    })
    it('should open a context menu when right clicked', async function() {
        let button = screen.getByRole('button', { name: folder.name })
        fireEvent.contextMenu(button)
        await waitFor(() => {
            let contextMenu = screen.getByRole('menu', { name: "folder context menu"})
            expect(contextMenu).not.toBeNull()
        })
    })
})