// React
import React from 'react'

// testing library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import ImageDisplayDialog from './ImageDisplayDialog'

describe('<ImageDisplayDialog>', function() {
    // can't figure out how to await initial load
    // jest.spyOn(console, 'error').mockImplementation(() => {})
    let close
    let download
    beforeEach(async () => {
        close = jest.fn()
        download = jest.fn()
        render(
            <ImageDisplayDialog
                open={true}
                title={"FakeImage.png"}
                source={"/test/FakeImage.png"}
                download={download}
                close={close}
            />
        )
    })
    it('should be able to close', function() {
        let closeButton = screen.getByRole('button', { name: "close" })
        userEvent.click(closeButton)
        expect(close).toHaveBeenCalled()
    })
    it('should display the image title', function() {
        let title = screen.getByText("FakeImage.png")
        expect(title).not.toBeNull()
    })
    it('should display the image', function() {
        let image = screen.getByAltText("FakeImage.png")
        expect(image).not.toBeNull()
    })
    it('should be able to download', function() {
        let downloadButton = screen.getByRole("button", { name: "download" })
        userEvent.click(downloadButton)
        expect(download).toHaveBeenCalled()
    })
})