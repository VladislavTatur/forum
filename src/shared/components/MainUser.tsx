import type {User} from "../../store/slices/users/usersSliceType.ts";
import {Box, Card, Paper} from "@mui/material";
import {EditableSpan} from "./EditableSpan.tsx";
import {saveUserToStorage} from "../utils/saveUserToStorage.ts";

type MainUserProps = {
    user: User;
}

export const MainUser = ({user}: MainUserProps) => {
    const fields = [
        { key: "name", value: user.name, path: ["name"] },
        { key: "email", value: user.email, path: ["email"]  },
        { key: "website", value: user.website, path: ["website"]  },
        { key: "city", value: user.address?.city, path: ["address", "city"]  },
        { key: "company name", value: user.company?.name, path: ["company", "name"]  },
        { key: "phone", value: user.phone, path: ["phone"]  },
    ];

    const handleChange = (path: (string | number)[], newValue: string) => {
        // создаём копию user
        const updatedUser = { ...user };

        // рекурсивная функция для установки значения по пути
        let current: any = updatedUser;
        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if (!current[key]) current[key] = {};
            current = current[key];
        }
        current[path[path.length - 1]] = newValue;

        saveUserToStorage(updatedUser);
    };

    return (
        <Box   sx={{
            display: 'flex',
            flexWrap: 'wrap',

        }}>
            <Paper variant="outlined"  >
                {user && fields.map((field, index) => (
                    <div key={index} style={{padding: '0 20px 20px 20px'}}>
                        {`${field.key}: `}
                        <EditableSpan title={field.value ?? ''} changeTitle={(newTitle)=> handleChange(field.path, newTitle)}/>
                    </div>

                ))}



            </Paper>
        </Box>

    )
}