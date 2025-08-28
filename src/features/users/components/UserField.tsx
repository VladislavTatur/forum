import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const UserField = ({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) => (
  <Stack>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    {isLink ? (
      <Link href={`https://${value}`} target="_blank" rel="noopener" underline="hover">
        {value}
      </Link>
    ) : (
      <Typography variant="body2">{value}</Typography>
    )}
  </Stack>
);
export default UserField;
