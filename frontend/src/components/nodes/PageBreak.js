import { Node } from "@tiptap/core";

export const PageBreak = Node.create({
  name: "pageBreak",

  group: "block",

  parseHTML() {
    return [
      {
        tag: "div.page-break",
      },
    ];
  },

  renderHTML() {
    return ["div", { class: "page-break" }];
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands }) => {
          return commands.insertContent("<div class='page-break'></div>");
        },
    };
  },
});
