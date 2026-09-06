/**
 * Creates a Chrome-style "Blocked by Admin" interstitial.
 *
 * Options you can pass:
 *   title                 – <title> of the page
 *   heading               – main H1 text
 *   primaryParagraph      – the paragraph under the heading (can contain HTML)
 *   primaryButtonText     – text on the blue button
 *   learnMoreText         – visible text of the “Learn more…” link
 *   learnMoreUrl          – where the Learn-more link should go (default "#")
 *   errorCode             – optional error-code string
 *
 * Example:
 *   document.write(createBlockedByAdminPage({
 *     heading: "Access denied",
 *     primaryParagraph: "This site is blocked by policy.",
 *     learnMoreText: "Read the full policy",
 *     learnMoreUrl: "https://example.com/policy",
 *     primaryButtonText: "Go back"
 *   }));
 */
function createBlockedByAdminPage(options = {}) {
  const defaults = {
    title: "Blocked by Admin",
    heading: "The site ahead is blocked by your organization",
    primaryParagraph: "Your organization has blocked <strong>enterprise-block.example.net</strong> because it violates a policy.",
    primaryButtonText: "Go back",
    learnMoreText: "Learn more about this warning",
    learnMoreUrl: "#",          // ← change this to any URL you want
    errorCode: ""
  };

  const cfg = Object.assign({}, defaults, options);

  // Build the paragraph with the customisable Learn-more link
  const paragraphWithLink = `${cfg.primaryParagraph}
    <a href="${cfg.learnMoreUrl}" id="learn-more-link"
       aria-label="${cfg.learnMoreText}">${cfg.learnMoreText}</a>`;

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
      -webkit-user-select: none;
      display: inline-block;
    }
    .icon::after {
      content: "🚫";
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
    .error-code {
      color: var(--error-code-color);
      font-size: .8em;
      margin-top: 12px;
      text-transform: uppercase;
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
    @media (max-width: 420px) {
      button { float: none; width: 100%; padding: 16px 24px; }
      .interstitial-wrapper { padding: 0 5%; }
    }
  </style>
</head>
<body id="body" class="enterprise-block">
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
    </div>
  </div>

  <script>
    // Go back one page in history
    document.getElementById('primary-button').addEventListener('click', function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback if there is no history
        window.location.href = 'about:blank';
      }
    });

    // Learn-more link – just follows the href you supplied
    // (no extra JS needed unless you want to intercept it)
  </script>
</body>
</html>`;
}

// Expose globally so you can call it after loading the script
if (typeof window !== 'undefined') {
  window.createBlockedByAdminPage = createBlockedByAdminPage;
}
