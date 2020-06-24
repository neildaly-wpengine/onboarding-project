export interface Article {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    discardedAt?: string;
    archived: boolean;
    id: string;
    user: User;
    // todo remove this from backend serializer
    userID: number;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    initialsImageLink: string;
}