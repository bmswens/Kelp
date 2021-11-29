// React
import React from 'react'

// testing library
import { render, screen, waitFor, cleanup, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import {LocationContext} from '../nav/LocationContextWrapper'
import UploadFileDialog from './UploadFileDialog'

describe('<UploadFileDialog>', function() {
    let close
    let locationState
    let fakeFile = new File(['testing'], 'test.txt')
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
                <UploadFileDialog
                    open={true}
                    close={close}
                />
            </LocationContext.Provider>
        )
    })
    it('should allow the user to upload to current location', async function() {
        global.fetch = jest.fn()
        let input = screen.getByLabelText('upload input')
        userEvent.upload(input, fakeFile)
        let submitButton = screen.getByRole('button', { name: 'submit' })
        await waitFor(() => {
            expect(submitButton.disabled).not.toBeTruthy()
        })
        userEvent.click(submitButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
    it('should allow the user to upload to a absolute path', async function() {
        global.fetch = jest.fn()
        let titleBox = screen.getByRole('textbox', { name: 'folder name'})
        userEvent.type(titleBox, 'path/to/new/folder')
        let input = screen.getByLabelText('upload input')
        userEvent.upload(input, fakeFile)
        let submitButton = screen.getByRole('button', { name: 'submit' })
        await waitFor(() => {
            expect(submitButton.disabled).not.toBeTruthy()
        })
        userEvent.click(submitButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
    it('should allow the user to upload mutliple files', async function() {
        let files = [
            fakeFile,
            new File(['tessssting'], 'testttting.txt')
        ]
        global.fetch = jest.fn()
        let input = screen.getByLabelText('upload input')
        for (let file of files) {
            userEvent.upload(input, file)
        }
        let submitButton = screen.getByRole('button', { name: 'submit' })
        await waitFor(() => {
            expect(submitButton.disabled).not.toBeTruthy()
        })
        userEvent.click(submitButton)
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
})