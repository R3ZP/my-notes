import { h, Fragment } from "preact"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { useState } from "preact/hooks";

const Version = (): h.JSX.Element => {
  const [version] = useState<string>(chrome.runtime.getManifest().version);
  return (
    <Fragment>
      <h2>Version</h2>
      <div>
        <strong id="version" class="space-right">{version}</strong>
        <a href="https://github.com/penge/my-notes/releases" target="_blank" class="space-left">Changelog</a>
        <a href="https://github.com/penge/my-notes" target="_blank" class="space-left">Repository</a>
      </div>
    </Fragment>
  );
};

export default Version;
