{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(loadInfo: ResourceLoadState) {
    switch (loadInfo.state) {
      case 'loading':
        console.log('loading...');
        break;
      case 'success':
        console.log(loadInfo.response.body);
        break
      case 'fail':
        console.log(loadInfo.reason);
        break
      default:
        throw new Error(`unknown state: ${loadInfo}`);
    }
  };

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
