import axios from "axios";
import { injectable } from "inversify";
import { container } from "../di/container";
import { TYPES } from "../di/types";
import { KeyValueStorage } from "../security/secureStorage";
import { ConfigService } from "../config/configService";

@injectable()
export class SpoonacularApi {
  private api = axios.create({
    baseURL: "https://api.spoonacular.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor(
    private keyValueStorage: KeyValueStorage = container.get(
      TYPES.KeyValueStorage
    ),
    private configService: ConfigService = container.get(TYPES.ConfigService)
  ) {
    // Add request interceptor for API key
    this.api.interceptors.request.use(async (config) => {
      let apiKey = await this.keyValueStorage.get("SPOONACULAR_API_KEY");
      if (!apiKey) {
        const configApiKey = this.configService.spoonacularApiKey;
        await this.keyValueStorage.save("SPOONACULAR_API_KEY", configApiKey);
        apiKey = await this.keyValueStorage.get("SPOONACULAR_API_KEY");
      }

      if (apiKey) {
        config.params = {
          ...config.params,
          apiKey,
        };
      }

      return config;
    });
  }

  get instance() {
    return this.api;
  }
}
