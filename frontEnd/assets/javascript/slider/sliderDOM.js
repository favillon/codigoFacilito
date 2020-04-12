
import Slider from './slider';
import elementData from './sliderElement';

import {localHost} from '../config'; 
let urlPublic = localHost +'public/images/';

let sliderTitle    = document.querySelector("#sliderSubtitle");
let sliderSubtitle = document.querySelector("#sliderSubtitle");
let sliderText     = document.querySelector("#sliderText");
let sliderImage    = document.querySelector("#sliderImage");

let containerText  = document.querySelector(".slider-text");


let slider = new Slider({
    element: [
        {
            title : 'Slider 1',
            subtitle : 'subtitle slider 1',
            image : urlPublic + 'Image_4.jpg',
            text : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
        },
        {
            title : 'Slider 2',
            subtitle : 'subtitle slider 2',
            image : urlPublic + 'Image_5.jpg',
            text : "Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede"
        },
        {
            title : 'Slider 3',
            subtitle : 'subtitle slider 3',
            image : urlPublic + 'Image_6.jpg',
            text : "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis."
        },
        {
            title : 'Slider 4',
            subtitle : 'subtitle slider 4',
            image : urlPublic + 'Image_7.jpg',
            text : "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu"
        },
        {
            title : 'Slider 5',
            subtitle : 'subtitle slider 5',
            image : urlPublic + 'Image_8.jpg',
            text : "Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat."
        }
        ,
        {
            title : 'Slider 6',
            subtitle : 'subtitle slider 6',
            image : urlPublic + 'Image_9.jpg',
            text : "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis."
        }

    ],
    animationFunc :function(element){

        containerText.classList.add("hide");
        sliderImage.classList.add("hide");

        setTimeout(function() {
            sliderTitle.innerHTML    = element.title;
            sliderSubtitle.innerHTML = element.subtitle;
            sliderText.innerHTML     = element.text;
            sliderImage.src          = element.image;

            containerText.classList.remove("hide");
            sliderImage.classList.remove("hide");
        },600);
       
              
    },
    speed: 4000
});
slider.play();
