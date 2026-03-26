import * as Solid from 'solid-js';

export const createCounter = () => {
  const [count, setCount] = Solid.createSignal(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return { count, increment, decrement, reset };
};

export function Counter() {
  const { count, increment } = createCounter();

  return (
    <button
      class="py-3 px-8  text-cyan-800 rounded-4xl bg-blue-100 min-w-64 cursor-pointer active:ring-2 active:ring-blue-500 active:outline-none"
      onClick={increment}
      type="button"
    >
      Clicks: {count()}
    </button>
  );
}
