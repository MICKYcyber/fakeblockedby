function showBlockedByAdminPage(options = {}) {
  const defaults = {
    title: "Blocked by Admin",
    heading: "The site ahead is blocked by your organization",
    primaryParagraph: "Your organization has blocked <strong>enterprise-block.example.net</strong> because it violates a policy.",
    learnMoreText: "Learn more about this warning",
    learnMoreUrl: "#",
    primaryButtonText: "Go back",
    primaryButtonAction: "window.history.back();"
  };

  const cfg = Object.assign({}, defaults, options);

  const paragraph = `${cfg.primaryParagraph}
    <a href="${cfg.learnMoreUrl}" id="learn-more-link">${cfg.learnMoreText}</a>`;

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
      .icon {
        filter: invert(1);
      }
    }
    html { -webkit-text-size-adjust: 100%; font-size: 125%; }

    /* ===== Real icon from Chromium ===== */
    .icon {
      height: 72px;
      width: 72px;
      margin: 0 0 40px;
      background-repeat: no-repeat;
      background-size: 100%;
      display: inline-block;
      -webkit-user-select: none;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAFo0lEQVR4Xu3cS1OTVxwG8Ha6dsZNt/0S7ozX+wUSGKN7ycIvkJ2OiNcdbvwMfABXLS1VvLXFSMWUgFAh1oJICCEGq8UFp8+fPu87J4S3vrmcvIfOceaZMKOSnN/8z/+c95Yv3B8XFxcXFxcXFzNRZ89+rZLJJNKLDCAZdfp0Hini5zWJ/Izk5e+QAf7bpPzf/yvKLkD0I1lArCOqwazL70D65Xdub5RUagcA0kDJCYCJ8Hen5b22D8y5czvVmTN9gCkRwHzwXvKe8t72wij1JWB6AFMIBDAPVZDPIJ/Fth7zDWAeESD64LPIZ7ICBwAxZBFRlmURiUWLk0ymuCwrG8NtQyqKKfUVYG4RwP7gs8pnbhsOAO4gapvlTluQzFaO+Uoy3nNMAayurlalcOqUKaSUudUKTa9dQN/t3m0EiWOItX6fw6W8nUCDyFJHh5ktAMbUuh0yN4HtBPpWgGIxNYQUTSBhTC3ZccvW3QNoawUR6Afk7p49ZpAwtuYPPHlsFUkFEehHAA0jy61GwthkjM1UTx8BIq2gIeDcQ+7v3atKnZ2trqK+xs/n8JRFVBUEJL+CBGgYQD/t369WWomEMTZ0PgkAaQ8g6ik2RJyH+/apxwD6BSm3tpLS9QPxTGDUFTQkTZrT6wGApIJGkKcHD6p38XjLzkzWfw6ZADb0oHvAEaBHAPpZKohAv7YSCWOup3r6CRBpBX3v9R+pHuSxAB04oDKI4EjGDh1qDRLGXA9Q1iagYQFigxagJwR6BpwxptIsEsYc+roVANajBhpkcxag+3qDBs5TRMd5jowfPtws0rqMPUz1JAkQbQ8i0F1vBWP/GQHOqEwvgWGywPmNWW0GCWMPA9RrA9Cg339YPQR6AhwBGtuEM47kjhxRE0jDSBh7GKABC4CqGzSBZHplNCDA6PGBXhw9qt4nEo0ADYQBytgCJLvnB97yLs2ZQM+Q59WV4+NM8nWqESSMPcwOOm8BEA8v2KC5QcxIgxYgTq0sgSY8HFaP4Ewjvx87Vi9SPgxQ0QYgHqD6q9cIK2jU7z2sHIY4NUAzyF/hkYphptiaDUBjFy6oYa//aLtnArHn1FaOjvMSkdfZsEgY+7YBqpTLKnvxonrI/jPiTS/ijBPHAxKYFxrONDLD5I8f33j9AKQQQHZOsaVr1wSlBmkcSN7hxagGlPtM5Xg4swR6xXwGqWhnk2aWr1/fEmni0iUfiNPLX84nQ+L8wbw+ceK/kPKGlnnzSFNA8nbPOQBNalOKOEw1DiMwfuaQj11dDS7z3ChGmVIA0nRvr8oCaKPvbMJ5ycxqOLObKudP4syfPCmpRcLYDRxqmMlKANLM5cvSf/zqmUI4rQik9ZwAnDnkDbKA/K0jYeyhD1ZtRnoFJKxSWuVwWjHEERjiyCsrR8N5iyu3i4iPhLEbON1hNuUApNdXrgAooHJqgHQchDiSApE+dXXxdIeBE2am8+7GjS2R5oBU1ZCDp5WfBR2HweVtueaWNXDKNXqkeSARRlutiMP404pZJJCHU0RwKanf8El786kEIL0BEisnsOfoOJICIzjLSLmjY5fFl33CZ/XmzSCkwMqZD5hWgkOgnIELh/Yhvb16Vc0RqXa1Ympx1EoikTZw6TnavA9AWujpERgdh0B+5bAp+72npBKJHQZuXrAPqXD7dlDlEIdVw+BGCKmePgO3v9iHBJzaymF0nCUNB9f3C6q7e6eBG6jsyofz57V9DrOpIRc0GMkKUuns7DFwC56dwYGnvpTX9hzGwynF47wFz8BNnLYGx1ScUn64WlXjlOPxxY8Yk6HbgO1H0nsOo+OsVRKJmNEbyW3PGpAAhGg9hwFOyj2KQCR/WjG4TeaWe5hlE5LAlBG8bvUwi3sc6lN390blGMBxD9S5RzINxD3U6x4Ld18s4L6awt64LzdxX4/zDxj9/IEueAvhAAAAAElFTkSuQmCC");
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
    <div class="icon" id="icon"></div>
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

  document.open();
  document.write(html);
  document.close();
}
