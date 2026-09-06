/**
 * Generates a Chrome-style "Your connection is not private" (SSL) interstitial.
 */
function createPrivacyErrorPage(options = {}) {
  const defaults = {
    title: "Privacy error",
    domain: "example.com",
    heading: "Your connection is not private",
    primaryParagraph: null,
    learnMoreText: "Learn more about this warning",
    learnMoreUrl: "#",
    primaryButtonText: "Go back",
    errorCode: "net::ERR_CERT_CONTAINS_ERRORS",
    explanationParagraph: null,
    finalParagraph: null,
    primaryButtonAction: "window.history.back();"
  };

  const cfg = Object.assign({}, defaults, options);

  if (!cfg.primaryParagraph) {
    cfg.primaryParagraph = `Attackers might be trying to steal your information from <strong>${cfg.domain}</strong> (for example, passwords, messages, or credit cards).`;
  }
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
      --google-blue-600: rgb(26, 115, 232);
      --google-blue-700: rgb(25, 103, 210);
      --google-gray-500: rgb(154, 160, 166);
      --google-gray-700: rgb(95, 99, 104);
      --google-gray-900: rgb(32, 33, 36);
      --heading-color: var(--google-gray-900);
      --link-color: rgb(88, 88, 88);
      --primary-button-fill-color: var(--google-blue-600);
      --primary-button-fill-color-active: var(--google-blue-700);
      --primary-button-text-color: #fff;
      --secondary-button-border-color: var(--google-gray-500);
      --secondary-button-fill-color: #fff;
      --secondary-button-hover-fill-color: #f8f9fa;
      --secondary-button-text-color: var(--google-gray-700);
      --text-color: var(--google-gray-700);
      background: var(--background-color);
      color: var(--text-color);
      margin: 0;
      font-family: 'Segoe UI', Tahoma, sans-serif;
      font-size: 75%;
      word-wrap: break-word;
    }
    @media (prefers-color-scheme: dark) {
      body {
        --background-color: var(--google-gray-900);
        --error-code-color: var(--google-gray-500);
        --heading-color: var(--google-gray-500);
        --link-color: #8ab4f8;
        --primary-button-fill-color: #8ab4f8;
        --primary-button-fill-color-active: #8ab4f8;
        --primary-button-text-color: var(--google-gray-900);
        --secondary-button-border-color: #5f6368;
        --secondary-button-fill-color: var(--google-gray-900);
        --secondary-button-hover-fill-color: #3c4043;
        --secondary-button-text-color: #8ab4f8;
        --text-color: var(--google-gray-500);
      }
      .icon { filter: invert(1); }
    }
    html { -webkit-text-size-adjust: 100%; font-size: 125%; }
    .hidden { display: none; }

    /* Real SSL / Privacy Error icon */
    .icon {
      height: 72px;
      width: 72px;
      margin: 0 0 40px;
      background-repeat: no-repeat;
      background-size: 100%;
      display: inline-block;
      background-image: url("data:image/png;base64,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");
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
      background: var(--primary-button-fill-color);
    }
    button:active {
      background: var(--primary-button-fill-color-active);
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
      margin: 0 0 16px;
    }
    .interstitial-wrapper {
      max-width: 600px;
      margin: 14vh auto 0;
      padding: 0 24px;
      line-height: 1.6em;
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
          <div id="error-code" class="error-code">${cfg.errorCode}</div>
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
    document.getElementById('primary-button').addEventListener('click', function () {
      ${cfg.primaryButtonAction}
    });
    const detailsBtn = document.getElementById('details-button');
    const detailsPanel = document.getElementById('details');
    detailsBtn.addEventListener('click', function () {
      const isHidden = detailsPanel.classList.toggle('hidden');
      detailsBtn.textContent = isHidden ? 'Advanced' : 'Hide advanced';
    });
    document.getElementById('error-code').addEventListener('click', function () {
      detailsBtn.click();
    });
  </script>
</body>
</html>`;
}

if (typeof window !== 'undefined') {
  window.createPrivacyErrorPage = createPrivacyErrorPage;
}
