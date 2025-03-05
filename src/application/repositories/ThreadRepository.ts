import type { Result } from 'neverthrow';
import type { ThreadForRead } from '../../domain/read_model/ThreadForRead';
import type { DataNotFoundError, DatabaseError, ValidationError } from '../../types/Error';

/**
 * スレッド取得のリポジトリインターフェース
 */
export interface ThreadRepository {
  /**
   * 全てのスレッドを取得する
   */
  getAllThreads(): Promise<
    Result<ThreadForRead[], DatabaseError | DataNotFoundError | ValidationError>
  >;
}
