export type Geo = {
    lat: string;
    lng: string;
}

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
}

export type User = {
    id: number | null;
    name: string | null;
    username: string | null;
    email: string | null;
    address: Address | null;
    phone: string | null;
    website: string | null;
    company: Company | null;
}