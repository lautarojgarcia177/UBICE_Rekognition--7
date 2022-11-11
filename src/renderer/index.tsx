// import * as ReactDOM from "react-dom";
import App from "./App";

// function render() {
//   ReactDOM.render(<App />, document.body);
// }

// render();
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)