import { h, Fragment } from "preact"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { useState, useEffect, useRef } from "preact/hooks";
import clsx from "clsx";
import { RegularFont, GoogleFont } from "shared/storage/schema";
import { FontFamily, fontFamilies, ideizeFont, getGoogleFontHref } from "options/helpers/fonts";

interface FontProps {
  font?: RegularFont | GoogleFont
}

const Font = ({ font }: FontProps): h.JSX.Element => {
  const [fontFamily, setFontFamily] = useState<FontFamily | undefined>(undefined);
  const googleFontNameRef = useRef<HTMLInputElement>(null);
  const googleFontSubmitRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    font && setFontFamily(
      fontFamilies.find((family) => family.id === (font as RegularFont).genericFamily) ||
      fontFamilies.find((family) => family.id === "google-fonts"));
  }, [font]);

  return (
    <Fragment>
      <h2>Font</h2>
      <p>Current font: <span id="current-font-name">{font?.name}</span></p>

      {/* Title containing font family names (current underlined) */}
      <h3>
        {fontFamilies.map((family, index) =>
          <Fragment>
            <span class={clsx("font-category", family.id === fontFamily?.id && "active")} onClick={() => setFontFamily(fontFamilies.find((item) => item.id === family.id))}>{family.name}</span>
            {index < fontFamilies.length - 1 && <span class="separator">/</span>}
          </Fragment>
        )}
      </h3>

      {/* Radio buttons for the current font family (except Google Fonts) */}
      {fontFamily && fontFamily.fonts && (
        <div class="font-area">
          {fontFamily.fonts?.map((commonFontName) =>
            <div class="selection">
              <input
                type="radio"
                name="font"
                id={ideizeFont(commonFontName)}
                checked={ideizeFont(commonFontName) === font?.id}
                onClick={() => {
                  chrome.storage.local.set({
                    font: {
                      id: ideizeFont(commonFontName),
                      name: commonFontName,
                      genericFamily: fontFamily.id,
                      fontFamily: `${commonFontName}, ${fontFamily.name}`,
                    } as RegularFont
                  });
                }}
              />
              <label id={ideizeFont(commonFontName)} style={`font-family: ${commonFontName}, ${fontFamily.id};`}>The quick brown fox jumps over the lazy dog (<span>{commonFontName}</span>)</label>
            </div>
          )}
        </div>
      )}

      {/* Google Fonts */}
      {fontFamily && !fontFamily.fonts && (
        <div class="font-area" id="google-fonts-area">
          <ol>
            <li>Open <a href="https://fonts.google.com" target="_blank">https://fonts.google.com</a> to see the available fonts</li>
            <li>Type in the Font Name, e.g.: <b>Roboto Mono</b></li>
            <li>Click <b>Apply</b> to use the font</li>
          </ol>
          <input
            type="text"
            placeholder="Font Name (E.g. Roboto Mono)"
            value={(font && (font as GoogleFont).href && (font as GoogleFont).name) ?? ""}
            ref={googleFontNameRef}
            onInput={() => {
              googleFontSubmitRef.current.value = "Apply";
            }}
          />
          <input
            type="submit"
            id="submit"
            class="bold"
            value="Apply"
            ref={googleFontSubmitRef}
            onClick={() => {
              const googleFontName = googleFontNameRef.current.value;
              chrome.storage.local.set({
                font: {
                  id: ideizeFont(googleFontName),
                  name: googleFontName,
                  fontFamily: googleFontName,
                  href: getGoogleFontHref(googleFontName),
                } as GoogleFont
              });
              googleFontSubmitRef.current.value = "Applied";
            }} />
        </div>
      )}
    </Fragment>
  );
};

export default Font;
