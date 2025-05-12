// Uncomment the code below and write your tests
import fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 2500);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 2500);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 2500);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2500);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 2000);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 2000);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 2000;
    const intervalCount = 5;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    for (let i = 0; i < intervalCount; i++) {
      jest.advanceTimersByTime(interval);
      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

jest.mock('path', () => {
  const originalModule = jest.requireActual('path');

  return {
    join: jest.fn((...args) => originalModule.join(...args)),
  };
});
jest.mock('fs/promises', () => ({
  ...jest.requireActual('fs/promises'),
  readFile: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('some-file.txt');

    expect(path.join).toHaveBeenCalledWith(__dirname, 'some-file.txt');
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');

    existsSyncSpy.mockReturnValue(false);

    await expect(readFileAsynchronously('some-file.txt')).resolves.toBeNull();

    existsSyncSpy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const fileContent = 'Hello, my name is Table!!!';

    existsSyncSpy.mockReturnValue(true);
    (fsPromises.readFile as jest.Mock).mockResolvedValue(fileContent);

    await expect(readFileAsynchronously('some-file.txt')).resolves.toEqual(
      fileContent,
    );
  });
});
