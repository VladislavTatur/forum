import {AppBar, Toolbar} from "@mui/material";
import {NavButton} from "./NavButton.tsx";
import {Path} from "../routers/routes.tsx";

export const Header = () => {
    return (
        <AppBar position="static" sx={{mb: "30px", backgroundColor: 'grey'}}>
            <Toolbar sx={{display: "flex", gap: "16px"}}>
                <NavButton to={Path.profile} title={"Профиль"}/>
                <NavButton to={Path.home} title={"На главную"}/>
            </Toolbar>
        </AppBar>
    )
}