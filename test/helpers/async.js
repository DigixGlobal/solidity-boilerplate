export function promiseAll(data, fn) {
  const promises = data.map(function (iterator) {
    return new Promise(function (resolve) {
      return fn(iterator, resolve);
    });
  });
  return Promise.all(promises);
}

export function asyncIterator(data, fn, done) {
  let i = 0;
  function iterate() {
    fn(data[i], () => {
      i++;
      if (i > data.length - 1) {
        done();
      } else {
        iterate();
      }
    });
  }
  iterate();
}
