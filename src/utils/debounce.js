export default function debounce(fn, waitInMs) {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(...args), waitInMs);
  };
}
