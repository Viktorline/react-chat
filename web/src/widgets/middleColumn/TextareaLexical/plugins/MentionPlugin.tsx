import { $createMentionNode } from '../customNodes/mentionNode'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  ElementNode,
  RangeSelection,
  TextNode
} from 'lexical'
import { useCallback, useEffect, useMemo, useState } from 'react'
import * as React from 'react'

import { Icon } from '@/components/icon/Icon'

import {
  ChannelOption,
  MentionData,
  RoleOption,
  UserOption
} from '../Editor.props'

import styles from '../customNodes/mentionNode.module.css'

const SUGGESTION_MENTION_LENGTH_LIMIT = 5

const SUGGESTION_ROLE_LENGTH_LIMIT = 5

const mentionsCache = new Map()

const dummyChannelsData = [
  {
    id: 1,
    name: 'Знакомство',
    link: '/channels/meeting',
    type: 'Текстовый канал'
  },
  {
    id: 2,
    name: 'Основной',
    link: '/channels/main',
    type: 'Текстовый канал'
  },
  { id: 3, name: 'Ревью', link: '/channels/review', type: 'Текстовый канал' },
  { id: 4, name: 'Оффтоп', link: '/channels/offtop', type: 'Текстовый канал' },
  {
    id: 5,
    name: 'Достижения',
    link: '/channels/achievements',
    type: 'Текстовый канал'
  }
]

const dummyUsersData = [
  {
    id: 1,
    name: 'Алексей',
    nickname: 'aleksey_y',
    hash: '1754',
    link: '/user/aleksey_y',
    role: 'user'
  },
  {
    id: 2,
    name: 'Виктория',
    nickname: 'viktorline',
    hash: '1654',
    link: '/user/viktorline',
    role: 'user'
  },
  {
    id: 3,
    name: 'Сергей',
    nickname: 'serr_kerr',
    hash: '1678',
    link: '/user/serr_kerr',
    role: 'user'
  },
  {
    id: 4,
    name: 'Михаил',
    nickname: 'mjh9118',
    hash: '3754',
    link: '/user/mjh9118',
    role: 'user'
  },
  {
    id: 5,
    name: 'Михаил',
    nickname: 'mihailchapurin',
    hash: '1333',
    link: '/user/mihailchapurin',
    role: 'user'
  }
]

const dummyRolesData = [
  {
    id: 1,
    color: '#EAB308',
    name: 'everyone',
    description: 'Оповестить всех',
    link: '/role/everyone'
  },
  {
    id: 2,
    color: '#9333EA',
    name: 'here',
    description: 'Оповестить всех, кто находится в сети',
    link: '/role/online'
  },
  {
    id: 3,
    color: '#DC2626',
    name: 'moderator',
    description: 'Оповестить пользователей, имеющих эту роль',
    link: '/role/moderator'
  }
]

let activeSearchRequest: ReturnType<typeof setTimeout> | null = null

interface UserData {
  id: number
  name: string
  nickname: string
  hash: string
  link: string
  role: string
}

interface RoleData {
  id: number
  color: string
  name: string
  description: string
  link: string
}

interface ChannelData {
  id: number
  name: string
  link: string
  type: string
}

function createChannelOption(data: {
  name: string
  link: string
  type: string
}): ChannelOption {
  return new ChannelOption({
    name: data.name,
    type: data.type,
    link: data.link,
    picture: <Icon icon='hashtag' className={styles.icon} />
  })
}

function createUserOption(data: {
  name: string
  nickname: string
  hash: string
  link: string
  role: string
}): UserOption {
  return new UserOption(data)
}

function createRoleOption(data: {
  name: string
  color: string
  description: string
  link: string
}): RoleOption {
  return new RoleOption(data)
}

