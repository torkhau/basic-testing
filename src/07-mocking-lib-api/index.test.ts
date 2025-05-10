// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const testData = { data: 'test data' };

  beforeEach(() => {
    jest.clearAllMocks();

    const mockGet = jest.fn().mockResolvedValue({ data: testData });
    const mockAxiosInstance: Partial<AxiosInstance> = {
      get: mockGet,
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance as AxiosInstance);
  });
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/test');
    const mockInstance = mockedAxios.create.mock.results[0]
      ?.value as AxiosInstance;
    if (!mockInstance) {
      throw new Error('Mock instance is undefined');
    }
    expect(mockInstance.get).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/test');

    expect(result).toEqual(testData);
  });
});
