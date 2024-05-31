declare module "wav-decoder" {
    export interface WavData {
        sampleRate: number;
        channelData: Float32Array[];
    }

    export function decode(buffer: ArrayBuffer): Promise<WavData>;
}
