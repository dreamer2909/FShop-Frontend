export function tableReducer (state, action) {
    switch (action.type) {
        case 'GET_DATA_TABLE':
            state = action.payload
            return state.map((data, index) => {return {...data, key: index}})

        default:
            return state
    }
}
