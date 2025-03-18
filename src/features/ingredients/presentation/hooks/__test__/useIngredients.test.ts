import { act, renderHook } from "@testing-library/react";
import { of, Subject } from "rxjs";
import { Ingredient } from "../../../domain/entities/ingredient";
import { ManageIngredientsUseCase } from "../../../domain/usecases/manage-ingredients.usecase";
import { useIngredients } from "../useIngredients";

let ingredientsSubject: Subject<Ingredient[]>;

const mockUseCase: ManageIngredientsUseCase = {
  addIngredients: jest.fn(),
  removeIngredient: jest.fn(),
  observeIngredients: () => ingredientsSubject.asObservable(),
  getIngredients: jest.fn(),
};

describe("useIngredients", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ingredientsSubject = new Subject<Ingredient[]>();
  });

  it("should initialize with empty ingredients", () => {
    const { result } = renderHook(() => useIngredients(mockUseCase));

    expect(result.current.ingredients).toEqual([]);
  });

  it("should update ingredients when observeIngredients emits", () => {
    const { result } = renderHook(() => useIngredients(mockUseCase));
    const mockIngredients = [
      { id: "1", name: "Flour" },
      { id: "2", name: "Sugar" },
    ];

    act(() => {
      ingredientsSubject.next(mockIngredients);
    });

    expect(result.current.ingredients).toEqual(mockIngredients);
  });

  it("should call addIngredients with input", () => {
    const { result } = renderHook(() => useIngredients(mockUseCase));
    const testInput = "Flour, Sugar";

    act(() => {
      result.current.addIngredients(testInput);
    });

    expect(mockUseCase.addIngredients).toHaveBeenCalledWith(testInput);
  });

  it("should call removeIngredient with id", () => {
    const { result } = renderHook(() => useIngredients(mockUseCase));
    const testId = "123";
    act(() => {
      result.current.removeIngredient(testId);
    });

    expect(mockUseCase.removeIngredient).toHaveBeenCalledWith(testId);
  });
});
