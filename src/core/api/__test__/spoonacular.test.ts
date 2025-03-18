import { ConfigService } from "@/core/config/configService";
import { container } from "@/core/di/container";
import { KeyValueStorage } from "@/core/security/secureStorage";
import { TYPES } from "../../di/types";
import { SpoonacularApi } from "../spoonacular";

const mockKeyValueStorage: jest.Mocked<KeyValueStorage> = {
  get: jest.fn(),
  save: jest.fn(),
} as unknown as jest.Mocked<KeyValueStorage>;
const mockConfigService: jest.Mocked<ConfigService> = {
  spoonacularApiKey: "TEST_API_KEY",
} as unknown as jest.Mocked<ConfigService>;

// Mock container dependencies
jest.mock("@/core/di/container", () => ({
  container: {
    get: jest.fn(),
  },
}));

(container.get as jest.Mock).mockImplementation((type) => {
  if (type === TYPES.KeyValueStorage) return mockKeyValueStorage;
  if (type === TYPES.ConfigService) return mockConfigService;
  throw new Error(`Mock for ${type} is not implemented`);
});

describe("SpoonacularApi", () => {
  let apiInstance: SpoonacularApi;

  beforeEach(() => {
    jest.clearAllMocks();

    apiInstance = new SpoonacularApi();
  });

  it("should attach apiKey to request params if already stored in keyValueStorage", async () => {
    mockKeyValueStorage.get.mockResolvedValueOnce("STORED_API_KEY");

    // Initialize axios instance
    const axiosInstance = apiInstance.instance;
    const requestConfig = { params: {} };
    const modifiedConfig =
      await axiosInstance.interceptors.request.handlers[0].fulfilled(
        requestConfig
      );

    // Save to keyValueStorage not called
    expect(mockKeyValueStorage.save).not.toHaveBeenCalled();

    // API key that already exists is used
    expect(modifiedConfig.params).toHaveProperty("apiKey", "STORED_API_KEY");
  });

  it("should retrieve apiKey from configService and store it if not found in keyValueStorage", async () => {
    // Initialize axios instance
    const axiosInstance = apiInstance.instance;
    const requestConfig = { params: {} };
    await axiosInstance.interceptors.request.handlers[0].fulfilled(
      requestConfig
    );

    // Once when null, once after save() called
    expect(mockKeyValueStorage.get).toHaveBeenCalledTimes(2);
    // Save to keyValueStorage called
    expect(mockKeyValueStorage.save).toHaveBeenCalledWith(
      "SPOONACULAR_API_KEY",
      "TEST_API_KEY"
    );
  });
});
