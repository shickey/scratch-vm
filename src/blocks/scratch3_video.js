const uid = require('../util/uid');

class Scratch3VideoBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        /**
         * Maps each video playback promise to a unique ID
         * so that they can be accessed from outside JS
         */
        this.videoPromiseRegistry = {};

        window.resolveVideoPromise = (resolveId) => {
            this.videoPromiseRegistry[resolveId]();
        }
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            video_playuntildone: this.playVideoUntilDone
        };
    }

    playVideoUntilDone (args, util) {
        // const index = this._getSoundIndex(args.SOUND_MENU, util);
        // if (index >= 0) {
        //     const soundId = util.target.sprite.sounds[index].soundId;
        //     if (util.target.audioPlayer === null) return;
        //     return util.target.audioPlayer.playSound(soundId);
        // }

        console.log("playing video");

        return new Promise( resolve => {
            // Store the resolve id so that we can call
            // it from outside JS
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            console.log(resolveId);
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'startPlayback',
                    args: [],
                    resolveId: resolveId
                });
            }
        });

        // Start video and begin timer
        // if (!util.stackFrame.timer) {
        //     // If extension interface is available, send video start command
        //     if (typeof window.ext !== 'undefined') {
        //         window.ext.postMessage({
        //             extension: 'video',
        //             method: 'startPlayback',
        //             args: []
        //         });
        //     }

        //     // Yield
        //     util.stackFrame.timer = new Timer();
        //     util.stackFrame.timer.start();
        //     util.yield();
        // } else {
        //     if (util.stackFrame.timer.timeElapsed() < 1000 * durationSeconds) {
        //         util.yield();
        //     } else {
        //         if (typeof window.ext !== 'undefined') {
        //             window.ext.postMessage({
        //                 extension: 'video',
        //                 method: 'stopPlayback',
        //                 args: []
        //             });
        //         }
        //     }
        // }
    }

    stopAllVideos () {
        // if (this.runtime.targets === null) return;
        // const allTargets = this.runtime.targets;
        // for (let i = 0; i < allTargets.length; i++) {
        //     this._stopAllSoundsForTarget(allTargets[i]);
        // }
    }

}

module.exports = Scratch3VideoBlocks;
