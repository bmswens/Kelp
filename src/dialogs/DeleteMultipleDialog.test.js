// React
import React from 'react'

// testing library
import { render, screen, waitFor, cleanup, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import DeleteMultipleDialog from './DeleteMultipleDialog'

describe('<DeleteMultipleDialog>', function() {
    let del
    let close
    let files
    beforeEach(() => {
        del = jest.fn()
        close = jest.fn()
        files = ["/thing1.txt", "/thing2.txt"]
        render(
            <DeleteMultipleDialog
                name={name}
                del={del}
                close={close}
                open={true}
                files={files}
            />
        )
    })
    it('should display the title "Delete File"', function() {
        let title = screen.getByRole('dialog', { name: 'Delete Items'})
        expect(title).not.toBeNull()
    })
    it('should display the warning text', function() {
        let text = screen.getByText(`Are you sure you want to permanently delete these ${files.length} items?`)
        expect(text).not.toBeNull()
    })
    it('should display all the files when accordion opened', async function() {
        let expandButton = screen.getByRole('button', { name: "show files" })
        userEvent.click(expandButton)
        await waitFor(() => {
            for (let item of files) {
                let itemText = screen.getByText(item)
                expect(itemText).not.toBeNull()
            }
        })
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
