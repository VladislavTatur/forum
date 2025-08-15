import {NavLink, type NavLinkProps} from "react-router-dom";
import {Button} from "@mui/material";

type NavButtonProps = NavLinkProps & {
    title: string;
}

export const NavButton = ({ title, ...props}: NavButtonProps) => {

    return (
        <NavLink style={{ textDecoration: 'none' }} {...props}>
            <Button variant="contained">{title}</Button>
        </NavLink>
    )
}