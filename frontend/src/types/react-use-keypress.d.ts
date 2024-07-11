declare module "react-use-keypress" {
    import { Key } from "react-use-keypress/dist/types";

    export default function useKeyPress(
        keys: Key | Key[],
        callback: () => void,
    ): void;
}
