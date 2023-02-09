//play
export const play = async(playbackObj, uri) => {
    try{
        return await playbackObj.loadAsync(
            {uri:uri}, {shouldPlay:true, progressUpdateIntervalMillis: 1000
            }
            );
    } catch(error){
        console.log("Error al reproducir la cancion: ",error)
    }
}
//pause
export const pause = async(playbackObj) => {
    try{
        return await playbackObj.setStatusAsync({shouldPlay:false});
    } catch(error){
        console.log("Error al pausar la cancion: ",error)
    }
}
//resume
export const resume = async(playbackObj) => {
    try{
        return await playbackObj.playAsync()
    } catch(error){
        console.log("Error al reproducir nuevamente la cancion: ",error)
    }
}
//play another
export const playAnother = async(playbackObj, uri) => {
    try{
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync()
        return await play(playbackObj,uri)
    } catch(error){
        console.log("Error al reproducir nueva cancion: ",error)
    }
}
