import { User } from "./types";

export const createUserInitials = (user: User): string => {
    const userInitials: string = `${user.firstName.charAt(
        0
    )}${user.lastName.charAt(0)}`.toUpperCase();

    return userInitials;
}
