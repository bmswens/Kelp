// React
import React from 'react'

// testing library
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import ActionsList from './ActionsList'

describe('<ActionsList>', function() {
    beforeEach(() => {
        render(
            <ActionsList />
        )
    })
    it('should expand when clicked', async function() {
        let openButton = screen.getByRole('button', { name: 'Actions'})
        userEvent.click(openButton)
        await waitFor(() => {
            let closeButton = screen.getByTitle('close actions')
            expect(closeButton).not.toBeNull()
        })
    })
})

describe('<ActionsList> expanded', function() {
    beforeEach(() => {
        render(
            <ActionsList />
        )
        let openButton = screen.getByRole('button', { name: 'Actions'})
        userEvent.click(openButton)
    })
    it('should have an add text file button with dialog', async function() {
        let addFileButton = screen.getByRole('button', { name: 'Create File' })
        fireEvent.click(addFileButton)
        await waitFor(() => {
            let dialog = screen.getByRole('dialog', { name: 'Create File'})
            expect(dialog).not.toBeNull()
        })
        let cancelButton = screen.getByRole('button', { name: 'close' })
        userEvent.click(cancelButton)
    })
    it('should have an add folder button', async function() {
        let addFolderButton = screen.getByRole('button', { name: 'Create Folder' })
        fireEvent.click(addFolderButton)
        await waitFor(() => {
            let dialog = screen.getByRole('dialog', { name: 'Create Folder'})
            expect(dialog).not.toBeNull()
        })
        let cancelButton = screen.getByRole('button', { name: 'close' })
        userEvent.click(cancelButton)
    })
    it('should have an upload button', async function() {
        let addFolderButton = screen.getByRole('button', { name: 'Upload Files' })
        fireEvent.click(addFolderButton)
        await waitFor(() => {
            let dialog = screen.getByRole('dialog', { name: 'Upload Files'})
            expect(dialog).not.toBeNull()
        })
        let cancelButton = screen.getByRole('button', { name: 'close' })
        userEvent.click(cancelButton)
    })
})