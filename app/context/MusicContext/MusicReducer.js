import { HANDLE_CONTROLLER_MUSIC, HANDLE_CURRENT_MUSIC, HANDLE_CURRENT_TIME, HANDLE_IS_PLAYING, HANDLE_MUSIC_DURATION, HANDLE_ON_SLIDING_CHANGE, LOAD_MUSICS } from "./MusicTypes";


export const MusicReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case LOAD_MUSICS: {
            return {
                ...state,
                listMusic: payload
            }
        }
        case HANDLE_MUSIC_DURATION: {
            return {
                ...state,
                musicDuration: payload
            }
        }
        case HANDLE_CURRENT_MUSIC: {
            return {
                ...state,
                currentSong: payload
            }
        }
        case HANDLE_IS_PLAYING: {
            return {
                ...state,
                isPlaying: payload
            }
        }
        case HANDLE_ON_SLIDING_CHANGE: {
            return {
                ...state,
                onSlidingChange: payload
            }
        }
        
        
        case HANDLE_CONTROLLER_MUSIC: {
            return {
                ...state,
                ...{
                    currentTime:payload.currentTime?payload.currentTime:state.currentTime,
                    musicDuration:payload.musicDuration?payload.musicDuration:state.musicDuration,
                    sliderValeMax:payload.sliderValeMax?payload.sliderValeMax:state.sliderValeMax
                }
               
            }
        }

        
        
    }
}