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
    object.push(new Cube(50,50,50,50,'fill','blue'));
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
        if(!object[num].fall) return;
        object[num].x += object[num].dx;
        object[num].y += object[num].dy;

        if (object[num].dy < object[num].max) {
            object[num].dy += object[num].dd;
        }
        if (object[num].y + object[num].height >= height) {
            object[num].y = height - object[num].height;
            object[num].dy *= -1;
            object[num].dy /=2;
        }
        if (Math.abs(object[num].dy) < object[num].dd * 2 && object[num].y + object[num].height >= height){
            object[num].dy = 0;
        }
    }
};

let AddWall = function(){
  if (object.length === 0){
      object.push(new Cube(50,50,50,50,'fill','blue'));

  }
};



//Создание новых эл-ов
canvas.onclick = function () {
    let x = MousePoint.X-25;
    let y = MousePoint.Y-25;
    object.push(new Cube(x,y,50,50,'fill','blue'));
};


Game();
//Перерисовка холста
setInterval(function Redraw(){
    Debug();
    Draw();
    Gravity();
}, 1000/60);













