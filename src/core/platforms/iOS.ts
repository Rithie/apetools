import { FileSpec, PlatformSpec } from "../Models";

export var iOS: PlatformSpec = {
    id: 'ios',
    path: 'iOS/',
    icon: 'fa-apple',
    title: 'iOS',
    instructions: 'Import into your Xcode project. Right-click Assets.xcassets, Show in finder. Drag and drop the contents of AppIcon.appiconset to replace the defaults. Note that launch images are no longer supported in iOS, instead you should use a Launch Screen storyboard.',
    includeInBundle: true,
    bundleSpecs:
        [
            {
                category: 'icon',
                path: 'AppIcon.appiconset',
                prefix: 'Icon',
                manifest: 'Contents.json',
                useAlpha: true,
                maintainAspectRatio: false,
                resizeFromCentre: false,
                imageSet: [
                    new FileSpec('-20x20@1x.png', 20, 20, null, 'ipad', 1),
                    new FileSpec('-20x20@2x.png', 20, 20, null, 'iphone', 2),
                    new FileSpec('-20x20@3x.png', 20, 20, null, 'iphone', 3),
                    new FileSpec('-29x29@1x.png', 29, 29, null, 'iphone', 1),
                    new FileSpec('-29x29@2x.png', 29, 29, null, 'iphone', 2),
                    new FileSpec('-29x29@3x.png', 29, 29, null, 'iphone', 3),
                    new FileSpec('-40x40@2x.png', 40, 40, null, 'iphone', 2),
                    new FileSpec('-40x40@3x.png', 40, 40, null, 'iphone', 3),
                    new FileSpec('-60x60@2x.png', 60, 60, null, 'iphone', 2),
                    new FileSpec('-60x60@3x.png', 60, 60, null, 'iphone', 3),
                    new FileSpec('-76x76@1x.png', 76, 76, null, 'ipad', 1),
                    new FileSpec('-76x76@2x.png', 76, 76, null, 'ipad', 2),
                    new FileSpec('-83.5@2x.png', 167, 167, null, 'ipad', 2),
                    new FileSpec('-marketing-1024x1024.png', 1024, 1024, null, 'ios-marketing', 1),
                ]
            },
            {
                category: 'splash',
                path: 'LaunchImage.launchimage',
                prefix: 'LaunchImage',
                useAlpha: false,
                maintainAspectRatio: true,
                resizeFromCentre: true,
                imageSet: [
                    /* no longer supported in iOS */
                    new FileSpec('~iphone-320x480.png', 320, 480, null, 'iphone', 1),
                    new FileSpec('~iphone_640x960.png', 640, 960, null, 'iphone', 1),
                    new FileSpec('-568h@2x~iphone_640x1136.png', 640, 1136, null, 'iphone', 1),
                    new FileSpec('-Landscape~ipad_1024x748.png', 1024, 748, null, 'ipad', 1, 'landscape'),
                    new FileSpec('-Landscape~ipad_1024x768.png', 1024, 768, null, 'ipad', 1, 'landscape'),
                    new FileSpec('-Landscape@2x~ipad_2048x1496.png', 2048, 1496, null, 'ipad', 2, 'landscape'),
                    new FileSpec('-Landscape@2x~ipad_2048x1536.png', 2048, 1536, null, 'ipad', 2, 'landscape'),
                    new FileSpec('~ipad.png', 1536, 2008, null, 'ipad', 1, 'portrait'),
                    new FileSpec('-Portrait@2x~ipad_1536x2048.png', 1536, 2048, null, 'ipad', 2, 'portrait'),
                    new FileSpec('-Portrait@2x~ipad_1536x2008.png', 1536, 2008, null, 'ipad', 2, 'portrait'),
                    new FileSpec('.png', 768, 1004, null, 'ipad', 1, 'portrait'),
                    new FileSpec('-Portrait~ipad_768x1024.png', 768, 1024, null, 'ipad', 1, 'portrait'),
                    new FileSpec('-750@2x~iphone6-portrait_750x1334.png', 750, 1334, null, 'iphone', 2, 'portrait'),
                    new FileSpec('-750@2x~iphone6-landscape_1334x750.png', 1334, 750, null, 'iphone', 2, 'landscape'),
                    new FileSpec('-1242@3x~iphone6s-portrait_1242x2208.png', 1242, 2208, null, 'iphone', 3, 'portrait'),
                    new FileSpec('-1242@3x~iphone6s-landscape_2208x1242.png', 2208, 1242, null, 'iphone', 3, 'landscape'),
                    new FileSpec('-2436@3x~iphoneX-portrait_1125x2436.png', 1125, 2436, null, 'iphone', 3, 'portrait'),
                    new FileSpec('-2436@3x~iphoneX-landscape_2436x1125.png', 2436, 1125, null, 'iphone', 3, 'landscape'),
                ]
            }
        ]
};