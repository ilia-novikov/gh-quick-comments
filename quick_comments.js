var wasCommentSectionUpdated = false;

function onCommentSectionAdded(el) {
  wasCommentSectionUpdated = true;

  console.log(el.children[0].children[0]);
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
