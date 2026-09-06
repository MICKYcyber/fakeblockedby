/**
 * Completely replaces the current page with a Chrome-style
 * "Blocked by Admin" interstitial.
 *
 * Usage:
 *   showBlockedByAdminPage({
 *     heading: "Access Denied",
 *     primaryParagraph: "This site is blocked by policy.",
 *     learnMoreText: "View policy",
 *     learnMoreUrl: "https://example.com/policy",
 *     primaryButtonText: "Go back",
 *     primaryButtonAction: "window.history.back();"
 *   });
 */
function showBlockedByAdminPage(options = {}) {
  const defaults = {
    title: "Blocked by Admin",
    heading: "The site ahead is blocked by your organization",
    primaryParagraph: "Your organization has blocked <strong>enterprise-block.example.net</strong> because it violates a policy.",
    learnMoreText: "Learn more about this warning",
    learnMoreUrl: "#",
    primaryButtonText: "Go back",

    // What the main button does (JS code as string)
    primaryButtonAction: "window.history.back();"
  };

  const cfg = Object.assign({}, defaults, options);

  // Build the paragraph with the learn-more link
  const paragraph = `${cfg.primaryParagraph}
    <a href="${cfg.learnMoreUrl}" id="learn-more-link">${cfg.learnMoreText}</a>`;

  // Full page HTML
  const html = `<!DOCTYPE html>
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
        --text-color: var(--google-gray-500);
      }
    }
    html { -webkit-text-size-adjust: 100%; font-size: 125%; }
    .icon {
      height: 72px;
      width: 72px;
      margin: 0 0 40px;
      background: #5f6368;
      border-radius: 8px;
      position: relative;
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
    button {
      border: 0;
      border-radius: 20px;
      background: var(--primary-button-fill-color);
      color: var(--primary-button-text-color);
      font-size: .875em;
      padding: 8px 16px;
      cursor: pointer;
      float: right;
    }
    button:active {
      background: var(--primary-button-fill-color-active);
    }
    @media (max-width: 420px) {
      button { float: none; width: 100%; padding: 16px 24px; }
    }
  </style>
</head>
<body>
  <div class="interstitial-wrapper">
    <div class="icon"></div>
    <h1>${cfg.heading}</h1>
    <p>${paragraph}</p>
    <div class="nav-wrapper">
      <button id="primary-button">${cfg.primaryButtonText}</button>
    </div>
  </div>

  <script>
    document.getElementById('primary-button').addEventListener('click', function() {
      ${cfg.primaryButtonAction}
    });
  </script>
</body>
</html>`;

  // Erase everything and inject the new page
  document.open();
  document.write(html);
  document.close();
}
