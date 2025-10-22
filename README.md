# tiptap-3-injectcss-repro

## Reproduction steps

1. Run `yarn` to install dependencies (use yarn v2+)
2. Run `yarn vite` to start the server
3. Open the browser to `http://localhost:5173`
4. Open the DOM inspector and look at the `<head>` element. You will see a `<style data-tiptap-styles="">` element.
5. Click the "Swap editor" button. You will see the tiptap styles element disappear.

## Alternative reproduction steps

1. Run `yarn` to install dependencies (use yarn v2+)
2. Open `src/index.tsx`
3. Uncomment the `StrictMode` element
4. Run `yarn vite` to start the server
5. Open the browser to `http://localhost:5173`
6. Open the DOM inspector and look at the `<head>` element. You will not see a `<style data-tiptap-styles="">` element.

## What's happening

- User clicks "Swap editor"
- The `key` state is updated
- The Editor component with key `'one'` unmounts
- The `useEditor`'s useEffect is cleaned up, which calls `scheduleDestroy`. This sets a timeout (with timeout 1), with a callback that actually calls `editor.destroy`
- The Editor component with key `'two'` mounts
- The `useEditor`'s `useState` is initialized, which constructs the new `Editor` instance. This also calls `editor.mount`, which calls `editor.createView`, which calls `editor.injectCSS`, which calls `createStyleTag`.
- This is where things get broken. `createStyleTag` first checks for an existing style tag. It finds one, because the previous editor has not actually been destroyed yet. This is returned and set as `editor.css` on the editor with key `'two'`, the new editor
- Now the previous editor is destroyed, because its setTimeout comes due. It runs `editor.destroy`, which runs `editor.unmount`, which calls `editor.css.remove`. Because of the previous step, the previous and new Editor instances both share the same style tag as `editor.css`, which means that the new Editor's `editor.css` has just been removed from the head
- There are now no baseline ProseMirror styles in the document
