import APIConsumer from "../../../common/api-consumer";
import { Article, User } from "../../../common/types";

export const mockUser: User = {
    firstName: "Test",
    lastName: "User",
    id: "1",
    email: 'test@test.com'
};

export const mockArticle: Article = {
    id: "1",
    title: "Some Fake Title",
    content: "Some dummy content",
    createdAt: "2020-06-24T16:10:53.448Z",
    user: mockUser,
};

export const consumer: APIConsumer = new APIConsumer();

const jsonAPIArticleData = {
    id: "1",
    type: "article",
    attributes: {
        title: "Computer Games Development",
        content: "Lorem ipsum dolor sit ",
        created_at: "2020-06-25T10:07:42.357Z",
    },
    relationships: {
        user: {
            data: {
                id: "1",
                type: "user"
            }
        }

    }
};

const jsonAPIUserData = {
    id: "1",
    type: "user",
    attributes: {
        first_name: "Harry",
        last_name: "Smith",
        initials_image_link: "https://eu.ui-avatars.com/api/?background=fff&color=000&name=Harry+Smith"
    }
};

export const jsonAPIAllArticleResponseData = {
    data: [jsonAPIArticleData],
    included: [jsonAPIUserData]
}

export const jsonAPISpecificArticleResponseData = {
    data: jsonAPIArticleData,
    included: [jsonAPIUserData]
}
