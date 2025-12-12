import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: `Node.js Express API with Swagger UI
      <br><br>
      <a href="https://github.com/Scheph-96/book_store" target="_blank">Visit Github Repo</a>
      `,
    },
    servers: [
      {
        url: `${process.env.BASE_URL}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
