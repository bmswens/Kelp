// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// custom
import DragAndDropHandler from './DragAndDropHandler'

describe('<DragAndDropHandler>', function() {
    beforeEach(() => {
        render(
            <DragAndDropHandler />
        )
    })
    it('should allow the user to drag and drop files', async function() {
        /* 
            Disables the error console for this test only
            There is a conflict in the MUI <DropzoneArea> between 
            initialFiles={[file]} and unmounting
            trying to set objectFiles to files causes it to not show up
            in the GUI (but still upload)
            React warns that this may cause a memory leak, will monitor
        */
        jest.spyOn(console, 'error').mockImplementation(() => {})

        let testFile = new File(['testing'], 'test.txt')
        let item = {
            kind: 'file',
            getAsFile: () => testFile
        }
        fireEvent.dragOver(document)
        fireEvent.drop(document, { dataTransfer: { items: [ item ]}})
        await waitFor(() => {
            let dialog = screen.getByRole('dialog', { name: 'Upload Files'})
            expect(dialog).not.toBeNull()
        })
        let cancelButton = screen.getByRole('button', { name: 'close' })
        userEvent.click(cancelButton)
    })
    it('should not open the dialog on "not-files"', async function() {
        let testFile = new File(['testing'], 'test.txt')
        let item = {
            kind: 'not-file',
            getAsFile: () => testFile
        }
        fireEvent.dragOver(document)
        fireEvent.drop(document, { dataTransfer: { items: [ item ]}})
        await waitFor(() => {
            let dialog = screen.queryByRole('dialog', { name: 'Upload Files'})
            expect(dialog).toBeNull()
        })
    })
})