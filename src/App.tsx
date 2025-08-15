import {Outlet} from "react-router-dom"
import {saveUserToStorage, USER_KEY} from "./shared/utils/saveUserToStorage.ts";
import {currentUser} from "./store/currentUser.ts";
import {Header} from "./shared/components/Header.tsx";

function App() {

    const storageUSer = localStorage.getItem(USER_KEY);
    if (!storageUSer) {
        saveUserToStorage(currentUser);
    }
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default App
