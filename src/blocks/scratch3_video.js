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
            video_playuntildone: this.playVideoUntilDone,
            video_start: this.startVideo
        };
    }

    playVideoUntilDone (args, util) {

        return new Promise( resolve => {
            // Store the resolve id so that we can call
            // it from outside JS
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'playUntilDone',
                    videoIndex: +(args.VIDEO_MENU),
                    resolveId: resolveId
                });
            }
        });
    }

    startVideo (args, util) {

        return new Promise( resolve => {
            // Store the resolve id so that we can call
            // it from outside JS
            var resolveId = uid();
            this.videoPromiseRegistry[resolveId] = resolve;
            if (typeof window.ext !== 'undefined') {
                window.ext.postMessage({
                    extension: 'video',
                    method: 'startVideo',
                    videoIndex: +(args.VIDEO_MENU),
                    resolveId: resolveId
                });
            }
        });
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
