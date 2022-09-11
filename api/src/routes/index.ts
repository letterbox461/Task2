import Joi from "joi";
import controller from "../controllers/test-controller";

export default [
  {
    method: "GET",
    path: "/test",
    options: {
      description: "Получить данные пользователя из бд по ID",
      validate: {
        query: Joi.object({
          userId: Joi.number().required(),
        }),
      },
      handler: controller.test,
      tags: ["api", "test"],

      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "OK" },
            400: { description: "Bad Request" },
          },
        },
      },
    },
  },
];
