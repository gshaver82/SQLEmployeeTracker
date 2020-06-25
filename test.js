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

  (async function() {
    await yourFunction();
  })();