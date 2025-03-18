import * as SecureStore from 'expo-secure-store';

export interface KeyValueStorage {
  save(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}

export class SecureKeyValueStorage implements KeyValueStorage {
  async save(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  async delete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}

export class KeyValueStorageService {
  private storage: KeyValueStorage;

  constructor(storage: KeyValueStorage = new SecureKeyValueStorage()) {
    this.storage = storage;
  }

  async saveApiKey(apiKey: string): Promise<void> {
    await this.storage.save('SPOONACULAR_API_KEY', apiKey);
  }

  async getApiKey(): Promise<string | null> {
    return await this.storage.get('SPOONACULAR_API_KEY');
  }

  async deleteApiKey(): Promise<void> {
    await this.storage.delete('SPOONACULAR_API_KEY');
  }
}
