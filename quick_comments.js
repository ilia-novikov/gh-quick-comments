const COMMENTS = [
  {
    icon: "❗",
    title: "Blocking: change requested or at least discussion required",
    color: {
      rgb: [230, 121, 121],
      hsl: [360, 68, 68],
    },
  },
  {
    icon: "💭",
    title:
      "Thinkinkg out loud: this isn't necessarily actionable, but indicates if the reviewer is unsure about a change",
    color: {
      rgb: [121, 217, 230],
      hsl: [187, 68, 68],
    },
  },
  {
    icon: "❓",
    title: "A question from the reviewer",
    color: {
      rgb: [121, 217, 230],
      hsl: [187, 68, 68],
    },
  },
  {
    icon: "💡",
    title:
      "Idea or suggestion: usually offering another way of solving the same problem with some additional benefit",
    color: {
      rgb: [121, 217, 230],
      hsl: [187, 68, 68],
    },
  },
  {
    icon: "💭",
    title:
      "Small correction: usually a typo, translation change or something similar",
    color: {
      rgb: [121, 217, 230],
      hsl: [187, 68, 68],
    },
  },
  {
    icon: "✨",
    title: "Compliment: Nice job! Great change you joyful superstar :)",
    color: {
      rgb: [121, 230, 145],
      hsl: [133, 68, 68],
    },
  },
];

let wasCommentSectionUpdated = false;

function onCommentButtonClick(icon) {
  const area = document.querySelector(
    'textarea[placeholder="Leave a comment"]'
  );
  if (!area) {
    return;
  }

  const currentText = area.value.trim();
  if (currentText) {
    area.value = `${icon} ` + currentText;
  } else {
    area.value = `${icon} `;
  }

  area.focus();
}

function makeCommentButtonCallback(icon) {
  return function () {
    onCommentButtonClick(icon);
  };
}

function setLinkStyles(link, {rgb, hsl}) {
  link.style.setProperty("cursor", "pointer");

  link.style.setProperty("--label-r", rgb[0]);
  link.style.setProperty("--label-g", rgb[1]);
  link.style.setProperty("--label-b", rgb[2]);

  link.style.setProperty("--label-h", hsl[0]);
  link.style.setProperty("--label-s", hsl[1]);
  link.style.setProperty("--label-l", hsl[2]);
}

function onCommentSectionAdded(el) {
  wasCommentSectionUpdated = true;

  const container = el.children[0].children[0];
  COMMENTS.forEach(({ icon, title, color }) => {
    const link = document.createElement("a");

    link.title = title;
    link.setAttribute("data-view-component", "true");
    link.className = "IssueLabel hx_IssueLabel width-fit mb-1 mr-1";

    setLinkStyles(link, color);

    const span = document.createElement("span");
    span.className = "css-truncate css-truncate-target width-fit";
    span.textContent = icon;

    link.addEventListener("click", makeCommentButtonCallback(icon));

    link.appendChild(span);
    container.appendChild(link);
  });
}

window.addEventListener("pageshow", function () {
  console.log("GH Quick Comments: loaded");

  let observer = new MutationObserver(function (mutations) {
    const commentSection = document.querySelector(
      'div[data-marker-id="new-comment"]'
    );
    if (!commentSection) {
      wasCommentSectionUpdated = false;
      return;
    }

    if (wasCommentSectionUpdated) {
      return;
    }

    onCommentSectionAdded(commentSection);
  });

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  });
});