const dummyLookupService = {
  search(
    matchArray: string,
    callback: (
      userResults: UserData[],
      roleResults: RoleData[],
      channelResults: ChannelData[]
    ) => void
  ): void {
    if (activeSearchRequest !== null) {
      clearTimeout(activeSearchRequest)
    }

    activeSearchRequest = setTimeout(() => {
      let userResults: UserData[] = []
      let roleResults: RoleData[] = []
      let channelResults: {
        id: number
        name: string
        link: string
        type: string
      }[] = []

      if (matchArray.length >= 2) {
        const symbol = matchArray[1]
        const searchString = matchArray[2].toLowerCase()

        if (symbol === '@') {
          userResults = dummyUsersData.filter(user =>
            user.nickname.toLowerCase().includes(searchString)
          )
          roleResults = dummyRolesData.filter(role =>
            role.name.toLowerCase().includes(searchString)
          )
        } else if (symbol === '#') {
          channelResults = dummyChannelsData.filter(mention =>
            mention.name.toLowerCase().includes(searchString)
          )
        }

        callback(userResults, roleResults, channelResults)
      } else {
        callback([], [], [])
      }
      activeSearchRequest = null
    }, 100)
  }
}

function useMentionLookupService(mentionString: string | null) {
  const [userResults, setUserResults] = useState<UserData[]>([])
  const [roleResults, setRoleResults] = useState<RoleData[]>([])
  const [channelResults, setChannelResults] = useState<ChannelData[]>([])

  useEffect(() => {
    if (mentionString == null) {
      setUserResults([])
      setRoleResults([])
      setChannelResults([])
      if (activeSearchRequest !== null) {
        clearTimeout(activeSearchRequest)
        activeSearchRequest = null
      }
      return
    }

    const cachedResults = mentionsCache.get(mentionString)
    if (cachedResults !== undefined) {
      setUserResults(cachedResults.userResults)
      setRoleResults(cachedResults.roleResults)
      setChannelResults(cachedResults.channelResults)
      return
    }

    mentionsCache.set(mentionString, null)
    dummyLookupService.search(
      mentionString,
      (newUserResults, newRoleResults, newChannelResults) => {
        if (mentionString === null) {
          return
        }
        mentionsCache.set(mentionString, {
          newUserResults,
          newRoleResults,
          newChannelResults
        })
        setUserResults(newUserResults)
        setRoleResults(newRoleResults)
        setChannelResults(newChannelResults)
      }
    )
  }, [mentionString])

  return { userResults, roleResults, channelResults }
}

export interface MentionPluginProps {
  setMentionData?: (data: MentionData) => void
}

