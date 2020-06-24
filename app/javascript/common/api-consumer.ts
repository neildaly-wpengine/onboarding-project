import axios, { CancelTokenSource } from "axios";
import { Article } from "./types";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

class APIConsumer {
    async getAllArticles(source: CancelTokenSource) {
        return await axios
            .get("/api/v1/articles", { cancelToken: source.token })
            .then((articlesResponse) => {
                return new JSONAPIDeserializer({
                    keyForAttribute: "camelCase",
                }).deserialize(
                    articlesResponse.data,
                    (_err: any, articlesResponseData: Article[]) => {
                        return articlesResponseData;
                    }
                );
            });
    }
}

export default APIConsumer;