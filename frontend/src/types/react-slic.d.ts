declare module "react-slick" {
    import { Component } from "react";

    interface Settings {
        dots?: boolean;
        infinite?: boolean;
        speed?: number;
        slidesToShow?: number;
        slidesToScroll?: number;
        arrows?: boolean;
        autoplay?: boolean;
        autoplaySpeed?: number;
        cssEase?: string;
        adaptiveHeight?: boolean;
        beforeChange?: (current: number, next: number) => void;
        afterChange?: (current: number) => void;
        customPaging?: (i: number) => React.ReactNode;
        appendDots?: (dots: React.ReactNode) => React.ReactNode;
    }

    export default class Slider extends Component<Settings> { }
}
