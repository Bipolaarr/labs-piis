const targets = document.querySelectorAll('.target');

let activeElement = null;
let action = null; 
let offsetX, offsetY;
let originalPosition = { top: 0, left: 0 };


targets.forEach(target => {

    let newPositionX = div.offsetY;
    let newPositionY = div.offsetTop;


    target.addEventListener('mousedown', (event) => {

       if (!activeElement) {
        activeElement = target; 
        action = 'move';
        offsetX = event.clientX - div.offsetLeft;
        offsety = event.clientY - div.offsetTop;
        }

    });

    target.addEventListener('dblclick', (event) => {
        if (!activeElement) {
            activeElement = target;
            action = 'dblclick';
            offsetX = event.clientX - div.offsetLeft;
            offsety = event.clientY - div.offsetTop;
            target.style.backgroundColor = 'green'
        }
    });

   
    target.addEventListener('click', (event) => {
        if (target == activeElement && action == 'dblClick') {
            activeElement = null; 
            action = null; 
            newPositionX = div.offsetLeft;
            newPositionY = div.offsetTop;
            target.style.backgroundColor = 'red';
        }
    });
});


document.addEventListener('mousemove', (event) => {
    if (target = activeElement && action) {
        target.style.left = '${event.clientX - offsetX}px'; 
        target.style.top = '${event.clientY - offsetY}px';
    }
});


document.addEventListener('mouseup', (event) => {
    if (div === activeDiv && action === 'move') {
        activeDiv = null;
        action = null;
        newPositionX = div.offsetLeft;
        newPositionY = div.offsetTop;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code == 'Escape' && activeElement == target) {
        escape(); 
    }
});

div.addEventListener("touchstart", (e) => {
    if (!activeElement && action !== 'touch_dblClick') {
      activeElement = target;
      action = 'touch_move';
      offsetX = e.touches[0].clientX - target.offsetLeft;
      offsetY = e.touches[0].clientY - target.offsetTop;
      div.style.zIndex = 1000;
    }
  });

  document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) escape();
  });

  document.addEventListener("touchmove", (e) => {
    if (action) {
      activeElement.style.left = `${e.touches[0].clientX - offsetX}px`;
      activeElement.style.top = `${e.touches[0].clientY - offsetY}px`;
    }
  });

  const isDblTouch = () => {
    const now = new Date().getTime();
    const differenceTime = now - lastTouchTime;
    lastTouchTime = now;
    return (differenceTime < 300);
  }

  const escape = () => {
    activeElement = null;
    action = null;
    activeFinger = false;
    target.style.left = newPositionX + 'px';
    target.style.top = newPositionY + 'px';
    target.style.backgroundColor = 'red';
  }

  div.addEventListener("touchend", (e) => {
    if (div === activeDiv && action === 'touch_move') {
      if (isDblTouch()) {
        action = 'touch_dblClick';
        target.style.backgroundColor = 'green';
        return;
      }
      activeElement = null;
      action = null;
      newPositionX = target.offsetLeft;
      newPositionY = target.offsetTop;
      
    }
  });