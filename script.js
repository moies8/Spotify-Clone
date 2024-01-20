
async function getsongs() {
    let songs = await fetch("http://127.0.0.1:3000/songs/")
    let response = await songs.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName('a')
    let mysongs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith('.mp3')) {
            let a = element.href.split("/songs/")[1]
            mysongs.push(a)
        }
    }
    return mysongs
}
let curruntSong= new Audio();
function playMp3(track, pause=true) {
    curruntSong.src= "/songs/"+track
    if(pause){
        curruntSong.play();
        play.src = "pause.svg"
    }
   
    document.querySelector(".songName").innerHTML=`Playing- ${decodeURI(track)}`
    document.querySelector(".playTime")
}

curruntSong.addEventListener("timeupdate", ()=>{
    console.log(`${curruntSong.currentTime} or ${curruntSong.duration}`)
    document.querySelector(".playTime").innerHTML=`${secondsToMmSs(curruntSong.currentTime)} / ${secondsToMmSs(curruntSong.duration)}`
    document.querySelector(".circale").style.left=(curruntSong.currentTime/curruntSong.duration)*100+"%"
})

let songs;

async function main() {
    songs = await getsongs()

    playMp3(songs[0],false)
    let songUl = document.querySelector('.songlist').getElementsByTagName('ul')[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `
        <li>
        <div class="music_svg">
            <img class="svginvert" src="music.svg" alt="" srcset="">
        </div>
        <div class="info flex">
            <div class="song_name">
            ${song.replaceAll("%20", " ")}  
            </div>
            <div class="singer_name">
                Moies Malik
            </div>
        </div>
        <div class="music_play">
            <img class="svginvert" src="paly.svg" alt="" srcset="">
        </div>
    </li>`;

    }
    
    let picksong=document.querySelector(".songlist").getElementsByTagName("li")
    Array.from(picksong).forEach(e=>{
        e.addEventListener("click", element=>{
            playMp3(e.querySelector(".info").getElementsByTagName("div")[0].innerHTML.trim())
        })
        console.log(e.querySelector(".info").getElementsByTagName("div")[0].innerHTML.trim())
    })
    // Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    //     console.log(e)
    // })
    
    play.addEventListener("click", ()=>{
        if(curruntSong.paused){
            curruntSong.play();
            play.src ="pause.svg"
        }
        else{
            curruntSong.pause();
            play.src = "paly.svg"
        }
    })


    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let persent= (e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circale").style.left=persent + "%"
        function updateSongTime(){
            curruntSong.currentTime = ((curruntSong.duration)*persent)/100
        }
        updateSongTime()
    })


    //eventlistner on hamburger
    document.querySelector(".hamburger").addEventListener("click",(e)=>{
        document.querySelector(".left").style.left="0"

    });

    //close hamburger
    document.querySelector(".closeHamburger").addEventListener("click",(e)=>{
        document.querySelector(".left").style.left="-110%"
    });

    // for next song
    next.addEventListener("click",(e)=>{
        let index= songs.indexOf(curruntSong.src.split("/")[4])
        if((index+1)>=0){
            playMp3(songs[index+1])
        }
    })

    //for previous song
    pre.addEventListener("click",(e)=>{
        curruntSong.pause()
        let index= songs.indexOf(curruntSong.src.split("/")[4])
        if(index-1>songs.length){
            playMp3(songs[index-1])
        }
    })

}

function secondsToMmSs(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if needed
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    remainingSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${remainingSeconds}`;
}

main()
