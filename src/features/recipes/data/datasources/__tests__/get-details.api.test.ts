import { GetDetailsApi } from "../get-details.api";
import { AxiosInstance } from "axios";

const mockAxios = {
  get: jest.fn().mockResolvedValue({ data: {} }),
} as unknown as jest.Mocked<AxiosInstance>;

jest.mock("@/core/di/container", () => ({
  container: {
    get: jest.fn().mockImplementation(() => mockAxios),
  },
}));

describe("GetDetailsApi", () => {
  let getDetailsApi: GetDetailsApi;

  beforeEach(() => {
    jest.clearAllMocks();
    getDetailsApi = new GetDetailsApi();
  });

  it("should call correct URL when getting recipe details", async () => {
    const recipeId = 123;
    await getDetailsApi.getDetails(recipeId);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/recipes/${recipeId}/information`
    );
  });
});
