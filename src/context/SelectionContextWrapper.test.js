// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// mock
import Filer from '../seaweed/filer'

// to test
import SelectionContextWrapper from './SelectionContextWrapper'
import { SelectionContext } from './SelectionContextWrapper'
import LocationContextWrapper from './LocationContextWrapper'
import { LocationContext } from './LocationContextWrapper'

function ContextTester(props) {

    const selectionContext = React.useContext(SelectionContext)
    const locationContext = React.useContext(LocationContext)

    function handleChangeLocation() {
        locationContext.updateLocation('/new/location')
    }

    function handleItem() {
        selectionContext.handle('/full/path', true)
    }

    function handleFolder() {
        selectionContext.handle('/fuller/path', false)
    }

    function copy() {
        selectionContext.copy()
    }

    function cut() {
        selectionContext.cut()
    }

    function paste() {
        selectionContext.paste()
    }

    function copyOne() {
        selectionContext.copy({path: "/copy/file", isFile: true})
    }

    function cutOne() {
        selectionContext.cut({path: "/cut/file", isFile: true})
    }

    return (
        <React.Fragment>
            <button aria-label="change location" onClick={handleChangeLocation}>Change</button>
            <button aria-label="handle item" onClick={handleItem}>Handle</button>
            <button aria-label="handle folder" onClick={handleFolder}>Handle Folder</button>
            <button aria-label="copy" onClick={copy}>Copy</button>
            <button aria-label="cut" onClick={cut}>Cut</button>
            <button aria-label="copy one" onClick={copyOne}>Copy One</button>
            <button aria-label="cut one" onClick={cutOne}>Cut One</button>
            <button aria-label="paste" onClick={paste}>Paste</button>
            <p role="paragraph" data-testid="selected">{selectionContext.selected.map(obj => obj.path).join(' ')}</p>
            <p role="paragraph" data-testid="clipboard-content">{selectionContext.clipboard.content.map(obj => obj.path).join(', ')}</p>
            <p role="paragraph" data-testid="clipboard-method">{selectionContext.clipboard.method}</p>
        </React.Fragment>
    )
}

describe('<SelectionContextWrapper>', function() {
    beforeAll(() => {
        global.fetch = jest.fn()
        Filer.deleteItem = jest.fn()
        Filer.uploadFile = jest.fn()
        Filer.getRawContent = jest.fn(() => new Blob())
    })
    beforeEach(() => {
        render(
            <LocationContextWrapper>
                <SelectionContextWrapper>
                    <ContextTester />
                </SelectionContextWrapper>
            </LocationContextWrapper>
        )
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
    it('should allow the user to add items to the current selection state', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
    })
    it('should allow the user to remove items from the current selection state', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('')
        })
    })
    it('should empty the selection state on location change', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
        let changeButton = screen.getByRole('button', { name: 'change location'})
        userEvent.click(changeButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('')
        })
    })
    it('should open a dialog to delete selected files', async function() {
        /* 
            Has an issue with updated state on "unmounted" component.
            If there is a memory leak, check this wrapper.
        */
        jest.spyOn(console, 'error').mockImplementation(() => {})
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
        fireEvent.keyDown(document, { code: "Delete" })
        await waitFor(() => {
            let title = screen.getByRole('dialog', { name: 'Delete Items'})
            expect(title).not.toBeNull()
        })
        let confirmButton = screen.getByRole('button', { name: "confirm" })
        userEvent.click(confirmButton)
        await waitFor(() => {
            expect(Filer.deleteItem).toHaveBeenCalled()
        })
    })
    it('should allow the user to copy and paste files', async function() {
        // GitHub actions was getting network failure
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        let handleFolder = screen.getByRole('button', { name: 'handle folder'})
        userEvent.click(handleFolder)
        let copyButton = screen.getByRole('button', { name: "copy" })
        userEvent.click(copyButton)
        await waitFor(() => {
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('/full/path, /fuller/path')
            let method = screen.getByTestId('clipboard-method')
            expect(method.innerHTML).toEqual('copy')
        })
        let pasteButton = screen.getByRole('button', { name: "paste" })
        userEvent.click(pasteButton)
        await waitFor(() => {
            expect(Filer.uploadFile).toHaveBeenCalledTimes(1)
            expect(Filer.deleteItem).not.toHaveBeenCalled()
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('')
        })
    })
    it('should allow the user to cut and paste files', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        let cutBotton = screen.getByRole('button', { name: "cut" })
        userEvent.click(cutBotton)
        await waitFor(() => {
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('/full/path')
            let method = screen.getByTestId('clipboard-method')
            expect(method.innerHTML).toEqual('cut')
        })
        let pasteButton = screen.getByRole('button', { name: "paste" })
        userEvent.click(pasteButton)
        await waitFor(() => {
            expect(Filer.uploadFile).toHaveBeenCalledTimes(1)
            expect(Filer.deleteItem).toHaveBeenCalled()
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('')
        })
    })
    it('should allow users to use the copy shortcut', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        fireEvent.keyDown(document, { key: "c", ctrlKey: true})
        await waitFor(() => {
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('/full/path')
            let method = screen.getByTestId('clipboard-method')
            expect(method.innerHTML).toEqual('copy')
        })
        fireEvent.keyDown(document, { key: "v", ctrlKey: true, repeat: true})
        fireEvent.keyDown(document, { key: "v", ctrlKey: true})
        await waitFor(() => {
            expect(Filer.uploadFile).toHaveBeenCalled()
            expect(Filer.deleteItem).not.toHaveBeenCalled()
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('')
        })
    })
    it('should allow users to use the cut shortcut', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        fireEvent.keyDown(document, { key: "x", ctrlKey: true})
        await waitFor(() => {
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('/full/path')
            let method = screen.getByTestId('clipboard-method')
            expect(method.innerHTML).toEqual('cut')
        })
        fireEvent.keyDown(document, { key: "v", ctrlKey: true})
        await waitFor(() => {
            expect(Filer.uploadFile).toHaveBeenCalled()
            expect(Filer.deleteItem).toHaveBeenCalled()
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('')
        })
    })
    it('should not react to other hotkeys', function() {
        fireEvent.keyDown(document, { key: "r", ctrlKey: true})
    })
    it('should be able to copy single files', async function() {
        let copyButton = screen.getByRole('button', { name: "copy one" })
        userEvent.click(copyButton)
        await waitFor(() => {
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('/copy/file')
            let method = screen.getByTestId('clipboard-method')
            expect(method.innerHTML).toEqual('copy')
        })
    })
    it('should be able to cut single files', async function() {
        let cutBotton = screen.getByRole('button', { name: "cut one" })
        userEvent.click(cutBotton)
        await waitFor(() => {
            let content = screen.getByTestId('clipboard-content')
            expect(content.innerHTML).toEqual('/cut/file')
            let method = screen.getByTestId('clipboard-method')
            expect(method.innerHTML).toEqual('cut')
        })
    })
})