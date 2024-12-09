import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

const MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text)
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0]
      }
    )
  }
]

export function HiddenLinkPlugin() {
  return <AutoLinkPlugin matchers={MATCHERS} />
}
