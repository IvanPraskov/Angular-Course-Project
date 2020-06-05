import { Course } from './course';

export interface User {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    favourites: Course[];
}
