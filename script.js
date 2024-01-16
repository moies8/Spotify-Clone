


async function getsongs(){
    let songs = await fetch("http://127.0.0.1:3000/songs/")
    let response= await songs.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName('a')
    let mysongs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith('.mp3')){
            mysongs.push(element.href)
        }   
    }
    return mysongs
}


async function main(){
    let songs = await getsongs()
    console.log(songs)
    let songUl= document.querySelector('.songlist').getElementsByTagName('li')[0]
    // songUl.innerHTML= songUl.innerHTML + songs
    for (const song of songs) {
        songUl.innerHTML= songUl.innerHTML + song
        
    }
    let audio = new Audio(songs[0])
    // audio.play();
    audio.addEventListener('loadeddata' ,function(){
        console.log(audio.duration)
    })
    
}

main()
