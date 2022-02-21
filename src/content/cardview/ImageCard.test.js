// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// help
import { ProfileContext, defaultProfile } from '../../context/ProfileContextWrapper'

// to test
import ImageCard from './ImageCard'
import LocationContextWrapper from '../../context/LocationContextWrapper'
import SelectionContextWrapper from '../../context/SelectionContextWrapper'
import { SelectionContext } from '../../context/SelectionContextWrapper'

const file = {
    "FullPath": "/example.png",
    "Mtime": "2021-11-22T01:28:44Z",
    "Crtime": "2021-11-22T01:28:44Z",
    "Mode": 432,
    "Uid": 0,
    "Gid": 0,
    "Mime": "image/png",
    "Replication": "",
    "Collection": "",
    "TtlSec": 0,
    "DiskType": "",
    "UserName": "",
    "GroupNames": null,
    "SymlinkTarget": "",
    "Md5": "i/H1V8pY1Uf+jB+FTE/0jw==",
    "FileSize": 866810,
    "Extended": null,
    "chunks": [{ "file_id": "2,01dbadae45", "size": 866810, "mtime": 1637544524682246133, "e_tag": "i/H1V8pY1Uf+jB+FTE/0jw==", "fid": { "volume_id": 2, "file_key": 1, "cookie": 3685592645 }, "is_compressed": true }],
    "HardLinkId": null,
    "HardLinkCounter": 0,
    "Content": null,
    "Remote": null,
    "name": "example.png",
    "isFile": true
}


describe('<ImageCard>', function() {
    beforeEach(function() {
        render(
            <SelectionContextWrapper>
                <ImageCard
                    data={file}
                />
            </SelectionContextWrapper>
        )
    })
    it('should display the name of the file', function() {
        let title = screen.getByText('example.png')
        expect(title).not.toBeNull()
    })
    it('should display a preivew of the image', function() {
        let thumbnail = screen.getByAltText(`${file.name} thumbnail`)
        expect(thumbnail).not.toBeNull()
    })
    it('should become selected when single clicked', async function() {
        let button = screen.getByRole('button', { name: file.name })
        userEvent.click(button)
        await waitFor(() => {
            let selectedButton = screen.getByRole('button', { name: `selected ${file.name}` })
            expect(selectedButton).not.toBeNull()
        })
    })
    it('should open a preview when double clicked', async function() {
        window.open = jest.fn()
        let button = screen.getByRole('button', { name: file.name })
        userEvent.dblClick(button)
        await waitFor(() => {
            let title = screen.getByRole('dialog', { name: file.name })
            expect(title).not.toBeNull()
        })
    })
    it('should open a context menu when right clicked', async function() {
        let button = screen.getByRole('button', { name: file.name })
        fireEvent.contextMenu(button)
        await waitFor(() => {
            let contextMenu = screen.getByRole('menu', { name: "image context menu"})
            expect(contextMenu).not.toBeNull()
        })
    })
})

describe("The <ImageCard>'s <RightClickMenu>", function() {
    let profileContext
    let selectionContext
    beforeEach(function() {
        profileContext = {
            ...defaultProfile,
            addBookmark: jest.fn()
        }
        selectionContext = {
            selected: [],
            handle: jest.fn(),
            copy: jest.fn(),
            cut: jest.fn()
        }
        render(
            <ProfileContext.Provider value={profileContext}>
                <LocationContextWrapper>
                    <SelectionContext.Provider value={selectionContext}>
                        <ImageCard
                            data={file}
                        />
                    </SelectionContext.Provider>
                </LocationContextWrapper>
            </ProfileContext.Provider>
        )
        let fileButton = screen.getByRole('button', { name: file.name })
        fireEvent.contextMenu(fileButton)
    })
    it('should allow the user to preview the file', async function() {
        let button = screen.getByRole('menuitem', { name: "open image" })
        userEvent.click(button)
        await waitFor(() => {
            let title = screen.getByRole('dialog', { name: file.name })
            expect(title).not.toBeNull()
        })
    }) 
    it('should allow the user to download the file', async function() {
        window.open = jest.fn()
        let button = screen.getByRole('menuitem', { name: "download image" })
        userEvent.click(button)
        await waitFor(() => {
            expect(window.open).toHaveBeenCalled()
        })
    })  
    it('should open the delete file dialog and delete it', async function() {
        global.fetch = jest.fn()
        let button = screen.getByRole('menuitem', { name: "delete image" })
        userEvent.click(button)
        await waitFor(() => {
            let title = screen.getByRole('dialog', { name: 'Delete File'})
            expect(title).not.toBeNull()
        })
        let confirmButton = screen.getByRole('button', { name: 'confirm' })
        userEvent.click(confirmButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
        })
    })
    it('should allow the user to favorite a file', function() {
        let button = screen.getByRole('menuitem', { name: "favorite image" })
        userEvent.click(button)
        expect(profileContext.addBookmark).toHaveBeenCalled()
    })
    it('should allow the user to copy a file', function() {
        let button = screen.getByRole('menuitem', { name: "copy image" })
        userEvent.click(button)
        expect(selectionContext.copy).toHaveBeenCalled()
    })
    it('should allow a user to cut a file', function() {
        let button = screen.getByRole('menuitem', { name: "cut image" })
        userEvent.click(button)
        expect(selectionContext.cut).toHaveBeenCalled()
    })
    it('should allow the user to view the properties of the file', function() {
        // TODO: implement
    })
})