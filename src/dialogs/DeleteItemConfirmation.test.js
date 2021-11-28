// React
import React from 'react'

// testing library
import { render, screen, waitFor, cleanup, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import DeleteItemConfirmation from './DeleteItemConfirmation'


describe('<DeleteItemConfirmation> for files', function() {
    let del
    let close
    let name
    beforeEach(() => {
        del = jest.fn()
        close = jest.fn()
        name = 'example.log'
        render(
            <DeleteItemConfirmation
                name={name}
                del={del}
                close={close}
                open={true}
                isFile={true}
            />
        )
    })
    it('should display the title "Delete File"', function() {
        let title = screen.getByRole('dialog', { name: 'Delete File'})
        expect(title).not.toBeNull()
    })
    it('should diplsay the warning text', function() {
        let text = screen.getByText('Are you sure you want to permanently delete this file?')
        expect(text).not.toBeNull()
        let foundName = screen.getByText(name)
        expect(foundName).not.toBeNull()
    })
    it('should close when "cancel" button selected', async function() {
        let cancelButton = screen.getByRole('button', { name: 'cancel' })
        userEvent.click(cancelButton)
        await waitFor(() => {
            expect(close).toHaveBeenCalled()
        })
    })
    it('should delete when "confirm" button selected', async function() {
        let confirmButton = screen.getByRole('button', { name: 'confirm' })
        userEvent.click(confirmButton)
        await waitFor(() => {
            expect(del).toHaveBeenCalled()
        })
    })
})

// describe('<DeleteItemConfirmation> for folders', function() {

// })