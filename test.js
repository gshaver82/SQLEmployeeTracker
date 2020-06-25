async function f() {

  let promise = new Promise((resolve, reject) => {

    //thing that takes time goes here
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  console.log(result); // "done!"
}

f();


const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}

(async function () {
  await yourFunction();
})();





async function processArray(array) {
  for (const item of array) {
    await delayedLog(item);
  }
  console.log('Done!');
}

Join Zoom Meeting
https://us04web.zoom.us/j/6892503686?pwd=YnBTQnRzME1CYTdiVmhSN3RiK2RGQT09

Meeting ID: 689 250 3686
Password: 439347


https://us04web.zoom.us/j/6892503686?pwd=YnBTQnRzME1CYTdiVmhSN3RiK2RGQT09
