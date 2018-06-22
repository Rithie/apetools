import { FileSpec, PlatformSpec } from "../Models";

export var Android: PlatformSpec = {
    id: 'android',
    path: 'android',
    icon: 'fa-android',
    title: 'Android',
    instructions: 'Import into your Android Studio project',
    includeInBundle: true,
    bundleSpecs:
        [
            {
                category: 'icon',
                path: null,
                prefix: 'icon',
                useAlpha: true,
                maintainAspectRatio: false,
                resizeFromCentre: false,
                imageSet: [
                    new FileSpec('.png', 96, 96, 'drawable'),
                    new FileSpec('.png', 36, 36, 'drawable-ldpi'),
                    new FileSpec('.png', 48, 48, 'drawable-mdpi'),
                    new FileSpec('.png', 72, 72, 'drawable-hdpi'),
                    new FileSpec('.png', 96, 96, 'drawable-xhdpi'),
                    new FileSpec('.png', 152, 152, 'drawable-xxhdpi'),
                    new FileSpec('.png', 192, 192, 'drawable-xxxhdpi')
                ]
            },
            {
                category: 'splash',
                path: null,
                prefix: 'screen',
                useAlpha: false,
                maintainAspectRatio: true,
                resizeFromCentre: true,
                imageSet: [
                    new FileSpec('.png', 480, 800, 'drawable'),
                    new FileSpec('.png', 800, 480, 'drawable-land'),
                    new FileSpec('.png', 200, 320, 'drawable-ldpi'),
                    new FileSpec('.png', 320, 200, 'drawable-land-ldpi'),
                    new FileSpec('.png', 320, 480, 'drawable-mdpi'),
                    new FileSpec('.png', 480, 320, 'drawable-land-mdpi'),
                    new FileSpec('.png', 480, 800, 'drawable-hdpi'),
                    new FileSpec('.png', 800, 480, 'drawable-land-hdpi'),
                    new FileSpec('.png', 720, 1280, 'drawable-xhdpi'),
                    new FileSpec('.png', 1280, 720, 'drawable-land-xhdpi'),
                    new FileSpec('.png', 960, 1600, 'drawable-xxhdpi'),
                    new FileSpec('.png', 1600, 960, 'drawable-land-xxhdpi'),
                    new FileSpec('.png', 1280, 1920, 'drawable-xxxhdpi'),
                    new FileSpec('.png', 1920, 1280, 'drawable-land-xxxhdpi'),
                ]
            }
        ]
};