import {getUserFromStorage} from "../shared/utils/getUserFromStorage.ts";
import {MainUser} from "../shared/components/MainUser.tsx";

export const ProfilePage = () => {
    const user = getUserFromStorage()

    return (
        <div>
            {user && <MainUser user={user} />}
        </div>
    )
}