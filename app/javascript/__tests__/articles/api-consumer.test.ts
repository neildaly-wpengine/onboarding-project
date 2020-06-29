import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { consumer, jsonAPIAllArticleResponseData, jsonAPISpecificArticleResponseData } from "./__helpers__/test-data";

jest.mock("axios");

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
});
