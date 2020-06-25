import { User, Article } from "../../../common/types";
import APIConsumer from "../../../common/api-consumer";

const mockUser: User = {
    firstName: "Test",
    lastName: "User",
    id: "1",
};

export const mockArticle: Article = {
    id: "10",
    title: "Some Fake Title",
    content: "Some dummy content",
    createdAt: "2020-06-24T16:10:53.448Z",
    user: mockUser,
};

export const consumer: APIConsumer = new APIConsumer();