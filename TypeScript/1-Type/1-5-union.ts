{
    /**
     * Union Types: OR 과 같은 의미
     * 모든 가능 case 중에 발생할 수 있는 딱 하나를 담을 수 있는 Type
     */
    type Direction = 'left' | 'right' | 'up' | 'down';
    function move(direction: Direction) {
        console.log(direction);
    }
    move('right');

    type TileSize = 8 | 16 | 32;
    const tile: TileSize = 16;

    // function: login -> success, fail 둘 중 하나
    type SuccessState = {
        response: {
            body: string;
        };
    };
    type FailState = {
        reason: string;
    };
    type LoginState = SuccessState | FailState
    function login(id: string, password: string): LoginState {
        return {
            response: { // SuccessState의 response가 아님
                body: 'logged in!',
            },
        };
    };
    // printLoginState(state)
    // success -> body
    // fail -> reason
    function printLoginState(state: LoginState) {
        if('response' in state){
            console.log(state.response.body);
        } else {
            console.log(state.reason);
        }
    }
}