export function MentionPlugin({ setMentionData }: MentionPluginProps) {
  const [editor] = useLexicalComposerContext()
  const [nodeToReplace, setNodeToReplace] = useState<any>(null)
  const [queryString, setQueryString] = useState<any>(null)

  const [mentionSymbol, setMentionSymbol] = useState<string>('')

  const { userResults, roleResults, channelResults } =
    useMentionLookupService(queryString)

  const channelOptions = useMemo(() => {
    return channelResults
      .map(channelData => createChannelOption(channelData))
      .slice(0, SUGGESTION_MENTION_LENGTH_LIMIT)
  }, [channelResults])

  const userOptions = useMemo(() => {
    return userResults
      .map(userData => createUserOption(userData))
      .slice(0, SUGGESTION_MENTION_LENGTH_LIMIT)
  }, [userResults])

  const roleOptions = useMemo(() => {
    return roleResults
      .map(roleData => createRoleOption(roleData))
      .slice(0, SUGGESTION_ROLE_LENGTH_LIMIT)
  }, [roleResults])

  const handleSelectMention = useCallback(
    (option: ChannelOption | UserOption | RoleOption) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode()
          if (node instanceof TextNode) {
            const cursorPosition = selection.anchor.offset
            const { index } = nodeToReplace
            const name = option.name
            const link = option.link
            const mentionNode = $createMentionNode(name, mentionSymbol, link)
            const spaceNode = $createTextNode(' ')

            if (index === 0) {
              const [firstPart, afterHashPart] = node.splitText(index + 1)

              if (afterHashPart && afterHashPart.getTextContent() !== '') {
                const [_, secondPart] = afterHashPart.splitText(
                  cursorPosition - index
                )
                firstPart.remove()
                afterHashPart.remove()
                selection.insertNodes([mentionNode])
                if (secondPart) {
                  mentionNode.insertAfter(secondPart)
                }
              } else {
                const [firstPart] = node.splitText(index)
                firstPart.remove()
                selection.insertNodes([mentionNode])
              }
            } else {
              const [firstPart, afterHashPart] = node.splitText(index + 1)
              const [_, secondPart] = afterHashPart.splitText(
                cursorPosition - index - 1
              )
              afterHashPart.remove()
              firstPart.insertAfter(mentionNode)
              if (secondPart) {
                mentionNode.insertAfter(secondPart)
              }
            }

            mentionNode.insertAfter(spaceNode)
            spaceNode.select()
          }
        }
      })
    },
    [editor, nodeToReplace]
  )

  function shouldShowMentionMenu(
    match: string[],
    node: TextNode | ElementNode,
    selection: RangeSelection
  ) {
    const parent = node.getParent()
    if (
      node instanceof TextNode &&
      parent &&
      (parent.getType() === 'paragraph' || parent.getType() === 'listitem')
    ) {
      const cursorPosition = selection.anchor.offset
      const textBeforeCursor = node
        .getTextContent()
        .substring(0, cursorPosition)

      let shouldShow = false
      let currentMatch = null

      if (match) {
        const currentSymbol = match[1]
        const matchedText = match[2].toLowerCase()
        const lastSymbolIndex = textBeforeCursor.lastIndexOf(currentSymbol)
        const isCursorRightAfterSymbol =
          cursorPosition === lastSymbolIndex + matchedText.length + 1

        let isMatchInOptions = false
        if (currentSymbol === '#') {
          isMatchInOptions = dummyChannelsData.some(mention =>
            mention.name.toLowerCase().startsWith(matchedText)
          )
        } else if (currentSymbol === '@') {
          isMatchInOptions =
            dummyUsersData.some(user =>
              user.nickname.toLowerCase().startsWith(matchedText)
            ) ||
            dummyRolesData.some(role =>
              role.name.toLowerCase().startsWith(matchedText)
            )
        }

        shouldShow = isCursorRightAfterSymbol && isMatchInOptions
        currentMatch = match
        setMentionSymbol(currentSymbol)
      }

      return { shouldShow, currentMatch }
    }

    return { shouldShow: false }
  }

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode()
          if (node instanceof TextNode) {
            const textContent = node.getTextContent()
            const regex = /(?:\s|^)([#@])(\S+)/
            const match = regex.exec(textContent)

            if (match) {
              const symbol = match[1]
              const mentionText = match[2].toLowerCase()

              let mentionOption
              if (symbol === '#') {
                const channelData = dummyChannelsData.find(
                  option => option.name.toLowerCase() === mentionText
                )
                if (channelData) {
                  mentionOption = createChannelOption(channelData)
                }
              } else if (symbol === '@') {
                const userData = dummyUsersData.find(
                  user => user.nickname.toLowerCase() === mentionText
                )
                if (userData) {
                  mentionOption = createUserOption(userData)
                } else {
                  const roleData = dummyRolesData.find(
                    role => role.name.toLowerCase() === mentionText
                  )
                  if (roleData) {
                    mentionOption = createRoleOption(roleData)
                  }
                }
              }

              if (mentionOption) {
                setQueryString(null)
                handleSelectMention(mentionOption)
              }
            }
          }
        }
      })
    })
  }, [editor, handleSelectMention])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode()
          const textContent = node.getTextContent()
          const cursorPosition = selection.anchor.offset
          const textBeforeCursor = textContent.substring(0, cursorPosition)
          const regex = /(?:\s|^)([#@])(\S*)$/
          const match = textBeforeCursor.match(regex)

          if (match) {
            const { shouldShow, currentMatch } = shouldShowMentionMenu(
              match,
              node,
              selection
            )
            if (shouldShow) {
              setNodeToReplace(currentMatch)
              setQueryString(currentMatch)
            } else {
              setQueryString(null)
            }
          } else {
            setQueryString(null)
          }
        } else {
          setQueryString(null)
        }
      })
    })
  }, [editor, setMentionData])

  useEffect(() => {
    const isMention = mentionSymbol === '@'
    const shouldShow =
      channelOptions.length > 0 ||
      userOptions.length > 0 ||
      roleOptions.length > 0

    if (setMentionData) {
      setMentionData({
        shouldShow,
        isMention,
        channelOptions,
        userOptions,
        roleOptions,
        handleSelectMention
      })
    }
  }, [editor, setMentionData, channelOptions, userOptions, roleOptions])

  return null
}
