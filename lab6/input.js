const targets = document.querySelectorAll('.target');
let isDragging = false;
let isSticky = false;
let offsetX, offsetY;
let currentElement = null;
let originalPosition = { top: 0, left: 0 };

targets.forEach(target => {
    // Обработчик мыши для начала перетаскивания
    target.addEventListener('mousedown', (event) => {
        if (isSticky) return; 

        originalPosition.top = target.style.top;
        originalPosition.left = target.style.left;

        startDragging(target, event.clientX, event.clientY);
    });

    // Обработчик двойного нажатия
    target.addEventListener('dblclick', () => {
        isSticky = true;
        if (currentElement !== target) {
            currentElement = target;
            originalPosition.top = target.style.top || '0px';
            originalPosition.left = target.style.left || '0px';
        }
        target.style.backgroundColor = 'blue'; 
    });

    // Обработчик клика для выхода из режима «следующий за пальцем»
    target.addEventListener('click', () => {
        if (isSticky && currentElement === target) {
            isSticky = false;
            currentElement.style.backgroundColor = 'red';
            currentElement = null; 
        }
    });

    // Обработчики событий сенсорного экрана
    target.addEventListener('touchstart', (event) => {

        originalPosition.top = target.style.top;
        originalPosition.left = target.style.left;

        if (event.touches.length > 1) {
            resetDragging();
            return;
        }
        const touch = event.touches[0];
        if (isSticky) {
            followFinger(touch.clientX, touch.clientY);
        } else {
            startDragging(target, touch.clientX, touch.clientY);
        }
    });

    target.addEventListener('touchmove', (event) => {
        if (isDragging || isSticky) {
            const touch = event.touches[0];
            followFinger(touch.clientX, touch.clientY);
        }
    });

    target.addEventListener('touchend', (event) => {
        if (isSticky) {
            return; // Не останавливаем режим
        }
        if (isDragging) {
            stopDragging();
        }
    });
});

function startDragging(target, clientX, clientY) {
    isDragging = true;
    currentElement = target;

    originalPosition.top = target.style.top || '0px';
    originalPosition.left = target.style.left || '0px';

    offsetX = clientX - target.getBoundingClientRect().left;
    offsetY = clientY - target.getBoundingClientRect().top;
}

function followFinger(clientX, clientY) {
    if (currentElement) {
        currentElement.style.left = (clientX - offsetX) + 'px';
        currentElement.style.top = (clientY - offsetY) + 'px';
    }
}

function stopDragging() {
    isDragging = false;
    currentElement = null;
}

function resetDragging() {
    if (currentElement) {
        currentElement.style.top = originalPosition.top;
        currentElement.style.left = originalPosition.left;
        stopDragging();
    }
}

document.addEventListener('mousemove', (event) => {
    if (isDragging && currentElement) {
        currentElement.style.left = (event.clientX - offsetX) + 'px';
        currentElement.style.top = (event.clientY - offsetY) + 'px';
    } else if (isSticky && currentElement) {
        currentElement.style.left = (event.clientX - offsetX) + 'px';
        currentElement.style.top = (event.clientY - offsetY) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        stopDragging();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentElement) {
        resetDragging();
        currentElement.style.backgroundColor = 'red'; 
        currentElement = null;
    }
});