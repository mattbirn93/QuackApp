import { mergeAttributes, Node } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
export const PageBreak = Node.create({
    name: "pageBreak",
    addOptions() {
        return {
            HTMLAttributes: {
                style: "page-break-after: always",
                "data-page-break": "true",
            },
        };
    },
    group: "block",
    parseHTML() {
        return [
            {
                tag: "div",
                getAttrs: (node) => node.style.pageBreakAfter === "always" &&
                    node.dataset.pageBreak === "true" &&
                    null,
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        ];
    },
    addCommands() {
        return {
            setPageBreak: () => ({ chain }) => {
                console.log("Page break inserted");
                return (chain()
                    .insertContent({ type: this.name })
                    // set cursor after page break
                    .command(({ dispatch, tr }) => {
                    if (dispatch) {
                        const { $to } = tr.selection;
                        const posAfter = $to.end();
                        if ($to.nodeAfter) {
                            tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                        }
                        else {
                            // add node after page break if it’s the end of the document
                            const node = $to.parent.type.contentMatch.defaultType?.create({
                                style: {
                                    pageBreakAfter: "always",
                                },
                                "data-page-break": "true",
                            });
                            if (node) {
                                tr.insert(posAfter, node);
                                tr.setSelection(TextSelection.create(tr.doc, posAfter));
                            }
                        }
                        tr.scrollIntoView();
                    }
                    return true;
                })
                    .run());
            },
            unsetPageBreak: () => ({ chain }) => {
                return chain()
                    .deleteSelection()
                    .command(() => true)
                    .run();
            },
        };
    },
});
