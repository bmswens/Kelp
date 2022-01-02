// React
import React from 'react'

// testing library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import SuccessAlert from './SuccessAlert'

describe('<SuccessAlert>', function() {

    let open 
    let close
    beforeEach(() => {
        open = true
        close = jest.fn(() => open = false)
        render(
            <SuccessAlert
                open={open}
                close={close}
                text="You did the thing!"
            />
        )
    })

    it('should display the text passed to it', function() {
        let text = screen.getByText("You did the thing!")
        expect(text).not.toBeNull()
    })
    it('should close when selected to close', function() {
        let closeButton = screen.getByRole("button", { name: "close alert" })
        userEvent.click(closeButton)
        expect(close).toHaveBeenCalled()
    })
})