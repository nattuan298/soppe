// For services that to be shared in multiple modules
// place it in `src/services`

export async function fakeSignin() {
  await delay(1000);
}

// ***************************************
// private
function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
