declare module "react-curved-text" {
    import * as React from "react";

    interface CurvedTextProps {
        text: string;
        cx: number;
        cy: number;
        rx: number;
        ry: number;
        startOffset: number;
        reversed?: boolean;
        textPathProps?: React.SVGProps<SVGTextPathElement>;
        textProps?: React.SVGProps<SVGTextElement>;
        style?: React.CSSProperties;
        className?: string;
    }

    const ReactCurvedText: React.FC<CurvedTextProps>;

    export default ReactCurvedText;
}
