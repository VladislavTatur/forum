export const LOCAL_STORAGE_AUTH_KEY = 'isAuth';

export const userFieldConfigs = [
  { name: 'name', label: 'Name' },
  { name: 'username', label: 'User Name' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email' },
  { name: 'address.street', label: 'Street' },
  { name: 'address.suite', label: 'Suite' },
  { name: 'address.city', label: 'City' },
  { name: 'address.zipcode', label: 'Zipcode' },
  { name: 'website', label: 'Website' },
  { name: 'company.name', label: 'Company' },
  { name: 'company.catchPhrase', label: 'Catch Phrase' },
  { name: 'company.bs', label: 'bs' },
] as const;
