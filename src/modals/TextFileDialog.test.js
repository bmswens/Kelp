// React
import React from 'react'

// testing library
import { render, screen, waitFor, cleanup, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import {LocationContext} from '../nav/LocationContextWrapper'
import TextFileDialog from './TextFileDialog'

describe('<TextFileModal>', function() {
    let close
    let locationState
    beforeEach(() => {
        close = jest.fn()
        locationState = {
            currentLocation: '/',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn()
        }
        render(
            <LocationContext.Provider value={locationState}>
                <TextFileDialog
                    open={true} 
                    close={close}
                />
            </LocationContext.Provider>
        )
    })
    it('should allow a user to sumbit a new text file', async function() {
        global.fetch = jest.fn().mockResolvedValue({json: () => {ok: true}})
        let titleBox = screen.getByRole('textbox', { name: 'file name'})
        userEvent.type(titleBox, 'test.txt')
        let contentBox = screen.getByRole('textbox', { name: 'file content'})
        userEvent.type(contentBox, 'Hello  World!')
        let submitButton = screen.getByRole('button', { name: 'submit'})
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
    it('should allow a user to submit a text file with full path', async function() {
        global.fetch = jest.fn().mockResolvedValue({json: () => {ok: true}})
        let titleBox = screen.getByRole('textbox', { name: 'file name'})
        userEvent.type(titleBox, '/new/test.txt')
        let contentBox = screen.getByRole('textbox', { name: 'file content'})
        userEvent.type(contentBox, 'Hello  World!')
        let submitButton = screen.getByRole('button', { name: 'submit'})
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
    it('should allow a user to submit a text file with relative path', async function() {
        cleanup()
        locationState = {
            ...locationState,
            currentLocation: '/new'
        }
        render(
            <LocationContext.Provider value={locationState}>
                <TextFileDialog
                    open={true} 
                    close={close}
                />
            </LocationContext.Provider>
        )
        global.fetch = jest.fn().mockResolvedValue({json: () => {ok: true}})
        let titleBox = screen.getByRole('textbox', { name: 'file name'})
        userEvent.type(titleBox, '../old/test.txt')
        let contentBox = screen.getByRole('textbox', { name: 'file content'})
        userEvent.type(contentBox, 'Hello  World!')
        let submitButton = screen.getByRole('button', { name: 'submit'})
        fireEvent.click(submitButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
    it('should close when closed', async function() {
        let closeButton = screen.getByRole('button', { name: 'close'})
        userEvent.click(closeButton)
        await waitFor(() => {
            expect(close).toHaveBeenCalled()
        })
    })
    it('should preven the user form submitting blanks', async function() {
        let submitButton = screen.getByRole('button', { name: 'submit'})
        expect(submitButton).toHaveAttribute("disabled")
        userEvent.click(submitButton)
        await waitFor(() => {
            expect(close).not.toHaveBeenCalled()
        })
    })
})