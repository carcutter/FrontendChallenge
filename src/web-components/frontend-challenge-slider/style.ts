// https://github.com/calebdwilliams/construct-style-sheets
// MIT

import "construct-style-sheets-polyfill";
import style from "./style.module.css";

//! Add style.css as content to the bundle since we do not want to sideload the styling.
const Style = new CSSStyleSheet();
const styleSource = style as any[];
const concat = styleSource.map((o) => o[1]).join("\n");
Style.replaceSync(concat);

export default Style;