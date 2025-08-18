import {Box, Paper, type BoxProps} from "@mui/material";
import type {ReactNode} from "react";

type CardProps = BoxProps & {
    children: ReactNode
}

export const Card = ({children, ...props}: CardProps) => {

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
        }}{...props}>
            <Paper variant="outlined" sx={{display: 'flex', flex: 1, flexDirection: 'column'}}>
                {children}
            </Paper>
        </Box>
    )
}