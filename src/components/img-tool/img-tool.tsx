import { Component, State } from '@stencil/core';
import { ResizeTool } from '../../core/ResizeTool';
//import { PlatformSpec } from '../../core/Models';

@Component({
  tag: "img-tool",
  styleUrl: "img-tool.css"
})
export class ImgTool {
  @State() tool: ResizeTool;
  @State() isProcessing: boolean;
  @State() isCompleted: boolean;
  @State() progressMessage: string;
  @State() itemsProcessed: number;
  @State() percentageProcessed: number;

  componentWillLoad() {
    this.tool = new ResizeTool();

    this.isCompleted = false;
    this.isProcessing = false;
  }

  async process() {
    this.isProcessing = true;
    this.isCompleted = false;

    await this.tool.process((msg, percentageProcessed) =>
      this.reportProgress(msg, percentageProcessed)
    );

    this.isProcessing = false;
    this.isCompleted = true;
  }

  reportProgress(msg: string, percentageProcessed: number) {
    this.percentageProcessed = percentageProcessed;
    this.progressMessage = msg;
  }

  downloadZip() {
    this.tool.downloadZip();
  }

  handleChange(type: string, event: any) {
    this.tool.selectionChanged(type, event.target.files[0]);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title> Ape Tools - Image Gorilla</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>


        <div>

          <div>
            <p class="lead">Tired of creating all your icons and splashscreen sizes manually? You've come to the right place.</p>
            <p>Upload your Icons and/or Splashscreen and we'll do all the hard work to create the sizes you need for each platform:</p>
            <ion-grid>
              <ion-row>
                <ion-col>

                  <ion-card>
                    <ion-card-header>
                      1 - Select Your Icon
  </ion-card-header>
                    <ion-card-content>
                      <div class="input-group file-upload">
                        <p>
                          <input type="file" accept="image/*" id="fileupload-icon" onInput={(event) => this.handleChange('icon', event)} name="FileUploadIcon" />
                        </p>

                      </div>
                      <p>Select an Icon image in PNG format (transparency allowed) measuring at least 1024x1024 pixels.</p>
                    </ion-card-content>
                  </ion-card>


                </ion-col>
                <ion-col>
                  <ion-card>
                    <ion-card-header>
                      1 - Select Your Splashscreen
  </ion-card-header>
                    <ion-card-content>
                      <div class="input-group file-upload">
                        <input
                          type="file"
                          accept="image/*"
                          id="fileupload-splash"
                          onInput={event => this.handleChange("splash", event)}
                          name="FileUploadSplash"
                        />
                      </div>
                      <p>Select a Splashscreen image in PNG format (no transparency) measuring at least 2048x2048 pixels with the
                            important stuff centred, we'll then resize from the centre outwards, sampling the top left corner colour as background.</p>
                    </ion-card-content>
                  </ion-card>

                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <div>
                    <h4>3. Where the magic happens</h4>

                    <p>
                      Ready to Punch It?
 <ion-button type="button" onClick={() => this.process()}>
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i> Kapow!</ion-button>
                    </p>

                  </div>

                  <div>
                    {this.progressMessage} {this.percentageProcessed}%
                <div class="progressBar" ></div>
                  </div>

                  {this.isCompleted
                    ?
                    <div>
                      <ion-button onClick={() => this.downloadZip()}>Download Zip</ion-button>

                    </div>
                    : ""
                  }
                </ion-col>
              </ion-row>
            </ion-grid>

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
      </ion-content>
    ];
  }
}
