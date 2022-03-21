let canv = document.querySelector('#canvas');
let context = canv.getContext('2d');
let flag = false;
let coords = [];
canv.addEventListener('mousedown', function (e) {
        //start painting
        flag = true
})

canv.addEventListener('mouseup', function (e) {
        //flag false - complete paint
        flag = false
        coords.push('mouseup')
        // bug fixed line paint
        context.beginPath();
})
canv.addEventListener('mousemove', function (e) {
        if (flag) {
               // bug fixed line for painting with out gap
                coords.push([e.offsetX, e.offsetY])
               context.lineTo(e.offsetX, e.offsetY);
               context.lineWidth = 10;
               
        context.stroke();
        // circle painting
        context.beginPath();
        context.arc(e.offsetX, e.offsetY, 5, 0, Math.PI * 2);
        context.fill();
        //moving line
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
        
} 
})

let saveBtn = document.querySelector('.save-btn')
let clearBtn = document.querySelector('.clear-btn')
let replayBtn = document.querySelector('.replay-btn')
//
let modal = document.querySelector('.modal')
let text = document.createElement('p')
modal.appendChild(text)
function clear() {
        context.fillStyle ='#bea676'
        context.fillRect(0, 0, canv.width, canv.height);
        context.beginPath()
        context.fillStyle = 'black';
        coords = []
        
}
function replay() {
        let timer = setInterval(() => {
                if (!coords.length) {
                        clearInterval(timer)
                        return
                }

                crd = coords.shift()
                e = {
                        offsetX: crd['0'],
                        offsetY: crd['1']
                };
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                // circle painting
                context.beginPath();
                context.arc(e.offsetX, e.offsetY, 5, 0, Math.PI * 2);
                context.fill();
                //moving line
                context.beginPath();
                context.moveTo(e.offsetX, e.offsetY);
         }, 10)
}
document.addEventListener('click', function (e) {
        if (e.target === saveBtn) {
                localStorage.setItem('coords', JSON.stringify(coords))
                modal.style.display = 'flex'
                text.textContent = 'Дані збережено!'
                setTimeout(() => {
                        modal.style.display = 'none'
                },1500)
        }
        if (e.target === clearBtn) {
                 modal.style.display = 'flex'
                text.textContent = 'Дані видалено!'
                setTimeout(() => {
                        modal.style.display = 'none'
                },1500)
                clear()
                
        }
        if (e.target === replayBtn) {
                
                coords = JSON.parse(localStorage.getItem('coords'))
                context.fillStyle ='#bea676'
                context.fillRect(0, 0, canv.width, canv.height);
                context.beginPath()
                context.fillStyle = 'black';
                replay()
                 modal.style.display = 'flex'
                text.textContent = 'Дані Відтворено!'
                setTimeout(() => {
                        modal.style.display = 'none'
                },1500)
        }
})