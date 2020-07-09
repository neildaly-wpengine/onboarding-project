import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import humps from "humps";
import { consumer, jsonAPIAllArticleResponseData, jsonAPISpecificArticleResponseData } from "./articles/__helpers__/test-data";
import { registrationBody, successfulRegistrationResponse } from "./auth/__helpers__/test-data";
import { CreateArticleBody, DeleteResponse } from "../common/types";
import { cleanup } from "@testing-library/react";

jest.mock("axios");

afterEach(() => {
    cleanup;
    jest.clearAllMocks();
})

describe('API Consumer', () => {

    test('all articles are successfully returned', async () => {
        const expectedResponse = {
            data: jsonAPIAllArticleResponseData,
        };

        (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve(expectedResponse),
        );

        const allArticles = await consumer.getAllArticles();

        expect(axios.get).toHaveBeenCalledWith(
            '/api/v1/articles',
        );
        expect(allArticles[0].title).toEqual(expectedResponse.data.data[0].attributes.title)
        expect(allArticles[0].content).toEqual(expectedResponse.data.data[0].attributes.content)

    });

    test('specific articles are successfully returned', async () => {
        const expectedResponse = {
            data: jsonAPISpecificArticleResponseData,
        };
        const articleID: string = expectedResponse.data.data.id;

        (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve(expectedResponse),
        );

        const specificArticle = await consumer.getSpecificArticle(articleID);

        expect(axios.get).toHaveBeenCalledWith(
            `/api/v1/articles/${articleID}`,
        );
        expect(specificArticle.title).toEqual(expectedResponse.data.data.attributes.title)
        expect(specificArticle.content).toEqual(expectedResponse.data.data.attributes.content)
    });

    test('a user can successfully register', async () => {
        (axios.post as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve(successfulRegistrationResponse),
        );

        const registrationResponse = await consumer.registerNewUser(registrationBody);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/v1/registrations', humps.decamelizeKeys(registrationBody), { withCredentials: true }
        );
        expect(registrationResponse.status).toEqual(successfulRegistrationResponse.status);
        expect(registrationResponse.user.firstName).toEqual(successfulRegistrationResponse.user.first_name);
        expect(registrationResponse.user.lastName).toEqual(successfulRegistrationResponse.user.last_name);
        expect(registrationResponse.user.initialsImageLink).toEqual(successfulRegistrationResponse.user.initials_image_link);
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('a user can successfully logout', async () => {
        const expectedResponse = {
            data: {
                "status": 200,
                "loggedOut": true
            }
        };
        (axios.delete as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve(expectedResponse),
        );

        const logoutResponse = await consumer.destroySession();

        expect(axios.delete).toHaveBeenCalledWith('/api/v1/logout');

        expect(logoutResponse.data.status).toEqual(expectedResponse.data.status);
        expect(logoutResponse.data.loggedOut).toBe(expectedResponse.data.loggedOut);
        expect(axios.delete).toHaveBeenCalledTimes(1);
    });

    test('articles are successfully created', async () => {
        const expectedResponse = {
            data: jsonAPISpecificArticleResponseData,
        };

        (axios.post as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve(expectedResponse),
        );

        const body: CreateArticleBody = {
            article: {
                title: jsonAPISpecificArticleResponseData.data.attributes.title,
                content: jsonAPISpecificArticleResponseData.data.attributes.content,
                userId: jsonAPISpecificArticleResponseData.included[0].id
            }
        };
        const specificArticle = await consumer.createArticle(body);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(specificArticle.title).toEqual(body.article.title)
    });

    test('articles are successfully deleted', async () => {
        const expectedResponse = {
            data: {
                id: '1',
                discardedAt: 'Tue, 07 Jul 2020 12:39:00 UTC +00:00'
            },
        };

        (axios.delete as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve(expectedResponse),
        );

        const response: DeleteResponse = await consumer.deleteArticle(expectedResponse.data.id);

        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(axios.delete).toHaveBeenCalledWith(`/api/v1/articles/${expectedResponse.data.id}`,
            { "withCredentials": true })
        expect(response.data.id).toEqual(expectedResponse.data.id);
        expect(response.data.discardedAt).toEqual(expectedResponse.data.discardedAt);
    });
});
