import { TestScheduler } from "rxjs/testing";
import { RecipesDetailsUseCaseImpl } from "../recipes-details.usecase";
import { RecipesDetailsRepository } from "../../repositories/recipes-details.repository";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { RecipeDetail } from "../../entities/recipe";
import { getRandomIngredient } from "@/features/recipes/data/utils/testutils/dummyIngredients";
import { getRandomRecipeDetail } from "@/features/recipes/data/utils/testutils/dummyRecipeDetail";
import { getRandomAnalyzedInstructions } from "@/features/recipes/data/utils/testutils/dummyAnalyzedInstructions";

jest.mock("@/core/di/container");
jest.mock("@/features/recipes/domain/repositories/recipes-details.repository");

describe("RecipesDetailsUseCaseImpl", () => {
  let useCase: RecipesDetailsUseCaseImpl;
  let mockRepository: jest.Mocked<RecipesDetailsRepository>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    mockRepository = {
      execute: jest.fn(),
      observeRecipeDetails: jest.fn(),
    } as unknown as jest.Mocked<RecipesDetailsRepository>;

    (container.get as jest.Mock).mockImplementation((token: unknown) => {
      if (token === TYPES.RecipesDetailsRepository) return mockRepository;
    });

    useCase = new RecipesDetailsUseCaseImpl();
  });

  it("should call repository with correct id", () => {
    const testId = 123;
    useCase.execute(testId);
    expect(mockRepository.execute).toHaveBeenCalledWith(testId);
  });

  it("should return observable from repository", () => {
    testScheduler.run(({ expectObservable }) => {
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
      const mappedResponse: RecipeDetail = {
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

      mockRepository.observeRecipeDetails.mockReturnValue(
        testScheduler.createColdObservable("a", { a: mappedResponse })
      );

      const result$ = useCase.observeRecipeDetails();
      const expectedMarble = "a";
      const expectedValues = { a: mappedResponse };

      expectObservable(result$).toBe(expectedMarble, expectedValues);
    });
  });
});
