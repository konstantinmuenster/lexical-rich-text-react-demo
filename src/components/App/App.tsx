import "../../styles/global.css";
import { Editor } from "../Editor";

export function App() {
  return (
    <div className="max-w-4xl mx-auto px-8 my-16">
      <h1 className="text-3xl font-serif">Lexical React Demo</h1>
      <Editor className="my-8" />
    </div>
  );
}
