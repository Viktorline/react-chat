import styles from './ChatTheme.module.css';

export const ChatTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: styles.paragraph,
  quote: styles.quote,
  channel: styles.channel,
  heading: {
    h1: styles.headingH1,
    h2: styles.headingH2,
    h3: styles.headingH3,
  },
  list: {
    nested: {
      listitem: styles.nestedListItem,
    },
    ol: styles.listOl,
    ul: styles.listUl,
    listitem: styles.listItem,
  },
  link: styles.link,
  text: {
    bold: styles.textBold,
    italic: styles.textItalic,
    underline: styles.textUnderline,
    strikethrough: styles.textStrikethrough,
    code: styles.textCode,
  },
  code: styles.editorCode,
  codeHighlight: {
    atrule: styles.tokenAttr,
    attr: styles.tokenAttr,
    boolean: styles.tokenProperty,
    builtin: styles.tokenSelector,
    cdata: styles.tokenComment,
    char: styles.tokenSelector,
    class: styles.tokenFunction,
    'class-name': styles.tokenFunction,
    comment: styles.tokenComment,
    constant: styles.tokenProperty,
    deleted: styles.tokenProperty,
    doctype: styles.tokenComment,
    entity: styles.tokenOperator,
    function: styles.tokenFunction,
    important: styles.tokenVariable,
    inserted: styles.tokenSelector,
    keyword: styles.tokenAttr,
    namespace: styles.tokenVariable,
    number: styles.tokenProperty,
    operator: styles.tokenOperator,
    prolog: styles.tokenComment,
    property: styles.tokenProperty,
    punctuation: styles.tokenPunctuation,
    regex: styles.tokenVariable,
    selector: styles.tokenSelector,
    string: styles.tokenSelector,
    symbol: styles.tokenProperty,
    tag: styles.tokenProperty,
    url: styles.tokenOperator,
    variable: styles.tokenVariable,
  },
};
