import { HANDLE_LISTNER } from "./MusicTypes";


export const ListenerReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case HANDLE_LISTNER: {
            return {
                ...state,
                isListener: payload
            }
        }
    }
}