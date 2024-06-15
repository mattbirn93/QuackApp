import { Node } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

export const Action = Node.create({
  name: "action",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "p.action",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", { ...HTMLAttributes, class: "action" }, 0];
  },
  addCommands() {
    return {
      setAction:
        () =>
        ({ commands }) => {
          return commands.setNode("action");
        },
    };
  },
});

export const SceneHeader = Node.create({
  name: "sceneHeader",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "h1.scene-header",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["h1", { ...HTMLAttributes, class: "scene-header" }, 0];
  },
  addCommands() {
    return {
      setSceneHeader:
        () =>
        ({ commands }) => {
          return commands.setNode("sceneHeader");
        },
    };
  },
});

export const Character = Node.create({
  name: "character",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "p.character",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", { ...HTMLAttributes, class: "character" }, 0];
  },
  addCommands() {
    return {
      setCharacter:
        () =>
        ({ commands }) => {
          return commands.setNode("character");
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, dispatch } = editor.view;
        const { $from } = state.selection;
        const pos = $from.end();
        const transaction = state.tr.insert(
          pos,
          state.schema.nodes.dialogue.create(),
        );
        dispatch(
          transaction.setSelection(
            TextSelection.near(transaction.doc.resolve(pos + 1)),
          ),
        );
        return true;
      },
    };
  },
});

export const Dialogue = Node.create({
  name: "dialogue",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "p.dialogue",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", { ...HTMLAttributes, class: "dialogue" }, 0];
  },
  addCommands() {
    return {
      setDialogue:
        () =>
        ({ commands }) => {
          return commands.setNode("dialogue");
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, dispatch } = editor.view;
        const { $from } = state.selection;
        const pos = $from.end();
        const transaction = state.tr.insert(
          pos,
          state.schema.nodes.dialogue.create(),
        );
        dispatch(
          transaction.setSelection(
            TextSelection.near(transaction.doc.resolve(pos + 1)),
          ),
        );
        return true;
      },
    };
  },
});

////////////////////////////////

// import { Node } from "@tiptap/core";
// import { TextSelection } from "prosemirror-state";

// export const Action = Node.create({
//   name: "action",
//   group: "block",
//   content: "inline*",
//   parseHTML() {
//     return [
//       {
//         tag: "p.action",
//         getAttrs: (node) => node.classList.contains("action") && null,
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ["p", { ...HTMLAttributes, class: "action" }, 0];
//   },
//   addCommands() {
//     return {
//       setAction:
//         () =>
//         ({ commands }) => {
//           return commands.setNode("action");
//         },
//     };
//   },
// });

// export const SceneHeader = Node.create({
//   name: "sceneHeader",
//   group: "block",
//   content: "inline*",
//   parseHTML() {
//     return [
//       {
//         tag: "h1.scene-header",
//         getAttrs: (node) => node.classList.contains("scene-header") && null,
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ["h1", { ...HTMLAttributes, class: "scene-header" }, 0];
//   },
//   addCommands() {
//     return {
//       setSceneHeader:
//         () =>
//         ({ commands }) => {
//           return commands.setNode("sceneHeader");
//         },
//     };
//   },
// });

// export const Character = Node.create({
//   name: "character",
//   group: "block",
//   content: "inline*",
//   parseHTML() {
//     return [
//       {
//         tag: "p.character",
//         getAttrs: (node) => node.classList.contains("character") && null,
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ["p", { ...HTMLAttributes, class: "character" }, 0];
//   },
//   addCommands() {
//     return {
//       setCharacter:
//         () =>
//         ({ commands }) => {
//           return commands.setNode("character");
//         },
//     };
//   },
//   addKeyboardShortcuts() {
//     return {
//       Enter: ({ editor }) => {
//         const { state, dispatch } = editor.view;
//         const { $from } = state.selection;
//         const pos = $from.end();
//         const transaction = state.tr.insert(
//           pos,
//           state.schema.nodes.dialogue.create(),
//         );
//         dispatch(
//           transaction.setSelection(
//             TextSelection.near(transaction.doc.resolve(pos + 1)),
//           ),
//         );
//         return true;
//       },
//     };
//   },
// });

// export const Dialogue = Node.create({
//   name: "dialogue",
//   group: "block",
//   content: "inline*",
//   parseHTML() {
//     return [
//       {
//         tag: "p.dialogue",
//         getAttrs: (node) => node.classList.contains("dialogue") && null,
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ["p", { ...HTMLAttributes, class: "dialogue" }, 0];
//   },
//   addCommands() {
//     return {
//       setDialogue:
//         () =>
//         ({ commands }) => {
//           return commands.setNode("dialogue");
//         },
//     };
//   },
//   addKeyboardShortcuts() {
//     return {
//       Enter: ({ editor }) => {
//         const { state, dispatch } = editor.view;
//         const { $from } = state.selection;
//         const pos = $from.end();
//         const transaction = state.tr.insert(
//           pos,
//           state.schema.nodes.dialogue.create(),
//         );
//         dispatch(
//           transaction.setSelection(
//             TextSelection.near(transaction.doc.resolve(pos + 1)),
//           ),
//         );
//         return true;
//       },
//     };
//   },
// });
