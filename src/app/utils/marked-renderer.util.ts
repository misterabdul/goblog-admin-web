import { marked } from 'marked';

import { MarkedRenderer } from '@misterabdul/ngx-markdown';

export class MarkedRendererHelpers {
  private nonWordAndColonTest = /[^\w:]/g;
  private originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  public linkRenderer(
    renderer: marked.Renderer,
    isDarkMode: boolean = false
  ): (href: string | null, title: string, text: string) => string {
    if (isDarkMode)
      return (href: string | null, title: string, text: string): string => {
        href = this.cleanUrl(
          renderer.options.sanitize,
          renderer.options.baseUrl,
          href
        );
        if (href === null) {
          return text;
        }
        let out = '<a class="md-link-dark" href="' + escape(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      };
    else
      return (href: string | null, title: string, text: string): string => {
        href = this.cleanUrl(
          renderer.options.sanitize,
          renderer.options.baseUrl,
          href
        );
        if (href === null) {
          return text;
        }
        let out = '<a href="' + escape(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      };
  }

  public codeRenderer(
    renderer: MarkedRenderer,
    isDarkMode: boolean
  ): (
    code: string,
    infostring: string | undefined,
    escaped: boolean
  ) => string {
    return (
      code: string,
      infostring: string | undefined,
      escaped: boolean
    ): string => {
      const match = (infostring ?? '').match(/\S*/);
      const lang = match ? match[0] : '';
      if (renderer.options.highlight) {
        const out = renderer.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }

      code = code.replace(/\n$/, '') + '\n';

      const darkClass = isDarkMode ? 'md-pre-dark' : '';
      if (!lang) {
        return (
          '<pre class="md-pre ' +
          darkClass +
          '"><code>' +
          (escaped ? code : this.escape(code, true)) +
          '</code></pre>\n'
        );
      }

      return (
        '<pre class="md-pre ' +
        darkClass +
        '"><code class="' +
        renderer.options.langPrefix +
        this.escape(lang, true) +
        '">' +
        (escaped ? code : this.escape(code, true)) +
        '</code></pre>\n'
      );
    };
  }

  public imageRenderer(
    renderer: MarkedRenderer,
    isDarkMode: boolean
  ): (
    href: string | null,
    title: string | null,
    text: string | null
  ) => string {
    return (
      href: string | null,
      title: string | null,
      text: string | null
    ): string => {
      href = this.cleanUrl(
        renderer.options.sanitize,
        renderer.options.baseUrl,
        href
      );
      if (href === null) return text ?? '';

      const darkClass = isDarkMode ? 'md-img-dark' : '';
      let out =
        '<img class="md-img ' +
        darkClass +
        '" src="' +
        href +
        '" alt="' +
        text +
        '" loading="lazy"';
      if (title) out += ' title="' + title + '"';
      out += renderer.options.xhtml ? '/>' : '>';

      return out;
    };
  }

  public cleanUrl(
    sanitize: boolean | undefined,
    base: string | undefined,
    href: string | null
  ) {
    if (sanitize) {
      let prot;
      try {
        if (href === null) throw new Error('href is null');
        prot = decodeURIComponent(unescape(href))
          .replace(this.nonWordAndColonTest, '')
          .toLowerCase();
      } catch (e) {
        return null;
      }
      if (
        prot.indexOf('javascript:') === 0 ||
        prot.indexOf('vbscript:') === 0 ||
        prot.indexOf('data:') === 0
      ) {
        return null;
      }
    }
    if (base && !this.originIndependentUrl.test(href ?? '')) {
      href = this.resolveUrl(base, href);
    }
    try {
      href = encodeURI(href ?? '').replace(/%25/g, '%');
    } catch (e) {
      return null;
    }
    return href;
  }

  private baseUrls = {} as { [index: string]: string };
  private justDomain = /^[^:]+:\/*[^/]*$/;
  private protocol = /^([^:]+:)[\s\S]*$/;
  private domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  public resolveUrl(base: string | undefined, href: string | null) {
    if (!this.baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (this.justDomain.test(base ?? '')) {
        this.baseUrls[' ' + base] = base + '/';
      } else {
        this.baseUrls[' ' + base] = this.rtrim(base ?? '', '/', true);
      }
    }
    base = this.baseUrls[' ' + base];
    const relativeBase = base.indexOf(':') === -1;

    if (href?.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }
      return base.replace(this.protocol, '$1') + href;
    } else if (href?.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }
      return base.replace(this.domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.
  public rtrim(str: string, c: string, invert: boolean) {
    const l = str.length;
    if (l === 0) {
      return '';
    }

    // Length of suffix matching the invert condition.
    let suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  private escapeTest = /[&<>"']/;
  private escapeReplace = /[&<>"']/g;
  private escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  private escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  private escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  } as { [index: string]: string };

  private getEscapeReplacement = (ch: string): string =>
    this.escapeReplacements[ch];

  public escape(html: string, encode: boolean): string {
    if (encode) {
      if (this.escapeTest.test(html)) {
        return html.replace(this.escapeReplace, this.getEscapeReplacement);
      }
    } else {
      if (this.escapeTestNoEncode.test(html)) {
        return html.replace(
          this.escapeReplaceNoEncode,
          this.getEscapeReplacement
        );
      }
    }

    return html;
  }
}
