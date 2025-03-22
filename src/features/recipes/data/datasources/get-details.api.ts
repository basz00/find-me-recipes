import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { SpoonacularRecipeDetail } from "../models/recipes";

@injectable()
export class GetDetailsApi {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = container.get<AxiosInstance>(TYPES.SpoonacularApi);
  }

  async getDetails(id: number): Promise<SpoonacularRecipeDetail> {
    const response = await this.api.get(`/recipes/${id}/information`);
    return response.data;
  }
}
