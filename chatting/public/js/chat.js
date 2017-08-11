var params = decodeURIComponent(location.href).split('?')[1],
  myNo = parseInt(params.split('&')[0].split('=')[1]),
  yourNo = parseInt(params.split('&')[1].split('=')[1]),
  yourName = params.split('&')[2].split('=')[1],
  message = $('#message'),
  sendBtn = $('#sendBtn'),
  messageBox = $('#messageBox')

console.log(myNo, yourNo, yourName);
var ws = new WebSocket('ws://192.168.0.19:8888/chat/chat.json');
// var ws = new WebSocket('ws://192.168.0.77:8888/chat/chat.json');


var url1 = decodeURIComponent(location.href);
var url2 = location.href.split('?')[0];

history.replaceState(null, null, url2);

ws.onopen = function(event) {
}

ws.onmessage = function(event) {
  console.log(event.data);
  appendMsg(event.data)
  // messageBox.scrollTop(messageBox.prop('scrollHeight'));
};

sendBtn.click(() => {
  var msg = {
    type: "message",
    message: message.val(),
    id: sender,
    date: Date.now()
  };
  var value = JSON.stringify(msg);


  ws.send(value /*.replace('\n', '').replace('\r', '') + '\n'*/ )
  message.val('')
})

message.keyup((e) => {
  if (e.keyCode == 0x0d) {
    var text = message.val().replace('\r', '').replace('\n', '')
    message.val(text)
    sendBtn.click() // send 버튼에 click이벤트 발생시킴, 호출X
  }
})

function appendMsg(event) {
  var text = event.replace(/\r?\n/g, '');
  text = text.replace(/\s/g, "");
  if (!text) return;

  value = event.replace(/\r?\n/g, '<br />');
  $('<div>').addClass('cd-content clearfix')
    .appendTo(messageBox)
    .append($('<span>').addClass( /*isMyAlias ? "me" : */ "you")
      .html(event))
  message.val('')
  message.focus()
  resizeMessageBoxPadding()
  messageBox.scrollTop(messageBox.height())

}

function resizeMessageBoxPadding() {
  var padding = parseFloat(messageBox.css('padding-top'))

  if (padding < 10 || padding == 10) {
    return;
  }

  var lastBalloon = $('.cd-content:last')
  var totalBalloonHeight = parseFloat(lastBalloon.css('height')) +
    parseFloat(lastBalloon.css('margin-top')) +
    parseFloat(lastBalloon.css('margin-bottom')) +
    parseFloat(lastBalloon.css('padding-top')) +
    parseFloat(lastBalloon.css('padding-bottom'));


  var result = padding - totalBalloonHeight;
  if (result < 10) {
    result = 10;
  }

  messageBox.css('padding-top', result + 'px')
} //resizeMessageBoxPadding()
