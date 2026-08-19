import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

import { createTests } from '../vitest-extended/createTests';
import { suppressWarnings } from './suppressWarnings';

describe('suppressWarnings', () => {
  const originalWrite = process.stderr.write;
  const { acceptation } = createTests(suppressWarnings);

  afterAll(() => {
    process.stderr.write = originalWrite;
  });

  describe('#00 => Acceptation', acceptation);

  describe('#01 => Plugin structure', () => {
    const plugin = suppressWarnings();

    test('#01 => name is "suppress-logs-plugin"', () => {
      expect(plugin.name).toBe('suppress-logs-plugin');
    });

    test('#02 => apply is "serve"', () => {
      expect(plugin.apply).toBe('serve');
    });
  });

  describe('#02 => String pattern suppression', () => {
    const spy = vi.fn();

    beforeEach(() => {
      process.stderr.write = spy as any;
      spy.mockClear();
    });

    describe('#01 => matching string chunk', () => {
      let result: boolean;

      beforeEach(() => {
        suppressWarnings('nitro');
        result = process.stderr.write(
          'warning: [nitro] something' as any,
        ) as any;
      });

      test('#01 => returns true', () => expect(result).toBe(true));

      test('#02 => does not call original write', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('#02 => non-matching string chunk', () => {
      let result: any;
      const cb = vi.fn();

      beforeEach(() => {
        spy.mockReturnValue('written');
        suppressWarnings('nitro');
        result = process.stderr.write(
          'info: normal message' as any,
          'utf-8' as any,
          cb as any,
        );
      });

      test('#01 => calls original write with all args', () => {
        expect(spy).toHaveBeenCalledWith(
          'info: normal message',
          'utf-8',
          cb,
        );
      });

      test('#02 => returns original write result', () => {
        expect(result).toBe('written');
      });
    });
  });

  describe('#03 => RegExp pattern suppression', () => {
    const spy = vi.fn();

    beforeEach(() => {
      process.stderr.write = spy as any;
      spy.mockClear();
    });

    describe('#01 => matching regex chunk', () => {
      let result: boolean;

      beforeEach(() => {
        suppressWarnings(/deprecated/i);
        result = process.stderr.write(
          'DEPRECATED: feature x' as any,
        ) as any;
      });

      test('#01 => returns true', () => expect(result).toBe(true));

      test('#02 => does not call original write', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('#02 => non-matching regex chunk', () => {
      beforeEach(() => {
        suppressWarnings(/deprecated/i);
        process.stderr.write('valid log' as any);
      });

      test('#01 => calls original write', () => {
        expect(spy).toHaveBeenCalledWith('valid log');
      });

      test('#02 => call count is 1', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('#04 => Non-string chunk handling', () => {
    const spy = vi.fn();

    beforeEach(() => {
      process.stderr.write = spy as any;
      spy.mockClear();
    });

    describe('#01 => matching Buffer / object with toString()', () => {
      let result: boolean;

      beforeEach(() => {
        suppressWarnings('buffer warning');
        result = process.stderr.write(
          Buffer.from('buffer warning message') as any,
        ) as any;
      });

      test('#01 => returns true', () => expect(result).toBe(true));

      test('#02 => does not call original write', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('#02 => object without matching toString()', () => {
      const chunk = { foo: 'bar' };

      beforeEach(() => {
        suppressWarnings('something else');
        process.stderr.write(chunk as any);
      });

      test('#01 => calls original write', () => {
        expect(spy).toHaveBeenCalledWith(chunk);
      });

      test('#02 => call count is 1', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('#03 => null chunk', () => {
      beforeEach(() => {
        suppressWarnings('pattern');
        process.stderr.write(null as any);
      });

      test('#01 => calls original write with null', () => {
        expect(spy).toHaveBeenCalledWith(null);
      });

      test('#02 => call count is 1', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('#04 => undefined chunk', () => {
      beforeEach(() => {
        suppressWarnings('pattern');
        process.stderr.write(undefined as any);
      });

      test('#01 => calls original write with undefined', () => {
        expect(spy).toHaveBeenCalledWith(undefined);
      });

      test('#02 => call count is 1', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('#05 => Multiple patterns', () => {
    const spy = vi.fn();

    beforeEach(() => {
      process.stderr.write = spy as any;
      spy.mockClear();
      suppressWarnings('first', /second/i);
    });

    describe('#01 => matches first pattern', () => {
      let result: boolean;

      beforeEach(() => {
        result = process.stderr.write('first warning' as any) as any;
      });

      test('#01 => returns true', () => expect(result).toBe(true));

      test('#02 => does not call original write', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('#02 => matches second pattern', () => {
      let result: boolean;

      beforeEach(() => {
        result = process.stderr.write('SECOND warning' as any) as any;
      });

      test('#01 => returns true', () => expect(result).toBe(true));

      test('#02 => does not call original write', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('#03 => matches neither pattern', () => {
      beforeEach(() => {
        process.stderr.write('third message' as any);
      });

      test('#01 => calls original write', () => {
        expect(spy).toHaveBeenCalledWith('third message');
      });

      test('#02 => call count is 1', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('#06 => No patterns provided', () => {
    const spy = vi.fn();

    beforeEach(() => {
      process.stderr.write = spy as any;
      spy.mockClear();
      suppressWarnings();
      process.stderr.write('any message' as any);
    });

    test('#01 => calls original write', () => {
      expect(spy).toHaveBeenCalledWith('any message');
    });

    test('#02 => call count is 1', () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
