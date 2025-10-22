const COMMENTS = [
  {
    icon: "❗",
    title: "Blocking: change requested or at least discussion required",
    rgb: [121, 230, 184],
    hsl: [154, 68, 68],
  },
];

var wasCommentSectionUpdated = false;

function onCommentSectionAdded(el) {
  wasCommentSectionUpdated = true;

  const container = el.children[0].children[0];
  for (var i = 0; i < COMMENTS.length; i++) {
    comment = COMMENTS[i];
    const link = document.createElement("a");

    link.title = comment.title;
    link.href = "javascript:void(0);";
    link.setAttribute("data-view-component", "true");
    link.className = "IssueLabel hx_IssueLabel width-fit mb-1 mr-1";

    link.style.setProperty("--label-r", comment.rgb[0].toString());
    link.style.setProperty("--label-g", comment.rgb[1].toString());
    link.style.setProperty("--label-b", comment.rgb[2].toString());
    link.style.setProperty("--label-h", comment.hsl[0].toString());
    link.style.setProperty("--label-s", comment.hsl[1].toString());
    link.style.setProperty("--label-l", comment.hsl[2].toString());

    const span = document.createElement("span");
    span.className = "css-truncate css-truncate-target width-fit";
    span.textContent = comment.icon;

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
