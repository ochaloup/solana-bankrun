/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export const enum CommitmentLevel {
  Processed = 0,
  Confirmed = 1,
  Finalized = 2
}
export function startAnchor(path: string, extraPrograms: Array<[string, Uint8Array]>, accounts: Array<[Uint8Array, Account]>, computeMaxUnits?: bigint | undefined | null, transactionAccountLockLimit?: bigint | undefined | null): Promise<ProgramTestContext>
export function start(programs: Array<[string, Uint8Array]>, accounts: Array<[Uint8Array, Account]>, computeMaxUnits?: bigint | undefined | null, transactionAccountLockLimit?: bigint | undefined | null): Promise<ProgramTestContext>
export class Account {
  constructor(lamports: bigint, data: Uint8Array, owner: Uint8Array, executable: boolean, rentEpoch: bigint)
  get lamports(): bigint
  get data(): Uint8Array
  get owner(): Uint8Array
  get executable(): boolean
  get rentEpoch(): bigint
}
export class BlockhashRes {
  blockhash: string
  lastValidBlockHeight: bigint
}
export class TransactionStatus {
  get slot(): bigint
  get confirmations(): bigint | null
  get err(): string | null
  get confirmationStatus(): string | null
}
export class TransactionReturnData {
  get programId(): Uint8Array
  get data(): Uint8Array
}
export class BanksTransactionMeta {
  get logMessages(): Array<string>
  get returnData(): TransactionReturnData | null
  get computeUnitsConsumed(): bigint
}
export class BanksTransactionResultWithMeta {
  get result(): string | null
  get meta(): BanksTransactionMeta | null
}
export class BanksClient {
  getAccount(address: Uint8Array, commitment?: CommitmentLevel | undefined | null): Promise<Account | null>
  sendLegacyTransaction(txBytes: Uint8Array): Promise<void>
  sendVersionedTransaction(txBytes: Uint8Array): Promise<void>
  processLegacyTransaction(txBytes: Uint8Array): Promise<BanksTransactionMeta>
  processVersionedTransaction(txBytes: Uint8Array): Promise<BanksTransactionMeta>
  simulateLegacyTransaction(txBytes: Uint8Array, commitment?: CommitmentLevel | undefined | null): Promise<BanksTransactionResultWithMeta>
  simulateVersionedTransaction(txBytes: Uint8Array, commitment?: CommitmentLevel | undefined | null): Promise<BanksTransactionResultWithMeta>
  getTransactionStatus(signature: Uint8Array): Promise<TransactionStatus | null>
  getTransactionStatuses(signatures: Array<Uint8Array>): Promise<Array<TransactionStatus | undefined | null>>
  getSlot(commitment?: CommitmentLevel | undefined | null): Promise<bigint>
  getBlockHeight(commitment?: CommitmentLevel | undefined | null): Promise<bigint>
  getRent(): Promise<Rent>
  getClock(): Promise<Clock>
  getBalance(address: Uint8Array, commitment?: CommitmentLevel | undefined | null): Promise<bigint>
  getLatestBlockhash(commitment?: CommitmentLevel | undefined | null): Promise<BlockhashRes | null>
  getFeeForMessage(messageBytes: Uint8Array, commitment?: CommitmentLevel | undefined | null): Promise<bigint | null>
}
/** Configuration of network rent. */
export class Rent {
  /**
   * @param lamportsPerByteYear - Rental rate in lamports/byte-year.
   * @param exemptionThreshold - Amount of time (in years) a balance must include rent for the account to be rent exempt.
   * @param burnPercent - The percentage of collected rent that is burned.
   */
  constructor(lamportsPerByteYear: bigint, exemptionThreshold: number, burnPercent: number)
  static default(): Rent
  /** Rental rate in lamports/byte-year. */
  get lamportsPerByteYear(): bigint
  /** Amount of time (in years) a balance must include rent for the account to be rent exempt. */
  get exemptionThreshold(): number
  /** The percentage of collected rent that is burned. */
  get burnPercent(): number
  /**
   * Calculate how much rent to burn from the collected rent.
   *
   * The first value returned is the amount burned. The second is the amount
   * to distribute to validators.
   *
   * @param rentCollected: The amount of rent collected.
   * @returns The amount burned and the amount to distribute to validators.
   */
  calculateBurn(rentCollected: bigint): unknown[]
  /**
   * Minimum balance due for rent-exemption of a given account data size.
   *
   * Note: a stripped-down version of this calculation is used in
   * ``calculate_split_rent_exempt_reserve`` in the stake program. When this
   * function is updated, eg. when making rent variable, the stake program
   * will need to be refactored.
   *
   * @param dataLen - The account data size.
   * @returns The minimum balance due.
   */
  minimumBalance(dataLen: bigint): bigint
  /** Whether a given balance and data length would be exempt. */
  isExempt(balance: bigint, dataLen: bigint): boolean
  /**
   * Rent due on account's data length with balance.
   *
   * @param balance - The account balance.
   * @param dataLen - The account data length.
   * @param yearsElapsed - Time elapsed in years.
   * @returns The rent due.
   */
  due(balance: bigint, dataLen: bigint, yearsElapsed: number): bigint | null
  /**
   * Rent due for account that is known to be not exempt.
   *
   * @param dataLen - The account data length.
   * @param yearsElapsed - Time elapsed in years.
   * @returns The amount due.
   */
  dueAmount(dataLen: bigint, yearsElapsed: number): bigint
  /**
   * Creates a `Rent` that charges no lamports.
   *
   * This is used for testing.
   *
   */
  static free(): Rent
  /**
   * Creates a `Rent` that is scaled based on the number of slots in an epoch.
   *
   * This is used for testing.
   */
  static withSlotsPerEpoch(slotsPerEpoch: bigint): Rent
}
/**
 * A representation of network time.
 *
 * All members of `Clock` start from 0 upon network boot.
 */
export class Clock {
  /**
   * @param slot - The current Slot.
   * @param epochStartTimestamp - The timestamp of the first `Slot` in this `Epoch`.
   * @param epoch - The current epoch.
   * @param leaderScheduleEpoch - The future Epoch for which the leader schedule has most recently been calculated.
   * @param unixTimestamp - The approximate real world time of the current slot.
   */
  constructor(slot: bigint, epochStartTimestamp: bigint, epoch: bigint, leaderScheduleEpoch: bigint, unixTimestamp: bigint)
  /** The current Slot. */
  get slot(): bigint
  /** The current epoch. */
  get epoch(): bigint
  /** The timestamp of the first `Slot` in this `Epoch`. */
  get epochStartTimestamp(): bigint
  /** The future Epoch for which the leader schedule has most recently been calculated. */
  get leaderScheduleEpoch(): bigint
  /** The approximate real world time of the current slot. */
  get unixTimestamp(): bigint
}
export class ProgramTestContext {
  get banksClient(): BanksClient
  get payer(): Uint8Array
  get lastBlockhash(): string
  setAccount(address: Uint8Array, account: Account): void
  setClock(clock: Clock): void
  setRent(rent: Rent): void
  warpToSlot(warpSlot: bigint): void
}
