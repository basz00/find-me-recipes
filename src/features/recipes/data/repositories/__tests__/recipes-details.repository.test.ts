import { TestScheduler } from "rxjs/testing";
import { RecipesDetailsRepositoryImpl } from "../recipes-details.repository";
import { GetDetailsApi } from "@/features/recipes/data/datasources/get-details.api";
import { SpoonacularMapper } from "@/features/recipes/data/utils";
import { container } from "@/core/di/container";
import { getRandomIngredient } from "@/features/recipes/data/utils/testutils/dummyIngredients";
import { getRandomRecipeDetail } from "@/features/recipes/data/utils/testutils/dummyRecipeDetail";
import { getRandomAnalyzedInstructions } from "@/features/recipes/data/utils/testutils/dummyAnalyzedInstructions";
import { TYPES } from "@/core/di/types";

jest.mock("@/core/di/container");
jest.mock("@/features/recipes/data/datasources/get-details.api");
jest.mock("@/features/recipes/data/utils");

describe("RecipesDetailsRepositoryImpl", () => {
  let repository: RecipesDetailsRepositoryImpl;
  let mockDetailsApi: jest.Mocked<GetDetailsApi>;
  let mockMapper: jest.Mocked<SpoonacularMapper>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    mockDetailsApi = {
      getDetails: jest.fn(),
    } as unknown as jest.Mocked<GetDetailsApi>;

    mockMapper = {
      mapRecipeDetail: jest.fn(),
    } as unknown as jest.Mocked<SpoonacularMapper>;

    (container.get as jest.Mock).mockImplementation((token: unknown) => {
      if (token === TYPES.GetDetailsApi) return mockDetailsApi;
      if (token === TYPES.SpoonacularMapper) return mockMapper;
    });

    repository = new RecipesDetailsRepositoryImpl();
  });

  it("should call API and mapper with correct parameter", async () => {
    const testId = 123;
    const ingredients = [getRandomIngredient()];
    const instructions = [getRandomAnalyzedInstructions()];
    const mockResponse = getRandomRecipeDetail(
      testId,
      "Test Recipe",
      "Test Summary",
      "test.jpg",
      ingredients,
      instructions
    );
    const mappedResponse = {
      id: testId.toString(),
      title: mockResponse.title,
      subtitle: mockResponse.summary,
      image: mockResponse.image,
      ingredients: mockResponse.extendedIngredients.map((i) => i.name),
      instructions: mockResponse.analyzedInstructions.map((i) => ({
        name: i.name,
        steps: i.steps.map((s) => s.step),
      })),
    };

    mockDetailsApi.getDetails.mockResolvedValue(mockResponse);
    mockMapper.mapRecipeDetail.mockReturnValue(mappedResponse);

    await repository.execute(testId);

    expect(mockDetailsApi.getDetails).toHaveBeenCalledWith(testId);
    expect(mockMapper.mapRecipeDetail).toHaveBeenCalledWith(mockResponse);
  });

  it("should emit mapped recipe details", async () => {
    const testId = 123;
    const ingredients = [getRandomIngredient()];
    const instructions = [getRandomAnalyzedInstructions()];
    const mockResponse = getRandomRecipeDetail(
      testId,
      "Test Recipe",
      "Test Summary",
      "test.jpg",
      ingredients,
      instructions
    );
    const mappedResponse = {
      id: testId.toString(),
      title: mockResponse.title,
      subtitle: mockResponse.summary,
      image: mockResponse.image,
      ingredients: mockResponse.extendedIngredients.map((i) => i.name),
      instructions: mockResponse.analyzedInstructions.map((i) => ({
        name: i.name,
        steps: i.steps.map((s) => s.step),
      })),
    };

    mockDetailsApi.getDetails.mockResolvedValue(mockResponse);
    mockMapper.mapRecipeDetail.mockReturnValue(mappedResponse);

    await repository.execute(testId);

    testScheduler.run(async ({ expectObservable }) => {
      const expectedMarble = "a";
      const expectedValues = {
        a: mappedResponse,
      };

      const result$ = repository.observeRecipeDetails();

      expectObservable(result$).toBe(expectedMarble, expectedValues);
    });
  });
});
