import * as fileSaver from 'file-saver';
import JSZip from 'jszip';

export class MockResizeTool {
    constructor() {
    }
    downloadZip() {
        console.log(fileSaver);
        console.log(JSZip);
    }
}