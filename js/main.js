let canvas = document.querySelector('#GameField'),
    width = 500,
    height = 500;
canvas.width = `${width}`;
canvas.height = `${height}`;
let canvasLeft = canvas.offsetLeft,
    canvasTop = canvas.offsetTop;

let context = canvas.getContext('2d');
let object = [];

//Debug
let DebugDiv = document.querySelector('#CursorPos');

let CubeId;
let hover = false;


//Координаты курсора
MousePoint  = {
    X : 0,
    Y : 0
};
canvas.onmousemove = function (e) {
    MousePoint.X = e.pageX;
    MousePoint.Y = e.pageY;
    context.strokeRect(MousePoint.X - 25 ,MousePoint.Y - 25,50,50);
};


//Описание блоков
let Cube = function(x,y,w,h,type,color) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
    this.dx = 0.0;
    this.dy = 0.0;
    this.max = 9.8;
    this.dd = 0.3;
    this.fall = true;
};

//Определение начальных блоков
let Game = function() {
    object.push(new Cube(50,250,20,20,'fill','green'));
    object.push(new Cube(50,0,50,150,'fill','gray'));
};





//Отрисовка объектов из массива
let Draw  = function () {
    context.clearRect(0, 0, 500, 500);
    for (let i in object){
        context.fillStyle = object[i].color;
        if (object[i].type === 'fill') {
            context.fillStyle = object[i].color;
            context.fillRect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
        else if (object[i].type === 'stroke') {
            context.strokeRect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
};


document.onkeypress = function (e) {
    object[0].dy -=2;
};


//Выход за границы
let Delete = function () {
    for (let i in object) {
        if (object[i].x+object[i].width<-50) {
            object.splice(i,1);
        }
        else if (object[i].x>550) {
            object.splice(i, 1);
        }
        else if (object[i].y+object[i].height<-50) {
            object.splice(i, 1);
        }
        else if (object[i].y>550) {
            object.splice(i, 1);
        }
    }
};

//Отладка
let Debug = function () {
        CheckHover();
        DebugDiv.innerHTML = 'Позиция курсора: ' + MousePoint.X + '/' + MousePoint.Y + '</br>'
            + 'Курсор на элементе: ' + hover + '</br>'
            + 'Количество объектов на поле: ' + object.length + '</br>'
            + 'ID объекта ' + CubeId + '</br>';

};

let CheckHover = function () {
        hover = false;
        let x = MousePoint.X - canvasLeft;
        let y = MousePoint.Y - canvasTop;
        object.forEach(function (element) {
            {
                element.hover = false;
                if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {
                    //(y, '>', element.y,'&&', y,'<', element.y + element.height,'&&,', x,'>', element.x, '&&', x, '<', element.x + element.width,element);
                    hover = true;
                    CubeId = object.indexOf(element);
                }
            }
        })
};


let Gravity = function (){
    for (let num in object) {
        if(!object[0].fall) return;
        object[0].x += object[0].dx;
        object[0].y += object[0].dy;

        if (object[0].dy < object[0].max) {
            //object[0].dy += object[0].dd;
        }
        if (object[0].y + object[0].height >= height) {
            object[0].y = height - object[0].height;
            object[0].dy *= -0.1;
            object[0].dy /=2;
        }
        if (Math.abs(object[0].dy) < object[0].dd * 2 && object[0].y + object[0].height >= height){
            object[0].dy = 0;
        }
    }
};

let Lose = function () {
    for (let i in object)
  if (object[0].y <= object[i].y + object[i].height) console.log('Loose');
};

let AddWall = function(){
      object.push(new Cube(50,0,50,150,'fill','red'));

};



//Создание новых эл-ов
/*canvas.onclick = function () {
    let x = MousePoint.X-25;
    let y = MousePoint.Y-25;
    object.push(new Cube(x,y,50,50,'fill','blue'));
};*/


Game();
//Перерисовка холста
setInterval(function Redraw(){
    Debug();
    Draw();
    Gravity();
    Lose();
}, 1000/60);













