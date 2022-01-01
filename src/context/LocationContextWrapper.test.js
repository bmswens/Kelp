// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import LocationContextWrapper from './LocationContextWrapper'
import { LocationContext } from './LocationContextWrapper'

function ContextTester(props) {

    const locationContext = React.useContext(LocationContext)

    function handleChangeLocation() {
        locationContext.updateLocation('/new/location')
    }

    function handleGoBack() {
        locationContext.goBack()
    }


    return (
        <React.Fragment>
            <button aria-label="change location" onClick={handleChangeLocation}>Change</button>
            <button aria-label="go back" onClick={handleGoBack}>Go Back</button>
            <p role="paragraph" data-testid="location">{locationContext.currentLocation}</p>
        </React.Fragment>
    )
}

describe('<LocationContextWrapper>', function() {
    beforeEach(() => {
        render(
            <LocationContextWrapper>
                <ContextTester />
            </LocationContextWrapper>
        )
    })
    it('should default to /', function() {
        let current = screen.getByTestId('location')
        expect(current.innerHTML).toEqual('/')
    })
    it('should be able to udat ethe current locattion', function() {
        let button = screen.getByRole('button', { name: "change location"})
        userEvent.click(button)
        let current = screen.getByTestId('location')
        expect(current.innerHTML).toEqual('/new/location')
    })
    it('should be able to go back through the history', function() {
        let button = screen.getByRole('button', { name: "change location"})
        userEvent.click(button)
        let current = screen.getByTestId('location')
        expect(current.innerHTML).toEqual('/new/location')
        let backButton = screen.getByRole('button', { name: "go back"})
        userEvent.click(backButton)
        current = screen.getByTestId('location')
        expect(current.innerHTML).toEqual('/')
    })
})