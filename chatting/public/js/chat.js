var params = decodeURIComponent(location.href).split('?')[1],
  myNo = parseInt(params.split('&')[0].split('=')[1]),
  yourNo = parseInt(params.split('&')[1].split('=')[1]),
  yourName = params.split('&')[2].split('=')[1],
  memberType = parseInt(params.split('&')[3].split('=')[1]),
  message = $('#message'),
  sendBtn = $('#sendBtn'),
  messageBox = $('#messageBox'),
  ws;

console.log(myNo, yourNo, yourName, memberType);
// var ws = new WebSocket('ws://172.20.10.5:8888/chat/chat.json');
// var ws = new WebSocket('ws://192.168.0.19:8888/chat/chat.json');
// var ws = new WebSocket('ws://192.168.0.77:8888/chat/chat.json');


var url1 = decodeURIComponent(location.href);
var url2 = location.href.split('?')[0];
history.replaceState(null, null, url2);

$('.chat-header').text(yourName)
// $('.chat-header').attr('value', yourNo)

messageBox.scrollTop(messageBox.prop('scrollHeight'));

readyChat()

function appendMsg(event, isMyAlias, isSendData) {
  var text = event.replace(/\r?\n/g, '');
  text = text.replace(/\s/g, "");
  if (!text) return;

  var sendValue = event;

  event = event.replace(/\r?\n/g, '<br />');
  $('<div>').addClass('cd-content clearfix')
    .appendTo(messageBox)
    .append($('<span>').addClass(isMyAlias ? "me" : "you")
      .html(event))

  if (isSendData) sendChat(sendValue)

  message.val('')
  message.focus()
  sizeBack()
  resizeMessageBoxPadding()
  messageBox.scrollTop(messageBox.height())

}

function readyChat() {
  ws = new WebSocket('ws://172.20.10.5:8888/chat/chat.json');

  console.log('readyChat 실행됨');
  ws.onopen = function(event) {
    var obj = {
      'you': yourNo,
      'me': myNo,
      'isTrainer': (parseInt(memberType) == 2 ? 'Y' : 'N')
    }
    ws.send(JSON.stringify(obj))
  }

  ws.onmessage = function(event) {
    var data = JSON.parse(event.data)
    console.log(data)
    if (data.sender == 'you') appendMsg(data.message, false, false)
  };
}

function sendChat(value) {
  var obj = {
    'message': value
  }
  ws.send(JSON.stringify(obj))
}

sendBtn.on('click', function() {
  appendMsg(message.val(), true, true)
})

message.keyup(function(e) {
  if (e.keyCode == 13) {
    // var text = message.val().replace('\r', '').replace('\n', '')
    // message.val(text)
    sendBtn.click() // send 버튼에 click이벤트 발생시킴, 호출X
  }
  e.preventDefault()
})

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


function sizeBack() {
  message.css('height', '7vh')
}



//
