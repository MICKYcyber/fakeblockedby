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
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABAlBMVEUAAADcRTfcRDfdRET/gIDcRjr/ZmbjVTncRDfcRTfcRDfdRDzgSTncRDjeSDvcRTjbRDfbRDjeRzvcRjfbRjjcRTjcRTjcRTfdRTfcRDjdRTjcRTjbRDjbRTjbRTjbRTfcRjjdRDrcRjfbRTjZQzfcRDjZRDfZRzbWQzXXRDXXQzbXQzbWQjXYSDvWQjbbRDfOQDPSQTTUQjXCPDDNPzPJPjLGPTHVQjXMPzPRQTTWQjXLPzPDPDHYQzbAOzDTQTXHPTLIPjK8Oi++Oy/FPTHEPTHPQDTQQDTUQTXBPDDKPjK/OzC9Oi/////PQDPRQDS3OS66OS7TQTTEPDHXQjbMPjMBhLaWAAAAL3RSTlMA4tgPAhYFCcL98B4x9ie1+s49WICbqXNKZY3pjuqcgVdLZnL2qKg9zmXpjfontV8LANsAAAJrSURBVHhe7ZTnduIwFAY3ARIgBAg9vW1v173ROylby/u/yso2Fx3MNaxs9h/zAHM+Sfa8+M/s2LFjx+3tdjwH+/sHWxHVAerb8KSyANnUFkRXwLiK78llgJHJxRalwSMd11OGOeV4nsM9FO0dxhJdw4LrOJ6jYy46PoohqgEHatE9JViiFNWTPIElTpIRRXcQ4C6aJ3EJAS4TkUQXsMJFFE++CCsU8xFEBSAoiHsaQNIQ7yuQCFe3DiHUhftKIlzdKoRSFe0r8sXDAkSoumkIigYaIOkIfeWi56EESFm8r1w0fFIl4epWgBA9qOMpmirCfeWijtoa9WSx6taAELFBRl/vilS3BJRIbRk9/VFTsLrifUXRuNfXLU0y/7m6p0CKxqN+v6lJU/k3eJxu7Os5LWKDHi1tYstKG1zON1X3DGiRMR80Mx3fdCbc1+bQe3o2SJrYXcV0fFMxL9xXiz0987BBtux65qaCeF8lHCR3FabBTQ3xvk4M1yN5B/Mw2+urew8hTP1BM38Qnu5evK8gMw+7IcfH9E3ZlEBfMSO//Kf35+Cm6ua+rhbSYDeEa9CUyW3qK1HIjj5DBz8dWd0bWCd6Ult/uMPEr+BmbV/JHrVG/a9MsEybV5fsK50R3frmBFXtCtVXmt73H4PhQ4t9k9rkJ55tYXwZrO4rCEUfPHfUEcuaZC/umw97TfaVpslu2tCb2lRWnBlKFtf+huwrjaa6Pxv7RfgW7nubJPtKI/X0puQO4k/Pfe/ovtLY7KbxVwve0/sE3VeaLosIbkEDvt8Hoq/hKGwQYvoq5OMnoq/hLAbgc/FVn33PX7pAfE5QHR6fAAAAAElFTkSuQmCCdata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABAlBMVEUAAADcRTfcRDfdRET/gIDcRjr/ZmbjVTncRDfcRTfcRDfdRDzgSTncRDjeSDvcRTjbRDfbRDjeRzvcRjfbRjjcRTjcRTjcRTfdRTfcRDjdRTjcRTjbRDjbRTjbRTjbRTfcRjjdRDrcRjfbRTjZQzfcRDjZRDfZRzbWQzXXRDXXQzbXQzbWQjXYSDvWQjbbRDfOQDPSQTTUQjXCPDDNPzPJPjLGPTHVQjXMPzPRQTTWQjXLPzPDPDHYQzbAOzDTQTXHPTLIPjK8Oi++Oy/FPTHEPTHPQDTQQDTUQTXBPDDKPjK/OzC9Oi/////PQDPRQDS3OS66OS7TQTTEPDHXQjbMPjMBhLaWAAAAL3RSTlMA4tgPAhYFCcL98B4x9ie1+s49WICbqXNKZY3pjuqcgVdLZnL2qKg9zmXpjfontV8LANsAAAJrSURBVHhe7ZTnduIwFAY3ARIgBAg9vW1v173ROylby/u/yso2Fx3MNaxs9h/zAHM+Sfa8+M/s2LFjx+3tdjwH+/sHWxHVAerb8KSyANnUFkRXwLiK78llgJHJxRalwSMd11OGOeV4nsM9FO0dxhJdw4LrOJ6jYy46PoohqgEHatE9JViiFNWTPIElTpIRRXcQ4C6aJ3EJAS4TkUQXsMJFFE++CCsU8xFEBSAoiHsaQNIQ7yuQCFe3DiHUhftKIlzdKoRSFe0r8sXDAkSoumkIigYaIOkIfeWi56EESFm8r1w0fFIl4epWgBA9qOMpmirCfeWijtoa9WSx6taAELFBRl/vilS3BJRIbRk9/VFTsLrifUXRuNfXLU0y/7m6p0CKxqN+v6lJU/k3eJxu7Os5LWKDHi1tYstKG1zON1X3DGiRMR80Mx3fdCbc1+bQe3o2SJrYXcV0fFMxL9xXiz0987BBtux65qaCeF8lHCR3FabBTQ3xvk4M1yN5B/Mw2+urew8hTP1BM38Qnu5evK8gMw+7IcfH9E3ZlEBfMSO//Kf35+Cm6ua+rhbSYDeEa9CUyW3qK1HIjj5DBz8dWd0bWCd6Ult/uMPEr+BmbV/JHrVG/a9MsEybV5fsK50R3frmBFXtCtVXmt73H4PhQ4t9k9rkJ55tYXwZrO4rCEUfPHfUEcuaZC/umw97TfaVpslu2tCb2lRWnBlKFtf+huwrjaa6Pxv7RfgW7nubJPtKI/X0puQO4k/Pfe/ovtLY7KbxVwve0/sE3VeaLosIbkEDvt8Hoq/hKGwQYvoq5OMnoq/hLAbgc/FVn33PX7pAfE5QHR6fAAAAAElFTkSuQmCC");
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
