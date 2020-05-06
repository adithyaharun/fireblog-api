import showdown from "showdown";

showdown.setOption('ghCompatibleHeaderId', true);
showdown.extension('heading-links', function () {
  var template = '$1<a id="continent-$3" class="city" href="#$3" aria-hidden="true">#&nbsp;&nbsp;</a>$4';

  return [{
    type: 'html',
    regex: /(<h([1-3]) id="([^"]+?)">)(.*<\/h\2>)/g,
    replace: template
  }];
});

const MarkdownParser = new showdown.Converter({ extensions: ["heading-links"] });

export default MarkdownParser;