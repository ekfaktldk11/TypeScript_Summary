
{
    // function: login -> success, fail 둘 중 하나
    type SuccessState = {
        result: 'success';
        response: {
            body: string;
        };
    };
    type FailState = {
        result: 'fail';
        reason: string;
    };
    type LoginState = SuccessState | FailState
    function login(id: string, password: string): LoginState {
        return {
            result: 'success',
            response: { // SuccessState의 response가 아님
                body: 'logged in!',
            },
        };
    };
    // printLoginState(state)
    // success -> body
    // fail -> reason
    function printLoginState(state: LoginState) {
        // success or fail
        if(state.result === 'success'){
            console.log(state.response.body);
        } else {
            console.log(state.reason);
        }
    }
}