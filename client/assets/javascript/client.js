
const writeEvent = (text) =>  {
  // <UL> ELEMENT
  let parent = document.querySelector('#events');

  // <LI> ELEMENT
  let el = document.createElement('div');
  el.className = "createdDiv";
  el.innerHTML = text;
  // el.style = "margin: 1% 2% 1% 2%;";

  parent.appendChild(el);

  $('#events').scrollTop($('#events')[0].scrollHeight);
};

const onFormSubmitted = (e) => {
  e.preventDefault();

  const input = document.querySelector('#chat');
  console.log(input);
  const text = input.value;
  input.value = '';
  sock.emit('message', text);
};

const addButtonListeners = () => {
  ['rock', 'paper', 'scissors', 'lizard', 'spock'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
      sock.emit('turn', id);
    });
  });
}

let winCount = 0;
$('#winCount').append(winCount);
let tieCount = 0;
$('#tieCount').append(tieCount);
let lossCount = 0;
$('#lossCount').append(lossCount);

const handleResult = (result) => {
  console.log(result);

  if (result == 'win') {
    console.log('winner');
    $('#winCount').empty();
    winCount++;
    $('#winCount').append(winCount);

  } else if (result == 'loss') {
    console.log('loser');
    $('#lossCount').empty();
    lossCount++;
    $('#lossCount').append(lossCount);

  } else {
    console.log('tied game');
    $('#tieCount').empty();
    tieCount++;
    $('#tieCount').append(tieCount);
  }
}

const sock = io();
sock.on('message', writeEvent);
sock.on('result', handleResult);

document
  .querySelector('#chat-form')
  .addEventListener('submit', onFormSubmitted);

addButtonListeners();



