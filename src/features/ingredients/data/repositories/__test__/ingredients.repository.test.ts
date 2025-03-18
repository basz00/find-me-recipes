import { IngredientsRepositoryImpl } from "../ingredients.repository";
import { TestScheduler } from "rxjs/testing";
import { Ingredient } from "../../../domain/entities/ingredient";

describe("IngredientsRepositoryImpl", () => {
  let repository: IngredientsRepositoryImpl;

  beforeEach(() => {
    repository = new IngredientsRepositoryImpl();
  });

  describe("getIngredients", () => {
    it("should return empty array initially", () => {
      expect(repository.getIngredients()).toEqual([]);
    });

    it("should return added ingredients in FIFO order", () => {
      repository.addIngredients(["Tomato", "Onion"]);
      const ingredients = repository.getIngredients();
      expect(ingredients.length).toBe(2);
      expect(ingredients[0].name).toBe("Onion");
      expect(ingredients[1].name).toBe("Tomato");
    });
  });

  describe("observeIngredients", () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it("should emit initial empty array", () => {
      testScheduler.run(({ expectObservable }) => {
        const expected$ = "a";
        const expectedValues = { a: [] as Ingredient[] };
        expectObservable(repository.observeIngredients()).toBe(
          expected$,
          expectedValues
        );
      });
    });

    it("should emit updated ingredients", () => {
      testScheduler.run(({ expectObservable }) => {
        repository.addIngredients(["Garlic"]);
        const expected$ = "a";
        const expectedValues = {
          a: [{ id: expect.any(String), name: "Garlic" }],
        };
        expectObservable(repository.observeIngredients()).toBe(
          expected$,
          expectedValues
        );
      });
    });

    it("should not emit duplicate values", () => {
      testScheduler.run(({ expectObservable }) => {
        const expected$ = "a";
        const expectedValues = {
          a: [{ id: expect.any(String), name: "Tomato" }],
        };

        repository.addIngredients(["Tomato"]);
        repository.addIngredients(["Tomato"]);

        expectObservable(repository.observeIngredients()).toBe(
          expected$,
          expectedValues
        );
      });
    });
  });

  describe("addIngredients", () => {
    it("should add single ingredient", () => {
      const added = repository.addIngredients(["Tomato"]);
      expect(added.length).toBe(1);
      expect(added[0].name).toBe("Tomato");
      expect(repository.getIngredients().length).toBe(1);
    });

    it("should add multiple ingredients", () => {
      const added = repository.addIngredients(["Tomato", "Onion"]);
      expect(added.length).toBe(2);
      expect(repository.getIngredients().length).toBe(2);
    });

    it("should ignore empty strings", () => {
      const added = repository.addIngredients(["", "Tomato", " "]);
      expect(added.length).toBe(1);
      expect(added[0].name).toBe("Tomato");
    });

    it("should add ingredients in reverse order", () => {
      repository.addIngredients(["Tomato", "Onion"]);
      const ingredients = repository.getIngredients();
      expect(ingredients[0].name).toBe("Onion");
      expect(ingredients[1].name).toBe("Tomato");
    });

    it("should generate unique ids", () => {
      const [ingredient1] = repository.addIngredients(["Tomato"]);
      const [ingredient2] = repository.addIngredients(["Onion"]);
      expect(ingredient1.id).not.toBe(ingredient2.id);
    });

    it("should not add duplicate ingredients", () => {
      repository.addIngredients(["Tomato"]);
      const added = repository.addIngredients(["Tomato"]);
      expect(added.length).toBe(0);
      expect(repository.getIngredients().length).toBe(1);
    });
  });

  describe("removeIngredient", () => {
    it("should remove existing ingredient", () => {
      const [added] = repository.addIngredients(["Tomato"]);
      repository.removeIngredient(added.id);
      expect(repository.getIngredients()).toEqual([]);
    });

    it("should not throw when removing non-existent ingredient", () => {
      expect(() => repository.removeIngredient("non-existent")).not.toThrow();
    });

    it("should not modify state when removing non-existent ingredient", () => {
      repository.addIngredients(["Tomato"]);
      const initialIngredients = repository.getIngredients();
      repository.removeIngredient("non-existent");
      expect(repository.getIngredients()).toEqual(initialIngredients);
    });

    it("should remove only one ingredient when multiple have same name", () => {
      const [ingredient1] = repository.addIngredients(["Tomato"]);
      const [ingredient2] = repository.addIngredients(["Tomato"]);
      repository.removeIngredient(ingredient1.id);
      expect(repository.getIngredients()).toEqual([ingredient2]);
    });
  });
});
