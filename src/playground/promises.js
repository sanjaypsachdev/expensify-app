
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'Sanjay',
    //   age: 26
    // })
    reject('Something went wrong');
  }, 5000);
});

console.log('before');

promise.then((data) => {
  console.log("First then method got data", data);
  return "some more data";
}).then((moreData) => {
  console.log("Second then method got data", moreData);
}).catch((error) => {
  console.log(error);
});

console.log('after');