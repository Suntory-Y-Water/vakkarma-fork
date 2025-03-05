import { createRoute } from 'honox/factory';
import type { GetAllThreadsUsecase } from '../../src/application/usecases/thread/GetAllThreadsUsecase';
import { TYPES } from '../../src/types';
import { ErrorMessage } from '../components/ErrorMessage';

export default createRoute(async (c) => {
  const container = c.get('container');
  console.log(container);
  if (!container) {
    return c.render(<ErrorMessage error={new Error('コンテナが設定されていません')} />);
  }
  const getAllThreadsUsecase = container.get<GetAllThreadsUsecase>(TYPES.GetAllThreadsUsecase);
  const threadsResult = await getAllThreadsUsecase.execute();

  if (threadsResult.isErr()) {
    return c.render(<ErrorMessage error={threadsResult.error} />);
  }

  const threadTop30 = threadsResult.value;

  return c.render(
    <main className='container mx-auto flex-grow py-8 px-4'>
      <section className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <ul className='flex flex-col gap-2'>
          {threadTop30.map((thread, index) => (
            <li key={thread.threadId.val} className=''>
              <a className='text-purple-600 underline' href={`/threads/${thread.threadId.val}`}>
                {index + 1}: {thread.title.val} ({thread.countResponse})
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-semibold mb-4'>新規スレッド作成</h2>
        <form method='post' action='/threads' className='flex flex-col gap-2'>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              スレッドタイトル:
              <input
                type='text'
                name='title'
                required
                className='border border-gray-400 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              />
            </label>
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              名前:
              <input
                type='text'
                name='name'
                className='border border-gray-400 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              />
            </label>
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              メールアドレス:
              <input
                type='email'
                name='mail'
                className='border border-gray-400 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              />
            </label>
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              本文:
              <textarea
                name='content'
                required
                className='border border-gray-400 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline h-32'
              />
            </label>
          </div>
          <button
            type='submit'
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            新規スレッド作成
          </button>
        </form>
      </section>
    </main>,
  );
});
