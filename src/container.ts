import { Container } from 'inversify';
import 'reflect-metadata';
import type { ThreadRepository } from './application/repositories/ThreadRepository';
import {
  type GetAllThreadsUsecase,
  GetAllThreadsUsecaseImpl,
} from './application/usecases/thread/GetAllThreadsUsecase';
import { ThreadRepositoryImpl } from './infrastructure/repositories/ThreadRepositoryImpl';
import { TYPES } from './types';
import type { DbContext } from './types/DbContext';

export function createContainer(dbContext: DbContext): Container {
  const container = new Container();

  // DbContextを登録
  container.bind<DbContext>(TYPES.DbContext).toConstantValue(dbContext);

  // スレッドリポジトリの登録
  container.bind<ThreadRepository>(TYPES.ThreadRepository).to(ThreadRepositoryImpl);

  // GetAllThreadsUsecaseの登録
  container.bind<GetAllThreadsUsecase>(TYPES.GetAllThreadsUsecase).to(GetAllThreadsUsecaseImpl);
  return container;
}
