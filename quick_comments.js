var wasCommentSectionUpdated = false;

function onCommentSectionAdded(el) {
  wasCommentSectionUpdated = true;

  const container = el.children[0].children[0];
  const link = document.createElement("a");

  link.href = "javascript:void(0);";
  link.setAttribute("data-name", "Kaizen");
  link.setAttribute("data-view-component", "true");
  link.className = "IssueLabel hx_IssueLabel width-fit mb-1 mr-1";

  link.style.setProperty("--label-r", "121");
  link.style.setProperty("--label-g", "230");
  link.style.setProperty("--label-b", "184");
  link.style.setProperty("--label-h", "154");
  link.style.setProperty("--label-s", "68");
  link.style.setProperty("--label-l", "68");

  const span = document.createElement("span");
  span.className = "css-truncate css-truncate-target width-fit";
  span.setAttribute("label", "Blocking");
  span.textContent = "❗";

  link.appendChild(span);
  container.appendChild(link);
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
