// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// help
import { ProfileContext, defaultProfile } from '../../context/ProfileContextWrapper'

// to test
import FolderCard from './FolderCard'
import { LocationContext } from '../../context/LocationContextWrapper'
import SelectionContextWrapper from '../../context/SelectionContextWrapper'

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
                <SelectionContextWrapper>
                    <FolderCard
                        data={folder}
                    />
                </SelectionContextWrapper>
            </LocationContext.Provider>
        )
    })
    it('should display the name of the folder', function() {
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

describe('parent ".." <Folder>', function() {
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
                <SelectionContextWrapper>
                    <FolderCard
                        data={{
                            ...folder,
                            name: ".."
                        }}
                    />
                </SelectionContextWrapper>
            </LocationContext.Provider>
        )
    })
    it('should become selected when single clicked', async function() {
        let button = screen.getByRole('button', { name: ".." })
        userEvent.click(button)
        await waitFor(() => {
            let selectedButton = screen.queryByRole('button', { name: `selected ${folder.name}` })
            expect(selectedButton).toBeNull()
        })
    })
})

describe("The <Folder>'s <RightClickMenu>", function() {
    let locationState
    let profileContext
    beforeEach(function() {
        locationState = {
            currentLocation: '/new',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn(),
            refresh: jest.fn()
        }
        profileContext = {
            ...defaultProfile,
            addBookmark: jest.fn()
        }
        render(
            <ProfileContext.Provider value={profileContext}>
                <LocationContext.Provider value={locationState}>
                    <FolderCard
                        data={folder}
                    />
                </LocationContext.Provider>
            </ProfileContext.Provider>
        )
        let fileButton = screen.getByRole('button', { name: folder.name })
        fireEvent.contextMenu(fileButton)
    })
    it('should allow the user to open the folder', async function() {
        let button = screen.getByRole('menuitem', { name: "open folder" })
        userEvent.click(button)
        await waitFor(() => {
            expect(locationState.updateLocation).toHaveBeenCalled()
        })
    })  
    it('should allow the user to delete the folder', async function() {
        global.fetch = jest.fn()
        let button = screen.getByRole('menuitem', { name: "delete folder" })
        userEvent.click(button)
        await waitFor(() => {
            let title = screen.getByRole('dialog', { name: 'Delete Folder'})
            expect(title).not.toBeNull()
        })
        let confirmButton = screen.getByRole('button', { name: 'confirm' })
        userEvent.click(confirmButton)
        expect(global.fetch).toHaveBeenCalled()
    })
    it('should allow the user to favorite a folder', function() {
        let button = screen.getByRole('menuitem', { name: "favorite folder" })
        userEvent.click(button)
        expect(profileContext.addBookmark).toHaveBeenCalled()
    })
    it('should allow the user to view the properties of the file', function() {
        // TODO: implement
    })
})