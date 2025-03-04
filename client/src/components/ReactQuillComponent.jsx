import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or 'quill.bubble.css' for the bubble theme
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css"; // Choose a theme you like

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value, // Enable syntax highlighting
  },
  toolbar: [
    ["bold", "italic", "underline", "strike"], // Basic text styling
    [{ header: [1, 2, 3, false] }], // Headers
    ["blockquote", "code-block", "code"], // Code block support
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ script: "sub" }, { script: "super" }], // Superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ direction: "rtl" }], // Text direction
    [{ size: ["small", false, "large", "huge"] }], // Font sizes
    [{ color: [] }, { background: [] }], // Text color and background color
    [{ font: [] }], // Fonts
    [{ align: [] }], // Text alignment
    ["clean"], // Remove formatting
    ["link"], // Adds the link button
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "code",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
];
/*eslint-disable*/
const ReactQuillComponent = ({
  theme,
  onChange,
  className,
  placeholder,
  required,
  value,
}) => {
  return (
    <ReactQuill
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme={theme} // Or "bubble"
      className={className}
      placeholder={placeholder}
      required={required}
      value={value}
    />
  );
};

export default ReactQuillComponent;
