const COMMENTS = [
  {
    icon: "❗",
    title: "Blocking: change requested or at least discussion required",
    rgb: [230, 121, 121],
    hsl: [360, 68, 68],
  },
  {
    icon: "💭",
    title:
      "Thinkinkg out loud: this isn't necessarily actionable, but indicates if the reviewer is unsure about a change",
    rgb: [121, 217, 230],
    hsl: [187, 68, 68],
  },
  {
    icon: "❓",
    title: "A question from the reviewer",
    rgb: [121, 217, 230],
    hsl: [187, 68, 68],
  },
  {
    icon: "💡",
    title:
      "Idea or suggestion: usually offering another way of solving the same problem with some additional benefit",
    rgb: [121, 217, 230],
    hsl: [187, 68, 68],
  },
  {
    icon: "💭",
    title:
      "Small correction: usually a typo, translation change or something similar",
    rgb: [121, 217, 230],
    hsl: [187, 68, 68],
  },
  {
    icon: "✨",
    title: "Compliment: Nice job! Great change you joyful superstar :)",
    rgb: [121, 230, 145],
    hsl: [133, 68, 68],
  },
];

var wasCommentSectionUpdated = false;

function onCommentButtonClick(icon) {
  console.log(`Clicked: ${icon}`);
}

function makeCommentButtonCallback(icon) {
  return function () {
    onCommentButtonClick(icon);
  };
}

function onCommentSectionAdded(el) {
  wasCommentSectionUpdated = true;

  const container = el.children[0].children[0];
  for (var i = 0; i < COMMENTS.length; i++) {
    comment = COMMENTS[i];
    const link = document.createElement("a");

    link.title = comment.title;
    link.setAttribute("data-view-component", "true");
    link.className = "IssueLabel hx_IssueLabel width-fit mb-1 mr-1";

    link.style.setProperty("cursor", "pointer");
    link.style.setProperty("--label-r", comment.rgb[0].toString());
    link.style.setProperty("--label-g", comment.rgb[1].toString());
    link.style.setProperty("--label-b", comment.rgb[2].toString());
    link.style.setProperty("--label-h", comment.hsl[0].toString());
    link.style.setProperty("--label-s", comment.hsl[1].toString());
    link.style.setProperty("--label-l", comment.hsl[2].toString());

    const span = document.createElement("span");
    span.className = "css-truncate css-truncate-target width-fit";
    span.textContent = comment.icon;

    link.addEventListener("click", makeCommentButtonCallback(comment.icon));

    link.appendChild(span);
    container.appendChild(link);
  }
}

window.addEventListener("pageshow", function () {
  console.log("GH Quick Comments: loaded");

  var observer = new MutationObserver(function (mutations) {
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
