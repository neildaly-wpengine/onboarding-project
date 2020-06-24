export type ArticleProps = {
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    discardedAt?: string;
    archived?: boolean;
    id?: string;
    user: User;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    initialsImageLink: string;
}