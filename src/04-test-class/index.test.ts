// Uncomment the code below and write your tests
import lodash from 'lodash';
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(102);

    expect(account.getBalance()).toBe(102);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(102);

    expect(() => account.withdraw(103)).toThrow(
      'Insufficient funds: cannot withdraw more than 102',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(102);
    const anotherAccount = getBankAccount(0);

    expect(() => account.transfer(103, anotherAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 102',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(102);

    expect(() => account.transfer(10, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);

    expect(account.deposit(2).getBalance()).toBe(102);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(102);

    expect(account.withdraw(2).getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const account = getBankAccount(102);
    const anotherAccount = getBankAccount(0);

    expect(account.transfer(2, anotherAccount).getBalance()).toBe(100);
    expect(anotherAccount.getBalance()).toBe(2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);

    const randomMock = jest.spyOn(lodash, 'random');
    randomMock.mockReturnValueOnce(42).mockReturnValueOnce(1);

    const balance = await account.fetchBalance();
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);

    randomMock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);

    const randomMock = jest.spyOn(lodash, 'random');
    randomMock.mockReturnValueOnce(42).mockReturnValueOnce(1);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(42);

    randomMock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    const randomMock = jest.spyOn(lodash, 'random');
    randomMock.mockReturnValueOnce(42).mockReturnValueOnce(0);

    await expect(account.synchronizeBalance()).rejects.toThrow(Error);

    randomMock.mockRestore();
  });
});
