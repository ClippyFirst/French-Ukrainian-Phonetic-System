const COMBINING = /[\\u0300-\\u036f\\u1dc0-\\u1dff\\u20d0-\\u20ff]/u;
const DISPLAY = new Map([
  ['\\u030a',{glyph:'˚',position:'above'}],
  ['\\u0301',{glyph:'ˊ',position:'above'}],
  ['\\u0306',{glyph:'˘',position:'above'}],
  ['\\u0303',{glyph:'˜',position:'above'}],
  ['\\u0307',{glyph:'˙',position:'above'}],
  ['\\u0320',{glyph:'ˍ',position:'below'}],
  ['\\u032c',{glyph:'ˇ',position:'below',flip:true}],
  ['\\u0325',{glyph:'˳',position:'below'}],
  ['\\u031f',{glyph:'˖',position:'below'}],
  ['\\u031e',{glyph:'˗',position:'below'}],
  ['\\u031d',{glyph:'˔',position:'above'}],
  ['\\u030c',{glyph:'ˇ',position:'above'}],
  ['\\u032f',{glyph:'˘',position:'below'}],
  ['\\u031a',{glyph:'˒',position:'above'}],
  ['\\u0329',{glyph:'ˌ',position:'below'}],
  ['\\u0324',{glyph:'˳',position:'below'}],
  ['\\u0330',{glyph:'˜',position:'below'}],
  ['\\u0339',{glyph:'˒',position:'below'}],
  ['\\u031c',{glyph:'˓',position:'below'}]
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
      node.className='ufpn-display-mark '+mark.position;
      node.textContent=mark.glyph;
      if(mark.flip) node.classList.add('flip');
      const index=mark.position==='above'?above++:below++;
      node.style.setProperty('--mark-index',index);
      wrapper.append(node);
    }
    container.append(wrapper);
  }
}
