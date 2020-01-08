export default class Slider {
    constructor({element, animationFunc}){
        this.element       = element;
        this.animationFunc = animationFunc;

        this.index = 0;
        this.count = this.element.length;
    }
}
