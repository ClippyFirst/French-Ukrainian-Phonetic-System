const COMBINING = /[̀-ͯ᷀-᷿⃐-⃿]/u;
const DISPLAY = new Map([
  [String.fromCodePoint(0x030a),{glyph:'˚',position:'above'}],
  [String.fromCodePoint(0x0301),{glyph:'ˊ',position:'above'}],
  [String.fromCodePoint(0x0306),{glyph:'˘',position:'above'}],
  [String.fromCodePoint(0x0303),{glyph:'˜',position:'above'}],
  [String.fromCodePoint(0x0307),{glyph:'˙',position:'above'}],
  [String.fromCodePoint(0x0320),{glyph:'ˍ',position:'below'}],
  [String.fromCodePoint(0x032c),{glyph:'ˇ',position:'below',flip:true}],
  [String.fromCodePoint(0x0325),{glyph:'˳',position:'below'}],
  [String.fromCodePoint(0x031f),{glyph:'˖',position:'below'}],
  [String.fromCodePoint(0x031e),{glyph:'˗',position:'below'}],
  [String.fromCodePoint(0x031d),{glyph:'˔',position:'above'}],
  [String.fromCodePoint(0x030c),{glyph:'ˇ',position:'above'}],
  [String.fromCodePoint(0x032f),{glyph:'˘',position:'below'}],
  [String.fromCodePoint(0x031a),{glyph:'˒',position:'above'}],
  [String.fromCodePoint(0x0329),{glyph:'ˌ',position:'below'}],
  [String.fromCodePoint(0x0324),{glyph:'˳',position:'below'}],
  [String.fromCodePoint(0x0330),{glyph:'˜',position:'below'}],
  [String.fromCodePoint(0x0339),{glyph:'˒',position:'below'}],
  [String.fromCodePoint(0x031c),{glyph:'˓',position:'below'}]
]);

export function getUfpnDisplayClusters(value) {
  const clusters=[];
  for (const cp of String(value ?? '').normalize('NFC')) {
    if (COMBINING.test(cp) && clusters.length) clusters[clusters.length-1].marks.push(DISPLAY.get(cp) ?? {glyph:cp,position:'above'});
    else clusters.push({base:cp,marks:[]});
  }
  return clusters;
}

export function renderUfpnDisplay(container, value) {
  container.replaceChildren();
  for (const cluster of getUfpnDisplayClusters(value)) {
    if (!cluster.marks.length) {
      container.append(document.createTextNode(cluster.base));
      continue;
    }
    const wrapper=document.createElement('span');
    wrapper.className='ufpn-cluster';
    const base=document.createElement('span');
    base.className='ufpn-cluster-base';
    base.textContent=cluster.base;
    wrapper.append(base);
    let above=0,below=0;
    for (const mark of cluster.marks) {
      const node=document.createElement('span');
      node.className='ufpn-display-mark '+mark.position+(mark.flip?' flip':'');
      node.textContent=mark.glyph;
      const index=mark.position==='above'?above++:below++;
      node.style.setProperty('--mark-index',index);
      wrapper.append(node);
    }
    container.append(wrapper);
  }
}
