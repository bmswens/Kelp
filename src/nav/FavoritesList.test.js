// React
import React from 'react'

// testing library
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// help
import { writeStorage } from '@rehooks/local-storage'
import { ProfileContext, defaultProfile } from '../context/ProfileContextWrapper'

// to test
import { LocationContext } from '../context/LocationContextWrapper'
import FavoritesList from './FavoritesList'
import { FavoriteItem } from './FavoritesList'

const favoriteFile = {
    fullPath: "/example.log",
    shortName: "example.log",
    isFile: true
}

const favoriteFolder = {
    fullPath: "/home/bmswens",
    shortName: "My Personal Files",
    isFile: false
}

describe('<FavoriteItem>', function() {
    let profileContext
    beforeEach(() => {
        profileContext = {
            ...defaultProfile,
            addBookmark: jest.fn(),
            removeBookmark: jest.fn(),
            bookmarks: [favoriteFile]
        }
        render(
            <ProfileContext.Provider value={profileContext}>
                <FavoriteItem
                    data={favoriteFile}
                    index={0}
                />
            </ProfileContext.Provider>
        )
    })
    afterEach(() => {
        localStorage.clear()
    })
    it('should be able to be removed from favorites', async function() {
        let favoriteButton = screen.getByRole('button', { name: favoriteFile.shortName})
        fireEvent.contextMenu(favoriteButton)
        await waitFor(() => {
            let contextMenu = screen.getByRole('menu', { name: "favorite item context menu"})
            expect(contextMenu).not.toBeNull()
        })
        let deleteButton = screen.getByRole('menuitem', { name: "remove favorite item" })
        userEvent.click(deleteButton)
        await waitFor(() => {
            expect(profileContext.removeBookmark).toHaveBeenCalled()
        })
    })
})

describe('<FavoriteItem> file', function() {
    beforeEach(() => {
        render(
            <FavoriteItem
                data={favoriteFile}
                index={0}
            />
        )
    })
    it('should download a file when clicked', function() {
        window.open = jest.fn()
        let favoriteButton = screen.getByRole('button', { name: favoriteFile.shortName})
        userEvent.click(favoriteButton)
        expect(window.open).toHaveBeenCalled()
    })
})

describe('<FavoriteItem> folder', function() {
    let locationState 
    beforeEach(() => {
        locationState = {
            currentLocation: '/new',
            history: [],
            updateLocation: jest.fn(),
            goBack: jest.fn(),
            refresh: jest.fn()
        }
        render(
            <LocationContext.Provider value={locationState}>
                <FavoriteItem
                    data={favoriteFolder}
                    index={0}
                />
            </LocationContext.Provider>
        )
    })
    it('should change the context when clicked', function() {
        let favoriteButton = screen.getByRole('button', { name: favoriteFolder.shortName})
        userEvent.click(favoriteButton)
        expect(locationState.updateLocation).toHaveBeenCalled()
    })
})

describe('<FavoritesList>', function() {
    beforeEach(() => {
        render(
            <FavoritesList />
        )
    })
    it('should expand when clicked', async function() {
        let openButton = screen.getByRole('button', { name: 'Favorites'})
        userEvent.click(openButton)
        await waitFor(() => {
            let closeButton = screen.getByTitle('close favorites')
            expect(closeButton).not.toBeNull()
        })
    })
})

describe('<FavoritesList> expanded, with items', function() {
    let profileContext
    beforeEach(() => {
        profileContext = {
            ...defaultProfile,
            addBookmark: jest.fn(() => profileContext.bookmarks = [favoriteFile, favoriteFolder]),
            removeBookmark: jest.fn(),
            bookmarks: [favoriteFile]
        }
        render(
            <ProfileContext.Provider value={profileContext}>
                <FavoritesList />
            </ProfileContext.Provider>
        )
        let openButton = screen.getByRole('button', { name: 'Favorites'})
        userEvent.click(openButton)
    })
    afterEach(() => {
        localStorage.clear()
    })
    it('should display the names of the items', function() {
        let favoriteButton = screen.getByRole('button', { name: favoriteFile.shortName})
        expect(favoriteButton).not.toBeNull()
    })
    it('should update when a new favorite is added', async function() {
        let favoriteFolderButton = screen.queryByRole('button', { name: favoriteFolder.shortName})
        expect(favoriteFolderButton).toBeNull()
        profileContext.bookmarks = [favoriteFile, favoriteFolder]
        cleanup()
        render(
            <ProfileContext.Provider value={profileContext}>
                <FavoritesList />
            </ProfileContext.Provider>
        )
        let openButton = screen.getByRole('button', { name: 'Favorites'})
        userEvent.click(openButton)
        await waitFor(() => {
            favoriteFolderButton = screen.getByRole('button', { name: favoriteFolder.shortName})
            expect(favoriteFolderButton).not.toBeNull()
        })
    })
})