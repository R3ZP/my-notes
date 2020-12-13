import { h, Fragment } from "preact"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { Theme } from "shared/storage/schema";

const THEMES = ["light", "dark", "custom"] as Theme[];
const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

interface ThemeProps {
  theme?: Theme
}

const Theme = ({ theme }: ThemeProps): h.JSX.Element => {
  return (
    <Fragment>
      <h2>Theme</h2>
      {THEMES.map((aTheme) =>
        <div class="selection">
          <input type="radio" id={aTheme} name="theme" checked={aTheme === theme} onClick={() => {
            chrome.storage.local.set({ theme: aTheme });
          }} />&nbsp;
          <label for={aTheme} id={`${aTheme}-theme-label`} class="bold theme-label">{capitalize(aTheme)}</label>
          {aTheme === "custom" && <a href="themes/custom/index.html" target="_blank" class="space-left">Customize</a>}
        </div>
      )}
    </Fragment>
  );
};

export default Theme;
