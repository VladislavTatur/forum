import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import type { UserType } from '@shared/types/usersType.ts';

type UserFormProps = {
  user: UserType;
  onSave: (updatedUser: UserType) => void;
  onCancel: () => void;
};

export const UserForm = ({ user, onSave, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState(user);
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box display="grid" gap={2}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <TextField
        label="User Name"
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
      />
      <TextField
        label="Phone"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <TextField
        label="Street"
        value={formData.address.street}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, street: e.target.value },
          }))
        }
      />
      <TextField
        label="Suite"
        value={formData.address.suite}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, suite: e.target.value },
          }))
        }
      />
      <TextField
        label="City"
        value={formData.address.city}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, city: e.target.value },
          }))
        }
      />
      <TextField
        label="Zipcode"
        value={formData.address.zipcode}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, zipcode: e.target.value },
          }))
        }
      />
      <TextField
        label="Website"
        value={formData.website}
        onChange={(e) => handleChange('website', e.target.value)}
      />

      <TextField
        label="Company"
        value={formData.company.name}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            company: { ...prev.company, name: e.target.value },
          }))
        }
      />
      <TextField
        label="Catch phrase"
        value={formData.company.catchPhrase}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            company: { ...prev.company, catchPhrase: e.target.value },
          }))
        }
      />
      <TextField
        label="bs"
        value={formData.company.bs}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            company: { ...prev.company, bs: e.target.value },
          }))
        }
      />

      <Box display="flex" gap={2} mt={2}>
        <Button variant="contained" sx={{ minWidth: '100px' }} onClick={() => onSave(formData)}>
          Save
        </Button>
        <Button variant="outlined" sx={{ minWidth: '100px' }} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
