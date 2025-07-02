import { config } from "dotenv";
import { defineConfig } from "orval";

config();

export default defineConfig({
  loopeld: {
    output: {
      mode: "tags-split",
      target: "src/api/generated/loopeld.ts",
      schemas: "src/api/generated/models",
      client: "react-query",
      clean: true,
      override: {
        mutator: {
          path: "./src/api/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
    input: {
      target: process.env.REACT_APP_API_URL
        ? `${process.env.REACT_APP_API_URL}/mobile/swagger.json`
        : "unknown_url",
    },
  },
});
