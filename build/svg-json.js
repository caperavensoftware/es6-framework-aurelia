// https://www.npmjs.com/package/xmldom

import through from 'through2';
import gutil from 'gulp-util';
import xml from 'xmldom';

const DomParser = xml.DOMParser;
const PluginError = gutil.PluginError;
const File = gutil.File;

class SvgConcat {
    constructor() {
        this.images = [];
    }
    
    add(file, contents) {
        const fileName = file.split('.')[0];
        const content = this.getSvgContent(String(contents));
        
        this.images.push({
            name: fileName,
            data: content
        });
    }
    
    getSvgContent(svgString) {       
        const doc = new DomParser().parseFromString(svgString);
        
        const styleElement = doc.getElementsByTagName('svg');
        
        if (!styleElement) {
            throw new Error('no style element found');
        }
        
        if (!styleElement[0].hasChildNodes) {
            throw new Error('svg is empty');
        }
        
        const childNodes = styleElement[0].childNodes;
        
        let result = '';        

        for (let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            if (childNode.tagName !== undefined) {
                if (childNode.hasAttribute('style')) {
                    childNode.removeAttribute('style');
                }
                
                if (childNode.hasAttribute('fill')) {
                    childNode.removeAttribute('fill');
                }

                result += String(childNode);
            }
        }            
                       
        return result;        
    }
    
    getContent() {
        return JSON.stringify({
            images: this.images
        });
    }
}

module.exports = function(file) {
   if (!file) {
       throw new PluginError('svg-json', 'Missing file option for svg-json');
   }    

   let concat = null;     
   
   function bufferContents(bufferFile, enc, cb) {
       if (bufferFile.isNull()) {
           cb();
           return;
       }
       
       if (!concat) {
           concat = new SvgConcat();
       }
       
       concat.add(bufferFile.relative, bufferFile.contents);
       
       cb();       
   }
   
   function endStream(cb) {
       const joinedFile = new File(file);
       joinedFile.path = `./${file}`;
       const stringResult = concat.getContent();

       joinedFile.contents = new Buffer(stringResult);
              
       this.push(joinedFile);
       cb();
   }
   
   return through.obj(bufferContents, endStream);
};