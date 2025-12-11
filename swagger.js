import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT || 2000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: `Node.js Express API with Swagger UI
      <br><br>
      <a href="https://github.com">Visit Github Repo</a>
      `,
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
