import { FileSpec, PlatformSpec } from "../Models";

export var WindowsUWP: PlatformSpec = {
    id: 'windows',
    path: 'windows',
    icon: 'fa-windows',
    title: 'Windows Store',
    instructions: 'Import into your Visual Studio project',
    includeInBundle: true,
    bundleSpecs:
        [
            {
                category: 'icon',
                path: 'icons',
                prefix: 'icon',
                useAlpha: true,
                maintainAspectRatio: false,
                resizeFromCentre: false,
                imageSet: [
                    new FileSpec('ApplicationIcon-16x16.png', 16, 16),
                    new FileSpec('ApplicationIcon-24x24.png', 24, 24),
                    new FileSpec('ApplicationIcon-30x30.png', 30, 30),
                    new FileSpec('ApplicationIcon-32x32.png', 32, 32),
                    new FileSpec('ApplicationIcon-42x42.png', 42, 42),
                    new FileSpec('ApplicationIcon-48x48.png', 48, 48),
                    new FileSpec('ApplicationIcon-50x50.png', 50, 50),
                    new FileSpec('ApplicationIcon-54x54.png', 54, 54),
                    new FileSpec('ApplicationIcon-70x70.png', 70, 70),
                    new FileSpec('ApplicationIcon-90x90.png', 90, 90),
                    new FileSpec('ApplicationIcon-150x150.png', 150, 150),
                    new FileSpec('ApplicationIcon-120x120.png', 120, 120),
                    new FileSpec('ApplicationIcon-210x210.png', 210, 210),
                    new FileSpec('ApplicationIcon-256x256.png', 256, 256),
                    new FileSpec('ApplicationIcon-270x270.png', 270, 270)
                ]
            },
            {
                category: 'splash',
                path: 'splashscreens',
                prefix: 'screen',
                useAlpha: false,
                maintainAspectRatio: true,
                resizeFromCentre: true,
                imageSet: [
                    new FileSpec('Splashscreen-620x300.png', 620, 300),
                    new FileSpec('Splashscreen-868x420.png', 868, 420),
                    new FileSpec('Splashscreen-1116x540.png', 1116, 540),
                ]
            }
        ]
};