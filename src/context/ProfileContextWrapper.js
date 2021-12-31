// React
import React from 'react'

// local storage
import useLocalStorage from '@rehooks/local-storage'

// custom
import Filer from '../seaweed/filer'
import { getName } from '../seaweed/file'


// default and context creation
const defaultProfile = {
    settings: {
        showDotFiles: true,
        useDetailsView: false,
        useDarkMode: true,
    },
    current: "localstorage",
    bookmarks: [],
    options: []
}

const ProfileContext = React.createContext(defaultProfile)

function ProfileContextWrapper(props) {

    // for the final profile
    const [settings, setSettings] = React.useState(defaultProfile.settings)
    const [bookmarks, setBookmarks] = React.useState(defaultProfile.bookmarks)
    const [options, setOptions] = React.useState([])
    const [selectedProfile, setSelectedProfile] = useLocalStorage("profile", { profile: "localstorage"})

    // localstorage
    const [localSettings, setLocalSettings] = useLocalStorage("settings", defaultProfile.settings)
    const [localBookmarks, setLocalBookmarks] = useLocalStorage("bookmarks", defaultProfile.bookmarks)

    const usingLocalStorage = selectedProfile.profile === "localstorage"

    // for loading
    async function getProfiles() {
        let output = []
        let profileFiles = await Filer.getFiles('/.kelp/profiles')
        for (let f of profileFiles) {
            let name = getName(f.FullPath)
            if (name.includes('.json')) {
                output.push(name.replace('.json', ''))
            }
        }
        setOptions(output)
    }

    async function loadProfile() {
        let tempSettings
        let tempBookmarks
        if (usingLocalStorage) {
            tempSettings = localSettings
            tempBookmarks = localBookmarks
        }
        else {
            let content = await Filer.getContent(`/.kelp/profiles/${selectedProfile}.json`)
            const data = JSON.parse(content)
            tempSettings = data.settings
            tempBookmarks = data.bookmarks
        }
        setSettings(tempSettings)
        setBookmarks(tempBookmarks)
    }

    React.useEffect(() => {
        getProfiles()
        loadProfile()
    }, [selectedProfile.profile, localSettings, localBookmarks])

    // for updating
    async function switchProfile(name) {
        setSelectedProfile({ profile: name })
    }

    async function updateSetting(setting, value) {
        if (usingLocalStorage) {
            setLocalSettings({
                ...localSettings,
                [setting]: value
            })
        }
        else {
            let newSettings = {
                ...settings,
                [setting]: value
            }
            let fileName = `/.kelp/profiles/${selectedProfile}.json`
            let file = new File([JSON.stringify(newSettings)], fileName, {type: "application/json"})
            await Filer.uploadFile(fileName, file)
            setSettings(newSettings)
        }
    }

    async function makeNewProfile(name) {
        let fileName = `/.kelp/profiles/${name}.json`
        let file = new File([JSON.stringify(settings)], fileName, {type: "application/json"})
        await Filer.uploadFile(fileName, file)
        setSelectedProfile({ profile: name })
    } 

    return (
        <ProfileContext.Provider
            value={{
                settings,
                bookmarks,
                options,
                current: selectedProfile.profile,
                switchProfile,
                updateSetting,
                makeNewProfile
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    )

}

export default ProfileContextWrapper
export {
    defaultProfile,
    ProfileContext
}