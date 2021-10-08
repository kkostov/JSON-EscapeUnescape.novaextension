exports.activate = function () {
  // Do work when the extension is activated
};

exports.deactivate = function () {
  // Clean up state before the extension is deactivated
};

nova.commands.register("json-escape-unescape.escapeJson", (editor) => {
  editor.edit(function (e) {
    const range = new Range(0, editor.document.length);
    const text = editor.getTextInRange(range);
    // Remove trailing and leading whitespace
    const trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g, "");
    const escaped = JSON.stringify(trimmedText)
      .replace(/\//g, "\\/")
      .replace(/\u2028/g, "\\u2028") // line separator
      .replace(/\u2029/g, "\\u2029"); // paragraph separator
    e.replace(range, escaped);
  });
});

nova.commands.register("json-escape-unescape.unescapeJson", (editor) => {
  editor.edit(function (e) {
    const range = new Range(0, editor.document.length);
    const text = editor.getTextInRange(range);
    let unescaped = text;
    if (!text.startsWith('"')) {
      unescaped = '"'.concat(unescaped);
    }
    if (!unescaped.endsWith('"')) {
      unescaped = unescaped.concat('"');
    }
    const jsonObjc = JSON.parse(unescaped);
    e.replace(range, jsonObjc.toString());
  });
});
