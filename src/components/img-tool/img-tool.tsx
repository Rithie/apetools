import { Component, State } from '@stencil/core';
import { ResizeTool } from '../../core/ResizeTool';
//import { PlatformSpec } from '../../core/Models';

@Component({
  tag: 'img-tool',
  styleUrl: 'img-tool.css'
})
export class ImgTool {

  @State() tool: ResizeTool;

  componentWillLoad() {
    this.tool = new ResizeTool();

  }

  async process() {

    await this.tool.process();

  }

  downloadZip() {
    this.tool.downloadZip();
  }

  handleChange(type: string, event: any) {
    console.log("Selection changed:" + type + event);

    if (type == "splash") {
      this.tool.selectedSplashFile = event.target.files[0];
    }

    if (type == "icon") {
      this.tool.selectedIconFile = event.target.files[0];
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title> Tool</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>

        <div>
          <h2> Tool</h2>
          <div>
            <p class="lead">Tired of creating all your icons and splashscreen sizes manually? You've come to the right place.</p>
            <p>Upload your Icons and/or Splashscreen and we'll do all the hard work to create the sizes you need for each platform:</p>
            <div class="row">
              <div class="col-md-6">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <div>
                      <div>
                        <h3>1 - Select Your Icon</h3>
                        <div class="input-group file-upload">
                          <p>
                            <input type="file" accept="image/*" id="fileupload-icon" onInput={(event) => this.handleChange('icon', event)} name="FileUploadIcon" />
                          </p>

                        </div>
                        <p>Select an Icon image in PNG format (transparency allowed) measuring 1024x1024 pixels.</p>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="panel panel-default">
                    <div class="panel-body">
                      <h3>2 - Select Your Splashscreen</h3>
                      <div class="input-group file-upload">
                        <input type="file" accept="image/*" id="fileupload-splash" onInput={(event) => this.handleChange('splash', event)} name="FileUploadSplash" />
                      </div>
                      <p>Select a Splashscreen image in PNG format (no transparency) measuring 2048x2048 pixels with the
                            important stuff centred, we'll then resize from the centre outwards, sampling the top left corner colour as background.</p>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <h4>3. Where the magic happens</h4>

                <p>
                  Ready to Punch It?
 <ion-button type="button" onClick={() => this.process()}>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i> Kapow!</ion-button>
                </p>

              </div>
              { /*
              <div v-if="selectedIconFile || selectedSplashFile">

                <h4>3. Where the magic happens</h4>

               {!this.tool.isProcessing && !this.tool.isArchiveReady
                  ? <p>
                    Ready to Punch It?
                <button type="button" onClick={() => this.process()} class="btn btn-primary btn-lg">
                      <i class="fa fa-thumbs-up" aria-hidden="true"></i> Kapow!</button>
                  </p>
                  : ""
                }

                {this.tool.isProcessing
                  ?

                  <div class="progress">
                    TODO: progress bar
                </div>
                  : ""
               
              }

              </div>


              {this.tool.isArchiveReady
                ?
                <div>
                  <button class="btn btn-primary btn-lg" onClick={() => this.downloadZip()}>Download Zip</button>

                </div>
                : ""
              }
     
              <p>We will generate an asset bundle you can download for the following platforms:</p>

              {this.allPlatforms.map((platform) =>
                <div>
                  {platform.title}
                </div>
              )}

            </div>
            */}

              <div class="well well-sm">
                <p> We'd really appreciate it if you could tell others about this app:
                <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://apetools.webprofusion.com" data-text="Check out Ape Tools, the quick way to generate all the icons and splash screens for your app:"
                    data-via="webprofusion">Share</a>
                </p>
                <p>If you like this tool you can help by sharing it with others</p>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
    ];
  }
}
