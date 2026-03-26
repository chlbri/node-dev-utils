import { createMachine, interpret, typings } from '@bemedev/app-ts';
import sleep from '@bemedev/sleep';
import { afterAll, beforeEach, describe } from 'vitest';
import { doneTest } from './done';

const machine = createMachine(
  {
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: '/running',
        },
      },
      running: {
        on: {
          STOP: '/idle',
          FINISH: '/done',
        },
      },
      done: {
        entry: 'onDone',
      },
    },
  },
  typings({
    context: 'boolean',
    eventsMap: {
      START: 'primitive',
      STOP: 'primitive',
      FINISH: 'primitive',
    },
  }),
);

describe('DoneTest', () => {
  let service = interpret(machine, { context: false });

  beforeEach(() => {
    service = service.renew;
    service.start();
  });

  afterAll(service.dispose);

  doneTest('#1 => Simple', done => {
    service.addOptions(({ voidAction }) => ({
      actions: {
        onDone: voidAction(done),
      },
    }));

    service.start();

    service.send('START');
    service.send('STOP');
    service.send('START');
    service.send('FINISH');
  });

  doneTest.fails('#2 => Fails', done => {
    service.addOptions(({ voidAction }) => ({
      actions: {
        onDone: voidAction(done),
      },
    }));

    service.send('START');
    service.send('STOP');
    service.send('START');
  });

  doneTest.concurrent(
    '#3 => Concurrent',
    done => {
      const service = interpret(machine, { context: false });
      service.addOptions(({ voidAction }) => ({
        actions: {
          onDone: voidAction(done),
        },
      }));

      service.send('START');
      service.send('STOP');
      service.send('START');

      setTimeout(() => {
        service.send('FINISH');
      }, 100);
    },
    { timeout: 100 },
  );

  doneTest.fails(
    '#4 => Not enough time',
    done => {
      service.addOptions(({ voidAction }) => ({
        actions: {
          onDone: voidAction(done),
        },
      }));

      service.send('START');
      service.send('STOP');
      service.send('START');

      setTimeout(() => {
        service.send('FINISH');
      }, 1000);
    },
    10,
  );

  doneTest.fails(
    '#5 => Adding Async function for only 1 second plus will fails',
    async done => {
      service.addOptions(({ voidAction }) => ({
        actions: {
          onDone: voidAction(done),
        },
      }));

      service.send('START');
      service.send('STOP');
      service.send('START');
      await sleep(1);

      setTimeout(() => {
        service.send('FINISH');
      }, 100);
    },
    100,
  );
});
