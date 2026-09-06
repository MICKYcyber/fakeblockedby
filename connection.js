/**
 * Generates a Chrome-style "Your connection is not private" (SSL) interstitial.
 *
 * Usage:
 *   document.write(createPrivacyErrorPage({
 *     domain: "example.com",
 *     heading: "Your connection is not private",
 *     primaryParagraph: "Attackers might be trying to steal your information...",
 *     learnMoreText: "Learn more about this warning",
 *     learnMoreUrl: "https://support.google.com/chrome/answer/9901075",
 *     primaryButtonText: "Go back",
 *     errorCode: "net::ERR_CERT_CONTAINS_ERRORS"
 *   }));
 */
function createPrivacyErrorPage(options = {}) {
  const defaults = {
    title: "Privacy error",
    domain: "example.com",
    heading: "Your connection is not private",
    primaryParagraph: null, // will be auto-built if not provided
    learnMoreText: "Learn more about this warning",
    learnMoreUrl: "#",
    primaryButtonText: "Go back",          // was "Reload" in original
    errorCode: "net::ERR_CERT_CONTAINS_ERRORS",
    // Advanced section
    explanationParagraph: null,
    finalParagraph: null
  };

  const cfg = Object.assign({}, defaults, options);

  // Auto-build the main paragraph if the user didn't supply one
  if (!cfg.primaryParagraph) {
    cfg.primaryParagraph = `Attackers might be trying to steal your information from <strong>${cfg.domain}</strong> (for example, passwords, messages, or credit cards).`;
  }

  // Auto-build advanced text if not supplied
  if (!cfg.explanationParagraph) {
    cfg.explanationParagraph = `${cfg.domain} normally uses encryption to protect your information. When Chrome tried to connect to ${cfg.domain} this time, the website sent back unusual and incorrect credentials. This may happen when an attacker is trying to pretend to be ${cfg.domain}, or a Wi-Fi sign-in screen has interrupted the connection. Your information is still secure because Chrome stopped the connection before any data was exchanged.`;
  }
  if (!cfg.finalParagraph) {
    cfg.finalParagraph = `You cannot visit ${cfg.domain} right now because the website uses HSTS. Network errors and attacks are usually temporary, so this page will probably work later.`;
  }

  const paragraphWithLink = `${cfg.primaryParagraph}
    <a href="${cfg.learnMoreUrl}" id="learn-more-link">${cfg.learnMoreText}</a>`;

  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#fff">
  <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width">
  <title>${cfg.title}</title>

  <style>
    a { color: var(--link-color); }
    body {
      --background-color: #fff;
      --error-code-color: var(--google-gray-700);
      --google-blue-50: rgb(232, 240, 254);
      --google-blue-100: rgb(210, 227, 252);
      --google-blue-300: rgb(138, 180, 248);
      --google-blue-600: rgb(26, 115, 232);
      --google-blue-700: rgb(25, 103, 210);
      --google-gray-100: rgb(241, 243, 244);
      --google-gray-300: rgb(218, 220, 224);
      --google-gray-500: rgb(154, 160, 166);
      --google-gray-50: rgb(248, 249, 250);
      --google-gray-600: rgb(128, 134, 139);
      --google-gray-700: rgb(95, 99, 104);
      --google-gray-800: rgb(60, 64, 67);
      --google-gray-900: rgb(32, 33, 36);
      --heading-color: var(--google-gray-900);
      --link-color: rgb(88, 88, 88);
      --primary-button-fill-color-active: var(--google-blue-700);
      --primary-button-fill-color: var(--google-blue-600);
      --primary-button-text-color: #fff;
      --secondary-button-border-color: var(--google-gray-500);
      --secondary-button-fill-color: #fff;
      --secondary-button-hover-border-color: var(--google-gray-600);
      --secondary-button-hover-fill-color: var(--google-gray-50);
      --secondary-button-text-color: var(--google-gray-700);
      --small-link-color: var(--google-gray-700);
      --text-color: var(--google-gray-700);
      background: var(--background-color);
      color: var(--text-color);
      word-wrap: break-word;
      margin: 0;
      font-family: 'Segoe UI', Tahoma, sans-serif;
      font-size: 75%;
    }
    @media (prefers-color-scheme: dark) {
      body {
        --background-color: var(--google-gray-900);
        --error-code-color: var(--google-gray-500);
        --heading-color: var(--google-gray-500);
        --link-color: var(--google-blue-300);
        --primary-button-fill-color-active: rgb(129, 162, 208);
        --primary-button-fill-color: var(--google-blue-300);
        --primary-button-text-color: var(--google-gray-900);
        --secondary-button-border-color: var(--google-gray-700);
        --secondary-button-fill-color: var(--google-gray-900);
        --secondary-button-hover-fill-color: rgb(48, 51, 57);
        --secondary-button-text-color: var(--google-blue-300);
        --small-link-color: var(--google-blue-300);
        --text-color: var(--google-gray-500);
      }
    }
    .hidden { display: none; }
    html { -webkit-text-size-adjust: 100%; font-size: 125%; }
    .icon {
      height: 72px;
      margin: 0 0 40px;
      width: 72px;
      background: #5f6368;
      border-radius: 8px;
      position: relative;
      display: inline-block;
    }
    .icon::after {
      content: "🔒";
      font-size: 36px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    button {
      border: 0;
      border-radius: 20px;
      box-sizing: border-box;
      color: var(--primary-button-text-color);
      cursor: pointer;
      float: right;
      font-size: .875em;
      margin: 0;
      padding: 8px 16px;
      transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      background: var(--primary-button-fill-color);
    }
    button:active {
      background: var(--primary-button-fill-color-active);
      outline: 0;
    }
    .secondary-button {
      background: var(--secondary-button-fill-color);
      border: 1px solid var(--secondary-button-border-color);
      color: var(--secondary-button-text-color);
      float: none;
      margin: 0;
      padding: 8px 16px;
    }
    .secondary-button:hover {
      background: var(--secondary-button-hover-fill-color);
      border-color: var(--secondary-button-hover-border-color);
    }
    .error-code {
      color: var(--error-code-color);
      font-size: .8em;
      margin-top: 12px;
      text-transform: uppercase;
      cursor: pointer;
    }
    h1 {
      color: var(--heading-color);
      font-size: 1.6em;
      font-weight: normal;
      line-height: 1.25em;
      margin-bottom: 16px;
      margin-top: 0;
    }
    .interstitial-wrapper {
      box-sizing: border-box;
      font-size: 1em;
      line-height: 1.6em;
      margin: 14vh auto 0;
      max-width: 600px;
      width: 100%;
      padding: 0 24px;
    }
    .nav-wrapper {
      margin-top: 51px;
    }
    .nav-wrapper::after {
      clear: both;
      content: '';
      display: table;
      width: 100%;
    }
    .small-link {
      color: var(--small-link-color);
      font-size: .875em;
    }
    #details {
      margin: 20px 0 50px;
    }
    #details p:not(:first-of-type) {
      margin-top: 20px;
    }
    @media (max-width: 420px) {
      button, .secondary-button {
        float: none;
        width: 100%;
        padding: 16px 24px;
        margin-top: 12px;
      }
      .interstitial-wrapper { padding: 0 5%; }
    }
  </style>
