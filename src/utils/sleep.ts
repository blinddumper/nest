export let sleep = (time: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, time))
