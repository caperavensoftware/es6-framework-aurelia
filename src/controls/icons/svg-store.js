export class SvgStore {
    constructor(icons = null) {
        this.icons = icons;
        
        if (!icons) {
            this.icons = System.import('./icons.json!json')
        }
    }
    
    findItemByName(name) {
        let icon = this.icons.images.find((image) => {
            return image.name === name;
        });     
        
        return icon;   
    } 
}
