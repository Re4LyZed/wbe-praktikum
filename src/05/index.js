const Song = require('./lib/jasmine_examples/Song.js')
const Player = require('./lib/jasmine_examples/Player.js')

let song = new Song("cool title")
let player = new Player()

player.play(song)

if (player.isPlaying == true) {
    console.log(player.currentlyPlayingSong.title)
}
