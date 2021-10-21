import { MarkedOptions, MarkedRenderer } from '@misterabdul/ngx-markdown';
import { MarkedRendererHelpers } from '../utils/marked-renderer.util';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const helpers = new MarkedRendererHelpers();

  renderer.paragraph = (text: string): string => {
    return '<p class="md-p">' + text + '</p>\n';
  };

  renderer.heading = (
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: marked.Slugger
  ): string => {
    if (renderer.options.headerIds) {
      return (
        '<h' +
        level +
        ' class="md-h' +
        level +
        '" ' +
        ' id="' +
        renderer.options.headerPrefix +
        slugger.slug(raw) +
        '">' +
        text +
        '</h' +
        level +
        '>\n'
      );
    }

    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  };

  renderer.image = helpers.imageRenderer(renderer, false);

  renderer.checkbox = (checked: boolean): string => {
    return (
      '<span class="material-icons md-checkbox-icon">' +
      (checked ? 'check_box' : 'check_box_outline_blank') +
      '</span> '
    );
  };

  renderer.list = (body: string, ordered: boolean, start: number): string => {
    const type = ordered ? 'ol' : 'ul',
      startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
    return (
      '<' + type + startatt + ' class="md-list">\n' + body + '</' + type + '>\n'
    );
  };

  renderer.listitem = (text: string): string => {
    return '<li class="md-list-item">' + text + '</li>\n';
  };

  renderer.table = (header: string, body: string): string => {
    if (body) body = '<tbody>' + body + '</tbody>';

    return (
      '<div class="md-table-container">' +
      '<table>\n' +
      '<thead>\n' +
      header +
      '</thead>\n' +
      body +
      '</table>' +
      '</div>\n'
    );
  };

  renderer.tablecell = (
    content: string,
    flags: { header: boolean; align: 'center' | 'left' | 'right' | null }
  ): string => {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? '<' + type + ' class="md-table-cell" align="' + flags.align + '">'
      : '<' + type + ' class="md-table-cell">';
    return tag + content + '</' + type + '>\n';
  };

  renderer.code = helpers.codeRenderer(renderer, false);

  return {
    renderer: renderer,
  };
}
