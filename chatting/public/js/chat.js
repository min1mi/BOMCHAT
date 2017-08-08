//
// var messageBox = $('#messageBox'),
// sendBtn = $('#sendBtn'),
// message = $('#message')
//
//
// messageBox.scrollTop(messageBox.prop('scrollHeight'));
// // $('#cd-header').text(회원이름)
//
//
//
// // function displayChatBubbles() {
// //
// //   $.getJSON('/chat/listChat.json', {"musicianNo": musicianNo}, function(result) {
// //     if(result.status != 'success') {
// //       console.error("getJSON() 실패: ", result.status)
// //       return;
// //     }
// //     var msgBoxPadding = parseFloat(messageBox.css('padding-top')) - parseFloat(msgInput.css('height'))
// //     messageBox.css('padding-top', msgBoxPadding)
// //     $.each(result.data.listChat, function(i, item) {
// //       appendChatBubble(item.message, item.senderNo != musicianNo, false)
// //
// //     });
// //
// //   }, function(err) {
// //     console.log(err)
// //   })
// //
// // }
//
//
// function appendChatBubble(value, isMyAlias, isSendData) {
//
// 	/*space나 줄바꿈만 있는 경우 버블을 추가하지 않음.*/
// 	var text = value.replace(/\r?\n/g, '');
// 	text = text.replace(/\s/g, "");
// 	if(!text) return;
//
// 	value = value.replace(/\r?\n/g, '<br />');
//
// 	$('<span>').addClass(isMyAlias ? "me" : "him")
//   .append($('<div>').addClass('cd-content'))
// 	.html(value)
// 	.appendTo(messageBox)
// 	.append($('<img>').attr('src', isMyAlias ? '' : './image/user1.png').addClass(isMyAlias ? '' : 'sender-img'))
// 	.append($('<div>').addClass('tail').addClass(isMyAlias ? "me-tail" : "him-tail"))
// 	.append($('<div>').addClass('tail-white').addClass(isMyAlias ? "me-tail-white" : "him-tail-white"))
//
// 	// if(isSendData) postChat(value)
//
// 	message.val('')
//
// 	message.focus()
// 	sizeBack()
//
// 	resizeMessageBoxPadding()
//
// 	messageBox.scrollTop(messageBox.height())
// }
//
// var ws = new WebSocket('ws://192.168.0.19:8888/chat/chat.json');
// ws.onopen = function (event) {
// }
//
// ws.onmessage = function (event) {
//  console.log(event.data);
// };
//
//
//
// function resizeMessageBoxPadding() {
// 	var padding = parseFloat(messageBox.css('padding-top'))
//
// 	if(padding < 10 || padding == 10) return;
//
// 	var lastBalloon = $('.cd-content:last')
// 	var totalBalloonHeight = parseFloat(lastBalloon.css('height'))
// 							+ parseFloat(lastBalloon.css('margin-top'))
// 							+ parseFloat(lastBalloon.css('margin-bottom'))
// 							+ parseFloat(lastBalloon.css('padding-top'))
// 							+ parseFloat(lastBalloon.css('padding-bottom'));
//
//
// 	var result = padding - totalBalloonHeight;
// 	if(result < 10) {
// 		result = 10;
// 	}
//
// 	messageBox.css('padding-top', result + 'px')
// }
//
//
// sendBtn.on('click', function() {
//   appendChatBubble(message.val(), true, true)
// })
//
// message.keyup(function (e) {
//   if (e.keyCode == 13) {
//     var text = message.val().replace('\r', '').replace('\n', '')
//     message.val(text)
//     sendBtn.click()
//   }
//   e.preventDefault()
// })
//
// function sizeUp() {
//     message.css('height', message.prop('scrollHeight') + 12 + 'px');
//     // msgInputBox.css('height', msgInputBox.prop('scrollHeight') + 12 + 'px');
//     // msgInputBox.css('line-height', msgInputBox.prop('scrollHeight') + 12 + 'px');
//   }
//
// function sizeBack() {
//   message.css('height', '4vh')
//   // msgInputBox.css('height', '7vh')
//   // msgInputBox.css('line-height', '7vh')
// }

var message = $('#message'),
    sendBtn = $('#sendBtn');

var ws = new WebSocket('ws://192.168.0.77:8888/chat/chat.json');
ws.onopen = function (event) {
}

ws.onmessage = function (event) {
 console.log(event.data);
};


sendBtn.click(() => {
  var value = message.val();
  ws.send(value.replace('\n', '').replace('\r', '') + '\n')
  message.val('')

})

message.keyup((e) => {
  if (e.keyCode == 0x0d) {
    var text = message.val().replace('\r', '').replace('\n', '')
    message.val(text)
    sendBtn.click() // send 버튼에 click이벤트 발생시킴, 호출X
  }
})
