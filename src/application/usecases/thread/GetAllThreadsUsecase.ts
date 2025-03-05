import { inject, injectable } from 'inversify';
import type { Result } from 'neverthrow';
import type { ThreadForRead } from '../../../domain/read_model/ThreadForRead';
import { TYPES } from '../../../types';
import type { DataNotFoundError, DatabaseError, ValidationError } from '../../../types/Error';
import type { ThreadRepository } from '../../repositories/ThreadRepository';

export interface GetAllThreadsUsecase {
  execute(): Promise<Result<ThreadForRead[], DatabaseError | DataNotFoundError | ValidationError>>;
}

@injectable()
export class GetAllThreadsUsecaseImpl implements GetAllThreadsUsecase {
  constructor(@inject(TYPES.ThreadRepository) private threadRepository: ThreadRepository) {}

  async execute(): Promise<
    Result<ThreadForRead[], DatabaseError | DataNotFoundError | ValidationError>
  > {
    return await this.threadRepository.getAllThreads();
  }
}
