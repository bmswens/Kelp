// React
import React from 'react'

// testing library
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import SelectionContextWrapper from './SelectionContextWrapper'
import { SelectionContext } from './SelectionContextWrapper'
import LocationContextWrapper from './LocationContextWrapper'
import { LocationContext } from './LocationContextWrapper'

function ContextTester(props) {

    const selectionContext = React.useContext(SelectionContext)
    const locationContext = React.useContext(LocationContext)

    function handleChangeLocation() {
        locationContext.updateLocation('/new/location')
    }

    function handleItem() {
        selectionContext.handle('/full/path')
    }

    return (
        <React.Fragment>
            <button aria-label="change location" onClick={handleChangeLocation}>Change</button>
            <button aria-label="handle item" onClick={handleItem}>Handle</button>
            <p role="paragraph" data-testid="selected">{selectionContext.selected.join(' ')}</p>
        </React.Fragment>
    )
}

describe('<SelectionContextWrapper>', function() {
    beforeEach(() => {
        render(
            <LocationContextWrapper>
                <SelectionContextWrapper>
                    <ContextTester />
                </SelectionContextWrapper>
            </LocationContextWrapper>
        )
    })
    it('should allow the user to add items to the current selection state', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
    })
    it('should allow the user to remove items from the current selection state', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('')
        })
    })
    it('should empty the selection state on location change', async function() {
        let handleButton = screen.getByRole('button', { name: 'handle item'})
        userEvent.click(handleButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('/full/path')
        })
        let changeButton = screen.getByRole('button', { name: 'change location'})
        userEvent.click(changeButton)
        await waitFor(() => {
            let selected = screen.getByTestId('selected')
            expect(selected.innerHTML).toEqual('')
        })
    })
})