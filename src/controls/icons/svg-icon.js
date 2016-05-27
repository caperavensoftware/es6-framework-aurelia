import {customAttribute, inject} from 'aurelia-framework';
import {SvgStore} from './svg-store';

@customAttribute('icon')
@inject(Element, SvgStore)
export class SvgIcon {
    constructor(element, svgStore) {
        this.store = svgStore;
        this.element = element;
        this.element.setAttribute('viewBox', '0 0 128 128');
        this.element.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
        
    bind() {
        const icon = this.store.findItemByName(this.value);
           
        if (icon) {
            this.element.innerHTML = icon.data;
        }
    }    
}



