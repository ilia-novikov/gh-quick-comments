function onCommentSectionAdded(el) {
  console.log(el);
}

window.addEventListener("load", function () {
  console.log("GH Quick Comments: loaded");

  var observer = new MutationObserver(function (mutations) {
    const commentSection = document.querySelector(
      'div[data-marker-id="new-comment"]'
    );
    if (!commentSection) {
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
