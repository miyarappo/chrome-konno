var _target = null

const onMouse = evt => {
  if (_target) {
    _target.style.border = null
  }
  evt.target.style.border = "2px solid #f00"
  _target = evt.target
  const selector = getSelectorFromElement(evt.target)
  chrome.runtime.sendMessage({selector: selector})
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "activate") {
    document.addEventListener("mousemove", onMouse)
  } else if (request.action == "deactivate") {
    document.removeEventListener("mousemove", onMouse)
  }
})


// http://akabeko.me/blog/2015/06/get-element-selector/ から拝借

/*
 * 指定された要素と同一階層、同名の要素コレクション内におけるインデックスを取得します。
 *
 * @param {Element} el   要素。
 * @param {String}  name 要素名。
 *
 * @return {Number} インデックス。範囲は 1 〜 N となります。
 */
function getSiblingElemetsIndex( el, name ) {
  var index = 1;
  var sib   = el;

  while( ( sib = sib.previousElementSibling ) ) {
    if( sib.nodeName.toLowerCase() === name ) {
      ++index;
    }
  }

  return index;
}

/**
 * 指定された要素を示すセレクターを取得します。
 *
 * @see http://stackoverflow.com/questions/3620116/get-css-path-from-dom-element
 *
 * @param {Element} el 要素。
 *
 * @return {Array} セレクター名コレクション。
 */
function getSelectorFromElement( el ) {
  var names = [];
  if( !( el instanceof Element ) ) { return names; }
  while( el.nodeType === Node.ELEMENT_NODE ) {
    var name = el.nodeName.toLowerCase();
    if( el.id ) {
      // id はページ内で一意となるため、これ以上の検索は不要
      name += '#' + el.id;
      names.unshift( name );
      break;
    }

    if (el.className ) {
      name += '.' + el.className;
    }

    // 同じ階層に同名要素が複数ある場合は識別のためインデックスを付与する
    // 複数要素の先頭 ( index = 1 ) の場合、インデックスは省略可能
    //
    var index = getSiblingElemetsIndex( el, name );
    if( 1 < index ) {
      name += ':nth-of-type(' + index + ')';
    }

    names.unshift( name );
    el = el.parentNode;
  }

  return names;
}