</head>
<body id="body" class="ssl">
  <div class="interstitial-wrapper">
    <div id="main-content">
      <div class="icon" id="icon"></div>
      <div id="main-message">
        <h1>${cfg.heading}</h1>
        <p>${paragraphWithLink}</p>
        <div id="debugging">
          <div id="error-code" class="error-code" role="button" aria-expanded="false">${cfg.errorCode}</div>
        </div>
      </div>
    </div>

    <div class="nav-wrapper">
      <button id="primary-button">${cfg.primaryButtonText}</button>
      <button id="details-button" class="secondary-button small-link">Advanced</button>
    </div>

    <div id="details" class="hidden">
      <p>${cfg.explanationParagraph}</p>
      <p id="final-paragraph">${cfg.finalParagraph}</p>
    </div>
  </div>

  <script>
    // Primary button → go back one page
    document.getElementById('primary-button').addEventListener('click', function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'about:blank';
      }
    });

    // Advanced / Details toggle
    const detailsBtn = document.getElementById('details-button');
    const detailsPanel = document.getElementById('details');
    detailsBtn.addEventListener('click', function () {
      const isHidden = detailsPanel.classList.toggle('hidden');
      detailsBtn.textContent = isHidden ? 'Advanced' : 'Hide advanced';
      detailsBtn.setAttribute('aria-expanded', !isHidden);
    });

    // Optional: make error code also toggle details
    document.getElementById('error-code').addEventListener('click', function () {
      detailsBtn.click();
    });
  </script>
</body>
</html>`;
}

// Expose it
if (typeof window !== 'undefined') {
  window.createPrivacyErrorPage = createPrivacyErrorPage;
}
