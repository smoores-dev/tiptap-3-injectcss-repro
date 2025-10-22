import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

export function Editor() {
  const editor = useEditor({ extensions });

  return <EditorContent editor={editor} />;
}
