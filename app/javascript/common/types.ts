export interface Article {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    discardedAt?: string;
    archived: boolean;
    id: string;
    user: User;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    initialsImageLink: string;
}