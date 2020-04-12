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
        this.intervalSlider = setInterval(() => {
            this.next();
        }, this.speed);
    }

    next()
    {
        this.index++;
        if (this.index >= this.size) {
            this.index = 0;
        }
        this.animationFunc(this.element[this.index]);
    }

    prev()
    {  
        this.index--;
        if (this.index < 0 ) {
            this.index = this.size - 1;
        }
        this.animationFunc(this.element[this.index]);
    }

    stop(){
        clearInterval(this.intervalSlider);
    }
}