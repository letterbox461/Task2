import Joi from "joi";
import controllerTest from "../controllers/test-controller";
import controllerPdf from "../controllers/pdf-controller";

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
      handler: controllerTest.test,
      tags: ["api", "test"],

      plugins: {
        "hapi-swagger": {
          responses: {
            200: {
              description: '{"id":1, "firstName":"Ivan", lastName:"Ivanov"}',
            },
            400: { description: "Bad Request" },
          },
        },
      },
    },
  },

  {
    method: "POST",
    path: "/getPDF",
    options: {
      description: "Получить PDF файл согласно задания 1",
      validate: {
        payload: Joi.object({payload:Joi.array().items(Joi.string().uri())})
      },
      handler: controllerPdf.pdf,
      tags: ["api", "pdf"],

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
