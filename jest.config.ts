import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  roots: ["src", "test"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};

export default config;
