import Constants from "expo-constants";

interface AppConfig {
  SPOONACULAR_API_KEY: string;
}

export class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = { SPOONACULAR_API_KEY: "" };
    this.loadConfig();
  }

  private loadConfig() {
    this.config = {
      SPOONACULAR_API_KEY: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY || "",
    };
  }

  get spoonacularApiKey(): string {
    return this.config.SPOONACULAR_API_KEY;
  }
}
