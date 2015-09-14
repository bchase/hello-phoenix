// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import {Socket} from "deps/phoenix/web/static/js/phoenix"

let chatInput = $('#chat-input')
let messagesContainer = $('#messages')

let socket = new Socket("/socket")
socket.connect()
let chan = socket.channel("rooms:lobby", {})

chatInput.on('keypress', event => {
  if(event.keyCode === 13){
    chan.push("new_msg", {body: chatInput.val()})
    chatInput.val("")
  }
})

chan.on('new_msg', payload => {
  messagesContainer.append(`<br/>[${Date()}] ${payload.body}`)
})

chan.join().receive("ok", chan => {
  console.log("Welcome to Phoenix Chat!")
})
