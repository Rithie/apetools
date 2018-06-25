import JSZip from 'jszip/dist/jszip';
import * as fileSaver from 'file-saver';
import Pica from 'pica/dist/pica';
import { setTimeout } from 'timers';

import { Logger } from './Logger';
import { PlatformSpec, RGBA, BundleSpec, ImageSpec, ImageDataSet } from './Models';
import { iOS } from './platforms/iOS';
import { Android } from './platforms/Android';
import { WindowsUWP } from './platforms/WindowsUWP';

export class ResizeTool {

    protected logger: Logger;

    msg: string = '';
    allPlatforms: Array<PlatformSpec> = null;
    zipArchive: JSZip;
    itemsProcessed: number = 0;
    isArchiveReady: boolean = false;
    isProcessing: boolean = false;
    selectedIconFile: any = null;
    selectedSplashFile: any = null;
    processingProgress: number = 0;
    totalTasks: number = 0;

    iconSrcData: string = null;
    iconImgData: ImageData = null;
    splashSrcData: string = null;
    splashImgData: ImageData = null;
    splashColourSample: RGBA = null;

    pica: Pica;

    constructor() {
        if (!this.logger) this.logger = new Logger();

        this.setupSpecs();

        //TODO: init JSzip  // prepare new zip for archive
        this.zipArchive = new JSZip();
        this.pica = new Pica();
    }

    setupSpecs() {
        this.allPlatforms = new Array<PlatformSpec>();

        this.allPlatforms.push(iOS);
        this.allPlatforms.push(Android);
        this.allPlatforms.push(WindowsUWP);
    }

    selectionChanged(imageType: string, file: any) {
        // icon/splash changed

        if (imageType === 'splash') {
            this.selectedSplashFile = file;
        }

        if (imageType === 'icon') {
            this.selectedIconFile = file;
        }
    }

    samplePixelValue(imagedata: ImageData, sampleX: number, sampleY: number): RGBA {

        //  get pixelArray from imagedata object
        let data = imagedata.data;

        //  image data is array of RGBA values (4 bytes). Pixel sample offset is Y value * width of image, plus X pixels across. 
        let i = ((sampleY * imagedata.width) + sampleX) * 4;

        //  get RGBA values
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        let result: RGBA = {
            r: r,
            g: g,
            b: b,
            a: a
        };
        return result;
    }

    simpleImageResize(img, canvas): Promise<ImageData> {
        // resize the given image onto the destination canvas
        let imgDataPromise = new Promise<ImageData>((resolve) => {
            let context = canvas.getContext('2d');


            // canvas.width = img.width;
            // canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            // context.drawImage(img, img.width, img.height);
            setTimeout(() => {
                let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                resolve(imgData);
            }, 500);
        });

        return imgDataPromise;
    }

    getImageData(imgSrcData: string): Promise<ImageData> {

        let imgDataPromise = new Promise<ImageData>((resolve) => {

            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');

            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                setTimeout(() => {
                    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                    resolve(imgData);
                }, 500);

                return;
            };

            img.src = imgSrcData;
        });

