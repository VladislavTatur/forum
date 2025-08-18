import {getUserFromStorage} from "../shared/utils/getUserFromStorage.ts";
import {MainUser} from "../shared/components/MainUser.tsx";

export const ProfilePage = () => {
    const user = getUserFromStorage()

    return (
        <>
            {user && <MainUser user={user} />}
        </>
    )
}