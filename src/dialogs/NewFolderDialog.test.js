// React
import React from 'react'

// testing library
import { render, screen, waitFor, cleanup, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import {LocationContext} from '../nav/LocationContextWrapper'
import NewFolderDialog from './NewFolderDialog'

describe('<NewFolderDialog>', function() {
    let close
    let locationState
    beforeEach(() => {
        close = jest.fn()
        locationState = {
            currentLocation: '/testing',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn(),
            refresh: jest.fn()
        }
        render(
            <LocationContext.Provider value={locationState}>
                <NewFolderDialog
                    open={true} 
                    close={close}
                />
            </LocationContext.Provider>
        )
    })
    it('should allow the user to create a new folder', async function() {
        global.fetch = jest.fn()
        let titleBox = screen.getByRole('textbox', { name: 'folder name'})
        userEvent.type(titleBox, 'path/to/new/folder')
        let submitButton = screen.getByRole('button', { name: 'submit' })
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(close).toHaveBeenCalled()
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8888/testing/path/to/new/folder/',
                {
                    method: 'POST'
                }
            )
        })
    })
    it('should allow the user to create a new folder with relative path', async function() {
        global.fetch = jest.fn()
        let titleBox = screen.getByRole('textbox', { name: 'folder name'})
        userEvent.type(titleBox, 'path/to/new/folder')
        let submitButton = screen.getByRole('button', { name: 'submit' })
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(close).toHaveBeenCalled()
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8888/testing/path/to/new/folder/',
                {
                    method: 'POST'
                }
            )
        })
    })
    it('should allow the user to create a new folder with absolute path', async function() {
        global.fetch = jest.fn()
        let titleBox = screen.getByRole('textbox', { name: 'folder name'})
        userEvent.type(titleBox, '/path/to/new/ish/folder')
        let submitButton = screen.getByRole('button', { name: 'submit' })
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(close).toHaveBeenCalled()
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8888/path/to/new/ish/folder/',
                {
                    method: 'POST'
                }
            )
        })
    })
    it('should allow the user to choose to auto-move to created folder', async function() {
        global.fetch = jest.fn()
        let titleBox = screen.getByRole('textbox', { name: 'folder name'})
        userEvent.type(titleBox, '/path/to/new/ish/folder')
        let goToButton = screen.getByRole('checkbox', { name: 'go to new folder'})
        userEvent.click(goToButton)
        let submitButton = screen.getByRole('button', { name: 'submit' })
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(close).toHaveBeenCalled()
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8888/path/to/new/ish/folder/',
                {
                    method: 'POST'
                }
            )
            expect(locationState.updateLocation).toHaveBeenCalledWith('/path/to/new/ish/folder')
        })
    })
})