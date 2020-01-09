export default class Slider {
    constructor({element, animationFunc, speed}){
        this.element       = element;
        this.animationFunc = animationFunc;
        this.speed         = speed;

        this.index = 0;
        this.size = this.element.length;
        this.intervalSlider;

        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.stop = this.stop.bind(this);
    }

    play()
    {
        console.log("ingreso play");
        console.log( this.intervalSlider);
        console.log(this.speed);
        
        /*this.intervalSlider = setInterval(() => {
            console.log("tiempo")
            this.next();
        }, this.speed);*/
        
        //var that = this;
        this.intervalSlider = setInterval(function(){            
            this.next();
        },this.speed);
    }

    next()
    {
        console.log("ingreso next");
        this.index++;
        if (this.index >= this.size) {
            this.index = 0;
        }
        console.log(this.element[this.index]);
    }

    prev()
    {
        console.log("ingreso prev");
        this.index--;
        if (this.index < 0 ) {
            this.index = this.size - 1;
        }
        console.log(this.element[this.index]);
    }

    stop(){
        clearInterval(this.intervalSlider);
    }
}

let slider = new Slider({
    element: ['aa', 'bbb', 'ccc', 'ddd', 'eee'],    
    speed: 2000
});
slider.play();