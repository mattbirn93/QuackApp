import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";

// Create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
});

const editorElement = document.querySelector("#editor");
const contentElement = document.querySelector("#content");

if (editorElement && contentElement instanceof Node) {
  window.view = new EditorView(editorElement, {
    state: EditorState.create({
      doc: DOMParser.fromSchema(mySchema).parse(contentElement),
      plugins: exampleSetup({ schema: mySchema })
    })
  });
} else {
  console.error("Editor or content element not found");
}