        return imgDataPromise;
    }

    transformAndArchive(platSpec: PlatformSpec, bundleSpec: BundleSpec, fileSpec: ImageSpec, srcImage: ImageDataSet) {

        return new Promise<any>((resolve) => {

            // create new canvas for our target image render
            let canvas = document.createElement('canvas');

            let newWidth = fileSpec.width;
            let newHeight = fileSpec.height;

            if (fileSpec.scale != null) {
                newWidth = fileSpec.width * fileSpec.scale;
                newHeight = fileSpec.height * fileSpec.scale;
            }

            // TODO: for fixed aspect ratio, work out largest width or height
            // for resize from centre, sample corner value and fill canvas, then centre resized image in canvas
            canvas.width = newWidth;
            canvas.height = newHeight;

            if (bundleSpec.maintainAspectRatio) {
                // let aspectRatio = srcImage.imgData.width / srcImage.imgData.height;

                if (fileSpec.width > fileSpec.height) {

                    // original height / original width * new width = new height
                    // landscape aspect

                    let maxDimension = fileSpec.height;
                    canvas.width = maxDimension;
                    canvas.height = (srcImage.imgData.height / srcImage.imgData.width) * maxDimension;

                } else {
                    // portrait aspect
                    // original width / original height * new height = new width

                    let maxDimension = fileSpec.width;
                    canvas.width = (srcImage.imgData.width / srcImage.imgData.height) * maxDimension;
                    canvas.height = maxDimension;
                }
            }

            const img = new Image();

            img.onload = () => {


                // if image has no alpha, fill with background color based on sample
                console.log(`resizing ${img.width} x ${img.height} to ${fileSpec.width} x ${fileSpec.height}  canvas: ${canvas.width}x${canvas.height}`);
                this.pica.resize(img, canvas, {
                    unsharpAmount: 80,
                    unsharpRadius: 0.6,
                    unsharpThreshold: 2,
                    alpha: bundleSpec.useAlpha
                })
                    .then(() => {

                        if (bundleSpec.maintainAspectRatio) {
                            let destCanvas = document.createElement('canvas');
                            destCanvas.width = fileSpec.width;
                            destCanvas.height = fileSpec.height;

                            let sample: RGBA = this.splashColourSample;

                            let ctx = destCanvas.getContext('2d');
                            ctx.fillStyle = 'rgb(' + sample.r + ',' + sample.g + ',' + sample.b + ')';
                            ctx.fillRect(0, 0, destCanvas.width, destCanvas.height);
                            // centre destination coord to draw image to
                            let destx = (destCanvas.width - canvas.width) / 2;
                            let desty = (destCanvas.height - canvas.height) / 2;
                            if (destx < 0) destx = 0;
                            if (desty < 0) desty = 0;

                            console.log(`fileSpec ${fileSpec.width}x${fileSpec.height} : Src img: ${srcImage.imgData.width}x${srcImage.imgData.height} , Src Canvas ${canvas.width} x ${canvas.height} Dest: ${destCanvas.width} x ${destCanvas.height} destX:${destx}, destY:${desty}`);
                            ctx.drawImage(canvas, destx, desty);
                            canvas = destCanvas;
                        }

                        console.log('resize done, adding to bundle.');

                        // take generated image and archive it in our bundle
                        let imgData = canvas.toDataURL('image/png');

                        fileSpec.imgData = imgData;

                        let imgFolder = this.zipArchive.folder('bundle');

                        imgFolder = imgFolder.folder(platSpec.path);
                        if (bundleSpec.path) imgFolder = imgFolder.folder(bundleSpec.path);
                        if (fileSpec.path) imgFolder = imgFolder.folder(fileSpec.path);
                        let imgDataBase64 = imgData.replace(/^data:image\/(png|jpg);base64,/, '');

                        // add file to zip folder
                        imgFolder.file(bundleSpec.prefix + fileSpec.fileName, imgDataBase64, { base64: true });

                        return resolve(true);

                    });

            };

            // trigger image load for source image, which then triggers processing onload
            img.src = srcImage.imgSrcDataBase64;
        });

    }

    downloadZip() {
        this.zipArchive.generateAsync({ type: 'blob' })
            .then((content) => {
                // see FileSaver.js
                fileSaver.saveAs(content, 'ApeToolsGeneratedAssets.zip');
            });
    }

    appendToManifest(generatedManifest: any, bundleSpec: BundleSpec, itemSpec: ImageSpec) {
        generatedManifest.images.push({
            'idiom': itemSpec.idiom,
            'size': itemSpec.width + 'x' + itemSpec.height,
            'scale': itemSpec.scale + 'x',
            'filename': bundleSpec.prefix + itemSpec.fileName
        });
    }

    getSourceImageForProcessing(srcItemCategory: string, srcItemBlob: any): Promise<ImageDataSet> {

        let promise = new Promise<any>((resolve) => {
            if (srcItemCategory === 'icon' && this.iconSrcData != null) {
                resolve({
                    imgSrcDataBase64: this.iconSrcData,
                    imgData: this.iconImgData
                });
                return;

            }

            if (srcItemCategory === 'splash' && this.splashSrcData != null) {
                resolve({
                    imgSrcDataBase64: this.splashSrcData,
                    imgData: this.splashImgData
                });
                return;

            }

            // not got cached values, read image data blob and process

            let reader = new FileReader();

            reader.addEventListener('load', () => {
                let srcData = reader.result;

                // use setTimeout to allow image time to complete load, otherwise reading image data doesn't always work
                setTimeout(() => {

                    return this.getImageData(srcData).then((imgData) => {

                        // cache values
                        if (srcItemCategory === 'icon') {
                            this.iconSrcData = srcData;
                            this.iconImgData = imgData;
                        }

                        if (srcItemCategory === 'splash') {
                            this.splashSrcData = srcData;
                            this.splashImgData = imgData;
                        }

                        resolve({
                            imgSrcDataBase64: srcData,
                            imgData: imgData
                        });
                        return;
                    });

                }, 500);

            }, false);


            // fire above load event for file
            reader.readAsDataURL(srcItemBlob);
        });

        return promise;

    }

    async process(reportProgress: (msg: string, percentageProcessed: number) => any) {

        this.msg = 'Processing..';
        this.logger.info('Begin processing..');

        reportProgress(this.msg, 0);

        this.isProcessing = true;
        this.isArchiveReady = false;
        let numTasks = 0;

        // compute total number of tasks to perform and compile manifests if required
        for (let platformSpec of this.allPlatforms) {
            if (platformSpec.includeInBundle) {
                for (let bundleSpec of platformSpec.bundleSpecs) {
                    let generatedManifest = null;

                    // optionally generate a manifest file
                    if (bundleSpec.manifest != null && platformSpec.id === 'ios') {
                        generatedManifest = {
                            'images': [],
                            'info': { 'version': 1, 'author': 'apetools.webprofusion.com' }
                        };
                    }

                    for (let itemSpec of bundleSpec.imageSet) {
                        if ((bundleSpec.category === 'icon' && this.selectedIconFile) || (bundleSpec.category === 'splash' && this.selectedSplashFile)) {
                            if (generatedManifest) this.appendToManifest(generatedManifest, bundleSpec, itemSpec);
                            numTasks++;
                        }
                    }

                    if (bundleSpec.manifest != null) {
                        bundleSpec.manifest = generatedManifest;
                        this.logger.info(JSON.stringify(bundleSpec.manifest));
                    }
                }
            }
        }

        this.totalTasks = numTasks;

        this.logger.info(`Generating ${this.totalTasks} assets for bundle..`);

        if (this.totalTasks > 0) {
            // process the images for each platform
            this.processingProgress = 0;

            // cache image data
            if (this.selectedIconFile) await this.getSourceImageForProcessing('icon', this.selectedIconFile);
            if (this.selectedSplashFile) {
                await this.getSourceImageForProcessing('splash', this.selectedSplashFile);

                // sample splash corner colour for canvas fill
                this.splashColourSample = this.samplePixelValue(this.splashImgData, 0, 0);
            }

            for (let platformSpec of this.allPlatforms) {
                if (platformSpec.includeInBundle) {
                    for (let bundleSpec of platformSpec.bundleSpecs) {
                        for (let itemSpec of bundleSpec.imageSet) {
                            let srcItem = null;

                            if (bundleSpec.category === 'icon') {
                                srcItem = this.selectedIconFile;
                            }

                            if (bundleSpec.category === 'splash') {
                                srcItem = this.selectedSplashFile;
                            }

                            if (srcItem != null) {

                                setTimeout(async () => {
                                    await this.getSourceImageForProcessing(bundleSpec.category, srcItem).then((imgBundle: ImageDataSet) => {

                                        this.transformAndArchive(platformSpec, bundleSpec, itemSpec, imgBundle)
                                            .then(() => {

                                                this.itemsProcessed++;

                                                this.processingProgress = Math.round(this.itemsProcessed / this.totalTasks * 100);
                                                this.msg = 'Processing Item ' + this.itemsProcessed + ' of ' + this.totalTasks;

                                                reportProgress(this.msg, this.processingProgress);

                                                this.logger.info(this.msg);
                                                if (this.processingProgress === 100) {
                                                    this.isArchiveReady = true;
                                                    this.isProcessing = false;
                                                }


                                            });
                                    });
                                }, 1000);
                            }
                        }

                        // optionally include generated manifest in archive
                        if (bundleSpec.manifest) {
                            // append manifest to archive
                            let imgFolder = this.zipArchive.folder('bundle');
                            imgFolder = imgFolder.folder(platformSpec.path);
                            imgFolder = imgFolder.folder(bundleSpec.path);
                            imgFolder.file('Contents.json', JSON.stringify(bundleSpec.manifest, null, '\t'));
                        }
                    }
                }
            }

            this.logger.info(`Bundle generation completed.`);
        } else {
            this.logger.info('Nothing to do..');
            this.isProcessing = false;

            alert('The apes are bored, there\'s nothing to do. \nMaybe set an icon or splashscreen and check a few platforms?');
        }
    }
}
